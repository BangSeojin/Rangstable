$(function () {
  const $slide = $(".main-slide");
  const $inner = $(".main-slide-inner");
  const $dots = $(".pagination-dot");

  const slideCount = $inner.children().length;

  let number = 0;
  let timer;
  const DELAY = 5000;

  function getSlideWidth() {
    return $slide.width();
  }

  function updateSlide() {
    const slideWidth = getSlideWidth();
    $inner.css("transform", `translateX(${-slideWidth * number}px)`);
    $dots.removeClass("active").eq(number).addClass("active");
  }

  function go(n) {
    if (n >= slideCount) n = 0;
    if (n < 0) n = slideCount - 1;
    number = n;
    updateSlide();
  }

  function start() {
    timer = setInterval(() => go(number + 1), DELAY);
  }

  function stop() {
    clearInterval(timer);
  }

  start();

  // 페이지네이션 작동
  $dots.on("click", function () {
    stop();
    const index = $(this).index();
    go(index);
    start();
  });

  let startX = 0;
  let baseX = 0;
  let dragging = false;

  $slide.on("mousedown touchstart", function (e) {
    stop();
    dragging = true;
    startX = e.pageX || e.originalEvent.touches[0].pageX;
    baseX = -getSlideWidth() * number;
    $inner.css("transition", "none");
  });

  // 드래그 작동
  $(document).on("mousemove touchmove", function (e) {
    if (!dragging) return;

    let x = e.pageX || e.originalEvent.touches[0].pageX;
    let diff = x - startX;

    const slideWidth = getSlideWidth();

    if ((number === 0 && diff > 0) || (number === slideCount - 1 && diff < 0)) {
      diff = 0;
    }

    $inner.css("transform", `translateX(${baseX + diff}px)`);
  });

  $(document).on("mouseup touchend", function (e) {
    if (!dragging) return;

    dragging = false;
    $inner.css("transition", "transform .5s ease");

    let x =
      e.pageX ||
      (e.originalEvent.changedTouches &&
        e.originalEvent.changedTouches[0].pageX);

    let diff = x - startX;
    const slideWidth = getSlideWidth();

    if (diff > slideWidth / 4) go(number - 1);
    else if (diff < -slideWidth / 4) go(number + 1);
    else updateSlide();

    start();
  });

  $(window).on("resize", function () {
    updateSlide();
  });
});
