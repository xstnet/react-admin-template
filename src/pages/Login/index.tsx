import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Cache from '@/utils/cache';
import { useNavigate } from 'react-router-dom';
import { parseToken } from '@/utils/jwt';

interface IFormState {
  username: string;
  password: string;
  remember: boolean;
}

const onFinish = (values: IFormState) => {
  console.log('Success:', values);
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cache.getString('token');
    if (token) {
      const tokenData = parseToken<TokenUserInfoType>(token);
      // token 存在 && 含有uid && 未过期
      if (
        tokenData !== undefined &&
        tokenData?.data?.uid > 0 &&
        tokenData.exp > new Date().getTime() / 1000
      ) {
        navigate('/dashboard');
      }
    }
  }, []);
  // example: 使用useForm
  // const [form] = useForm<IFormState>();
  // form.validateFields().then(value => {
  //   value.password // xxxx
  // })
  return (
    <Form<IFormState>
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off">
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: '请输入用户名!' }]}>
        <Input placeholder="admin" />
      </Form.Item>

      <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码!' }]}>
        <Input.Password placeholder="123456" />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8 }}>
        <Checkbox>记住我</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
