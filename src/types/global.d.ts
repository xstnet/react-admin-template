import { CSSProperties } from 'react';

declare global {
  //设置全局属性
  interface Window {
    //window对象属性
  }

  type S = string;
  type N = number;
  type B = boolean;
  type KV = Record<S, any>;
  type IdType = S | N;

  type AnyString = S & {};
  type AnyNumber = N & {};

  type ISetFunc<S = boolean> = (prevState: S | ((prev: S) => S)) => void;

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

  interface ItemSharedProps {
    className?: string;
    style?: CSSProperties;
  }

  type noop = () => void;
}

// 必须要导出,不然无效
export {};
