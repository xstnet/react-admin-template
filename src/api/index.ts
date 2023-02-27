type ApiType<T extends Api.Example> = (params: T['params']) => T['response'];

export const postLogin: ApiType<Api.PostLogoin> = () => {
  return {
    token: '34'
  };
};
