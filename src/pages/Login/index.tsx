import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Cache from '@/utils/cache';
import { parseToken } from '@/utils/jwt';
import { postLogin } from '@/api';
import Config from '@/configs';
import { toDashboardPage } from '@/utils/util';

interface IFormState {
  username: string;
  password: string;
  remember: boolean;
}

const onFinish = async (values: IFormState) => {
  let data = await postLogin(values);
};

const LoginPage: React.FC = () => {
  useEffect(() => {
    const token = Cache.getString(Config.tokenKey);
    if (token) {
      const tokenData = parseToken<TokenData>(token);
      // token 存在 && 含有uid && 未过期
      if (
        tokenData !== undefined &&
        tokenData?.data?.uid > 0 &&
        tokenData.exp > new Date().getTime() / 1000
      ) {
        // 跳转到控制台页, 再通过接口继续判断token的有效性
        toDashboardPage();
      }
    }
  }, []);

  // example: 使用useForm
  // const [form] = useForm<IFormState>();
  // form.validateFields().then(value => {
  //   value.password // xxxx
  // })

  const initialValues: Partial<IFormState> = {
    remember: true,
    username: 'admin',
    password: '123456'
  };
  return (
    <Form<IFormState>
      name="loginForm"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={initialValues}
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
