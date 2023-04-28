import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Avatar, Button, Form, Popconfirm, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getUserList, postDeleteUser } from '@/api';
import { GenderEnum } from '@/constants/enum';
import { DeleteOutlined, UndoOutlined } from '@ant-design/icons';
import './index.less';
import AddButton from './components/AddButton';
import useAntdTableRequest from '@/hooks/useAntdTableRequest';
import { useRequest } from 'ahooks';
import UpdateButton from './components/UpdateButton';
import ContentBox from '@/components/ContextBox';
import ConfigSearchForm, { SearchFormProps } from '@/components/ConfigSearchForm';

const ExampleUserListPage: React.FC = () => {
  console.log('render ExampleUserListPage');

  const [searchForm] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // 每一行的loading, 如: 同时操作多行时, 并且延迟较高, 应该有多个loading效果
  const loadingRows = useRef<Map<number, boolean>>();

  useEffect(() => {
    // 只需赋值一次就行
    loadingRows.current = new Map();
  }, []);

  const { runAsync: deleteUser, loading: deleteUserLoading } = useRequest(postDeleteUser, {
    manual: true,
    debounceWait: 100
  });

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

  const handleDelete = (id: number | number[]) => {
    if (typeof id === 'number') {
      loadingRows?.current?.set(id, true);
    }
    deleteUser({ id })
      .then(() => {
        typeof id === 'object' && setSelectedRowKeys([]);
        handleRefresh();
      })
      .finally(() => typeof id === 'number' && loadingRows?.current?.delete(id));
  };

  const columns: ColumnsType<Api.getUserList['response']['list'][number]> = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id'
      },
      {
        title: '账号',
        dataIndex: 'username',
        render: (_, { avatar, username }) => (
          <>
            {' '}
            <Avatar src={avatar} /> {username}
          </>
        )
      },

      {
        title: '昵称',
        dataIndex: 'nickname'
      },
      {
        title: '性别',
        dataIndex: 'gender',
        render: (gender) => {
          return gender === GenderEnum.male ? (
            <Tag color="blue">男</Tag>
          ) : (
            <Tag color="error">女</Tag>
          );
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
        render: (_, record) => {
          const { id } = record;

          return (
            <Space>
              <Popconfirm title="确认要删除这条数据吗?" onConfirm={() => handleDelete(id)}>
                <Button
                  loading={loadingRows?.current?.has(id)}
                  icon={<DeleteOutlined />}
                  size="small"
                  danger
                >
                  删除
                </Button>
              </Popconfirm>
              <UpdateButton state={record} refreshList={handleRefresh} />
            </Space>
          );
        }
      }
    ],
    []
  );

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };
  const hasSelected = selectedRowKeys.length > 0;

  const searchFields: SearchFormProps['fields'] = [
    {
      type: 'input',
      label: '账号',
      name: 'username'
    },
    {
      type: 'input',
      label: '手机号',
      name: 'mobile'
    },
    {
      type: 'input',
      label: '邮箱',
      name: 'email'
    },
    {
      type: 'select',
      label: '性别',
      name: 'gender',
      fieldProps: {
        options: [
          { label: '男', value: '1' },
          { label: '女', value: '2' }
        ]
      }
    }
  ];

  return (
    <>
      <ConfigSearchForm form={searchForm} search={search} fields={searchFields} />
      <br />
      <ContentBox>
        <div className="table-header">
          <div className="left">
            <Typography.Title level={5}>用户列表</Typography.Title>
          </div>
          <div className="right">
            <Space size={'middle'}>
              <Popconfirm
                title={`确定要删除这${selectedRowKeys.length}条数据吗?`}
                onConfirm={() => handleDelete(selectedRowKeys as number[])}
              >
                <Button
                  type="primary"
                  danger
                  disabled={!hasSelected}
                  loading={deleteUserLoading && loadingRows.current?.size === 0}
                >
                  批量删除
                </Button>
              </Popconfirm>
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
        <Table rowKey="id" rowSelection={rowSelection} columns={columns} {...tableProps} />
      </ContentBox>
    </>
  );
};

export default ExampleUserListPage;
