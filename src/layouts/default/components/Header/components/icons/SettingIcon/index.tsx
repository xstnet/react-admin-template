import Iconfont from '@/components/Iconfont';
import { useState } from 'react';
import SettingDrawer from '../../SettingDrawer';

interface IProps {}
const SettingIcon: React.FC<IProps> = (props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <SettingDrawer open={open} onClose={handleClose} />
      <Iconfont onClick={handleOpen} title="设置" type="icon-setting" className="action-icon" />
    </div>
  );
};

export default SettingIcon;
