var $tab = $("#tab");
var $btns = $tab.find("dt a");
var $boxs = $tab.find("dd");
var enableClick = true;


$btns.on("click", function (e) {
    e.preventDefault();

    var isOn = $(this).hasClass("on");
    if (isOn) return;

    if (enableClick) {
        activation(this);
        enableClick = false;
    }

});

function activation(el) {
    var target = $(el).attr("href");

    $btns.removeClass("on");
    $(el).addClass("on");

    $boxs.fadeOut(500, function () {
        $boxs.removeClass("on");
    });
    $(target).fadeIn(500, function () {
        $(this).addClass("on");
        enableClick = true;
    });
}

