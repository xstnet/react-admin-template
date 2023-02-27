import { Http } from '@/utils/http';

type ApiType<T extends Api.Example> = (params: T['params']) => Api.ResponseData<T['response']>;

export const postLogin: ApiType<Api.PostLogoin> = (params) => {
  const data = Http.post('/login', params);
  data
    .then((r) => {
      console.log('rrrrrrrrrr', r.data);
    })
    .catch((e) => {
      console.log('errr', e);
    });

  return 1 as any;
};
