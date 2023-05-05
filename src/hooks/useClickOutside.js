import React from 'react';

export default function useClickOutside(elRef, callback) {
  const callbackRef = React.useRef();
  callbackRef.current = callback;

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      console.log(elRef?.current?.contains(e.target));
      if (
        !elRef?.current?.contains(e.target) &&
        e.target.nodeName !== 'HTML' &&
        callbackRef.current
      ) {
        callbackRef.current();
      }
    };

    document.addEventListener('click', handleClickOutside, true);

    return () => {
      docment.addEventListener('click', handleClickOutside, true);
    };
  }, [callbackRef, elRef]);
}
