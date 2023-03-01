import Mock, { Random, toJSONSchema } from 'mockjs';
// Mock.setup({ timeout: 3000 });
Mock.mock(/api\/example\/userList/, 'get', (options) => {
  console.log('optionsoptions', options);
  console.log('🚀 ~ file: example.ts:5 ~ Mock.mock ~ options:', options);
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
