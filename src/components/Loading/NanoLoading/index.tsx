import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const loadingIcon = <LoadingOutlined spin />;

type IProps = {
  loading: boolean;
  delay?: number;
};
const NanoLoading: React.FC<IProps> = ({ loading, delay = 150 }) => (
  <Spin delay={delay} spinning={loading} indicator={loadingIcon} />
);

export default NanoLoading;
