import Mock, { Random } from 'mockjs';

Mock.setup({
  timeout: 100
});
Mock.mock(/api\/article\/detail/, 'get', (options) => {
  const data = {
    code: 0,
    message: 'ok',
    data: {
      id: 1,
      subject: '主题',
      description: '醉丶春风',
      author: '醉丶春风',
      cover: 'https://www.xstnet.com/static/images/head.gif',
      content: 'content',
      create_time: Random.datetime()
    }
  };

  return data;
});

Mock.mock(/api\/article\/list/, 'get', (options) => {
  const queryParams = new URLSearchParams(options.url);

  let pageSize = Number(queryParams.has('pageSize') ? queryParams.get('pageSize') : 10);
  const data = {
    code: 0,
    message: 'ok',
    data: {
      total: 100,
      [`list|${pageSize}`]: [
        {
          'id|+1': pageSize,
          author: '@first@last',
          subject: () => Mock.Random.ctitle(5, 20),
          description: '@cname',
          cover: () => Random.dataImage('480x270', '封面'),
          content: '@email',
          create_time: '@date(yyyy-MM-dd HH:MM:ss)'
        }
      ]
    }
  };

  return Mock.mock(data);
});

Mock.mock(/api\/article\/create/, 'post', (options) => {
  const data = {
    code: 0,
    message: '创建成功',
    data: {
      id: Random.natural(100, 9999)
    }
  };

  return data;
});

Mock.mock(/api\/article\/update/, 'post', (options) => {
  const data = {
    code: 0,
    message: '更新成功'
  };

  return data;
});

Mock.mock(/api\/article\/delete/, 'post', (options) => {
  const data = {
    code: 0,
    message: '删除成功'
  };

  return data;
});
