import { useRef } from 'react';
import { isEqual } from 'lodash';

const useDeepCompareMemoize = (value) => {
  const ref = useRef();
  const signalRef = useRef(0);

  if (!isEqual(value, ref.current)) {
    ref.current = value;
    signalRef.current += 1;
  }

  return [signalRef.current];
};

export default useDeepCompareMemoize;
