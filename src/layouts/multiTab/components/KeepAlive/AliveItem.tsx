import { RefObject, PropsWithChildren, useMemo } from 'react';
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM, { createPortal } from 'react-dom';

interface IProps {
  active: boolean;
  id: string;
  parentRef: RefObject<HTMLDivElement>;
}

const AliveItem: React.FC<PropsWithChildren<IProps>> = ({ active, children, id, parentRef }) => {
  const [realNode] = useState(() => document.createElement('div'));

  // 缓存组件
  // 通过React 把 children 渲染到一个虚构的dom上, 此时该dom尚未追加到页面上, 毫无作用
  // 只需要渲染一次就够了
  const cachedComponent = useMemo(() => createPortal(children, realNode), []);

  useEffect(() => {
    if (active) {
      // 激活时就挪到给定的dom上
      // 把上面虚构的div插入到真实的节点上, 此时在页面上才能看到
      parentRef.current?.appendChild(realNode);
    } else {
      // 隐藏时就从给定的dom上移除
      try {
        parentRef.current?.removeChild(realNode);
      } catch (e) {}
    }
  }, [active, realNode]);

  useEffect(() => {
    // Set ID, 增加辨识度
    realNode.setAttribute('id', id);
  }, [id, realNode]);

  // 移除dom
  // 用于刷新操作时
  // 通过修改子组件(父组件是KeepAlive)的key来实现刷新,相应的 子组件(Content为子组件)内部也要做收尾工作
  // createPortal 已经存在于真是dom中了, react并不会帮我们删除,除非更新了父组件
  useEffect(() => {
    return () => {
      // dom 操作需谨慎, try catch 护体大法
      try {
        parentRef.current?.removeChild(realNode);
      } catch (e) {}
    };
  }, []);

  // 关于最后无附魔还要return一个值的问题, 有些不明白, 以下是我问chatGPT的过程, 成功为我解惑

  // q: 我还有个疑问, 为什么最后还要return 呢, 按理说组件都已经append到dom上了
  // a: 好问题！return 语句返回的是 createPortal(children, realNode!)，也就是把 children 渲染到了 realNode 上生成的 Portal 组件。这个 Portal 组件虽然已经渲染到了页面上，但是在组件树中还是存在的，并没有被销毁。因此，必须要在最后的 return 语句中返回这个 Portal 组件，才能确保这个组件一直存在于组件树中，以便下次使用时可以直接从缓存中取出。
  // q: 没看懂, 再具体一点
  // a: 当 return 一个组件时，实际上是在告诉 React，将该组件添加到虚拟 DOM 中，最终呈现在页面上。在这个例子中，cachedComponent 变量就是这个被返回的组件。尽管在 useEffect 中已经将 realNode 添加到了目标节点中，但是在这之后，React 仍然需要知道需要渲染什么内容，因此我们需要通过 return 返回该组件。当然，我们在返回时，可以将该组件存储在变量中，这样下一次渲染时就可以直接使用缓存的组件，不需要再重新创建。
  // q: 如果修改成  `return active ? cachedComponent : null`, 会好一点吗
  // a: 是的，这样的话在组件不活跃时，就会返回 null，从而将组件从 DOM 中移除。这样做也有助于避免组件占用过多的内存和 CPU 资源, 这样的话，在组件不活跃时，组件就会被卸载，释放内存和 CPU 资源。这也符合 React 的设计原则，即组件只渲染必要的部分，避免不必要的计算和浪费资源。
  // q: 但是这样就做不到缓存组件了, 与我的需求不和,  因此不能这样写, 对吗
  // a: 是的，您的理解是正确的。如果使用return active ? cachedComponent : null，那么当组件隐藏时，React就会卸载组件，组件状态就无法被缓存了，不符合你的需求。所以我们需要让组件一直存在，通过useEffect来控制组件的显示和隐藏。
  return cachedComponent;
};

export default AliveItem;
