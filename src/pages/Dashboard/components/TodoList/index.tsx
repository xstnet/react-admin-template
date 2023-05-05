import { Card, Space } from 'antd';
import AddTodo from './components/AddTodo';
import TodoItem from './components/TodoItem';
import { useRequest } from 'ahooks';
import { getTodoList } from '@/api';

type TodoItem = Model.TodoList;

const TodoList: React.FC = () => {
  const {
    loading: getTodolistLoading,
    data: { list: todoList } = { list: [] },
    mutate: updateList
  } = useRequest(getTodoList);

  const deleteTodo = (todo: TodoItem) => {
    updateList((data) => {
      return {
        ...data!,
        list: todoList.filter((item) => item.id !== todo.id)
      };
    });
  };

  const handleAddToto = (todo: TodoItem) => {
    updateList((data) => {
      return {
        ...data!,
        list: [todo, ...todoList]
      };
    });
  };

  return (
    <Card loading={getTodolistLoading} title="待办事项">
      <Space direction="vertical" style={{ width: '100%' }}>
        <AddTodo onAdd={handleAddToto} />
        {todoList?.map((todo) => (
          <TodoItem key={todo.id} deleteTodo={deleteTodo} todo={todo} />
        ))}
      </Space>
    </Card>
  );
};

export default TodoList;
