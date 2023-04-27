import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { TabsProps } from 'antd';
import { createNanoEvents, Emitter } from 'nanoevents';
import { useNavigate } from 'react-router-dom';
import { noop } from '@/utils/util';

type ItemsType = Pick<Required<TabsProps>, 'items'>['items'][number] & {
  // queryString 中包含 ?
  queryString?: string;
};

// 这样定义是为了一看就明白 tabKey是可以当做 path 使用的
type TabKey = Menu.SubMenuType['path'];
export interface MultitabContextValue {
  activeTab: TabKey;
  tabs: ItemsType[];
  setTabs: ISetFunc<ItemsType[]>;
  // info: 标签页信息
  // open: 立即打开标签页
  addTab: (info: ItemsType, open?: boolean) => void;
  // 打开标签并跳转页面, 适用于手动控制tabs的地方, 因为菜单项会自动跳转, 手动操作 tabs则不会
  addTabWithNavigate: MultitabContextValue['addTab'];
  removeTab: (key: TabKey) => void;
  openTab: (key: TabKey) => void;
  hasTab: (key: TabKey) => boolean;
  // 忽略的白名单列表, 不缓存
  whiteList: string[];
  // 事件订阅器
  tabEvent: Emitter;
}

// 初始值, 不使用MultitabProvider时获取到的value, 增加容错
const initValue: MultitabContextValue = {
  addTab: noop,
  removeTab: noop,
  tabs: [],
  openTab: noop,
  hasTab: () => false,
  setTabs: noop,
  activeTab: '',
  whiteList: [],
  tabEvent: createNanoEvents(),
  addTabWithNavigate: noop
};

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
      if (key !== activeTab) {
        setActiveTab(key);
      }
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

    const addTabWithNavigate: typeof addTab = (info) => {
      // 你都要跳转了, 肯定是要打开这个标签页的, 不可能后台打开的
      addTab(info, true);
      // 先从缓存中获取 tab信息
      const tabInfo = tabs.find((item) => item.key === info.key) || info;
      if (!tabInfo) {
        console.log('标签页不存在');
        return;
      }
      const to = tabInfo.key + (tabInfo.queryString || '');
      navigate(to);
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
      hasTab,
      addTabWithNavigate
    };
  }, [tabs, activeTab]);

  const tabActions = useMemo(() => getTabActions(), [getTabActions]);

  const whiteList = ['/'];

  const contextValue = useMemo(() => {
    return {
      tabs,
      setTabs,
      activeTab,
      tabEvent,
      whiteList,
      ...tabActions
    };
  }, [tabs, activeTab]);

  return <MultitabContext.Provider value={contextValue} children={children} />;
};

export default MultitabProvider;
