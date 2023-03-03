import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Divider,
  Form,
  Space,
  Table,
  Tag,
  theme,
  Typography,
  Input,
  Col,
  Row,
  Select
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { getUserList } from '@/api';
import { useRequest } from 'ahooks';
import { GenderEnum } from '@/constants/enum';
import { DeleteOutlined, EditOutlined, PlusOutlined, UndoOutlined } from '@ant-design/icons';
import './index.less';
import AddButton from './components/AddButton';
const { Option } = Select;

const AdvancedSearchForm = () => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [expand, setExpand] = useState(false);

  const getFields = () => {
    const count = expand ? 10 : 6;
    const children = [];
    for (let i = 0; i < count; i++) {
      children.push(
        <Col span={6} key={i}>
          <Form.Item
            name={`field-${i}`}
            label={`Field ${i}`}
            rules={[
              {
                required: true,
                message: 'Input something!'
              }
            ]}>
            {i % 3 !== 1 ? (
              <Input placeholder="placeholder" />
            ) : (
              <Select defaultValue="2">
                <Option value="1">1</Option>
                <Option value="2">
                  longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong
                </Option>
              </Select>
            )}
          </Form.Item>
        </Col>
      );
    }
    return children;
  };

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
          <Button
            onClick={() => {
              form.resetFields();
            }}>
            重置
          </Button>
          <Button style={{ margin: '0 8px' }} type="primary" htmlType="submit">
            查询
          </Button>
        </Col>
      </Row>
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
    </Form>
  );
};

type ColumnTYpe = Api.getUserList['response']['list'][number];

const columns: ColumnsType<ColumnTYpe> = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    render: (avatar) => <Avatar src={avatar} />
  },
  {
    title: '账号',
    dataIndex: 'username'
  },

  {
    title: '昵称',
    dataIndex: 'nickname'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    render: (gender) => {
      return gender === GenderEnum.male ? <Tag color="blue">男</Tag> : <Tag color="error">女</Tag>;
    }
  },
  {
    title: '邮箱',
    dataIndex: 'email'
  },
  {
    title: '手机号',
    dataIndex: 'mobile'
  },
  {
    title: '注册时间',
    dataIndex: 'create_time'
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    // width: 100,
    render: () => {
      return (
        <Space>
          <Button icon={<DeleteOutlined />} size="small" danger>
            删除
          </Button>
          <Button icon={<EditOutlined />} size="small">
            编辑
          </Button>
        </Space>
      );
    }
  }
];

const ExampleUserListPage: React.FC = () => {
  console.log('ExampleUserListPage');

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { loading, data: userListData } = useRequest(getUserList);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
      <div className="content-box ">
        <div>
          <Typography.Title level={5}>搜索</Typography.Title>
        </div>
        <AdvancedSearchForm />
      </div>

      <br />
      <div className="content-box ">
        <div className="table-header">
          <div className="left">
            <Typography.Title level={5}>用户列表</Typography.Title>
          </div>
          <div className="right">
            <Space size={'middle'}>
              <Button type="primary" danger disabled={!hasSelected}>
                批量删除
              </Button>
              {<AddButton />}
              <Button type="link" title="点击刷新" icon={<UndoOutlined />} />
            </Space>
          </div>
        </div>
        <Table
          rowKey="id"
          loading={loading}
          rowSelection={rowSelection}
          columns={columns}
          size={'small'}
          pagination={{
            total: userListData?.total,
            hideOnSinglePage: true,
            showTotal: (total, range) => `第${range[0]}-${range[1]} 条/共 ${total} 条`
          }}
          dataSource={userListData?.list}
        />
      </div>
    </>
  );
};

export default ExampleUserListPage;
