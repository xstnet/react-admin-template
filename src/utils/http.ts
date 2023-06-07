import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Config from '@/configs';
import Cache from './cache';
import { ResponseCodeEnum } from '@/constants/enum';
import { message } from 'antd';
import { toLoginPage } from './util';

function requestLog(response: AxiosResponse<any, any>) {
  if (!import.meta.env.DEV) {
    // 自行开启
    // return;
  }
  const { config } = response;
  console.group(`${config.method?.toLocaleUpperCase()} ${config.url}`);
  console.log('Path:', config.url);
  console.log('Method:', config.method);
  console.log('Params:', config.params);
  console.log('Body:', config.data);
  console.log('StatusCode:', response.status);
  console.log(
    'Response:',
    typeof response.data === 'object'
      ? Object.assign(Object.create(null), response.data)
      : response.data
  );
  console.groupEnd();
}

const timeout = 10 * 1000;

axios.defaults.baseURL = Config.apiBaseUrl;
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.timeout = timeout;

// 添加请求拦截器
axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${Cache.getString(Config.tokenKey)}`;
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    requestLog(response);

    // 2xx 范围内的状态码都会触发该函数。
    const data = response.data as Api.ResponseData<any>;
    // 接口请求错误判断
    if (typeof data.code !== 'number') {
      message.error('系统错误', 2);
      console.warn(
        'api调用失败, 未正常返回数据, url:',
        response.config.url,
        'data:',
        data,
        'response:',
        response
      );
      return Promise.reject(response);
    }

    // 请求成功
    if (data.code === 0) {
      if (response.config.method === 'post') {
        // 有message时再弹出提示
        if (typeof response.data.message === 'string' && response.data.message.length > 0) {
          message.success(response.data.message);
        }
      }
      return response;
    }

    // 未登录
    if (data.code === ResponseCodeEnum.noLogin) {
      message.error('您还没有登录, 即将跳转到登录页面, 请稍后...');
      Cache.remove(Config.tokenKey);
      // gh-page 不支持前端路由, 清除token后刷新页面,由组件控制跳转
      if (import.meta.env.MODE === 'gh-page') {
        location.reload();
      } else {
        toLoginPage();
      }
      return Promise.reject(data);
    }

    // 登录已过期
    if (data.code === ResponseCodeEnum.loginExpired) {
      message.error('登录已失效, 即将跳转到登录页面...');
      Cache.remove(Config.tokenKey);
      if (import.meta.env.MODE === 'gh-page') {
        location.reload();
      } else {
        toLoginPage();
      }
      return Promise.reject(data);
    }

    // 全部当做接口失败
    message.error(data.message);
    return Promise.reject(response);
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    if (typeof error.message === 'string' && error.message === 'Network Error') {
      message.error('网络错误, 请稍后再试!');
    } else {
      message.error('请求失败, 请稍后再试');
    }
    console.log('Request error', error);

    return Promise.reject(error);
  }
);

namespace Http {
  export type Response<D> = Promise<Api.ResponseData<D>['data']>;

  export type Get = <D = any>(url: string, params?: KV, config?: AxiosRequestConfig) => Response<D>;
  export type Post = <D = any>(url: string, data?: KV, config?: AxiosRequestConfig) => Response<D>;
  export type Request = <D = any>(config: AxiosRequestConfig) => Promise<AxiosResponse<D>>;
}

const get: Http.Get = <TData = any>(url: string, params?: KV, config?: AxiosRequestConfig) => {
  const options = config || {};
  options.params = params;
  return axios
    .get<Api.ResponseData<TData>>(url, options)
    .then((response) => response.data.data)
    .catch((err) => Promise.reject(err));
};

const post: Http.Post = <TData = any>(url: string, data?: KV, config?: AxiosRequestConfig) => {
  return axios
    .post<Api.ResponseData<TData>>(url, data, config)
    .then((response) => response.data.data)
    .catch((err) => Promise.reject(err));
};

const request: Http.Request = <TData>(config: AxiosRequestConfig) => {
  return axios.request<TData>(config);
};

export const Http = {
  get,
  post,
  request
};
