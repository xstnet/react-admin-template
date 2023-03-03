import { postCreateUser } from '@/api';
import { PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Modal } from 'antd';
import { useRef, useState } from 'react';
import UserForm, { IRefUserForm } from './UserForm';

interface IProps {
  refreshList?: () => void;
}
const AddButton: React.FC<IProps> = ({ refreshList }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const { run: createUser, loading: createUserLoading } = useRequest(postCreateUser, {
    manual: true,
    debounceWait: 100,
    onSuccess: () => {
      setShowAddModal(false);
      formRef.current?.form.resetFields();
      refreshList?.();
    }
  });
  const formRef = useRef<IRefUserForm>(null);

  const handleCreateUser = () => {
    formRef.current?.form
      .validateFields()
      .then((data) => {
        createUser(data);
      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setShowAddModal(true);
          setTimeout(() => {
            formRef.current?.input?.focus();
          }, 100);
        }}>
        新增用户
      </Button>
      <Modal
        open={showAddModal}
        title="添加用户"
        okText="添加"
        cancelText="取消"
        confirmLoading={createUserLoading}
        onCancel={() => setShowAddModal(false)}
        onOk={handleCreateUser}>
        <UserForm ref={formRef} />
      </Modal>
    </div>
  );
};

export default AddButton;
