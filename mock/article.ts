import Mock, { Random } from 'mockjs';

Mock.setup({
  timeout: 100
});
Mock.mock(/api\/article\/detail/, 'get', (options) => {
  console.log('π ~ file: article.ts:7 ~ Mock.mock ~ options:', options);
  const data = {
    code: 0,
    message: 'ok',
    data: {
      id: 1,
      title: 'δΈ»ι’',
      description: 'ιδΈΆζ₯ι£',
      author: 'ιδΈΆζ₯ι£',
      tags: [1, 2],
      // cover: 'https://www.xstnet.com/static/images/head.gif',
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
          title: () => Mock.Random.ctitle(5, 20),
          description: '@cname',
          cover: () => Random.dataImage('480x270', 'ε°ι’'),
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
    message: 'εε»Ίζε',
    data: {
      id: Random.natural(100, 9999)
    }
  };

  return data;
});

Mock.mock(/api\/article\/update/, 'post', (options) => {
  const data = {
    code: 0,
    message: 'ζ΄ζ°ζε'
  };

  return data;
});

Mock.mock(/api\/article\/delete/, 'post', (options) => {
  const data = {
    code: 0,
    message: 'ε ι€ζε'
  };

  return data;
});
