import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'antd';
import config from '@/configs';
import Cache from './cache';
import { URLSearchParams } from 'url';

const timeout = 10 * 1000;

axios.defaults.baseURL = config.apiBaseUrl;
axios.defaults.headers.common['Authorization'] = Cache.getString('token');
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.timeout = timeout;

// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    if (response.config.method === 'post') {
      message.success(response.data.message);
    }

    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    console.log('error', error);

    return Promise.reject(error);
  }
);

type IGetParams = KV | URLSearchParams;
type IResponse<D> = Promise<AxiosResponse<D>>;
interface IGetFunc {
  // todo:
  // 传入了泛型后, 参数类型就没有了, 暂不知道怎么解决
  <D = KV>(url: string, params?: IGetParams, config?: AxiosRequestConfig): IResponse<D>;
}

const get = async <D>(
  url: string,
  params?: IGetParams,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<D>> => {
  const options = config || {};
  options.params = params;
  return axios.get<D>(url, options);
};

const post = async <D>(url: string, data?: KV, config?: AxiosRequestConfig): IResponse<D> => {
  return axios.post<D>(url, data, config);
};

const request = async <D>(config: AxiosRequestConfig): IResponse<D> => {
  return axios.request(config);
};

export const Http = {
  get,
  post,
  request
};
