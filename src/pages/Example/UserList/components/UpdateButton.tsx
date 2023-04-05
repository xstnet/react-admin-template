import { postUpdateUser } from '@/api';
import { noop } from '@/utils/util';
import { EditOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Modal } from 'antd';
import { useRef, useState } from 'react';
import UserForm, { IRefUserForm } from './UserForm';

interface IProps {
  refreshList?: () => void;
  state: Model.User;
}
const UpdateButton: React.FC<IProps> = ({ state, refreshList }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { runAsync: updateUser, loading: updateUserLoading } = useRequest(postUpdateUser, {
    manual: true,
    debounceWait: 100
  });
  const formRef = useRef<IRefUserForm>(null);

  const handleSubmit = () => {
    formRef.current?.form
      .validateFields()
      .then((data) => {
        updateUser({ ...data, id: state.id })
          .then(() => {
            setShowUpdateModal(false);
            formRef.current?.form.resetFields();
            refreshList?.();
          })
          .catch(noop);
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <Button
        icon={<EditOutlined />}
        size="small"
        onClick={() => {
          setShowUpdateModal(true);
          setTimeout(() => {
            formRef.current?.input?.focus();
          }, 100);
        }}
      >
        编辑
      </Button>
      <Modal
        open={showUpdateModal}
        title="更新用户信息"
        okText="保存"
        cancelText="取消"
        confirmLoading={updateUserLoading}
        onCancel={() => setShowUpdateModal(false)}
        onOk={handleSubmit}
      >
        <UserForm ref={formRef} state={state} />
      </Modal>
    </>
  );
};

export default UpdateButton;
