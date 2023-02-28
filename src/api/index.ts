import { Http, IResponse as HttpResponse } from '@/utils/http';

// 类型定义👇🏻👇🏻👇🏻 ------------------------------------------------------------------------------------

// 原始的返回值, 未处理, axios->data->Api.ResponseData
type ApiRawResponse<T extends Api.Example> = HttpResponse<Api.ResponseData<T>>;
// 直接拿到 data 返回值, 屏蔽axios, header, code, message 等信息
type ApiDataResponse<T extends Api.Example> = Promise<T['response']>;

// 使用不同的handle 返回不同的数据类型
interface ApiHandle<T extends Api.Example> {
  raw: (params: T['params']) => ApiRawResponse<T>;
  data: (params: T['params']) => ApiDataResponse<T>;
}

// 写这个只是为了getResponseData这个方法不换行, 仅此而已
type PromiseData<T extends Api.Example> = Promise<T['response']>;
// 提取返回结果data
export const getResponseData = <T extends Api.Example>(e: ApiRawResponse<T>): PromiseData<T> => {
  return e.then((r) => Promise.resolve(r.data.data)).catch((err) => Promise.reject(err));
};

// 接口封装👇🏻👇🏻👇🏻 ------------------------------------------------------------------------------------

// 例-手动指定类型
export const postLogin: ApiHandle<Api.PostLogoin>['data'] = (params) => {
  const res = Http.post<Api.ResponseData<Api.PostLogoin>>('/login', params);
  return getResponseData(res);
};

// 例-不使用函数表达式也可以, 也能自动推断出来
export const getUserInfo = (params?: Api.GetUserInfo['params']) => {
  return getResponseData(Http.get<Api.ResponseData<Api.GetUserInfo>>('/user/info', params));
};

export const postLogout = (params?: any) => {
  return getResponseData(Http.post<Api.ResponseData>('/user/logout', params));
};

export const postUserUpdate = (params?: any) => {
  return getResponseData(Http.post<Api.ResponseData>('/user/update', params));
};
