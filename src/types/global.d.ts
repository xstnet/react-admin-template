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

  type IdType = string | number;
}

// 必须要导出,不然无效
export {};
