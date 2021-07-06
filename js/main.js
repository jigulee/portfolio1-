// btnCall 
var btnCall = document.querySelector(".btnCall");
var menuMo = document.querySelector(".menuMo");

btnCall.onclick = function () {
    btnCall.classList.toggle("on");
    menuMo.classList.toggle("on");
}


//skipNavi
$("#skipNavi li a").on("focusin", function () {
    $(this).addClass("on");
});

$("#skipNavi li a").on("focusout", function () {
    $(this).removeClass("on");
});


//gnb
var $header = $("#sub_header");
var $gnb = $("#gnb");
var $gnb_li = $gnb.find("li");
var $gnb_ul = $gnb_li.find("ul");
var $sub = $gnb_li.find(".sub");
var speed = 500;

$gnb_li.on("mouseenter focusin", function () {
    openSub(this);
});

$gnb_li.on("mouseleave focusout", function () {
    closeSub(this);
});

function openSub(el) {
    $(el).children(".sub").stop().slideDown(speed);
    $(el).children("a").addClass("on");
}

function closeSub(el) {
    $(el).children(".sub").stop().slideUp(speed / 2);
    $(el).children("a").removeClass("on");
}
