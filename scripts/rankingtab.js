$(function () {
  const $rankingbtn1 = $("#rankingbtn1");
  const $rankingbtn2 = $("#rankingbtn2");
  const $rankingbtn3 = $("#rankingbtn3");
  const $rankingbtn4 = $("#rankingbtn4");
  const $rankingbtn5 = $("#rankingbtn5");
  const $rankingbtn6 = $("#rankingbtn6");

  const $rankingbtns = $(".categoryranking-btn");

  const $rankingitems = $(".rankingitembox");

  $rankingbtns.on("click", function () {
    const targetId = $(this).data("target");

    // 버튼 active 초기화 및 부여
    $rankingbtns.removeClass("active");
    $(this).addClass("active");

    // 연결된 랭킹아이템 actvie 초기화 및 부여
    $rankingitems.removeClass("active");
    $("#" + targetId).addClass("active");
  });
});
