import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useRef, useState } from 'react';
import UserForm, { IRefUserForm } from './UserForm';

const AddButton: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const formRef = useRef<IRefUserForm>(null);
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
        onCancel={() => setShowAddModal(false)}
        onOk={() => {
          formRef.current?.form.validateFields().then((data) => {
            console.log(data);
          });
        }}>
        <UserForm ref={formRef} />
      </Modal>
    </div>
  );
};

export default AddButton;
