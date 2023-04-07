import { CheckOutlined } from '@ant-design/icons';
import { useState } from 'react';
import './index.less';

interface IProps {
  // antd 自定义表单组件
  value?: string;
  onChange?: (value: string) => void;

  presetColors?: string[];
  defaultSelectedColor?: string;
}
const ThemeColorPicker: React.FC<IProps> = (props) => {
  const defaultColors = [
    '#1890ff',
    '#722ed1',
    '#eb2f96',
    '#00b96b',
    '#52c41a',
    '#13c2c2',
    '#1677ff',
    '#f5222d',
    '#fa8c16',
    '#faad14'
  ];
  const { onChange, presetColors = defaultColors, defaultSelectedColor = '' } = props;
  const { value = defaultSelectedColor } = props;

  const [selectedColor, setSelectedColor] = useState(value);

  const handleClick = (color: string) => {
    setSelectedColor(color);
    onChange?.(color);
  };
  return (
    <div className="theme-color-wrap">
      {presetColors.map((color) => {
        return (
          <div
            key={color}
            onClick={() => handleClick(color)}
            className="theme-color-item"
            style={{ backgroundColor: color }}
            title={color}
          >
            {selectedColor === color && <CheckOutlined className="checked-icon" />}
          </div>
        );
      })}
    </div>
  );
};
export default ThemeColorPicker;
