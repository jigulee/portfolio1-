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


