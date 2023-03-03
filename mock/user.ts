import Mock, { Random } from 'mockjs';

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

Mock.mock(/api\/user\/list/, 'get', (options) => {
  const queryParams = new URLSearchParams(options.url);
  console.log('🚀 ~ file: user.ts:59 ~ Mock.mock ~ options.url:', options.url);

  let pageSize = Number(queryParams.has('pageSize') ? queryParams.get('pageSize') : 10);
  pageSize = 2;
  const data = {
    code: 0,
    message: 'ok',
    data: {
      total: 100,
      [`list|${pageSize}`]: [
        {
          'id|+1': pageSize,
          username: '@first@last',
          nickname: '@cname',
          avatar: () => Random.dataImage('200x200'),
          email: '@email',
          // 这个代码是 chatGPT写的
          mobile: () => Mock.mock(/^1[3456789]\d{9}$/).replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2'),
          'gender|1-2': 0,
          create_time: '@date(yyyy-MM-dd HH:MM:ss)'
        }
      ]
    }
  };

  return Mock.mock(data);
});

Mock.mock(/api\/user\/create/, 'post', (options) => {
  const data = {
    code: 0,
    message: '创建成功',
    data: {
      id: Random.natural(100, 9999)
    }
  };

  return data;
});

Mock.mock(/api\/user\/update/, 'post', (options) => {
  const data = {
    code: 0,
    message: '更新成功'
  };

  return data;
});

Mock.mock(/api\/user\/delete/, 'post', (options) => {
  const data = {
    code: 0,
    message: '删除成功'
  };

  return data;
});
