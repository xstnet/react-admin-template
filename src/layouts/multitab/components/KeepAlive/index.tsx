import { ReactNode, useContext } from 'react';
import { memo, useState, useRef, useEffect } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { MultitabContext } from '@/contexts/Multitab';
import Content from './Content';
import './index.less';

type CachedNodeType = { id: string; element?: ReactNode };
interface IProps {}
const KeepAlive: React.FC<IProps> = () => {
  const element = useOutlet();
  const { pathname } = useLocation();

  const activeTabKey = pathname;

  const { tabs } = useContext(MultitabContext);
  // 占位符
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [cachedNodes, setCachedNodes] = useState<CachedNodeType[]>([]);

  useEffect(() => {
    console.log('chage', activeTabKey, tabs);

    if (!activeTabKey) {
      return;
    }
    const tabsKeys = tabs.map((item) => item.key);

    setCachedNodes((reactNodes) => {
      // 添加
      const reactNode = reactNodes.find((node) => node.id === activeTabKey);
      if (!reactNode) {
        reactNodes.push({
          id: activeTabKey,
          element
        });
      }
      // 同步标签页, 比如关闭了标签, 这里要相应的丢弃
      return reactNodes.filter((i) => tabsKeys.includes(i.id));
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
};

export default KeepAlive;
