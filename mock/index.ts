import Mock from 'mockjs';

Mock.mock(/api\/login/, 'post', (options) => {
  const { body } = options;
  const { username, password } = JSON.parse(body);
  if (username === 'admin') {
    if (password !== '123456') {
      return {
        code: -1,
        message: '密码错误'
      };
    }
    return {
      code: 0,
      message: '登录成功',
      data: {
        token: '@datetime' //随机生成日期时间
      }
    };
  }

  return {
    code: 0,
    message: '登录成功',
    data: {
      token: '@datetime' //随机生成日期时间
    }
  };
});
