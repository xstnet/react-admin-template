import Mock from 'mockjs';

Mock.mock(/api\/login/, () => {
  return {
    code: 0,
    message: '登录成功',
    data: {
      token: '@datetime' //随机生成日期时间
    }
  };
});
