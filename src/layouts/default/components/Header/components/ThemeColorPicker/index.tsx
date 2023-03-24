import { CheckOutlined } from '@ant-design/icons';
import { useState } from 'react';
import './index.less';

interface IProps {
  presetColors?: string[];
  defaultSelectedColor?: string;
}
const ThemeColorPicker: React.FC<IProps> = (props) => {
  const defaultColors = [
    '#1890ff',
    '#2f54eb',
    '#722ed1',
    '#eb2f96',
    '#00b96b',
    '#52c41a',
    '#13c2c2',
    '#1677ff',
    '#f5222d',
    '#fa8c16',
    '#a0d911',
    '#fadb14',
    '#faad14'
  ];
  const { presetColors = defaultColors, defaultSelectedColor = '' } = props;
  const [selectedColor, setSelectedColor] = useState(defaultSelectedColor);
  return (
    <div className="theme-color-wrap">
      {presetColors.map((color) => {
        return (
          <div key={color} className="theme-color-item" style={{ backgroundColor: color }}>
            {selectedColor === color && <CheckOutlined className="checked-icon" />}
          </div>
        );
      })}
    </div>
  );
};
export default ThemeColorPicker;
