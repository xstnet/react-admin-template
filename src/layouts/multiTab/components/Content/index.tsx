import { MenuContext } from '@/contexts/Menu';
import { MultitabContext } from '@/contexts/Multitab';
import useThemeToken from '@/hooks/useThemeToken';
import Breadcrumb from '@/layouts/components/Breadcrumb';
import { iframeUrlPrefix } from '@/utils/iframe';
import { useFullscreen } from 'ahooks';
import { Layout } from 'antd';
import React, { PropsWithChildren, useContext, useEffect, useRef } from 'react';
import { useLocation, useMatches, useSearchParams } from 'react-router-dom';
import KeepAlive from '../KeepAlive';
import Tabs from '../Tabs';
import './index.less';

const Content: React.FC<PropsWithChildren> = ({ children }) => {
  const { pathname, search: queryString } = useLocation();
  const { addTab, hasTab, openTab, tabs, tabEvent, whiteList } = useContext(MultitabContext);
  const { mapPathToMenu } = useContext(MenuContext);
  const contentRef = useRef<HTMLDivElement>(null);
  const [_, { toggleFullscreen }] = useFullscreen(contentRef);
  const { colorBgLayout } = useThemeToken();
  const [searchParams] = useSearchParams();

  const matches = useMatches();

  // 尝试分解 pathname 去获取 菜单名称,
  // 比如 /article/update/10
  // 1. /article -> 文章管理
  // 2. /article/update -> 更新文章
  // 3. /article/update/10 -> 匹配不到, 就取上一次的结果 -> 更新文章
  // 将这个名字用作tab的名字
  const matchMenuNameByPathname = (pathname: string) => {
    let menuName = '';
    const pathArr = pathname.split('/').filter((i) => i);
    for (let i = 0; i < pathArr.length; i++) {
      const pathSnippet = `/${pathArr.slice(0, i + 1).join('/')}`;
      if (mapPathToMenu.has(pathSnippet)) {
        menuName = mapPathToMenu.get(pathSnippet)?.label || menuName;
      }
    }

    return menuName;
  };
  const handleAddTab = () => {
    if (whiteList.includes(pathname)) {
      return;
    }
    let _pathname = pathname;
    // 如果是iframe页面, 使用相应的url作为key
    if (pathname === iframeUrlPrefix) {
      _pathname = searchParams.get('url') || '';
    }

    const menuItem = mapPathToMenu.get(_pathname);
    // tab key
    // 正常页面是pathname
    // iframe是 pathname+queryString
    const tabKey = !menuItem
      ? pathname
      : pathname === iframeUrlPrefix
      ? pathname + queryString
      : menuItem.key!;
    // 标签已存在, 切换
    if (hasTab(tabKey)) {
      openTab(tabKey);
      return;
    }

    // 菜单不存在, 打开一个不知道名字的标签
    // todo: 想办法解决名字的问题
    // 一般发生在 不存在于菜单上的页面, 刷新页面导致的
    // 还没想到办法解决, 除非缓存标签页, 刷新页面标签页不清空

    // 想到一个办法, 逐个匹配pathname获取最后一个名字
    if (!menuItem || !menuItem.path) {
      let label = matchMenuNameByPathname(_pathname);
      if (!label) {
        label = '404';
        if (pathname === iframeUrlPrefix) {
          label = 'Iframe 页面';
        }
      } else {
        // 检查是否有 ID参数, 有ID也放到 label上,
        const {
          params: { id = undefined }
        } = matches.pop() || { params: { id: undefined } };
        if (id) label += ': ' + id;
      }
      addTab({
        label: label,
        key: tabKey!,
        queryString,
        children: null
      });
      return;
    }

    // 标签不存在, 使用菜单label添加
    addTab({
      label: menuItem.label,
      // iframe 页面使用统一的 Iframe前缀
      key: tabKey,
      queryString: pathname === iframeUrlPrefix ? '' : queryString,
      children: null
    });
  };

  useEffect(() => {
    handleAddTab();
  }, [pathname, queryString]);

  useEffect(() => {}, [queryString]);

  useEffect(() => {
    // 全屏事件监听
    const unBind = tabEvent.on('fullScreen', (fullScreen: boolean) => {
      toggleFullscreen();
    });
    return () => {
      unBind();
    };
  }, []);

  return (
    // 开启标签页全屏后, content 背景色会被 :fullscreen 选择器设置为黑色(此乃浏览器行为), 所以需要加行内样式提高优先级
    <Layout.Content className="content" ref={contentRef} style={{ backgroundColor: colorBgLayout }}>
      {tabs.length ? <Tabs /> : null}
      {tabs.length ? <Breadcrumb /> : null}
      <KeepAlive />
    </Layout.Content>
  );
};

export default React.memo(Content);
