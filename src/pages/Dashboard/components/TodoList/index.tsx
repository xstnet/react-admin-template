import { DayjsFormatEnum, TodoItemEnum } from '@/constants/enum';
import useThemeToken from '@/hooks/useThemeToken';
import { randomNumber } from '@/utils/util';
import { DeleteOutlined, EnterOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Space, Input, Button, Checkbox, Typography, Tooltip, InputRef } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

const Text = Typography.Text;

type ITodoItem = Model.TodoList;

const now = () => dayjs().format(DayjsFormatEnum.second);

const TodoList: React.FC = () => {
  // 当前正聚焦的todo item, 用以显示操作项, 如: 编辑/删除等
  const [hoverTodo, sethoverTodo] = useState(0);
  const [addingTodo, setAddingTodo] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const { colorError } = useThemeToken();
  const [todoList, setTodoList] = useState<ITodoItem[]>([
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

  useEffect(() => {
    if (addingTodo) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [addingTodo, inputRef.current]);

  const [newTotoValue, setNewTodoValue] = useState('');

  const handleAddToto = () => {
    if (!newTotoValue) return;
    setTodoList([
      {
        name: newTotoValue,
        status: TodoItemEnum.incomplete,
        id: randomNumber(100, 1000000000),
        create_time: dayjs().format('YYYY-MM-DD HH:MM:SS'),
        update_time: dayjs().format('YYYY-MM-DD HH:MM:SS')
      },
      ...todoList
    ]);

    setNewTodoValue('');
  };

  const handleChangeStatus = (id: ITodoItem['id'], checked: boolean) => {
    setTodoList(
      todoList.map((item) =>
        item.id !== id
          ? item
          : { ...item, status: checked ? TodoItemEnum.completed : TodoItemEnum.incomplete }
      )
    );
  };

  const handleUpdate = (id: ITodoItem['id'], newName: string) => {
    setTodoList(todoList.map((item) => (item.id !== id ? item : { ...item, name: newName })));
  };

  const handleDelete = (id: ITodoItem['id']) => {
    setTodoList(todoList.filter((item) => item.id !== id));
  };

  return (
    <Card title="待办事项">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space.Compact style={{ width: '100%', marginBottom: '16px' }}>
          <Input
            ref={inputRef}
            value={newTotoValue}
            onFocus={() => setAddingTodo(true)}
            onBlur={() => setAddingTodo(false)}
            onChange={(e) => setNewTodoValue(e.target.value)}
            placeholder="添加新事项"
            suffix={addingTodo ? <EnterOutlined style={{ opacity: 0.5 }} color="red" /> : null}
            onPressEnter={handleAddToto}
          />
          <Button onClick={handleAddToto} type="primary" icon={<PlusOutlined />} />
        </Space.Compact>

        {todoList.map(({ id, status, name }) => {
          const completed = status === TodoItemEnum.completed;
          const showAction = hoverTodo === id && status === TodoItemEnum.incomplete;
          return (
            <Checkbox
              onChange={({ target: { checked } }) => handleChangeStatus(id, checked)}
              key={id}
              checked={completed}
            >
              <Text
                type={completed ? 'secondary' : undefined}
                delete={completed}
                onMouseEnter={() => sethoverTodo(id)}
                onMouseLeave={() => sethoverTodo(0)}
                editable={showAction ? { onChange: (newName) => handleUpdate(id, newName) } : false}
              >
                <Space>
                  {name}
                  {showAction && (
                    <Tooltip title="删除">
                      <DeleteOutlined
                        onClick={() => handleDelete(id)}
                        style={{ color: colorError }}
                      />
                    </Tooltip>
                  )}
                </Space>
              </Text>
            </Checkbox>
          );
        })}
      </Space>
    </Card>
  );
};

export default TodoList;
