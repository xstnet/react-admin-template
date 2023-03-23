import useThemeToken from '@/hooks/useThemeToken';
import './index.less';

interface IContextBoxProps extends React.HTMLProps<HTMLDivElement> {}

// 内容盒子
const ContentBox: React.FC<IContextBoxProps> = (props) => {
  const { children, className = '', style = {}, ...divProps } = props;

  const { colorBgContainer } = useThemeToken();

  const defaultClassName = 'content-box';
  const defaultStyle: React.CSSProperties = {
    backgroundColor: colorBgContainer
  };
  return (
    <div
      className={`${defaultClassName} ${className}`}
      style={{ ...defaultStyle, ...style }}
      {...divProps}
    >
      {children}
    </div>
  );
};

export default ContentBox;
