namespace Api {
  type ResponseData<T = Example> = {
    code: number;
    message: string;
    data: T extends Example ? T['response'] : T;
  };

  // 分页参数
  interface PaginateParams {
    page?: number;
    pageSize?: number;
  }

  interface PaginateResponse<T> {
    total: number;
    list: T extends Example ? T['response'][] : T[];
  }

  // -----------------------------------------------------------------------------------------------

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

  // 例子-获取用户列表
  interface getExmpleUserList extends Example {
    params: PaginateParams;
    response: PaginateResponse<
      Model.User & {
        gender: 1 | 2;
      }
    >;
  }
}
