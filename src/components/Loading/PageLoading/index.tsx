import { Spin } from 'antd';

type IProps = {
  loading: boolean;
  title?: string;
};
const PageLoading: React.FC<IProps> = ({ loading, title }) => {
  return (
    <Spin spinning={loading} tip={title}>
      <div style={{ height: '100vh', width: '100vw' }}></div>
    </Spin>
  );
};

export default PageLoading;
