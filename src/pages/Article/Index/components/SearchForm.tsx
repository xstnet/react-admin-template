import { SearchType } from '@/hooks/useAntdTableRequest';
import { Button, Col, DatePicker, Form, FormInstance, Input, Row } from 'antd';
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
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item name={`subject`} label="主题">
            <Input placeholder="主题" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name={`ahthor`} label="作者">
            <Input placeholder="作者" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name={`create_time`} label="发布时间">
            <DatePicker.RangePicker />
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
