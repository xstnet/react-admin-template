import { useRequest } from 'ahooks';

type UseReqeustType = typeof useRequest;
const useManualRequest: UseReqeustType = (services, options, plugins) => {
  const manual = { manual: true, debounceWait: 50 };
  const overrideOptions = options ? { ...manual, ...options } : manual;
  return useRequest(services, overrideOptions, plugins);
};

export default useManualRequest;
