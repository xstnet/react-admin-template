import { postAddTodo } from '@/api';
import useManualRequest from '@/hooks/useManualRequest';
import { EnterOutlined, PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Input, InputRef, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';

type IProps = {
  onAdd: (todo: Model.TodoList) => void;
};
const AddTodo: React.FC<IProps> = ({ onAdd }) => {
  const inputRef = useRef<InputRef>(null);
  // 是否正在添加todo
  const [isAdding, setIsAdding] = useState(false);
  const [todoValue, setTodoValue] = useState('');

  const { loading: addTodoLoading, run: addTodo } = useManualRequest(postAddTodo, {
    loadingDelay: 200,
    onSuccess: (todo) => {
      onAdd(todo);
      setTodoValue('');
    }
  });

  const handleAddToto = () => {
    if (!todoValue || addTodoLoading) return;
    addTodo({ name: todoValue });
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
        readOnly={addTodoLoading}
        autoComplete="off"
        value={todoValue}
        onFocus={() => setIsAdding(true)}
        onBlur={() => setIsAdding(false)}
        onChange={(e) => setTodoValue(e.target.value)}
        placeholder="Add Todo"
        suffix={
          isAdding && !addTodoLoading ? (
            <EnterOutlined style={{ opacity: 0.5 }} color="red" />
          ) : (
            <span />
          )
        }
        onPressEnter={handleAddToto}
      />
      <Button
        onClick={handleAddToto}
        loading={addTodoLoading}
        type="primary"
        icon={<PlusOutlined />}
      />
    </Space.Compact>
  );
};

export default AddTodo;
