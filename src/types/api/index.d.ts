namespace Api {
  type ResponseData<T = Example> = {
    code: number;
    message: string;
    data: T extends Example ? T['response'] : T;
  };

  // 分页参数
  interface PaginateParams {
    current?: number;
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
    response: Model.User & {
      roles: (string | number)[];
    };
  }

  // 例子-获取用户列表
  interface getUserList extends Example {
    params: PaginateParams;
    response: PaginateResponse<Model.User>;
  }

  interface postCreateUser extends Example {
    params: Omit<Model.User, 'id'>;
    response: {
      id: number;
    };
  }

  interface postUpdateUser extends Example {
    params: Partial<Model.User> & Pick<Model.User, 'id'>;
    response: any;
  }

  interface postDeleteUser extends Example {
    params: { id: number | number[] };
    response: any;
  }

  interface getArticleList extends Example {
    params: PaginateParams & KV;
    response: PaginateResponse<Model.Article>;
  }

  interface getArticleDetail extends Example {
    params: Pick<Model.Article, 'id'>;
    response: Model.Article;
  }

  interface postDeleteArticle extends Example {
    params: { id: number };
    response: any;
  }

  interface postCreateArticle extends Example {
    params: Omit<Model.Article, 'id'>;
    response: any;
  }

  interface postUpdateArticle extends Example {
    params: Model.Article;
    response: any;
  }
}
