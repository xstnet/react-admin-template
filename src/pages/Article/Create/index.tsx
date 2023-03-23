import { postCreateArticle } from '@/api';
import ContentBox from '@/components/ContextBox';
import Cache from '@/utils/cache';
import { PlusOutlined, SendOutlined, SaveOutlined } from '@ant-design/icons';
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
  Typography,
  Upload
} from 'antd';
import { useNavigate } from 'react-router-dom';

const ArticleCreaetPage: React.FC = () => {
  const [form] = Form.useForm<Model.Article>();
  const navigate = useNavigate();
  const draftKey = 'articleDraft';
  const { loading: submitLoading, run: createArticle } = useRequest(postCreateArticle, {
    manual: true,
    debounceWait: 200,

    onSuccess: () =>
      setTimeout(() => {
        Cache.remove(draftKey);
        navigate('/article/list');
      }, 200)
  });

  const articleDraftData = Cache.getObject(draftKey) || {};
  const handleSubmit = async () => {
    const formData = await form.validateFields();
    createArticle(formData);
  };

  const handleSaveDraft = () => {
    const { cover, ...saveData } = form.getFieldsValue();
    Cache.set(draftKey, saveData);
    message.success('已保存到草稿箱');
  };

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <ContentBox>
      <Typography.Title level={3}>发布文章</Typography.Title>
      <Divider />
      <Form<Model.Article>
        form={form}
        name="createForm"
        labelCol={{ span: 3 }}
        initialValues={articleDraftData}
      >
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
                  发布文章
                </Button>
                <Button icon={<SaveOutlined />} onClick={handleSaveDraft}>
                  保存为草稿
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
    </ContentBox>
  );
};

export default ArticleCreaetPage;
