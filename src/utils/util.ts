export function stopElementEvent(e: Event, prevent = true, propagation = true) {
  prevent && e.preventDefault();
  propagation && e.stopPropagation();
}

// 搜遍全网, 没有靠谱的在react-route-v6中 组件外使用命令跳转的方法
// location.href 真香
export function toLoginPage(delay = 500) {
  setTimeout(() => {
    window.location.href = import.meta.env.BASE_URL + 'login';
  }, delay);
}

export function toDashboardPage(delay = 500) {
  setTimeout(() => {
    window.location.href = import.meta.env.BASE_URL + 'dashboard';
  }, delay);
}

export function noop() {}

export function trimStr(str: string, substr: string, mode: 1 | 2 | 3 = 3): string {
  if (typeof str !== 'string' || typeof substr !== 'string') {
    return '';
  }

  if (!substr.length) {
    return str;
  }

  if (mode & 1) {
    // 从字符串头部开始查找要去除的内容
    if (str.startsWith(substr)) {
      return str.substring(substr.length);
    }
  }
  if (mode & 2) {
    // 从字符串尾部开始查找要去除的内容
    if (str.endsWith(substr)) {
      return str.substring(0, str.length - substr.length);
    }
  }

  return str;
}
export function trimLeftStr(str: string, substr: string): string {
  return trimStr(str, substr, 1);
}
export function trimRightStr(str: string, substr: string): string {
  return trimStr(str, substr, 2);
}
