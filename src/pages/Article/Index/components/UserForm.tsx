import { Input, Radio, Form, FormInstance } from 'antd';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import type { InputRef } from 'antd';

type IFormState = Omit<Model.User, 'id'>;
export type IRefUserForm = { form: FormInstance<IFormState>; input: InputRef | null };

interface IProps {
  state?: IFormState;
}

const UserForm = forwardRef<IRefUserForm, IProps>(({ state }, ref) => {
  const [form] = Form.useForm<IFormState>();
  const inputRef = useRef<InputRef>(null);
  useImperativeHandle(
    ref,
    () => ({
      form: form,
      input: inputRef.current
    }),
    [form, inputRef]
  );

  return (
    <div>
      <Form form={form} labelCol={{ span: 3 }} name="userForm" initialValues={state || undefined}>
        <Form.Item name="username" label="账号" rules={[{ required: true, message: '请输入账号' }]}>
          <Input ref={inputRef} />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: !state, message: '请输入密码' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item name="nickname" label="昵称" rules={[{ required: true, message: '请输入昵称' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="gender" label="性别">
          <Radio.Group>
            <Radio value={1}>男</Radio>
            <Radio value={2}>女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="mobile" label="手机号">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="邮箱">
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
});

export default UserForm;
