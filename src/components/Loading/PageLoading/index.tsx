import { SettingContext } from '@/contexts/Setting';
import { Spin } from 'antd';
import { useContext } from 'react';
import './index.less';

type IProps = {
  loading?: boolean;
  title?: string;
  delay?: number;
};
const PageLoading: React.FC<IProps> = ({ loading = true, title = '页面加载中', delay = 50 }) => {
  const {
    settings: { theme: themeMode }
  } = useContext(SettingContext);
  return (
    <Spin
      size="large"
      spinning={loading}
      tip={title}
      delay={delay}
      wrapperClassName={`page-loading-spin-${themeMode}`}
    >
      <div style={{ height: '100%', width: '100%' }}></div>
    </Spin>
  );
};

export default PageLoading;
