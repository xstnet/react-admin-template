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
        id: 82,
        name: 'PHP',
        parent_id: 0,
        sort_value: 10,
        status: 10,
        children: [
          {
            id: 79,
            name: 'Yii2.0',
            parent_id: 82,
            sort_value: 11,
            status: 10
          },
          {
            id: 95,
            name: 'Yii1.1',
            parent_id: 82,
            sort_value: 12,
            status: 10
          },
          {
            id: 93,
            name: '函数',
            parent_id: 82,
            sort_value: 15,
            status: 10
          }
        ]
      },
      {
        id: 84,
        name: '数据库',
        parent_id: 0,
        sort_value: 20,
        status: 10,
        children: [
          {
            id: 85,
            name: 'mysql',
            parent_id: 84,
            sort_value: 21,
            status: 10
          },
          {
            id: 92,
            name: 'redis',
            parent_id: 84,
            sort_value: 22,
            status: 10
          }
        ]
      },
      {
        id: 86,
        name: 'Linux',
        parent_id: 0,
        sort_value: 30,
        status: 10
      },
      {
        id: 81,
        name: 'Javascript',
        parent_id: 0,
        sort_value: 40,
        status: 10
      },
      {
        id: 91,
        name: 'Golang笔记',
        parent_id: 0,
        sort_value: 45,
        status: 10
      },
      {
        id: 100,
        name: 'C语言',
        parent_id: 0,
        sort_value: 46,
        status: 10
      },
      {
        id: 94,
        name: '数据结构与算法',
        parent_id: 0,
        sort_value: 47,
        status: 10,
        children: [
          {
            id: 99,
            name: '算法',
            parent_id: 94,
            sort_value: 45,
            status: 10
          },
          {
            id: 96,
            name: '链表',
            parent_id: 94,
            sort_value: 47,
            status: 10
          },
          {
            id: 97,
            name: 'hash',
            parent_id: 94,
            sort_value: 48,
            status: 10
          },
          {
            id: 98,
            name: '二叉树',
            parent_id: 94,
            sort_value: 49,
            status: 10
          }
        ]
      },
      {
        id: 101,
        name: '正则表达式',
        parent_id: 0,
        sort_value: 48,
        status: 10
      },
      {
        id: 80,
        name: '资源分享',
        parent_id: 0,
        sort_value: 50,
        status: 10,
        children: [
          {
            id: 89,
            name: '软件教程',
            parent_id: 80,
            sort_value: 52,
            status: 10
          },
          {
            id: 90,
            name: '文章分享',
            parent_id: 80,
            sort_value: 53,
            status: 10
          }
        ]
      },
      {
        id: 88,
        name: '其他',
        parent_id: 0,
        sort_value: 60,
        status: 10
      }
    ]
  };

  return data;
});

Mock.mock(/api\/category\/create/, 'post', (options) => {
  const data = {
    code: 0,
    message: '创建分类成功',
    data: {
      id: Random.natural(100, 9999)
    }
  };

  return data;
});

Mock.mock(/api\/category\/update/, 'post', (options) => {
  const data = {
    code: 0,
    message: '更新分类成功'
  };

  return data;
});
