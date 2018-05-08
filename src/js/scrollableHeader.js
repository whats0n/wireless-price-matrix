function getScrollParent(node) {
  if (node == null) {
    return null;
  }

  if (node.scrollHeight > node.clientHeight) {
    return node;
  } else {
    return getScrollParent(node.parentNode);
  }
}

const watch = [];

$('.js-scrollable-header').each((i, container) => {

  const containerJQ = $(container);

  watch.push(() => {
    if (container.stickyInited) return;

    const scrollableParent = $(getScrollParent(container));

    if (!scrollableParent.length) return;

    container.stickyInited = true;

    scrollableParent.scrollTop(0);
    const start = containerJQ.offset().top - scrollableParent.offset().top;

    scrollableParent.on('scroll', () => {
      const top = scrollableParent.scrollTop();
      const position = top <= start ? 0 : top - start;
		  containerJQ.css('transform', `translate3d(0,${position}px,0)`);
    });
  });
  
});

let timer = null;

watch.length && $(window).on('resize load', () => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => watch.forEach(fn => fn()), 200);
});
