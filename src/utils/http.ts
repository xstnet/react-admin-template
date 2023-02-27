import axios from 'axios';
import config from '@/configs';
import Cache from './cache';

axios.defaults.baseURL = config.apiBaseUrl;
axios.defaults.headers.common['Authorization'] = Cache.getString('token');
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

const get = (url: string) => {
  axios.get(url);
};

const post = () => {};

const request = () => {};

export const Http = {
  get,
  post,
  request
};
