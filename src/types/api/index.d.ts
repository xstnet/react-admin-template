namespace Api {
  type ResponseData<T = Example> = {
    code: number;
    message: string;
    data: T extends Example ? T['response'] : T;
  };
  type Idtype = string | number;

  type KV = Record<string, any>;

  interface Example {
    params: KV;
    response: KV;
  }

  interface PostLogoin extends Example {
    params: Required<Pick<Model.User, 'username' | 'password'>> & {
      remember: boolean;
    };
    response: {
      token: string;
    };
  }

  interface GetUserInfo extends Example {
    params: any;
    response: Model.User;
  }
}
