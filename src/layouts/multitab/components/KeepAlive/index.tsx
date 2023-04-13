import { RefObject, ReactNode, useContext } from 'react';
import React, { Suspense, memo, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useMatches, useOutlet } from 'react-router-dom';
import { MultitabContext } from '@/contexts/Multitab';
import { MenuContext } from '@/contexts/Menu';
import PageLoading from '@/components/Loading/PageLoading';

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
          <Component active={id === activeTabKey} renderDiv={placeholderRef} name={id} key={id}>
            {element}
          </Component>
        );
      })}
    </>
  );
});

export interface ComponentReactElement {
  children?: ReactNode | ReactNode[];
}

interface ComponentProps extends ComponentReactElement {
  active: boolean;
  name: string;
  renderDiv: RefObject<HTMLDivElement>;
}

export const Component: React.FC<ComponentProps> = ({ active, children, name, renderDiv }) => {
  const [targetElement] = useState(() => document.createElement('div'));
  const activatedRef = useRef(false);
  activatedRef.current = activatedRef.current || active;

  useEffect(() => {
    if (active) {
      renderDiv.current?.appendChild(targetElement);
    } else {
      try {
        renderDiv.current?.removeChild(targetElement);
      } catch (e) {}
    }
  }, [active, name, renderDiv, targetElement]);

  useEffect(() => {
    targetElement.setAttribute('id', name);
  }, [name, targetElement]);

  return (
    <Suspense fallback={<PageLoading loading delay={200} />}>
      {activatedRef.current && createPortal(children, targetElement)}
    </Suspense>
  );
};
