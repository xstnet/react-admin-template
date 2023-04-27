import { ReactNode, useContext } from 'react';
import { useState, useRef, useEffect } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { MultitabContext } from '@/contexts/Multitab';
import AliveItem from './AliveItem';
import { iframeUrlPrefix } from '@/utils/iframe';
import './index.less';

// 传给子组件的key, 当他改变时, 会刷新子组件, 达到刷新tab页面的效果
let reloadKey = 1;

type CachedNodeType = { id: string; element?: ReactNode; key: React.Key };

interface IProps {}

const KeepAlive: React.FC<IProps> = () => {
  const element = useOutlet();

  const { pathname, search } = useLocation();

  // iframe 页面的key 要加上参数
  const activeTabKey = pathname === iframeUrlPrefix ? pathname + search : pathname;

  const { tabs, tabEvent, whiteList } = useContext(MultitabContext);
  // dom wrap 占位符
  const placeholderRef = useRef<HTMLDivElement>(null);
  // 缓存的组件列表
  const [cachedNodes, setCachedNodes] = useState<CachedNodeType[]>([]);

  useEffect(() => {
    const unBindEvent = tabEvent.on('reload', (targetPathname) => {
      console.log('刷新页面:', targetPathname);

      setCachedNodes(
        cachedNodes.map((item) =>
          item.id !== targetPathname ? item : { ...item, key: ++reloadKey }
        )
      );
    });

    return () => {
      unBindEvent();
    };
  }, [cachedNodes]);

  useEffect(() => {
    if (!activeTabKey) {
      return;
    }
    if (whiteList.includes(activeTabKey)) {
      return;
    }
    const tabsKeys = tabs.map((item) => item.key);

    setCachedNodes((reactNodes) => {
      // 添加
      const reactNode = reactNodes.find((node) => node.id === activeTabKey);
      if (!reactNode) {
        reactNodes.push({
          id: activeTabKey,
          element,
          key: ++reloadKey
        });
      }
      // 同步标签页, 比如关闭了标签, 这里要相应的丢弃
      return reactNodes.filter((i) => tabsKeys.includes(i.id));
    });
  }, [tabs]);

  if (whiteList.includes(activeTabKey)) {
    return element;
  }
  return (
    <>
      {/* 占位符 */}
      <div ref={placeholderRef} className="keep-alive" />

      {/* 遍历所有缓存的组件, 尝试渲染和当前pathname匹配的页面 */}
      {cachedNodes.map(({ id, element, key }) => {
        return (
          <AliveItem active={id === activeTabKey} parentRef={placeholderRef} id={id} key={key}>
            {element}
          </AliveItem>
        );
      })}
    </>
  );
};

export default KeepAlive;
