import { decode } from 'js-base64';

export type TokenType<D> = {
  iat: number;
  exp: number;
  aud: string;
  iss: string;
  sub: string;
  data: D;
};

export function parseToken<D>(token: string): TokenType<D> | undefined {
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
