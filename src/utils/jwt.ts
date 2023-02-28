import { decode } from 'js-base64';
import Cache from '@/utils/cache';
import Config from '@/configs';

export function parseToken<D = TokenData>(token: string): TokenMeta<D> | undefined {
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

export function validateToken(): boolean {
  const token = Cache.getString(Config.tokenKey);
  if (!token) {
    return false;
  }

  const tokenData = parseToken(token);
  // token 存在 && 含有uid && 未过期
  if (
    tokenData !== undefined &&
    tokenData?.data?.uid > 0 &&
    tokenData.exp > new Date().getTime() / 1000
  ) {
    return true;
  }
  return false;
}
