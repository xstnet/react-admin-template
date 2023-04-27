import ContentBox from '@/components/ContextBox';
import Permission from '@/components/Permission';
import { GlobalContext } from '@/contexts/Global';
import { Button, Divider, Space, Typography } from 'antd';
import { useContext } from 'react';

const ButtonPermissionPage: React.FC<{}> = () => {
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

      <Divider />
      <Space>
        <Permission role="admin">
          <Button type="primary">Admin menu</Button>
        </Permission>
        <Permission role="guest">
          <Button>Guest menu</Button>
        </Permission>
      </Space>
    </ContentBox>
  );
};

export default ButtonPermissionPage;
