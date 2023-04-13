import { ReactNode, useContext } from 'react';
import { memo, useState, useRef, useEffect } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { MultitabContext } from '@/contexts/Multitab';
import { MenuContext } from '@/contexts/Menu';
import Content from './Content';
import './index.less';

interface IProps {}
export default memo(({}: IProps) => {
  const element = useOutlet();

  const { pathname } = useLocation();

  const { tabs } = useContext(MultitabContext);
  const { mapPathToMenu } = useContext(MenuContext);

  const activeTabKey = mapPathToMenu.get(pathname)?.key;

  const placeholderRef = useRef<HTMLDivElement>(null);
  const [cachedNodes, setCachedNodes] = useState<Array<{ id: string; element?: ReactNode }>>([]);

  useEffect(() => {
    if (!activeTabKey) {
      return;
    }
    const tabskes = tabs.map((i) => i.key);

    setCachedNodes((reactNodes) => {
      // 添加
      const reactNode = reactNodes.find((res) => res.id === activeTabKey);
      if (!reactNode) {
        reactNodes.push({
          id: activeTabKey,
          element
        });
      } else {
        console.log('else');
      }
      // 缓存路由列表和标签页列表同步
      if (tabskes) {
        console.log('tttt', reactNodes);
        console.log(
          'tttt1',
          reactNodes.filter((i) => tabskes.includes(i.id))
        );

        return reactNodes.filter((i) => tabskes.includes(i.id));
      }
      return reactNodes;
    });
  }, [pathname, tabs]);

  return (
    <>
      <div ref={placeholderRef} className="keep-alive" />

      {cachedNodes.map(({ id, element }) => {
        return (
          <Content active={id === activeTabKey} parentRef={placeholderRef} id={id} key={id}>
            {element}
          </Content>
        );
      })}
    </>
  );
});
