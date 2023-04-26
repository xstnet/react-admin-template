import { useState } from 'react';
import { SearchType } from '@/hooks/useAntdTableRequest';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import {
  FormProps,
  InputNumberProps,
  RadioProps,
  DatePicker,
  FormInstance,
  SelectProps,
  FormItemProps,
  InputProps,
  DatePickerProps,
  CheckboxProps,
  CascaderProps,
  TreeSelectProps,
  InputNumber,
  Cascader
} from 'antd';
import { Form, Row, Col, Button, Input, Select, Checkbox, Radio, TreeSelect } from 'antd';
type RangePickerProps = typeof DatePicker.RangePicker;

type FieldType =
  | 'input'
  | 'select'
  | 'number'
  | 'radio'
  | 'date'
  | 'dateRange'
  | 'checkbox'
  | 'cascader'
  | 'treeSelect';

type FieldPropsMap = {
  input: InputProps;
  select: SelectProps;
  number: InputNumberProps;
  radio: RadioProps;
  date: DatePickerProps;
  dateRange: RangePickerProps;
  checkbox: CheckboxProps;
  cascader: CascaderProps<any>;
  treeSelect: TreeSelectProps;
};

type FieldValue<T extends FieldType> = {
  type: T;
  name: FormItemProps['name'];
  label: FormItemProps['label'];
  itemProps?: FormItemProps;
  fieldProps?: T extends keyof FieldPropsMap ? FieldPropsMap[T] : any;
};

type MapTypeToFieldValue = {
  [P in FieldType]: FieldValue<P>;
};
export type Field = MapTypeToFieldValue[keyof MapTypeToFieldValue];

export interface SearchFormProps<Values = KV>
  extends Omit<FormProps<Values>, 'onReset' | 'onFinish' | 'fields'> {
  search: SearchType;
  form: FormInstance<Values>;
  fields: Field[];
  onSearch?: (form: FormInstance<Values>) => void;
  onReset?: (form: FormInstance<Values>) => void;
}

// 配置式的搜索表单
const ConfigSearchForm: React.FC<SearchFormProps> = (props) => {
  const { search, form, onSearch, onReset, fields, ...formProps } = props;

  const [expand, setExpand] = useState(false);

  const handleSearch = async () => {
    await form.validateFields().catch((e) => console.warn(e));
    onSearch?.(form);
    search.submit();
  };

  const handleReset = () => {
    onReset?.(form);
    search.reset();
  };

  const defaultFormProps: FormProps = {
    labelCol: { span: 5 },
    style: { paddingTop: 16 }
  };

  const renderFormItem = ({ type, name, label, fieldProps = {}, itemProps = {} }: Field) => {
    const FormItem = (type: Field['type'], props: any) => {
      switch (type) {
        case 'input':
          return <Input {...props} />;
        case 'number':
          return <InputNumber width={'100%'} {...props} />;
        case 'select':
          return <Select {...props} />;
        case 'radio':
          return <Radio {...props} />;
        case 'date':
          return <DatePicker {...props} />;
        case 'dateRange':
          return <DatePicker.RangePicker {...props} />;
        case 'checkbox':
          return <Checkbox {...props} />;
        case 'cascader':
          return <Cascader {...props} />;
        case 'treeSelect':
          return <TreeSelect {...props} />;
        default:
          return <></>;
      }
    };
    return (
      <Col key={`${name}-${label}`} span={6}>
        <Form.Item name={name} label={label} {...itemProps}>
          {FormItem(type, fieldProps)}
        </Form.Item>
      </Col>
    );
  };

  const renderSearchButton = () => {
    const offset = search.type === 'simple' ? 0 : 18 - (fields.length % 4) * 6;
    console.log('offffff', offset);

    return (
      <Col span={6} offset={offset} style={{ textAlign: 'right' }}>
        <Button onClick={handleReset}>重置</Button>
        <Button style={{ margin: '0 8px' }} type="primary" onClick={handleSearch}>
          查询
        </Button>
        <a style={{ fontSize: 12 }} onClick={search.changeType}>
          {search.type === 'advance' ? <UpOutlined /> : <DownOutlined />}
          {search.type === 'advance' ? '收起' : '展开'}
        </a>
      </Col>
    );
  };

  return (
    <Form form={form} {...{ ...defaultFormProps, ...formProps }}>
      <Row gutter={24}>
        {search.type === 'advance'
          ? fields.map(renderFormItem)
          : fields.slice(0, 3).map(renderFormItem)}

        {renderSearchButton()}
      </Row>
    </Form>
  );
};

export default ConfigSearchForm;
