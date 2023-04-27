import { GlobalContext } from '@/contexts/Global';
import { hasPermission } from '@/utils/util';
import { useContext } from 'react';

type IProps = React.PropsWithChildren<{
  role: Menu.Permission;
}>;

const Permission: React.FC<IProps> = ({ children, role }) => {
  const { userInfo } = useContext(GlobalContext);
  if (hasPermission(role, userInfo!)) {
    return <>{children}</>;
  }
  return null;
};

export default Permission;
