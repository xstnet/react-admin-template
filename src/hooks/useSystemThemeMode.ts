import { useEffect, useState } from 'react';

type IType = () => ['dark' | 'light'];

const useSystemThemeMode: IType = () => {
  const [isDark, setIsDark] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);
  useEffect(() => {
    const themeModeListener = (event: MediaQueryListEvent) => {
      console.log('chage', event.matches);

      if (event.matches) {
        setIsDark(true);
      } else {
        setIsDark(false);
      }
    };
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', themeModeListener);
    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', themeModeListener);
    };
  }, []);
  const systemTHemeMode = isDark ? 'dark' : 'light';
  return [systemTHemeMode];
};

export default useSystemThemeMode;
