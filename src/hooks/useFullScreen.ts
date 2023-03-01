import { useEffect, useState } from 'react';
import useUpdateEffect from './useUpdateEffect';

type IType = (value?: boolean) => [boolean | undefined, (value: boolean) => void];

// React.StrictMode 会调用两次, 所以依然会有一个报错
// 解决方法: fullScreen值修改为 boolean|undefined, = undefined 时永不处理
// todo: 使用 interface 扩充 documentElement属性, 移除 ts-ignore, 下同

/**
 * 已弃用, 使用ahooks提供的 useFullscreen 方法
 * @deprecated
 */
const useFullScreen: IType = () => {
  const [fullScreen, setFullScreen] = useState<boolean>();
  const el = document.documentElement;

  const enterFullScreen = () => {
    if (fullScreen !== false) {
      return;
    }
    // W3C
    if (el.requestFullscreen) {
      el.requestFullscreen();
    }
    // FireFox
    // @ts-ignore
    else if (el.mozRequestFullScreen) {
      // @ts-ignore
      el.mozRequestFullScreen();
    }
    // Webkit
    // @ts-ignore
    else if (el.webkitRequestFullScreen) {
      // @ts-ignore
      el.webkitRequestFullScreen();
    }
  };

  const exitFullScreen = () => {
    if (fullScreen !== true) {
      return;
    }
    if (document.exitFullscreen) {
      document.exitFullscreen();
      // @ts-ignore
    } else if (document.mozCancelFullScreen) {
      // @ts-ignore
      document.mozCancelFullScreen();
      // @ts-ignore
    } else if (document.webkitCancelFullScreen) {
      // @ts-ignore
      document.webkitCancelFullScreen();
      // @ts-ignore
    } else if (document.msExitFullscreen) {
      // @ts-ignore
      document.msExitFullscreen();
    }
  };

  useUpdateEffect(() => {
    if (fullScreen) {
      enterFullScreen();
      return;
    }

    exitFullScreen();
  }, [fullScreen]);

  return [fullScreen, setFullScreen];
};

export default useFullScreen;
