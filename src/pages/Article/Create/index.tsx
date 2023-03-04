import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Typography,
  Upload
} from 'antd';

const ArticleCreaetPage: React.FC = () => {
  return (
    <div className="content-box">
      <Typography.Title level={3}>发布文章</Typography.Title>
      <Divider />
      <Form name="createForm" labelCol={{ span: 3 }}>
        <Row gutter={36}>
          <Col span={16}>
            <Form.Item name="title" label="文章标题">
              <Input />
            </Form.Item>
            <Form.Item label="简介" name="description">
              <Input />
            </Form.Item>
            <Form.Item label="内容" name="content">
              <Input.TextArea rows={20} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 3 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  发布文章
                </Button>
                <Button htmlType="submit">保存为草稿</Button>
              </Space>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="封面" name="cover">
              <Upload action="/upload.do" listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item label="标签" name="tags">
              <Select mode="tags" placeholder="文章标签" />
            </Form.Item>
            <Form.Item label="作者" name="author">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ArticleCreaetPage;
