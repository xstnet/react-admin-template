import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import Cache from '@/utils/cache';
import { validateToken } from '@/utils/jwt';
import { postLogin } from '@/api';
import { toDashboardPage } from '@/utils/util';
import { useRequest } from 'ahooks';

interface IFormState {
  username: string;
  password: string;
  remember: boolean;
}

const LoginPage: React.FC = () => {
  const { loading: loginRuning, run: submit } = useRequest(postLogin, {
    manual: true,
    debounceWait: 300,
    onSuccess: (data) => {
      Cache.setToken(data.token);
      toDashboardPage();
    }
  });

  const onFinish = (values: IFormState) => {
    submit(values);
    // postLogin(values)
    //   .then((data) => {
    //     Cache.setToken(data.token);
    //     toDashboardPage();
    //   })
    //   .catch((e) => 1);
  };

  useEffect(() => {
    if (validateToken()) {
      // 跳转到控制台页, 再通过接口继续判断token的有效性
      toDashboardPage();
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
        <Button loading={loginRuning} type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
