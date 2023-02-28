import { createFromIconfontCN } from '@ant-design/icons';
import Config from '@/configs';

// antd 支持使用 iconfont 图标
// https://ant.design/components/icon-cn#%E8%87%AA%E5%AE%9A%E4%B9%89-font-%E5%9B%BE%E6%A0%87
// 关于设置svg颜色不生效的原因:
// @link: https://juejin.cn/post/6844903827288621070
// 批量去色后记得修改引用链接
const Iconfont = createFromIconfontCN({
  scriptUrl: Config.iconFontUrl,
  extraCommonProps: {}
});

export default Iconfont;
