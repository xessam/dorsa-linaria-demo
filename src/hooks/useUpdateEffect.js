import {useEffect, useRef} from 'react';

// This copmponent dosent update on first render
export const useUpdateEffect = (effect, dependencies) => {
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) {
      const unmount = effect();
      return () => unmount && unmount();
    } else {
      mounted.current = true;
    }
  }, dependencies);

  // Reset on unmount for the next mount.
  useEffect(() => {
    return () => (mounted.current = false);
  }, []);
};
