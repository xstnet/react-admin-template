import React, { useEffect } from 'react';
import { Button, Checkbox, Col, ConfigProvider, Form, Input, Row, theme, Typography } from 'antd';
import Cache from '@/utils/cache';
import { validateToken } from '@/utils/jwt';
import { postLogin } from '@/api';
import { useRequest } from 'ahooks';
import './index.less';
import Config from '@/configs';
import { useNavigate } from 'react-router-dom';

interface IFormState {
  username: string;
  password: string;
  remember: boolean;
}

// todo: dark theme 适配
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loading: loginRuning, run: submit } = useRequest(postLogin, {
    manual: true,
    debounceWait: 300,
    onSuccess: (data) => {
      Cache.setToken(data.token);
      navigate('/dashboard');
    }
  });

  document.title = Config.pageTitle;

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
      navigate('/dashboard');
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
    <>
      <ConfigProvider
        theme={{
          algorithm: [theme.defaultAlgorithm]
        }}
      >
        <div className="bg-wrap"></div>
        <Row className="login-wrap">
          <Col span={15} className="login-banner"></Col>
          <Col span={9} className="login-form-wrap">
            <Typography.Title style={{ textAlign: 'center' }}>后台管理系统</Typography.Title>
            <br />
            <Form<IFormState>
              name="loginForm"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 19 }}
              style={{ maxWidth: 600 }}
              initialValues={initialValues}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: '请输入用户名!' }]}
              >
                <Input placeholder="admin" />
              </Form.Item>

              <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
              >
                <Input.Password placeholder="123456" />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 5 }}>
                <Checkbox>记住我</Checkbox>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                <Button loading={loginRuning} type="primary" htmlType="submit">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </ConfigProvider>
    </>
  );
};

export default LoginPage;
