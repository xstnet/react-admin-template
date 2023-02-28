export function stopElementEvent(e: Event, prevent = true, propagation = true) {
  prevent && e.preventDefault();
  propagation && e.stopPropagation();
}

export function toLoginPage() {
  history.replaceState({}, '', '/login');
}

export function toDashboardPage() {
  history.replaceState({}, '', '/dashboard');
}
