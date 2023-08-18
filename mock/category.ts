import Mock, { Random } from 'mockjs';

Mock.setup({
  timeout: 100
});
Mock.mock(/api\/category\/treeList/, 'get', (options) => {
  console.log('🚀 ~ file: article.ts:7 ~ Mock.mock ~ options:', options);
  const data = {
    code: 0,
    message: 'ok',
    data: [
      {
        id: 1,
        name: '前端',
        children: [
          {
            id: 2,
            name: 'React教程'
          },
          {
            id: 3,
            name: 'Vue'
          },
          {
            id: 4,
            name: 'Javascript教程'
          },
          {
            id: 5,
            name: 'HTML'
          },
          {
            id: 6,
            name: 'CSS'
          }
        ]
      },
      {
        id: 7,
        name: '后端',
        children: [
          {
            id: 8,
            name: 'mysql进阶'
          },
          {
            id: 9,
            name: 'Vue'
          },
          {
            id: 10,
            name: 'SprootBoot'
          },
          {
            id: 11,
            name: 'NodeJS从入门到精通'
          },
          {
            id: 12,
            name: '数据库'
          },
          {
            id: 14,
            name: 'Linux'
          }
        ]
      }
    ]
  };

  return data;
});
