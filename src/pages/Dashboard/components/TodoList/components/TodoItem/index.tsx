import { TodoItemEnum } from '@/constants/enum';
import useThemeToken from '@/hooks/useThemeToken';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Checkbox, CheckboxProps, Space, Tooltip, Typography } from 'antd';
import React from 'react';
import { useState } from 'react';
import './index.less';
import { postChangeTodoStatus, postDeleteTodo, postUpdateTodo } from '@/api';
import { noop } from '@/utils/util';
import NanoLoading from '@/components/Loading/NanoLoading';
import useManualRequest from '@/hooks/useManualRequest';

const Text = Typography.Text;

type TodoItem = Model.TodoList;

type IProps = {
  todo: TodoItem;
  deleteTodo: (todo: TodoItem) => void;
};
const TodoItem: React.FC<IProps> = (props) => {
  const [isHover, setIsHover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { colorError, colorPrimary } = useThemeToken();

  const [todo, setTodo] = useState(props.todo);

  const { loading: changeStatusLoading, runAsync: chageStatus } =
    useManualRequest(postChangeTodoStatus);
  const { loading: updateLoading, runAsync: updateTodo } = useManualRequest(postUpdateTodo);
  const { loading: deleteLoading, runAsync: deleteTodo } = useManualRequest(postDeleteTodo);

  const { id, status, name } = todo;
  const completed = status === TodoItemEnum.completed;

  const isLoading = changeStatusLoading || updateLoading || deleteLoading;
  const showAction = isHover && !isLoading && status === TodoItemEnum.incomplete;

  // 更新状态
  const handleChangeStatus: CheckboxProps['onChange'] = (event) => {
    if (changeStatusLoading) return;
    const checked = event.target.checked;
    const status = checked ? TodoItemEnum.completed : TodoItemEnum.incomplete;
    const newTodo = { ...todo, status };
    chageStatus(todo)
      .then(() => setTodo(newTodo))
      .catch(noop);
  };

  // 更新内容
  const handleUpdate = async (newName: string) => {
    if (updateLoading) return;
    setIsEditing(false);
    updateTodo(todo)
      .then(() => setTodo({ ...todo, name: newName }))
      .catch(noop);
  };

  // 删除
  const handleDelete = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    if (deleteLoading) return;
    deleteTodo({ id })
      .then(() => props.deleteTodo(todo))
      .catch(noop);
  };

  const renderTodoAction = () => {
    return (
      <>
        <Tooltip title="编辑">
          <EditOutlined
            style={{ color: colorPrimary }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsEditing(true);
            }}
          />
        </Tooltip>
        <Tooltip title="删除">
          {<DeleteOutlined onClick={handleDelete} style={{ color: colorError }} />}
        </Tooltip>
      </>
    );
  };

  return (
    <Checkbox className="todo-item" onChange={handleChangeStatus} key={id} checked={completed}>
      <Text
        type={completed ? 'secondary' : undefined}
        delete={true}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        editable={isEditing ? { editing: isEditing, text: name, onChange: handleUpdate } : false}
      >
        <Space>
          {name}
          {isLoading && <NanoLoading loading={isLoading} />}
          {showAction && renderTodoAction()}
        </Space>
      </Text>
    </Checkbox>
  );
};

export default React.memo(TodoItem);
