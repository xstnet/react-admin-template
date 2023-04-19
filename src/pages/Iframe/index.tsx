import ContentBox from '@/components/ContextBox';
import { MenuContext } from '@/contexts/Menu';
import { Alert, Spin } from 'antd';
import { useContext, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './index.less';

interface IProps {
  title?: string;
  name?: string;
}
const IframePage: React.FC<IProps> = (props) => {
  const { title = 'Iframe Page', name = 'internal-iframe' } = props;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loadingIframe, setLoadingIframe] = useState(true);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoadingIframe(true);
  }, [searchParams]);

  const url = searchParams.get('url');

  const handleIframeOnLoad = () => {
    setLoadingIframe(false);
  };

  const { mapPathToMenu } = useContext(MenuContext);

  const iframePageTitle = mapPathToMenu.get(url || '')?.label || '第三方页面';

  if (!url) {
    return (
      <ContentBox>
        <Alert message="无效的url地址" type="error" />
      </ContentBox>
    );
  }

  return (
    <>
      <ContentBox style={{ height: '100%', padding: 0 }}>
        <Spin
          wrapperClassName="iframeSpin"
          spinning={loadingIframe}
          tip={`正在加载${iframePageTitle}, 请稍后...`}
        >
          <iframe
            ref={iframeRef}
            width="100%"
            height="100%"
            onLoad={handleIframeOnLoad}
            title={title}
            name={name}
            src={url}
          />
        </Spin>
      </ContentBox>
    </>
  );
};

export default IframePage;
