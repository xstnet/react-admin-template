import { useEffect, useRef } from 'react';

// 初次不执行的 Effect
// 也可以使用 ahooks提供的 useUpdateEffect
// 我在写 useUpdateEffect 时还没有引入ahooks库
// dev 模式下使用了React.StrictModel会无效, 毕竟他连着调用了2次
const useUpdateEffect = (effect: React.EffectCallback, deps?: React.DependencyList) => {
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current === true) {
      firstRun.current = false;
    } else {
      effect();
    }
  }, deps);
};

export default useUpdateEffect;
