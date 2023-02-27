import { useEffect, useRef } from 'react';

// 初次不执行的 Effect
const useUpdateEffect = (effect: React.EffectCallback, deps?: React.DependencyList) => {
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current === true) {
      firstRun.current = false;
      return;
    }
    effect();
  }, deps);
};

export default useUpdateEffect;
