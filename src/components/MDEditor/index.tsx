import { useEffect, useRef, forwardRef, useImperativeHandle, useContext, useState } from 'react';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor/dist/i18n/zh-cn';
// @ts-ignore
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all';
import { debounce, noop } from '@/utils/util';
import { useUpdateEffect } from 'ahooks';
import { SettingContext } from '@/contexts/Setting';
import React from 'react';
type IProps = {
  height?: N;
  // 通过 onChange 获取到的内容类型
  contentType?: 'markdown' | 'html';
  // antd form 自定义控件
  value?: S;
  // antd form 自定义控件
  onChange?: (value: string, editType: 'markdown' | 'wysiwyg' | AnyString) => void;
};

export type IEditor = Editor;

// todo: 全屏

export interface IEditorRef {
  // 编辑器实例
  editor?: Editor;
  // div 容器
  container?: HTMLDivElement;
  // 快捷方法
  getMarkdown: () => void;
  getHTML: () => S;
  setMarkdown: (value: S) => void;
  // 清除草稿箱
  clearDraft: () => void;
}
const MdEditor = forwardRef<IEditorRef, IProps>((props, ref) => {
  const draftKey = `MdEditorDraft`;
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Editor>();
  const { height = 600, value = '', onChange = noop, contentType = 'markdown' } = props;
  const {
    settings: { theme }
  } = useContext(SettingContext);

  // 传递ref
  useImperativeHandle(
    ref,
    () => ({
      editor: editorRef.current,
      container: containerRef.current || undefined,
      getMarkdown: () => editorRef.current?.getMarkdown() || '',
      getHTML: () => editorRef.current?.getHTML() || '',
      clearDraft: () => {
        localStorage.removeItem(draftKey);
      },
      setMarkdown: (value: S) => {
        editorRef.current?.setMarkdown(value);
      }
    }),
    [editorRef.current, containerRef.current]
  );

  useUpdateEffect(() => {
    console.log('is forucs', editorRef.current!.getSelection());
  }, [value]);

  const createEditor = () => {
    return new Editor({
      initialValue: value,
      height: `${height}px`,
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      plugins: [codeSyntaxHighlight],
      language: 'zh-CN',
      previewHighlight: true,
      frontMatter: true,
      // useCommandShortcut: true,
      // 粘贴url时自动转化为链接
      extendedAutolinks: true,
      el: containerRef.current!,
      hideModeSwitch: true,
      theme: theme === 'dark' ? 'dark' : undefined
    });
  };

  // 增加 防抖
  const handleChange = debounce((editType: string) => {
    const isMarkdown = contentType === 'markdown';
    const content = isMarkdown
      ? editorRef.current?.getMarkdown() || ''
      : editorRef.current?.getHTML() || '';
    onChange(content, editType);
  }, 500);

  // 初始化编辑器
  // 添加image事件
  // 定时缓存
  useEffect(() => {
    editorRef.current = createEditor();

    editorRef.current.addHook(
      'addImageBlobHook',
      (blob: File, cb: (url: S, alt: S) => void, triggerType: 'ui' | 'paste') => {
        const imageDescriptionInput = document.getElementById(
          'toastuiAltTextInput'
        ) as HTMLInputElement;

        // tui.editor 没有传递 altText, 只能从html中获取
        const altText = imageDescriptionInput?.value || 'image';
        // 自定义图片处理
        // 目前转化为base64, 也可以上传文件, 然后调用cb返回url
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64String = event.target?.result as string;
          console.log('Base64 encoded string:', base64String);
          cb(base64String, altText);
        };
        reader.readAsDataURL(blob);
      }
    );
    editorRef.current.eventEmitter.listen('change', handleChange);

    // 缓存本地
    let saveDraftHandle = setInterval(() => {
      if (!editorRef.current) {
        return;
      }
      const mdContent = editorRef.current.getMarkdown();
      localStorage.setItem(draftKey, mdContent);
      console.log('已保存到草稿箱!');
    }, 15 * 1000);

    const mdContent = localStorage.getItem(draftKey);
    if (mdContent) {
      editorRef.current?.setMarkdown(mdContent);
      console.log('已从草稿箱加载数据!');
    }

    return () => {
      if (saveDraftHandle) {
        clearInterval(saveDraftHandle);
      }
    };
  }, []);

  // 更新主题
  useUpdateEffect(() => {
    const content = editorRef.current?.getMarkdown();
    editorRef.current?.destroy();
    editorRef.current = createEditor();
    editorRef.current.setMarkdown(content || '');
  }, [theme]);

  // Change value
  useUpdateEffect(() => {
    editorRef.current?.setMarkdown(value);
  }, [value]);
  return <div style={{ backgroundColor: '#fff' }} ref={containerRef}></div>;
});

export default React.memo(MdEditor, (prev, next) => {
  // value 改变不刷新, 这会导致 编辑器的Selection变成最后一个
  // value 一般很长, 先比较长度是否一致, 在进行全量比较
  if (prev.value?.length !== next.value?.length) {
    return true;
  }
  if (prev.value !== next.value) {
    return true;
  }

  // 其他属性改变重新render
  // 这里还有一个问题, 当value和其他属性同时改变时, 就被上面拦截了, 现在没这个场景, 遇到了再改
  return false;
});
