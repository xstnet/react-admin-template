import { Http, IResponse as HttpResponse } from '@/utils/http';

// 类型定义👇🏻👇🏻👇🏻 ------------------------------------------------------------------------------------

// 原始的返回值, 未处理, axios->data->Api.ResponseData
type ApiRawResponse<T extends Api.Base> = HttpResponse<Api.ResponseData<T>>;
// 直接拿到 data 返回值, 屏蔽axios, header, code, message 等信息
type ApiDataResponse<T extends Api.Base> = Promise<T['response']>;

// export type PaginateData<T extends Api.Base> = Api.ResponseData<Api.PaginateResponse<T>>;

// 使用不同的handle 返回不同的数据类型
interface ApiHandle<T extends Api.Base> {
  raw: (params?: T['params']) => ApiRawResponse<T>;
  data: (params?: T['params']) => ApiDataResponse<T>;
}

// 写这个只是为了getResponseData这个方法不换行, 仅此而已
type PromiseData<T extends Api.Base> = Promise<T['response']>;
// 提取返回结果data
export const getResponseData = <T extends Api.Base>(e: ApiRawResponse<T>): PromiseData<T> => {
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

export const getUserList = (params?: Api.getUserList['params'], formData?: KV) => {
  return getResponseData(
    Http.get<Api.ResponseData<Api.getUserList>>('/user/list', { ...params, ...formData })
  );
};

export const postCreateUser = (params?: Api.postCreateUser['params']) => {
  return getResponseData(Http.post<Api.ResponseData<Api.postCreateUser>>('/user/create', params));
};

export const postUpdateUser = (params?: Api.postUpdateUser['params']) => {
  return getResponseData(
    // 为什么这里 Api.ResponseData 没传泛型?
    // 因为不需要用到返回值, 无所谓
    Http.post<Api.ResponseData>('/user/update', params)
  );
};

export const postDeleteUser = (params?: Api.postDeleteUser['params']) => {
  return getResponseData(Http.post<Api.ResponseData>('/user/delete', params));
};

export const getArticleList = (params?: Api.getArticleList['params'], formData?: KV) => {
  return getResponseData(
    Http.get<Api.ResponseData<Api.getArticleList>>('/article/list', { ...params, ...formData })
  );
};

export const getArticleDetail = (params: Api.getArticleDetail['params']) => {
  return getResponseData(
    Http.get<Api.ResponseData<Api.getArticleDetail>>('/article/detail', params)
  );
};

export const postCreateArticle = (params?: Api.postCreateArticle['params']) => {
  return getResponseData(
    Http.post<Api.ResponseData<Api.postCreateArticle>>('/article/create', params)
  );
};

export const postUpdateArticle = (params?: Api.postUpdateArticle['params']) => {
  return getResponseData(Http.post<Api.ResponseData>('/article/update', params));
};

export const postDeleteArticle = (params?: Api.postDeleteArticle['params']) => {
  return getResponseData(Http.post<Api.ResponseData>('/article/delete', params));
};

export const getTodoList = (params?: Api.getTodoList['params']) => {
  return getResponseData(Http.get<Api.ResponseData<Api.getTodoList>>('/todo/list', params));
};

export const postChangeTodoStatus = (params?: Api.postChangeTodoStatus['params']) => {
  return getResponseData(
    Http.post<Api.ResponseData<Api.postChangeTodoStatus>>('/todo/changeStatus', params)
  );
};
export const postDeleteTodo = (params?: Api.postDeleteTodo['params']) => {
  return getResponseData(Http.post<Api.ResponseData<Api.postDeleteTodo>>('/todo/delete', params));
};
export const postUpdateTodo = (params?: Api.postUpdateTodo['params']) => {
  return getResponseData(Http.post<Api.ResponseData<Api.postUpdateTodo>>('/todo/update', params));
};
