export const iframeUrlPrefix = '/iframe';

export const createIframeUrl = (url: string): string => {
  return `${iframeUrlPrefix}?url=${url}`;
};
