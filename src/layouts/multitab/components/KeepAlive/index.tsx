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
    const tabskey = tabs.map((i) => i.key);

    setCachedNodes((reactNodes) => {
      // 添加
      const reactNode = reactNodes.find((res) => res.id === activeTabKey);
      if (!reactNode) {
        reactNodes.push({
          id: activeTabKey,
          element
        });
      } else {
        // 标签已存在, 重新激活
        // console.log('');
      }
      // 同步标签页, 比如关闭了标签, 这里要相应的丢弃
      return reactNodes.filter((i) => tabskey.includes(i.id));
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
