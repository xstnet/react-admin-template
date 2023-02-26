interface IProps extends ItemSharedProps {
  icon: string;
}

// 关于设置svg颜色不生效的原因:
// @link: https://juejin.cn/post/6844903827288621070
// 批量去色后记得修改引用链接
const Iconfont: React.FC<IProps> = (props) => {
  const { icon, style, className = '' } = props;

  return (
    <svg className={`icon-font ${className}`} style={style} aria-hidden="true">
      <use xlinkHref={`#${icon}`}></use>
    </svg>
  );
};

export default Iconfont;
