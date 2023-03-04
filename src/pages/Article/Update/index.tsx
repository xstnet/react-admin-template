import { getArticleDetail, postUpdateArticle } from '@/api';
import { PlusOutlined, SendOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Spin,
  Typography,
  Upload
} from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ArticleUpdatePage: React.FC = () => {
  const [form] = Form.useForm<Model.Article>();
  const navigate = useNavigate();
  const searchParams = useParams<{ id: string }>();

  const { loading: getDetailLoading, run: getDetail } = useRequest(getArticleDetail, {
    manual: true,
    debounceWait: 10,
    onSuccess: (data) => form.setFieldsValue(data)
  });

  useEffect(() => {
    getDetail({ id: searchParams.id as unknown as number });
  }, [searchParams.id]);

  const { loading: submitLoading, run: createArticle } = useRequest(postUpdateArticle, {
    manual: true,
    debounceWait: 200,
    onSuccess: () =>
      setTimeout(() => {
        navigate('/article/list');
      }, 200)
  });

  const handleSubmit = async () => {
    const formData = await form.validateFields();
    createArticle(formData);
  };

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div className="content-box">
      <Typography.Title level={3}>更新文章</Typography.Title>
      <Divider />
      <Spin spinning={getDetailLoading}>
        <Form form={form} name="createForm" labelCol={{ span: 3 }}>
          <Row gutter={36}>
            <Col span={16}>
              <Form.Item
                name="title"
                label="文章标题"
                rules={[{ required: true, message: '请输入标题' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="简介" name="description">
                <Input />
              </Form.Item>
              <Form.Item
                label="内容"
                name="content"
                rules={[{ required: true, message: '请输入内容' }]}
              >
                <Input.TextArea rows={20} />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 3 }}>
                <Space>
                  <Button
                    icon={<SendOutlined />}
                    onClick={handleSubmit}
                    loading={submitLoading}
                    type="primary"
                  >
                    保存
                  </Button>
                </Space>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="封面"
                name="cover"
                getValueFromEvent={normFile}
                valuePropName="fileList"
              >
                <Upload maxCount={1} listType="picture-card">
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>选择图片</div>
                  </div>
                </Upload>
              </Form.Item>
              <Form.Item label="标签" name="tags">
                <Select mode="tags" placeholder="文章标签" />
              </Form.Item>
              <Form.Item
                label="作者"
                name="author"
                rules={[{ required: true, message: '请输入作者' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </div>
  );
};

export default ArticleUpdatePage;
