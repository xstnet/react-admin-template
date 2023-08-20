import { getCategoryTreeList, postCreateCategory, postUpdateCategory } from '@/api';
import ContentBox from '@/components/ContextBox';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Space,
  Spin,
  Tree,
  TreeProps,
  TreeSelect,
  Typography
} from 'antd';
import { useState } from 'react';

interface IFormState {
  name: S;
  id?: N;
  sort_value: N;
  status: N;
  parent_id: N;
}

const ArticleCategoryPage: React.FC = () => {
  const {
    data: treeList,
    loading: getTreeListLoading,
    refresh: refreshCategoryList
  } = useRequest(getCategoryTreeList);
  const [form] = Form.useForm<IFormState>();

  const [detail, setDetail] = useState<IFormState>();

  const { loading: createLoading, run: createCategory } = useRequest(postCreateCategory, {
    manual: true,
    onSuccess: () => refreshCategoryList()
  });
  const { loading: updateLoading, run: updateCategory } = useRequest(postUpdateCategory, {
    manual: true,
    onSuccess: () => refreshCategoryList()
  });

  const handleSelect: TreeProps['onSelect'] = (_, info) => {
    const detail = info.node as never as Api.CategoryTreeItem;
    setDetail(detail);
    form.setFieldsValue(detail);
  };

  const handleCreate = async () => {
    const formData = await form.validateFields();
    createCategory(formData as any);
  };

  const handleUpdate = async () => {
    const formData = await form.validateFields();
    updateCategory({ ...formData, id: detail!.id! });
  };
  return (
    <ContentBox>
      <Typography.Title level={3}>分类管理</Typography.Title>
      <Divider />
      <Spin spinning={getTreeListLoading} tip="正在加载分类数据, 请稍后...">
        <Row gutter={24}>
          <Col span={8}>
            <Tree
              blockNode
              defaultExpandAll
              onSelect={handleSelect}
              fieldNames={{ title: 'name', key: 'id', children: 'children' }}
              // @ts-ignore
              treeData={treeList}
            />
          </Col>
          <Col span={16}>
            <Form<IFormState>
              name="categoryForm"
              form={form}
              labelCol={{ span: 4 }}
              initialValues={{ sort_value: 100 }}
            >
              <Form.Item
                label="所属分类"
                name="parent_id"
                rules={[{ required: true, message: '清选择所属分类' }]}
              >
                <TreeSelect
                  fieldNames={{ label: 'name', value: 'id' }}
                  treeData={[{ name: '一级分类', id: 0 }, ...((treeList || []) as [])]}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="请选择所属分类"
                  allowClear
                />
              </Form.Item>

              <Form.Item
                label="分类名称"
                name="name"
                rules={[{ required: true, message: '请输入分类名称' }]}
              >
                <Input style={{ width: 200 }} placeholder="请输入分类名称" />
              </Form.Item>
              <Form.Item label="排序" name="sort_value">
                <Input type="number" style={{ width: 200 }} />
              </Form.Item>
              <Form.Item name="status" label="状态" initialValue={200}>
                <Radio.Group>
                  <Radio value={200}>显示</Radio>
                  <Radio value={900}>不显示</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 3 }}>
                <Space>
                  <Button
                    icon={<SaveOutlined />}
                    disabled={detail === undefined}
                    onClick={handleUpdate}
                    loading={updateLoading}
                    type="primary"
                  >
                    保存修改
                  </Button>
                  <Button icon={<PlusOutlined />} loading={createLoading} onClick={handleCreate}>
                    添加为新分类
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Spin>
    </ContentBox>
  );
};

export default ArticleCategoryPage;
