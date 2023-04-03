import { DayjsFormatEnum, TodoItemEnum } from '@/constants/enum';
import useThemeToken from '@/hooks/useThemeToken';
import { randomNumber } from '@/utils/util';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Space, Input, Button, Checkbox, Typography, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

const Text = Typography.Text;

interface ITodoItem {
  id: number;
  name: string;
  status: TodoItemEnum;
  create_time: string;
  update_time: string;
}

const now = () => dayjs().format(DayjsFormatEnum.second);

const TodoList: React.FC = () => {
  // 当前正聚焦的todo item, 用以显示操作项, 如: 编辑/删除等
  const [focusTodo, setFocusTodo] = useState(0);
  const { colorPrimary } = useThemeToken();
  const [todoList, setTodoList] = useState<ITodoItem[]>([
    {
      id: randomNumber(100, 1000000000),
      name: '鼠标悬浮时在显示编辑图标',
      status: TodoItemEnum.Incomplete,
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

  const [newTotoValue, setNewTodoValue] = useState('');

  const handleAddToto = () => {
    if (!newTotoValue) return;
    setTodoList([
      {
        name: newTotoValue,
        status: TodoItemEnum.Incomplete,
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
          : { ...item, status: checked ? TodoItemEnum.completed : TodoItemEnum.Incomplete }
      )
    );
  };

  const handleUpdate = (id: ITodoItem['id'], newName: string) => {
    console.log('iii', id, newName);
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
            value={newTotoValue}
            onChange={(e) => setNewTodoValue(e.target.value)}
            placeholder="添加新事项"
            onPressEnter={handleAddToto}
          />
          <Button onClick={handleAddToto} type="primary" icon={<PlusOutlined />} />
        </Space.Compact>
        {todoList.map(({ id, status, name }) => {
          const completed = status === TodoItemEnum.completed;
          const showAction = focusTodo === id && status === TodoItemEnum.Incomplete;
          return (
            <Checkbox
              onChange={({ target: { checked } }) => handleChangeStatus(id, checked)}
              key={id}
              checked={completed}
            >
              <Text
                type={completed ? 'secondary' : undefined}
                delete={completed}
                onMouseEnter={() => setFocusTodo(id)}
                onMouseLeave={() => setFocusTodo(0)}
                editable={showAction ? { onChange: (newName) => handleUpdate(id, newName) } : false}
              >
                <Space>
                  {name}
                  {showAction && (
                    <Tooltip title="删除">
                      <DeleteOutlined
                        onClick={() => handleDelete(id)}
                        style={{ color: colorPrimary }}
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
