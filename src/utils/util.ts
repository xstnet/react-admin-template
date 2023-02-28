export function stopElementEvent(e: Event, prevent = true, propagation = true) {
  prevent && e.preventDefault();
  propagation && e.stopPropagation();
}

// 搜遍全网, 没有靠谱的在react-route-v6中 组件外使用命令跳转的方法
// location.href 真香
export function toLoginPage(delay = 500) {
  setTimeout(() => {
    window.location.href = '/login';
  }, delay);
}

export function toDashboardPage(delay = 500) {
  setTimeout(() => {
    window.location.href = '/dashboard';
  }, delay);
}
