declare global {
  //设置全局属性
  interface Window {
    //window对象属性
    abc: any; //加入对象
  }

  type S = string;
  type N = number;
  type B = boolean;
  type KV = Record<S, any>;
  type IdType = S | N;

  type ISetFunc<T = boolean> = (value: T) => void;

  type TokenMeta<D> = {
    iat: number;
    exp: number;
    aud: string;
    iss: string;
    sub: string;
    data: D;
  };

  type TokenData = {
    uid: number;
  };
}

// 必须要导出,不然无效
export {};
