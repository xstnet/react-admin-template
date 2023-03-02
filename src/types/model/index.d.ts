namespace Model {
  type User = {
    id: number;
    username: string;
    nickname: string;
    avatar: string;
    create_time?: string;
    password?: string;
    email?: string;
    gender: number;
    mobile?: string;
  };
}
