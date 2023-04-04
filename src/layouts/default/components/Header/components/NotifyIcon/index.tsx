import Iconfont from '@/components/Iconfont';
import { Badge, Popover } from 'antd';
import { useState } from 'react';

interface IProps {}
const NotifyIcon: React.FC<IProps> = (props) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const content = () => {
    return <div>2344</div>;
  };

  return (
    <Badge count={98}>
      <Popover
        arrow={false}
        content={content}
        title="通知提醒"
        placement={'bottomRight'}
        trigger="click"
      >
        <Iconfont
          onClick={handleClick}
          title="通知提醒"
          type="icon-notify"
          className="action-icon"
        />
      </Popover>
    </Badge>
  );
};

export default NotifyIcon;
