export function stopElementEvent(e: Event, prevent = true, propagation = true) {
  prevent && e.preventDefault();
  propagation && e.stopPropagation();
}
