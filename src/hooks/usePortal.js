import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { createPortal, findDOMNode } from 'react-dom';
export const isServer = typeof window === 'undefined';
export const isBrowser = !isServer;

export default function usePortal({
  closeOnOutsideClick = true,
  closeOnEsc = true,
  bindTo, // attach the portal to this node in the DOM
  isOpen: defaultIsOpen = false,
  onOpen,
  onClose,
  onPortalClick,
  ...eventHandlers
}) {
  const [isOpen, makeOpen] = useState(defaultIsOpen);
  const open = useRef(isOpen);

  const setOpen = useCallback((v) => {
    open.current = v;
    makeOpen(v);
  }, []);

  const targetEl = useRef();
  const portal = useRef(isBrowser ? document.createElement('div') : null);

  useEffect(() => {
    if (isBrowser && !portal.current) portal.current = document.createElement('div');
  }, [portal]);

  const elToMountTo = useMemo(() => {
    if (isServer) return;
    // eslint-disable-next-line react/no-find-dom-node
    return (bindTo && findDOMNode(bindTo)) || document.body;
  }, [bindTo]);

  const createCustomEvent = (e) => {
    if (!e) return { portal, targetEl, event: e };
    const event = e || {};
    if (event.persist) event.persist();
    event.portal = portal;
    event.targetEl = targetEl;
    event.event = e;
    const { currentTarget } = e;
    if (!targetEl.current && currentTarget && currentTarget !== document)
      targetEl.current = event.currentTarget;
    return event;
  };

  const customEventHandlers = Object.entries(eventHandlers).reduce(
    (acc, [handlerName, eventHandler]) => {
      acc[handlerName] = (event) => {
        if (isServer) return;
        eventHandler(createCustomEvent(event));
      };
      return acc;
    },
    {}
  );

  const openPortal = useCallback(
    (e) => {
      if (isServer) return;
      const customEvent = createCustomEvent(e);
      if (targetEl.current == null) {
        setTimeout(() => setOpen(true), 0);
        throw Error('add a `ref` to the element please!');
      }
      if (onOpen) onOpen(customEvent);
      setOpen(true);
    },
    [setOpen, targetEl, onOpen]
  );

  const closePortal = useCallback(
    (e) => {
      if (isServer) return;
      const customEvent = createCustomEvent(e);
      if (onClose && open.current) onClose(customEvent);
      if (open.current) setOpen(false);
    },
    [onClose, setOpen]
  );

  const togglePortal = useCallback(
    (e) => (open.current ? closePortal(e) : openPortal(e)),
    [closePortal, openPortal]
  );

  const handleKeydown = useCallback(
    (e) => (e.key === 'Escape' && closeOnEsc ? closePortal(e) : undefined),
    [closeOnEsc, closePortal]
  );

  const handleOutsideMouseClick = useCallback(
    (e) => {
      const containsTarget = (target) => target.current.contains(e.target);
      if (containsTarget(portal) || e.button !== 0 || !open.current || containsTarget(targetEl))
        return;
      if (closeOnOutsideClick) closePortal(e);
    },
    [closePortal, closeOnOutsideClick, portal]
  );

  const handleMouseDown = useCallback(
    (e) => {
      if (isServer || !(portal.current instanceof HTMLElement)) return;
      const customEvent = createCustomEvent(e);
      if (portal.current.contains(customEvent.target) && onPortalClick) onPortalClick(customEvent);
      handleOutsideMouseClick(e);
    },
    [handleOutsideMouseClick]
  );

  const eventListeners = useRef({});

  useEffect(() => {
    if (isServer) return;
    if (!(elToMountTo instanceof HTMLElement) || !(portal.current instanceof HTMLElement)) return;

    const eventHandlerMap = {
      onScroll: 'scroll',
      onWheel: 'wheel'
    };
    const node = portal.current;
    elToMountTo.appendChild(portal.current);
    Object.entries(eventHandlerMap).forEach(
      ([handlerName /* onScroll */, eventListenerName /* scroll */]) => {
        if (!eventHandlers[handlerName]) return;
        eventListeners.current[handlerName] = (e) =>
          eventHandlers[handlerName](createCustomEvent(e));
        document.addEventListener(eventListenerName, eventListeners.current[handlerName]);
      }
    );
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      Object.entries(eventHandlerMap).forEach(([handlerName, eventListenerName]) => {
        if (!eventHandlers[handlerName]) return;
        document.removeEventListener(eventListenerName, eventListeners.current[handlerName]);
        delete eventListeners.current[handlerName];
      });
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('mousedown', handleMouseDown);
      elToMountTo.removeChild(node);
    };
  }, [handleOutsideMouseClick, handleKeydown, elToMountTo, portal]);

  const Portal = useCallback(
    ({ children }) => {
      if (portal.current != null) return createPortal(children, portal.current);
      return null;
    },
    [portal]
  );

  return Object.assign(
    [openPortal, closePortal, open.current, Portal, togglePortal, targetEl, portal],
    {
      isOpen: open.current,
      openPortal,
      ref: targetEl,
      closePortal,
      togglePortal,
      Portal,
      portalRef: portal,
      ...customEventHandlers,
      bind: {
        ref: targetEl,
        ...customEventHandlers
      }
    }
  );
}
