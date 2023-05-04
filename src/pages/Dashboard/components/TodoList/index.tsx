import { DayjsFormatEnum, TodoItemEnum } from '@/constants/enum';
import { randomNumber } from '@/utils/util';
import { Card, Space } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import AddTodo from './components/AddTodo';
import TodoItem from './components/TodoItem';

type TodoItem = Model.TodoList;

const now = () => dayjs().format(DayjsFormatEnum.second);

const TodoList: React.FC = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([
    {
      id: randomNumber(100, 1000000000),
      name: '全局搜索',
      status: TodoItemEnum.incomplete,
      create_time: now(),
      update_time: now()
    },
    {
      id: randomNumber(100, 1000000000),
      name: '多tab布局支持',
      status: TodoItemEnum.completed,
      create_time: now(),
      update_time: now()
    },
    {
      id: 1,
      name: '这是一个todo例子',
      status: TodoItemEnum.completed,
      create_time: now(),
      update_time: now()
    }
  ]);

  const deleteTodo = (todo: TodoItem) => {
    setTodoList((todoList) => todoList.filter((item) => item.id !== todo.id));
  };

  const handleAddToto = (todo: TodoItem) => {
    setTodoList([todo, ...todoList]);
  };

  return (
    <Card title="待办事项">
      <Space direction="vertical" style={{ width: '100%' }}>
        <AddTodo onAdd={handleAddToto} />
        {todoList.map((todo) => (
          <TodoItem key={todo.id} deleteTodo={deleteTodo} todo={todo} />
        ))}
      </Space>
    </Card>
  );
};

export default TodoList;
