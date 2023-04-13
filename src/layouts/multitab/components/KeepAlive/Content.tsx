import { RefObject, PropsWithChildren } from 'react';
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

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

  return <>{activetedRef.current && createPortal(children, realNode!)}</>;
};

export default Content;
