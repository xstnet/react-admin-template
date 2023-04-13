import { SettingContext } from '@/contexts/Setting';
import { Spin } from 'antd';
import { useContext } from 'react';
import './index.less';

type IProps = {
  loading: boolean;
  title?: string;
  delay?: number;
};
const PageLoading: React.FC<IProps> = ({ loading, title, delay }) => {
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
      <div style={{ height: '100vh', width: '100vw' }}></div>
    </Spin>
  );
};

export default PageLoading;
