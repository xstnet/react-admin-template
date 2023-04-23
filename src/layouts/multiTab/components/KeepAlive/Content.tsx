import { RefObject, PropsWithChildren } from 'react';
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM, { createPortal } from 'react-dom';

interface IProps {
  active: boolean;
  id: string;
  parentRef: RefObject<HTMLDivElement>;
}

const Content: React.FC<PropsWithChildren<IProps>> = ({ active, children, id, parentRef }) => {
  const [realNode] = useState(() => document.createElement('div'));
  const activetedRef = useRef(false);
  activetedRef.current = activetedRef.current || active;

  useEffect(() => {
    if (active) {
      parentRef.current?.appendChild(realNode);
    } else {
      try {
        parentRef.current?.removeChild(realNode);
      } catch (e) {}
    }
  }, [active, parentRef, realNode]);

  useEffect(() => {
    realNode.setAttribute('id', id);
  }, [id, realNode]);

  // 移除dom
  // 用于刷新操作时
  // 通过修改子组件(父组件是KeepAlive)的key来实现刷新,相应的 子组件(Content为子组件)内部也要做收尾工作
  // createPortal 已经存在于真是dom中了, react并不会帮我们删除,除非更新了父组件
  useEffect(() => {
    return () => {
      // 点击关闭的标签页可能没有dom了, catch一下不用管
      try {
        parentRef.current?.removeChild(realNode);
      } catch (e) {}
    };
  }, []);

  return <>{activetedRef.current && createPortal(children, realNode!)}</>;
};

export default Content;
