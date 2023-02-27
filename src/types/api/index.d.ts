namespace Api {
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
}
