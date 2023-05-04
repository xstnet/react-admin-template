import { TodoItemEnum } from '@/constants/enum';
import useThemeToken from '@/hooks/useThemeToken';
import { DeleteOutlined } from '@ant-design/icons';
import { Checkbox, CheckboxProps, Space, Tooltip, Typography } from 'antd';
import React from 'react';
import { useState } from 'react';
import './index.less';

const Text = Typography.Text;

type TodoItem = Model.TodoList;

type IProps = {
  todo: TodoItem;
  deleteTodo: (todo: TodoItem) => void;
};
const TodoItem: React.FC<IProps> = (props) => {
  const [isHover, setIsHover] = useState(false);

  const { colorError } = useThemeToken();

  const [todo, setTodo] = useState(props.todo);

  const { id, status, name } = todo;
  const completed = status === TodoItemEnum.completed;
  const showAction = isHover && status === TodoItemEnum.incomplete;

  const handleChangeStatus: CheckboxProps['onChange'] = (event) => {
    const checked = event.target.checked;
    const status = checked ? TodoItemEnum.completed : TodoItemEnum.incomplete;
    setTodo({ ...todo, status });
  };

  const handleUpdate = (newName: string) => {
    setTodo({ ...todo, name: newName });
  };

  const handleDelete = (id: TodoItem['id']) => props.deleteTodo(todo);

  console.log('render todo item');

  return (
    <Checkbox className="todo-item" onChange={handleChangeStatus} key={id} checked={completed}>
      <Text
        type={completed ? 'secondary' : undefined}
        delete={true}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        editable={showAction ? { text: name, onChange: handleUpdate } : false}
      >
        <Space>
          {name}
          {showAction && (
            <Tooltip title="删除">
              <DeleteOutlined onClick={() => handleDelete(id)} style={{ color: colorError }} />
            </Tooltip>
          )}
        </Space>
      </Text>
    </Checkbox>
  );
};

export default React.memo(TodoItem);
