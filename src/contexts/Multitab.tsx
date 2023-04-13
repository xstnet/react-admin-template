import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { TabsProps } from 'antd';
import { createNanoEvents, Emitter } from 'nanoevents';
import { useNavigate } from 'react-router-dom';
import { MenuContext } from './Menu';

type ItemsType = Pick<Required<TabsProps>, 'items'>['items'][number];

export interface IContextValue {
  activeTab: S;
  tabs: ItemsType[];
  setTabs: ISetFunc<ItemsType[]>;
  addTab: (info: ItemsType, open?: boolean) => void;
  removeTab: (key: S) => void;
  openTab: (key: S) => void;
  hasTab: (key: S) => boolean;
  event: Emitter;
}

const initValue: IContextValue = undefined as any;

// Context
export const MultitabContext = createContext<IContextValue>(initValue);

// Provider
const MultitabProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [tabs, setTabs] = useState<IContextValue['tabs']>([]);
  const [activeTab, setActiveTab] = useState<IContextValue['activeTab']>('');
  const tabEvent = useMemo(() => createNanoEvents(), []);
  const navigate = useNavigate();
  const { mapKeyToMenu } = useContext(MenuContext);

  const getTabActions = useCallback(() => {
    const openTab: IContextValue['openTab'] = (key) => {
      if (!key) return;
      setActiveTab(key);
    };
    const hasTab: IContextValue['hasTab'] = (key) => {
      return tabs.findIndex((item) => item.key === key) > -1;
    };
    const addTab: IContextValue['addTab'] = (info, open = true) => {
      console.log('ddddddddd', tabs);

      if (!hasTab(info.key)) {
        setTabs((tabs) => [...tabs, { ...info }]);
      }
      if (open && activeTab !== info.key) {
        openTab(info.key);
      }
    };
    const removeTab: IContextValue['removeTab'] = (tabKey) => {
      const closedTabIndex = tabs.findIndex((item) => item.key === tabKey);
      if (closedTabIndex === -1) {
        return;
      }
      const nextActiveTab = tabs[closedTabIndex === 0 ? 1 : closedTabIndex - 1];

      setTabs((tabs) => tabs.filter((item) => item.key !== tabKey));
      if (activeTab === tabKey) {
        nextActiveTab &&
          mapKeyToMenu.has(nextActiveTab.key) &&
          navigate(mapKeyToMenu.get(nextActiveTab.key)?.path!);
      }
    };

    return {
      openTab,
      addTab,
      removeTab,
      hasTab
    };
  }, [tabs]);

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
