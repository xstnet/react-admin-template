import React, { useEffect, useState } from 'react';
import { Avatar, Button, Divider, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getExmpleUserList } from '@/api';
import { useRequest } from 'ahooks';
import { GenderEnum } from '@/constants/enum';
import { DeleteOutlined, EditOutlined, PlusOutlined, UndoOutlined } from '@ant-design/icons';
import './index.less';

type ColumnTYpe = Api.getExmpleUserList['response']['list'][number];

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
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { loading, data: userListData } = useRequest(getExmpleUserList);

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
    <div>
      <div>
        <Typography.Title level={5}>查询表格</Typography.Title>
      </div>
      <Divider />
      <div className="table-header">
        <div className="left">
          <Button type="primary" danger disabled={!hasSelected} loading={loading}>
            批量删除
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `已选择 ${selectedRowKeys.length} 项` : ''}
          </span>
        </div>
        <div className="right">
          <Space size={'middle'}>
            <Button type="primary" icon={<PlusOutlined />} disabled={!hasSelected}>
              新增用户
            </Button>
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
          hideOnSinglePage: true
        }}
        dataSource={userListData?.list}
      />
    </div>
  );
};

export default ExampleUserListPage;
