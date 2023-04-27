import React, { useMemo, useRef } from 'react';
import { Image, Button, Form, Popconfirm, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getArticleList, postDeleteArticle } from '@/api';
import { DeleteOutlined, EditOutlined, PlusOutlined, UndoOutlined } from '@ant-design/icons';
import useAntdTableRequest from '@/hooks/useAntdTableRequest';
import { useRequest } from 'ahooks';
import './index.less';
import { Link } from 'react-router-dom';
import ContentBox from '@/components/ContextBox';
import ConfigSearchForm, { SearchFormProps } from '@/components/ConfigSearchForm';

const ArticleIndexPage: React.FC = () => {
  console.log('render ArticleIndexPage');

  // 每一行的loading, 如: 同时操作多行时, 并且延迟较高, 应该有多个loading效果
  const loadingRows = useRef<Map<number, boolean>>(new Map());

  const { runAsync: deleteArticle } = useRequest(postDeleteArticle, {
    manual: true,
    debounceWait: 100
  });

  const [searchForm] = Form.useForm();

  const {
    refresh: handleRefresh,
    tableProps,
    search
  } = useAntdTableRequest(getArticleList, { form: searchForm }); // 将 searchForm 和 hooks进行绑定

  const handleDelete = (id: number) => {
    loadingRows?.current?.set(id, true);
    deleteArticle({ id })
      .then(handleRefresh)
      .finally(() => loadingRows?.current?.delete(id));
  };

  const columns: ColumnsType<Api.getArticleList['response']['list'][number]> = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id'
      },
      {
        title: '封面',
        dataIndex: 'cover',
        render: (cover) => <Image width={80} height={45} style={{ borderRadius: 4 }} src={cover} />
      },
      {
        title: '标题',
        dataIndex: 'title'
      },

      {
        title: '简介',
        dataIndex: 'description'
      },

      {
        title: '作者',
        dataIndex: 'author'
      },

      {
        title: '发布时间',
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
              <Link to={`/article/update/${id}`}>
                <Button icon={<EditOutlined />} size="small">
                  编辑
                </Button>
              </Link>
            </Space>
          );
        }
      }
    ],
    []
  );

  const searchFields: SearchFormProps['fields'] = [
    {
      type: 'input',
      label: '标题',
      name: 'title'
    },
    {
      type: 'input',
      label: '作者',
      name: 'author'
    },
    {
      type: 'input',
      label: '简介',
      name: 'desc'
    },

    {
      type: 'radio',
      label: '单选',
      name: 'radio',
      fieldProps: {
        options: [
          { label: '1111', value: '222' },
          { label: '2222', value: '333' }
        ]
      }
    },
    {
      type: 'checkbox',
      label: '多选',
      name: 'checkbox',
      fieldProps: {
        options: [
          { label: '1111', value: '2223452' },
          { label: '1111', value: '2222' },
          { label: '1111', value: '222' }
        ]
      }
    },

    {
      type: 'select',
      label: '状态',
      name: 'status',
      fieldProps: {
        options: [
          { label: '已发布', value: 'published' },
          { label: '草稿', value: 'draft' }
        ]
      }
    },
    {
      type: 'dateRange',
      label: '发布时间',
      name: 'create_time'
    }
  ];

  return (
    <>
      <ConfigSearchForm search={search} form={searchForm} fields={searchFields} title="查询" />
      <br />
      <ContentBox>
        <div className="table-header">
          <div className="left">
            <Typography.Title level={5}>文章列表</Typography.Title>
          </div>
          <div className="right">
            <Space size={'middle'}>
              <Link to="/article/create">
                <Button type="primary" icon={<PlusOutlined />}>
                  发布文章
                </Button>
              </Link>

              <Button
                type="link"
                title="点击刷新"
                onClick={handleRefresh}
                icon={<UndoOutlined />}
              />
            </Space>
          </div>
        </div>
        <Table rowKey="id" columns={columns} {...tableProps} />
      </ContentBox>
    </>
  );
};

export default ArticleIndexPage;
