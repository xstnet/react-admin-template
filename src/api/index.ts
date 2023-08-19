import { Http } from '@/utils/http';

export const postLogin = (data: Api.PostLogoin['params']) => {
  return Http.post<Api.PostLogoin>('/login', data);
};

export const getUserInfo = (params?: Api.GetUserInfo['params']) => {
  return Http.get<Api.GetUserInfo>('/user/info', params);
};

export const postLogout = () => {
  return Http.post<any>('/user/logout');
};

export const getUserList = (params?: Api.getUserList['params'], formData?: KV) => {
  return Http.get<Api.getUserList>('/user/list', { ...params, ...formData });
};

export const postCreateUser = (data: Api.postCreateUser['params']) => {
  return Http.post<Api.postCreateUser>('/user/create', data);
};

export const postUpdateUser = (data: Api.postUpdateUser['params']) => {
  return Http.post<Api.postUpdateUser>('/user/update', data);
};

export const postDeleteUser = (params: Api.postDeleteUser['params']) => {
  return Http.post<Api.postDeleteUser>('/user/delete', params);
};

export const getArticleList = (params?: Api.getArticleList['params'], formData?: KV) => {
  return Http.get<Api.getArticleList>('/article/list', { ...params, ...formData });
};

export const getArticleDetail = (params?: Api.getArticleDetail['params']) => {
  return Http.get<Api.getArticleDetail>('/article/detail', params);
};

export const postCreateArticle = (data: Api.postCreateArticle['params']) => {
  return Http.post<Api.postCreateArticle>('/article/create', data);
};

export const postUpdateArticle = (data: Api.postUpdateArticle['params']) => {
  return Http.post<Api.postUpdateArticle>('/article/update', data);
};

export const postDeleteArticle = (params: Api.postDeleteArticle['params']) => {
  return Http.post<Api.postDeleteArticle>('/article/delete', params);
};

export const getTodoList = (params?: Api.getTodoList['params']) => {
  return Http.get<Api.getTodoList>('/todo/list', params);
};

export const postChangeTodoStatus = (data: Api.postChangeTodoStatus['params']) => {
  return Http.post<Api.postChangeTodoStatus>('/todo/changeStatus', data);
};

export const postDeleteTodo = (params: Api.postDeleteTodo['params']) => {
  return Http.post<Api.postDeleteTodo>('/todo/delete', params);
};

export const postUpdateTodo = (data: Api.postUpdateTodo['params']) => {
  return Http.post<Api.postUpdateTodo>('/todo/update', data);
};

export const postAddTodo = (data: Api.postAddTodo['params']) => {
  return Http.post<Api.postAddTodo>('/todo/create', data);
};

export const getCategoryTreeList = () => {
  return Http.get<Api.getCategoryTreeList>('/category/treeList');
};

export const postCreateCategory = (data: Api.postCreateCategory['params']) => {
  return Http.post<Api.postCreateCategory>('/category/create', data);
};

export const postUpdateCategory = (data: Api.postUpdateCategory['params']) => {
  return Http.post<Api.postCreateCategory>('/category/update', data);
};
