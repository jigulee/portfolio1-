$(".list li .pic").on("click", function () {
    var bg = $(this).attr("data-color");
    var imgSrc = $(this).find("img").attr("src");
    var txt = $(this).children("h1").text();
    var txt2 = $(this).children("h2").text();

    $(".bg").css("background-image", "url(" + imgSrc + ")");
    $(".bg h1").text(txt);
    $(".bg h2").text(txt2);
    $(".mask").css("background-color", bg)
    $(".list").addClass("on");
    $(".menu").addClass("on");
    $(".mask").addClass("on");

    setTimeout(function () {
        $(".bg").show();
    }, 300);

});

$(".menu").on("click", function (e) {
    e.preventDefault();

    var isOn = $(this).hasClass("on");

    if (isOn) {
        $(".list").removeClass("on");
        $(".menu").removeClass("on");
        $(".mask").removeClass("on");
    }

    setTimeout(function () {
        $(".bg").hide();
    }, 300);
})