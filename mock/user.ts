import Mock from 'mockjs';

Mock.mock(/api\/user\/info/, 'get', (options) => {
  console.log('optionsoptions', options);

  const data: Api.ResponseData<Api.GetUserInfo> = {
    code: 0,
    message: 'ok',
    data: {
      id: 1,
      username: 'admin',
      nickname: '醉丶春风',
      avatar: 'https://www.xstnet.com/static/images/head.gif',
      password: '',
      email: 'shantongxu@qq.com',
      mobile: '133xxxx3333'
    }
  };

  return data;
});

Mock.mock(/api\/user\/logout/, 'post', (options) => {
  const data = {
    code: 0,
    message: '退出成功'
  };

  return data;
});

/**
 * 
Mock.setup({
  // 注册自定义中间件函数
  middleware: (request, response, next) => {
    // 获取请求头信息
    const headers = request.headers;

    // 将请求头信息作为 Mock 数据的一部分
    Mock.mock(/\.json/, {
      headers: headers,  // 将请求头信息添加到 Mock 数据中
      data: {
        name: 'Mock.js',
        version: '1.0.0'
      }
    });

    next();  // 调用 next() 方法，继续处理请求
  }
});

 * 
 * 
 */
