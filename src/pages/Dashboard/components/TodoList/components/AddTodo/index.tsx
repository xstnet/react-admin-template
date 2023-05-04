import { TodoItemEnum } from '@/constants/enum';
import { randomNumber } from '@/utils/util';
import { EnterOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Space } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

type IProps = {
  onAdd: (todo: Model.TodoList) => void;
};
const AddTodo: React.FC<IProps> = ({ onAdd }) => {
  const inputRef = useRef<InputRef>(null);
  // 是否正在添加todo
  const [isAdding, setIsAdding] = useState(false);
  const [totoValue, setTodoValue] = useState('');

  const handleAddToto = () => {
    if (!totoValue) return;
    const now = dayjs().format('YYYY-MM-DD HH:MM:SS');

    const todo = {
      name: totoValue,
      status: TodoItemEnum.incomplete,
      id: randomNumber(100, 1000000000),
      create_time: now,
      update_time: now
    };
    onAdd(todo);
    setTodoValue('');
  };

  useEffect(() => {
    // 聚焦处理
    if (isAdding) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [isAdding]);

  return (
    <Space.Compact style={{ width: '100%', marginBottom: '16px' }}>
      <Input
        ref={inputRef}
        autoComplete="off"
        value={totoValue}
        onFocus={() => setIsAdding(true)}
        onBlur={() => setIsAdding(false)}
        onChange={(e) => setTodoValue(e.target.value)}
        placeholder="Add Todo"
        suffix={isAdding ? <EnterOutlined style={{ opacity: 0.5 }} color="red" /> : <span />}
        onPressEnter={handleAddToto}
      />
      <Button onClick={handleAddToto} type="primary" icon={<PlusOutlined />} />
    </Space.Compact>
  );
};

export default AddTodo;
