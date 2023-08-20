import { getArticleDetail, getCategoryTreeList, postUpdateArticle } from '@/api';
import ContentBox from '@/components/ContextBox';
import { PlusOutlined, SendOutlined, SaveOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import {
  Button,
  Divider,
  Form,
  Input,
  Radio,
  Checkbox,
  Select,
  Space,
  Typography,
  Upload,
  TreeSelect
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useRef } from 'react';
import MdEditor, { IEditorRef } from '@/components/MDEditor';

type IFormState = Api.postUpdateArticle['params'];

const ArticleUpdatePage: React.FC = () => {
  const [form] = Form.useForm<IFormState>();
  const editorRef = useRef<IEditorRef>(null);
  const navigate = useNavigate();

  const routeParams = useParams<{ id: S | undefined }>();
  console.log('routeParams', routeParams);

  const { loading: submitLoading, run: updateArticle } = useRequest(postUpdateArticle, {
    manual: true,
    debounceWait: 200,

    onSuccess: () =>
      setTimeout(() => {
        // 清除编辑器草稿
        editorRef.current?.clearDraft();
        navigate('/article/list');
      }, 200)
  });

  const { data: detail, loading: getDetailLoading } = useRequest(
    () => getArticleDetail({ id: Number(routeParams.id) }),
    {
      onSuccess: (data) => {
        const { content, comment_control, cover, ...detail } = data;
        const commentControlRule: N[] = [];
        [1, 2].map((acl) => {
          return comment_control & acl ? commentControlRule.push(acl) : undefined;
        });
        // @ts-ignore
        detail.markdown_content = content.markdown_content;
        form.setFieldsValue({ ...detail, comment_control: commentControlRule });
        editorRef.current?.setMarkdown(content.markdown_content);
      }
    }
  );

  const { data: categoryTree, loading: getCategoryTreeLoading } = useRequest(getCategoryTreeList);

  // 提交
  const handleSubmit = async (isDraft = false) => {
    const formData = await form.validateFields();

    formData.content = editorRef.current?.getHTML() || '';
    // @ts-ignore
    formData.is_draft = isDraft ? 1 : 0;
    formData.id = detail!.id;

    console.log('formData', formData);

    // todo: 清除cache
    updateArticle(formData);
  };

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <ContentBox>
      <Typography.Title level={3}>发布文章</Typography.Title>
      <Divider />
      <Form<IFormState> form={form} name="createForm" labelCol={{ span: 2 }}>
        <Form.Item
          name="title"
          label="文章标题"
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="封面" name="cover" getValueFromEvent={normFile} valuePropName="fileList">
          <Upload maxCount={1} listType="picture-card" accept="image/*">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>选择图片</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="标签" name="tags">
          <Select mode="tags" placeholder="文章标签" style={{ width: 400 }} />
        </Form.Item>
        <Form.Item label="作者" name="author" rules={[{ required: true, message: '请输入作者' }]}>
          <Input style={{ width: 200 }} />
        </Form.Item>

        <Form.Item label="简介" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item label="内容" name="markdown_content">
          <MdEditor ref={editorRef} />
        </Form.Item>

        <Form.Item
          name="category_id"
          label="分类"
          rules={[{ required: true, message: '请选择分类!' }]}
        >
          <TreeSelect
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="请选择分类"
            fieldNames={{ label: 'name', value: 'id' }}
            allowClear
            treeDefaultExpandAll
            loading={getCategoryTreeLoading}
            treeData={categoryTree}
          />
        </Form.Item>

        <Form.Item name="status" label="状态" initialValue={200}>
          <Radio.Group>
            <Radio value={200}>显示</Radio>
            <Radio value={900}>不显示</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="comment_control" label="评论控制" initialValue={[1, 2]}>
          <Checkbox.Group
            options={[
              { label: '显示评论', value: 1 },
              { label: '允许评论', value: 2 }
            ]}
          />
        </Form.Item>

        <Form.Item label="来源" name="source">
          <Input style={{ width: 200 }} />
        </Form.Item>
        <Form.Item label="排序" name="sort_value">
          <Input style={{ width: 200 }} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 3 }}>
          <Space>
            <Button
              icon={<SendOutlined />}
              onClick={() => handleSubmit()}
              loading={submitLoading}
              type="primary"
            >
              更新
            </Button>
            <Button
              icon={<SaveOutlined />}
              loading={submitLoading}
              onClick={() => handleSubmit(true)}
            >
              保存为草稿
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </ContentBox>
  );
};

export default ArticleUpdatePage;
