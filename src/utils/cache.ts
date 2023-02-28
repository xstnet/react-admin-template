import Config from '@/configs';

function set(k: string, v: any) {
  localStorage.setItem(k, typeof v === 'object' ? JSON.stringify(v) : v);
}
function setToken(v: any) {
  localStorage.setItem(Config.tokenKey, typeof v === 'object' ? JSON.stringify(v) : v);
}

function getString(k: string): string | null {
  const v = localStorage.getItem(k);
  return v;
}

function getNumber(k: string): number | undefined {
  const v = localStorage.getItem(k);
  if (v === null) {
    return undefined;
  }
  return Number(v);
}

function getBoolean(k: string): boolean | undefined {
  const v = localStorage.getItem(k);
  if (v === null) {
    return undefined;
  }
  return v === 'true';
}

function getObject<T = {}>(k: string): T | undefined {
  const v = localStorage.getItem(k);
  if (v === null) {
    return undefined;
  }
  return JSON.parse(v);
}

function has(k: string): boolean {
  return getString(k) !== null;
}

function remove(k: string) {
  localStorage.removeItem(k);
}

function removeToken() {
  localStorage.removeItem(Config.tokenKey);
}

function clear() {
  localStorage.clear();
}

const Cache = {
  set,
  setToken,
  has,
  getString,
  getObject,
  getBoolean,
  getNumber,
  remove,
  removeToken,
  clear
};

export default Cache;
