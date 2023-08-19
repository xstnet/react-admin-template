namespace Api {
  interface Base {
    params: KV;
    response: KV;
  }

  type ResponseData<T = Base> = {
    code: number;
    message: string;
    data: T extends Base ? T['response'] : T;
  };

  // 分页参数
  interface PaginateParams {
    current?: number;
    pageSize?: number;
  }

  interface PaginateResponse<T> {
    total: number;
    list: T extends Base ? T['response'][] : T[];
  }

  // -----------------------------------------------------------------------------------------------

  interface PostLogoin extends Base {
    params: Required<Pick<Model.User, 'username' | 'password'>> & {
      remember: boolean;
    };
    response: {
      token: string;
    };
  }

  interface GetUserInfo extends Base {
    response: Model.User & {
      roles: (string | number)[];
    };
  }

  // 例子-获取用户列表
  interface getUserList extends Base {
    params: PaginateParams;
    response: PaginateResponse<Model.User>;
  }

  interface postCreateUser extends Base {
    params: Omit<Model.User, 'id'>;
    response: {
      id: number;
    };
  }

  interface postUpdateUser extends Base {
    params: Partial<Model.User> & Pick<Model.User, 'id'>;
  }

  interface postDeleteUser extends Base {
    params: { id: number | number[] };
  }

  interface getArticleList extends Base {
    params: PaginateParams & KV;
    response: PaginateResponse<Model.Article>;
  }

  interface getArticleDetail extends Base {
    params: Pick<Model.Article, 'id'>;
    response: Model.Article & {
      content: Model.ArticleContent;
    };
  }

  interface postDeleteArticle extends Base {
    params: { id: number };
    response: any;
  }

  interface postCreateArticle extends Base {
    params: Omit<Model.Article, keyof Model.CommonFields | 'id'> & {
      comment_control: N[];
      content: S;
      markdown_content: S;
      is_draft: N;
    };
  }

  interface postUpdateArticle extends Base {
    params: Model.Article & {
      comment_control: N[];
    };
  }

  interface getTodoList extends Base {
    params: PaginateParams;
    response: PaginateResponse<Model.TodoList>;
  }
  interface postChangeTodoStatus extends Base {
    params: Pick<Model.TodoList, 'id' | 'status'>;
  }
  interface postDeleteTodo extends Base {
    params: Pick<Model.TodoList, 'id'>;
  }
  interface postUpdateTodo extends Base {
    params: Pick<Model.TodoList, 'id' | 'status' | 'name'>;
  }
  interface postAddTodo extends Base {
    params: Pick<Model.TodoList, 'name'>;
    response: Model.TodoList;
  }

  type CategoryTreeItem = Model.ArticleCategory & {
    childref: CategoryTreeItem;
  };
  interface getCategoryTreeList extends Base {
    response: CategoryTreeItem[];
  }

  interface postUpdateCategory extends Base {
    params: Omit<Model.ArticleCategory, keyof Model.TimeFields>;
  }

  interface postCreateCategory extends Base {
    params: Omit<Model.ArticleCategory, keyof Model.CommonFields>;
  }
}
