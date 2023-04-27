import ContentBox from '@/components/ContextBox';
import { GlobalContext } from '@/contexts/Global';
import { Button, Divider, Typography } from 'antd';
import { useContext } from 'react';

const MenuPermissionPage: React.FC<{}> = () => {
  const { userInfo, setUserInfo } = useContext(GlobalContext);
  const handleChangeRole = (target: string) => {
    setUserInfo({ ...userInfo!, roles: [target] });
  };
  return (
    <ContentBox>
      <Typography.Text>当前权限: {JSON.stringify(userInfo?.roles)}</Typography.Text>
      <Divider />

      <Button.Group>
        <Button type="primary" onClick={() => handleChangeRole('admin')}>
          切换为 Admin
        </Button>
        <Button onClick={() => handleChangeRole('guest')}>切换为 Guest</Button>
      </Button.Group>
    </ContentBox>
  );
};

export default MenuPermissionPage;
