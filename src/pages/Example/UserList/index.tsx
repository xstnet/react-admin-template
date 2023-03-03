import React, { useEffect, useState } from 'react';
import { Avatar, Button, Form, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getUserList } from '@/api';
import { GenderEnum } from '@/constants/enum';
import { DeleteOutlined, EditOutlined, UndoOutlined } from '@ant-design/icons';
import './index.less';
import AddButton from './components/AddButton';
import SearchForm from './components/SearchForm';
import useAntdTableRequest from '@/hooks/useAntdTableRequest';

const columns: ColumnsType<Api.getUserList['response']['list'][number]> = [
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
    dataIndex: 'mobile',
    sorter: true
  },
  {
    title: '注册时间',
    dataIndex: 'create_time',
    sorter: true
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
  console.log('render ExampleUserListPage');

  const [searchForm] = Form.useForm();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const {
    refresh: handleRefresh,
    tableProps,
    search
  } = useAntdTableRequest(getUserList, { form: searchForm }); // 将 searchForm 和 hooks进行绑定

  // useAntdTable 提供了 refreshDeps 来实现刷新并回到第一页, 但这里没有依赖, 为了刷新再创建一个依赖不值得
  // 通过他提供的 search, 也能实现相应的效果
  // 如果只需要刷新当前页, 比如修改信息之后, 调用上面的 handleRefresh 就行, 这个是 useRequest提供的
  const handleRefreshAndReset = () => {
    search.reset();
    search.submit();
  };

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
        <SearchForm search={search} form={searchForm} />
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
              {<AddButton refreshList={handleRefreshAndReset} />}
              <Button
                type="link"
                title="点击刷新"
                onClick={handleRefresh}
                icon={<UndoOutlined />}
              />
            </Space>
          </div>
        </div>
        <Table<> rowKey="id" rowSelection={rowSelection} columns={columns} {...tableProps} />
      </div>
    </>
  );
};

export default ExampleUserListPage;
