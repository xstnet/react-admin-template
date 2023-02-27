import { useEffect, useState } from 'react';
import useUpdateEffect from './useUpdateEffect';

type IType = (value?: boolean) => [boolean, (value: boolean) => void];

const useFullScreen: IType = (value = false) => {
  const [fullScreen, setFullScreen] = useState(value);
  const el = document.documentElement;

  const enterFullScreen = () => {
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
