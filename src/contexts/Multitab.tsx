import React, { createContext, useMemo, useState } from 'react';
import { TabsProps } from 'antd';
import { createNanoEvents, Emitter } from 'nanoevents';

type ItemsType = Pick<Required<TabsProps>, 'items'>['items'][number];

export interface IContextValue {
  activeTab: S;
  tabs: ItemsType[];
  setTabs: ISetFunc<ItemsType[]>;
  add: (info: ItemsType, open?: boolean) => void;
  remove: (key: S) => void;
  open: (key: S) => void;
  event: Emitter;
}

const initValue: IContextValue = undefined as any;

// Context
export const MultitabContext = createContext<IContextValue>(initValue);

// Provider
const MultitabProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [tabs, setTabs] = useState<IContextValue['tabs']>([]);
  const [activeTab, setActiveTab] = useState<IContextValue['activeTab']>('');

  const contextValue = useMemo(() => {
    return {
      tabs,
      setTabs,
      activeTab,
      add: function (info: ItemsType, open = true) {
        if (tabs.findIndex((item) => item.key === info.key) === -1) {
          setTabs([...tabs, { ...info }]);
        }
        if (open) {
          setActiveTab(info.key);
        }
      },
      remove: function (key: string) {},
      open: function (key: string) {
        setActiveTab(key);
      },
      event: createNanoEvents()
    };
  }, [tabs, activeTab]);

  return <MultitabContext.Provider value={contextValue} children={children} />;
};

export default MultitabProvider;
