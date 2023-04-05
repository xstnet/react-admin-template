import Iconfont from '@/components/Iconfont';
import { Badge, Popover } from 'antd';
import NotifyCard from '../../NotifyCard';

interface IProps {}
const NotifyIcon: React.FC<IProps> = (props) => {
  return (
    <Badge count={98}>
      <Popover arrow={false} content={<NotifyCard />} placement={'bottomRight'} trigger="click">
        <Iconfont title="通知提醒" type="icon-notify" className="action-icon" />
      </Popover>
    </Badge>
  );
};

export default NotifyIcon;
