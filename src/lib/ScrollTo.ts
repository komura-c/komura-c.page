const headerHeight = 48;

export function scrollTo(target: HTMLAnchorElement) {
  const id = target.hash.replace("#", "");
  if (!id) {
    return;
  }
  const targetElement = document.getElementById(id);
  if (!targetElement) {
    return;
  }
  const rectTop = targetElement.getBoundingClientRect().top;
  const position = window.pageYOffset;
  const top = rectTop + position - headerHeight;
  window.scroll({
    top,
    behavior: "smooth",
  });
  return;
}
