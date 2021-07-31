var $frame = $("#news .wrap");
var $btns = $frame.find("dt");
var $Boxs = $frame.find("dd");
var speed = 300;
var enableClick = true;

$btns.on("click", function (e) {
    e.preventDefault();

    if (enableClick) {
        activation(this);
        enableClick = false;
    }
});

function activation(self) {
    var isOn = $(self).hasClass("on");

    if (isOn) {
        $(self).removeClass("on");
        $(self).next("dd").slideUp(speed / 2, function () {
            enableClick = true;
        });
    } else {
        $(self).addClass("on");
        $(self).next("dd").slideDown(speed, function () {
            enableClick = true;
        });
    }
}