import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

type CacheNode = { id: string; children: React.ReactNode };

export interface AliveScopeContextValue {
  cachedNodes: Record<string, CacheNode>;
}

// 初始值, 不使用AliveScopeProvider时获取到的value, 增加容错
const initValue: AliveScopeContextValue = {
  keep: () => 1,
  cachedNodes: new Map()
} as any;

// Context
export const AliveScopeContext = createContext<AliveScopeContextValue>(initValue);

// Provider
const AliveScopeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [cachedNodes, setCacheNodes] = useState<AliveScopeContextValue['cachedNodes']>({});

  const contextValue = useMemo(() => {
    return {
      cachedNodes
    };
  }, []);

  return (
    <AliveScopeContext.Provider value={contextValue}>
      {/* {children} */}
      <MemoChildren children={children} />
      {Object.values(cachedNodes).map(({ id, children }) => (
        <div key={id} id={id}>
          {children}
        </div>
      ))}
    </AliveScopeContext.Provider>
  );
};

type MemoChildrenType = React.PropsWithChildren<{}>;
const MemoChildren = React.memo<MemoChildrenType>(
  ({ children }) => {
    return <>{children}</>;
  },
  (prev, next) => {
    console.log('memboer chill', prev, next);
    return true;
  }
);

export default AliveScopeProvider;
