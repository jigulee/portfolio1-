(function ($) {

    $.defaults = {
        count: 5
    }

    $.fn.myYoutube = function (option) {

        var result_opt = $.extend({}, $.defaults, option);

        if (result_opt.key == undefined || result_opt.playList == undefined) {
            console.error("key와 playList는 필수입력사항입니다.");
            //location.href= "https://www.플러그인문서.html";
        }

        new Youtube(this, result_opt);
        return this;
    }

    function Youtube(el, option) {
        this.init(el, option);
        this.bindingEvent();
    }

    Youtube.prototype.init = function (el, opt) {
        this.frame = el; // $("#vidGallery") 제이쿼리 선택자
        this.key = opt.key;
        this.playList = opt.playList;
        this.count = opt.count;
    }
    Youtube.prototype.bindingEvent = function () {
        this.callData();

        //썸네일 클릭시 이벤트
        $("body").on("click", "article a", function (e) { //
            e.preventDefault();
            var vidID = $(e.currentTarget).attr("href"); //.
            this.createPop(vidID);
        }.bind(this));

        //닫기버튼 이벤트
        $("body").on("click", ".pop_youtube .close", function (e) {
            e.preventDefault();
            this.removePop();
        }.bind(this));
    }
    Youtube.prototype.callData = function () {
        $.ajax({
            url: "https://www.googleapis.com/youtube/v3/playlistItems",
            dataType: "jsonp",
            data: {
                part: "snippet",
                key: this.key,
                playlistId: this.playList,
                maxResults: this.count
            }
        })
            .success(function (data) {
                var items = data.items;
                this.createList(items);
            }.bind(this))

            .error(function (err) {
                console.error(err);
            })
    }
    Youtube.prototype.createList = function (items) {
        $(items).each(function (index, data) {
            console.log(data);
            var tit = data.snippet.title;
            var txt = data.snippet.description;
            var date = data.snippet.publishedAt.split("T")[0];
            var imgSrc = data.snippet.thumbnails.high.url;
            var vidId = data.snippet.resourceId.videoId;

            if (txt.length > 200) {
                txt = txt.substr(0, 200) + "...";
            }

            this.frame
                .append(
                    $("<article>")
                        .append(
                            $("<div class='picbox'>")
                                .append(
                                    $("<a class='pic'>")
                                        .attr({ href: vidId })
                                        .css({ backgroundImage: "url(" + imgSrc + ")" })
                                ),

                            $("<div class='con'>")
                                .append(
                                    $("<h2>").text(tit),
                                    $("<p>").text(txt),
                                    $("<span>").text(date),
                                    $("<a>").text("VIEW")
                                        .attr({ href: vidId })
                                )
                        )
                )

        }.bind(this))
    }
    Youtube.prototype.createPop = function (vidID) {
        $("body")
            .append(
                $("<aside class='pop_youtube'>") //팝업창
                    .css({
                        width: "100%", height: "100%",
                        position: "fixed", top: 0, left: 0,
                        backgroundColor: "rgb(255, 255, 255,0.8)",
                        display: "none",
                        boxSizing: "border-box",
                        padding: 100,
                    })
                    .append(
                        $("<img src='img/loading.gif'>")
                            .css({
                                width: 80, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)"
                            })
                    )
                    .append(
                        $("<div class='con'>")
                            .css({
                                width: "100%",
                                height: "100%",
                                position: "relative",
                                display: "none",
                            })
                            .append(
                                $("<iframe>")
                                    .attr({
                                        src: "https://www.youtube.com/embed/" + vidID,
                                        width: "100%",
                                        height: "80%",
                                        frameborder: 0,
                                        allowfullscreen: true,
                                    })
                            )
                    )
                    .append(
                        $("<a href='#' class='close'>") //닫기 버튼
                            .text("close")
                            .css({
                                position: "absolute",
                                bottom: 150, right: 105,
                                color: "#8aacc8",
                                fontSize: 18
                            })
                    ).fadeIn()
            )// .pop append ends

        setTimeout(function () {
            $(".pop_youtube .con").fadeIn(500, function () {
                $(".pop > img").remove();
            })
        }, 1000)
    }
    Youtube.prototype.removePop = function () {
        $(".pop_youtube").fadeOut(500, function () {
            $(this).remove();
        })
    }
})(jQuery);


