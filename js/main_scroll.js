var $btns = $("#navi li");
var $boxs = $(".myScroll"); //모든 인덱스에 추가해서 공통으로 사용
var len = $btns.length;
var posArr = [];
var speed = 1000;
var baseLine = -300;

//처음 로딩시 해당 박스의 위치값을 구하는 함수 호출
setPos();

//브라우저 리사이즈 다시 세로 위치값을 갱신
$(window).on("resize", setPos);

//네비 버튼 클릭시 해당 위치로 이동하는 함수호출
$btns.children("a").on("click", function (e) {
    e.preventDefault();
    moveScroll(this);
});

//브라우저 스크롤시 해당 스크롤값과 박스의 위치값을 비교해서
//자동으로 버튼 활성화해주는 함수 호출
$(window).on("scroll", function () {
    var scroll = $(this).scrollTop();
    activateBtn(scroll);
});

//현재 스크롤 위치값을 인수로 받아서 스크롤값과 박스의 위치를 비교해서
//해당하는 버튼만 활성화시는 함수
function activateBtn(scroll) {
    for (var i = 0; i < len; i++) {

        if (scroll >= posArr[i] + baseLine) {
            $btns.children("a").removeClass("on");
            $btns.eq(i).children("a").addClass("on");

            $boxs.removeClass("on");
            $boxs.eq(i).addClass("on");
        }
    }
}

function moveScroll(el) {
    var target = $(el).attr("href");
    var targetPos = $(target).offset().top;

    $("html, body").animate({
        scrollTop: targetPos
    }, speed);
}

function setPos() {
    posArr = [];

    for (var i = 0; i < len; i++) {
        posArr.push($boxs.eq(i).offset().top);
    }

    console.log(posArr);
}