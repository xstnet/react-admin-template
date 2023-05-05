import { TodoItemEnum } from '@/constants/enum';
import { randomNumber } from '@/utils/util';
import Mock, { Random } from 'mockjs';

Mock.setup({
  timeout: 100
});

Mock.mock(/api\/todo\/list/, 'get', (options) => {
  // const queryParams = new URLSearchParams(options.url);
  // let pageSize = Number(queryParams.has('pageSize') ? queryParams.get('pageSize') : 10);
  const data = {
    code: 0,
    message: '',
    data: {
      total: 3,
      list: [
        {
          id: randomNumber(100, 1000000000),
          name: '全局搜索',
          status: TodoItemEnum.incomplete,
          create_time: '2023-04-20',
          update_time: '2023-04-20'
        },
        {
          id: randomNumber(100, 1000000000),
          name: '多tab布局支持',
          status: TodoItemEnum.completed,
          create_time: '2023-04-15',
          update_time: '2023-04-215'
        },
        {
          id: 1,
          name: '这是一个todo例子',
          status: TodoItemEnum.completed,
          create_time: '2023-04-10',
          update_time: '2023-04-10'
        }
      ]
    }
  };

  return Mock.mock(data);
});

Mock.mock(/api\/todo\/create/, 'post', (options) => {
  const body = JSON.parse(options.body);
  const data = {
    code: 0,
    message: '',
    data: {
      id: Random.natural(100, 9999),
      name: body.name,
      status: TodoItemEnum.incomplete,
      create_time: Random.now(),
      update_time: Random.now()
    }
  };

  return data;
});

Mock.mock(/api\/todo\/update/, (options) => {
  const data = {
    code: 0,
    message: ''
  };
  return data;
});

Mock.mock(/api\/todo\/changeStatus/, 'post', (options) => {
  const data = {
    code: 0,
    message: ''
  };

  return data;
});

Mock.mock(/api\/todo\/delete/, 'post', (options) => {
  const data = {
    code: 0,
    message: ''
  };

  return data;
});
