import { decode } from 'js-base64';

export function parseToken<D>(token: string): TokenMeta<D> | undefined {
  const split = token.split('.')[1];
  if (!split) {
    return undefined;
  }
  try {
    return JSON.parse(decode(split));
  } catch (err) {
    console.warn('Parse Token Error: ', err);
    return undefined;
  }
}
