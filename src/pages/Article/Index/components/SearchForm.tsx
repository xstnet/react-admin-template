import ConfigSearchForm from '@/components/ConfigSearchForm';
import { SearchType } from '@/hooks/useAntdTableRequest';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Row,
  FormProps,
  FormItemProps,
  InputProps
} from 'antd';
import { useState } from 'react';
interface IProps<Values = KV> extends Omit<FormProps<Values>, 'onReset' | 'onFinish'> {
  search: SearchType;
  form: FormInstance<Values>;
  fields: any;
  onSearch?: (form: FormInstance<Values>) => void;
  onReset?: (form: FormInstance<Values>) => void;
}

type Field = {
  type: 'input' | 'select' | 'number' | 'radio';
  name: FormItemProps['name'];
  label: FormItemProps['label'];
  itemProps?: FormItemProps;
  fieldProps?: InputProps;
};

// 弃用
// 使用 ConfigSearchForm;
const SearchForm: React.FC<IProps> = ({ search, form, onSearch, onReset, ...formProps }) => {
  return <ConfigSearchForm search={search} form={form} fields={[]} />;
  // const [expand, setExpand] = useState(false);

  // const handleSearch = async () => {
  //   await form.validateFields().catch((e) => console.warn(e));
  //   onSearch?.(form);
  //   search.submit();
  // };

  // const handleReset = () => {
  //   onReset?.(form);
  //   search.reset();
  // };

  // const defaultFormProps: FormProps = {
  //   labelCol: { span: 5 },
  //   style: { paddingTop: 16 }
  // };

  // return (
  //   <Form form={form} {...{ ...defaultFormProps, ...formProps }}>
  //     <Row gutter={24}>
  //       <Col span={6}>
  //         <Form.Item name={`title`} label="主题">
  //           <Input placeholder="标题" />
  //         </Form.Item>
  //       </Col>
  //       <Col span={6}>
  //         <Form.Item name={`ahthor`} label="作者">
  //           <Input placeholder="作者" />
  //         </Form.Item>
  //       </Col>
  //       <Col span={6}>
  //         <Form.Item name={`ahthor2`} label="作者">
  //           <Input placeholder="作者" />
  //         </Form.Item>
  //       </Col>
  //       <Col span={6}>
  //         <Form.Item name={`create_time`} label="发布时间">
  //           <DatePicker.RangePicker />
  //         </Form.Item>
  //       </Col>

  //       <Col span={6} style={{ textAlign: 'right' }}>
  //         <Button onClick={handleReset}>重置</Button>
  //         <Button style={{ margin: '0 8px' }} type="primary" onClick={handleSearch}>
  //           查询
  //         </Button>
  //       </Col>
  //     </Row>
  //     {/* #region */}
  //     <Row>
  //       <Col span={24} style={{ textAlign: 'right' }}>
  //         <Button
  //           onClick={() => {
  //             form.resetFields();
  //           }}
  //         >
  //           重置
  //         </Button>
  //         <Button style={{ margin: '0 8px' }} type="primary" htmlType="submit">
  //           查询
  //         </Button>
  //         <a
  //           style={{ fontSize: 12 }}
  //           onClick={() => {
  //             setExpand(!expand);
  //           }}
  //         >
  //           {expand ? <UpOutlined /> : <DownOutlined />} {expand ? '收起' : '展开'}
  //         </a>
  //       </Col>
  //     </Row>
  //     {/* #endregion */}
  //   </Form>
  // );
};

export default SearchForm;
