declare global {
  //设置全局属性
  interface Window {
    //window对象属性
    abc: any; //加入对象
  }

  interface ItemSharedProps {
    style?: React.CSSProperties;
    className?: string;
  }

  type KV = Record<string, any>;

  type IdType = string | number;

  type TokenUserInfoType = {
    uid: number;
  };
}

// 必须要导出,不然无效
export {};
