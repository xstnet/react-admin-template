import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { TabsProps } from 'antd';
import { createNanoEvents, Emitter } from 'nanoevents';
import { useNavigate } from 'react-router-dom';

type ItemsType = Pick<Required<TabsProps>, 'items'>['items'][number];

// 这样定义是为了一看就明白 tabKey是可以当做 path 使用的
type TabKey = Menu.SubMenuType['path'];
export interface MultitabContextValue {
  activeTab: S;
  tabs: ItemsType[];
  setTabs: ISetFunc<ItemsType[]>;
  addTab: (info: ItemsType, open?: boolean) => void;
  removeTab: (key: TabKey) => void;
  openTab: (key: TabKey) => void;
  hasTab: (key: TabKey) => boolean;
  event: Emitter;
}

const initValue: MultitabContextValue = undefined as any;

// Context
export const MultitabContext = createContext<MultitabContextValue>(initValue);

// Provider
const MultitabProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [tabs, setTabs] = useState<MultitabContextValue['tabs']>([]);
  const [activeTab, setActiveTab] = useState<MultitabContextValue['activeTab']>('');
  const tabEvent = useMemo(() => createNanoEvents(), []);
  const navigate = useNavigate();

  const getTabActions = useCallback(() => {
    const openTab: MultitabContextValue['openTab'] = (key) => {
      if (!key) return;
      setActiveTab(key);
    };
    const hasTab: MultitabContextValue['hasTab'] = (key) => {
      return tabs.findIndex((item) => item.key === key) > -1;
    };
    const addTab: MultitabContextValue['addTab'] = (info, open = true) => {
      if (!hasTab(info.key)) {
        setTabs((tabs) => [...tabs, { ...info }]);
      }
      if (open && activeTab !== info.key) {
        openTab(info.key);
      }
    };
    const removeTab: MultitabContextValue['removeTab'] = (tabKey) => {
      const closedTabIndex = tabs.findIndex((item) => item.key === tabKey);
      if (closedTabIndex === -1) {
        return;
      }
      const nextActiveTab = tabs[closedTabIndex === 0 ? 1 : closedTabIndex - 1];

      setTabs((tabs) => tabs.filter((item) => item.key !== tabKey));
      if (activeTab === tabKey) {
        nextActiveTab && navigate(nextActiveTab.key);
      }
      console.log('tabs', tabs);
    };

    return {
      openTab,
      addTab,
      removeTab,
      hasTab
    };
  }, [tabs, activeTab]);

  const tabActions = useMemo(() => getTabActions(), [getTabActions]);

  const contextValue = useMemo(() => {
    return {
      tabs,
      setTabs,
      activeTab,
      event: tabEvent,
      ...tabActions
    };
  }, [tabs, activeTab]);

  return <MultitabContext.Provider value={contextValue} children={children} />;
};

export default MultitabProvider;
