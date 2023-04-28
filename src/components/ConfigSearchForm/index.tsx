import { SearchType } from '@/hooks/useAntdTableRequest';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import {
  FormProps,
  InputNumberProps,
  RadioGroupProps,
  DatePicker,
  FormInstance,
  SelectProps,
  FormItemProps,
  InputProps,
  DatePickerProps,
  CascaderProps,
  TreeSelectProps,
  Form,
  Row,
  Col,
  Button,
  Input,
  Select,
  Checkbox,
  Radio,
  TreeSelect,
  InputNumber,
  Cascader,
  Typography
} from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';
import type { RangePickerProps } from 'antd/es/date-picker';
import ContentBox from '../ContextBox';
import { useCallback } from 'react';

type FieldPropsMap = {
  input: InputProps;
  select: SelectProps;
  number: InputNumberProps;
  radio: RadioGroupProps;
  date: DatePickerProps;
  dateRange: RangePickerProps;
  checkbox: CheckboxGroupProps;
  cascader: CascaderProps<any>;
  treeSelect: TreeSelectProps;
};

type FieldType = keyof FieldPropsMap;

type FieldValue<T extends FieldType> = {
  type: T;
  name: FormItemProps['name'];
  label: FormItemProps['label'];
  itemProps?: FormItemProps;
  fieldProps?: FieldPropsMap[T];
};

type MapTypeToFieldValue = {
  [P in FieldType]: FieldValue<P>;
};
export type Field = MapTypeToFieldValue[keyof MapTypeToFieldValue];

export interface SearchFormProps<Values = KV>
  extends Omit<FormProps<Values>, 'onReset' | 'onFinish' | 'fields'> {
  title?: string;
  search: SearchType;
  form: FormInstance<Values>;
  fields: Field[];
  onSearch?: (form: FormInstance<Values>) => void;
  onReset?: (form: FormInstance<Values>) => void;
}

// 配置式的搜索表单
const ConfigSearchForm: React.FC<SearchFormProps> = (props) => {
  const { search, form, onSearch, onReset, fields, title = '搜索', ...formProps } = props;

  const getFormItem = useCallback((type: Field['type'], label: any, props: KV) => {
    if (typeof label === 'string' && ['input', 'number', 'select'].includes(type)) {
      // 尝试填充placeholder
      props.placeholder = props?.placeholder || label;
    }
    switch (type) {
      case 'input':
        return <Input {...props} />;
      case 'number':
        return <InputNumber {...props} />;
      case 'select':
        return <Select {...props} />;
      case 'radio':
        return <Radio.Group {...props} />;
      case 'date':
        return <DatePicker {...props} />;
      case 'dateRange':
        return <DatePicker.RangePicker {...props} />;
      case 'checkbox':
        return <Checkbox.Group {...props} />;
      case 'cascader':
        return <Cascader {...props} />;
      case 'treeSelect':
        return <TreeSelect {...props} />;
      default:
        return <></>;
    }
  }, []);

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
    return (
      <Col key={`${name}-${label}`} span={6}>
        <Form.Item name={name} label={label} {...itemProps}>
          {getFormItem(type, label, fieldProps)}
        </Form.Item>
      </Col>
    );
  };

  const renderSearchButton = () => {
    const offset = search.type === 'simple' ? 0 : 18 - (fields.length % 4) * 6;

    return (
      <Col span={6} offset={offset} style={{ textAlign: 'right' }}>
        <Button onClick={handleReset}>重置</Button>
        <Button style={{ margin: '0 8px' }} type="primary" onClick={handleSearch}>
          查询
        </Button>
        {fields.length > 3 && (
          <a style={{ fontSize: 12 }} onClick={search.changeType}>
            {search.type === 'advance' ? <UpOutlined /> : <DownOutlined />}
            {search.type === 'advance' ? '收起' : '展开'}
          </a>
        )}
      </Col>
    );
  };

  if (fields.length === 0) {
    return null;
  }

  return (
    <ContentBox>
      <div>
        <Typography.Title level={5}>{title}</Typography.Title>
      </div>
      <Form form={form} {...{ ...defaultFormProps, ...formProps }}>
        <Row gutter={24}>
          {search.type === 'advance'
            ? fields.map(renderFormItem)
            : fields.slice(0, 3).map(renderFormItem)}

          {renderSearchButton()}
        </Row>
      </Form>
    </ContentBox>
  );
};

export default ConfigSearchForm;
