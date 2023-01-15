const headerHeight = 48;

export function scrollTo(target: Element) {
  if (!target) return;
  const id = (target as HTMLAnchorElement).hash.replace("#", "");
  if (!id) return;
  const targetElement = document.getElementById(id);
  if (!targetElement) return;
  const rectTop = targetElement.getBoundingClientRect().top;
  const position = window.pageYOffset;
  const top = rectTop + position - headerHeight;
  window.scroll({
    top,
    behavior: "smooth",
  });
  return;
}
