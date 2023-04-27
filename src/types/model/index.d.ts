namespace Model {
  interface CommonFields {
    create_time: string;
    update_time?: string;
    delete_time?: string;
  }
  interface User extends CommonFields {
    id: number;
    username: string;
    nickname: string;
    avatar: string;
    create_time?: string;
    password?: string;
    email?: string;
    gender: number;
    mobile?: string;
  }

  interface Article extends CommonFields {
    id: number;
    title: string;
    description: string;
    author: string;
    cover: string;
    content: string;
    tags: string[];
  }

  interface LoginHistory extends CommonFields {
    id: number;
    userId: User['id'];
    loginIp: string;
    nickname: User['nickname'];
  }

  interface TodoList extends CommonFields {
    id: number;
    name: string;
    status: TodoItemEnum;
  }
}
