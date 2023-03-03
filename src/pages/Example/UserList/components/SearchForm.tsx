import { SearchType } from '@/hooks/useAntdTableRequest';
import { Button, Col, Form, FormInstance, Input, Row } from 'antd';

interface IProps {
  search: SearchType;
  form: FormInstance;
}
const SearchForm: React.FC<IProps> = ({ search, form }) => {
  // const [expand, setExpand] = useState(false);

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      // labelCol={{ span: 5 }}
      style={{ paddingTop: 16 }}
      onFinish={onFinish}>
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item name={`username`} label="账号">
            <Input placeholder="账号" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name={`mobile`} label="手机号">
            <Input placeholder="手机号" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name={`email`} label="邮箱">
            <Input placeholder="邮箱" />
          </Form.Item>
        </Col>

        <Col span={6} style={{ textAlign: 'right' }}>
          <Button onClick={search.reset}>重置</Button>
          <Button style={{ margin: '0 8px' }} type="primary" onClick={search.submit}>
            查询
          </Button>
        </Col>
      </Row>
      {/* #region */}
      {/* <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button
            onClick={() => {
              form.resetFields();
            }}>
            重置
          </Button>
          <Button style={{ margin: '0 8px' }} type="primary" htmlType="submit">
            查询
          </Button>
          <a
            style={{ fontSize: 12 }}
            onClick={() => {
              setExpand(!expand);
            }}>
            {expand ? <UpOutlined /> : <DownOutlined />} {expand ? '收起' : '展开'}
          </a>
        </Col>
      </Row> */}
      {/* #endregion */}
    </Form>
  );
};

export default SearchForm;
