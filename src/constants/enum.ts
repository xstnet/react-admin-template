export enum ResponseCodeEnum {
  success = 0,
  noLogin = -10001,
  loginExpired = -10002
}

export enum GenderEnum {
  // 男
  male = 1,
  // 女
  female = 2
}

export enum TodoItemEnum {
  incomplete = 1,
  completed = 2,
  deleted = 10
}

export enum DayjsFormatEnum {
  day = 'YYYY-MM-DD',
  second = 'YYYY-MM-DD HH:mm:ss',
  minute = 'YYYY-MM-DD HH:mm',
  hour = 'YYYY-MM-DD HH'
}
