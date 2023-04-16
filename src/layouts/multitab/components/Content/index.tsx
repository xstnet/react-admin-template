// import DefaultRoutes from '@/routes';
import { MenuContext } from '@/contexts/Menu';
import { MultitabContext } from '@/contexts/Multitab';
import useThemeToken from '@/hooks/useThemeToken';
import Breadcrumb from '@/layouts/components/Breadcrumb';
import { useFullscreen } from 'ahooks';
import { Layout } from 'antd';
import React, { PropsWithChildren, useContext, useEffect, useRef } from 'react';
import { useLocation, useMatches } from 'react-router-dom';
import KeepAlive from '../KeepAlive';
import Tabs from '../Tabs';
import './index.less';

const Content: React.FC<PropsWithChildren> = ({ children }) => {
  console.log('multitab Content render...');
  const { pathname } = useLocation();
  const { addTab, hasTab, openTab, tabs, tabEvent } = useContext(MultitabContext);
  const { mapPathToMenu } = useContext(MenuContext);
  const contentRef = useRef<HTMLDivElement>(null);
  const [_, { toggleFullscreen }] = useFullscreen(contentRef);
  const { colorBgLayout } = useThemeToken();

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
    console.log('handleAddTab');

    const tabKey = pathname;
    // 标签已存在, 切换
    if (hasTab(tabKey)) {
      openTab(tabKey);
      return;
    }

    const menuItem = mapPathToMenu.get(pathname);
    // 菜单不存在, 打开一个不知道名字的标签
    // todo: 想办法解决名字的问题
    // 一般发生在 不存在于菜单上的页面, 刷新页面导致的
    // 还没想到办法解决, 除非缓存标签页, 刷新页面标签页不清空

    // 想到一个办法, 逐个匹配pathname获取最后一个名字
    if (!menuItem || !menuItem.path) {
      let label = matchMenuNameByPathname(pathname);
      if (!label) {
        label = '404';
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
        children: null
      });
      return;
    }

    // 标签不存在, 使用菜单label添加
    addTab({
      label: menuItem.label,
      key: menuItem.key!,
      children: null
    });
  };

  useEffect(() => {
    handleAddTab();
  }, [pathname]);

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
      <Tabs />
      {tabs.length ? <Breadcrumb /> : null}
      <KeepAlive />
    </Layout.Content>
  );
};

export default React.memo(Content);
