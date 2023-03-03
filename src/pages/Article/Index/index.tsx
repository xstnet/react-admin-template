import React, { useEffect, useMemo, useRef } from 'react';
import { Image, Button, Form, Popconfirm, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getArticleList, postDeleteArticle } from '@/api';
import { DeleteOutlined, EditOutlined, PlusOutlined, UndoOutlined } from '@ant-design/icons';
import AddButton from './components/AddButton';
import SearchForm from './components/SearchForm';
import useAntdTableRequest from '@/hooks/useAntdTableRequest';
import { useRequest } from 'ahooks';
import UpdateButton from './components/UpdateButton';
import './index.less';
import { Link, useNavigate } from 'react-router-dom';

const ArticleIndexPage: React.FC = () => {
  console.log('render ArticleIndexPage');

  const [searchForm] = Form.useForm();
  // 每一行的loading, 如: 同时操作多行时, 并且延迟较高, 应该有多个loading效果
  const loadingRows = useRef<Map<number, boolean>>();

  const navigate = useNavigate();

  useEffect(() => {
    // 只需赋值一次就行
    loadingRows.current = new Map();
  }, []);

  const { runAsync: deleteArticle } = useRequest(postDeleteArticle, {
    manual: true,
    debounceWait: 100
  });

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
        title: '主题',
        dataIndex: 'subject'
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
      </div>
    </>
  );
};

export default ArticleIndexPage;
