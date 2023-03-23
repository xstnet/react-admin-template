import { theme, GlobalToken } from 'antd';

type IType = () => GlobalToken;

const useThemeToken: IType = () => {
  const { token } = theme.useToken();

  return token;
};

export default useThemeToken;
