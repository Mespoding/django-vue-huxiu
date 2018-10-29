define("modal_report", function (a, b, c) {
    var d;
    a.async("modal_build", function (a) {
        d = a
    });
    var e = [], f = function () {
        $(".article-img-box img").attr("data-index", 0), e = [{
            id: 0,
            src: $(".article-img-box img").attr("src")
        }], $.each($(".report-content-wrap img"), function (a) {
            var b = $(this);
            b.attr("data-index", a + 1), e.push({id: a + 1, src: b.attr("src")})
        });
        var a = localStorage.getItem("report-title");
        a || $(".report-title-box").show()
    };
    $(".report-content-wrap").length > 0 && f(), $(document).on("click", ".report-content-wrap img,.article-img-box img", function () {
        var a = $(this), b = a.attr("src");
        h(b, a.attr("data-index")), $("#gallery-img-modal").show(), $("body").css("overflow-y", "hidden")
    });
    var g = function (a) {
        var b = new Image, c = "", d = "";
        b.src = a, b.onload = function () {
            if (c = b.width, d = b.height, c < .8 * window.innerWidth && d < window.innerHeight - 80) {
                var a = (window.innerHeight - 80 - d) / 2;
                $("#gallery-modal-img").css("margin-top", a)
            } else if (c > d) {
                var e = (.8 * window.innerWidth - 80) * (d / c), a = (window.innerHeight - 80 - e) / 2;
                0 > a ? $("#gallery-modal-img").css("margin-top", 0) : $("#gallery-modal-img").css("margin-top", a)
            } else $("#gallery-modal-img").css("margin-top", 0)
        }
    }, h = function (a, b) {
        $("#gallery-modal-img").attr("src", a), g(a), $("#gallery-modal-img").attr("data-index", b), $(".report-img-page .current").html(parseInt(b) + 1), $(".report-img-page .total").html(e.length)
    };
    $(document).on("click", ".js-white-close", function () {
        $(this);
        $("#gallery-img-modal").hide(), $("body").css("overflow-y", "auto")
    }), $(document).on("click", ".js-report-left", function (a) {
        var b = $("#gallery-modal-img").attr("data-index"), c = "", d = 0;
        0 == parseInt(b) ? (c = e[e.length - 1].src, d = e.length - 1) : (c = e[parseInt(b) - 1].src, d = parseInt(b) - 1), h(c, d)
    }), $(document).on("click", ".js-report-right", function (a) {
        var b = $("#gallery-modal-img").attr("data-index"), c = "", d = 0;
        parseInt(b) + 1 == e.length ? (c = e[0].src, d = 0) : (c = e[parseInt(b) + 1].src, d = parseInt(b) + 1), h(c, d)
    }), $(document).on("click", ".js-close-report-title", function () {
        $(this);
        $(".report-title-box").hide(), localStorage.setItem("report-title", !0)
    }), $(document).on("mouseenter", ".js-column-link", function () {
        var a = $(this), b = a.find(".report-vip-qr");
        a.hasClass("disabled") || (a.addClass("disabled"), b.stop().css({
            opacity: "0",
            "margin-left": "-270px"
        }).show().animate({opacity: "1", "margin-left": "-250px"}, 300))
    }), $(document).on("mouseleave", ".js-column-link", function () {
        var a = $(this), b = a.find(".report-vip-qr");
        b.stop().animate({opacity: "0", "margin-left": "-270px"}, 400, function () {
            b.hide()
        }), a.removeClass("disabled")
    });
    var i = function (a, b) {
        var c = "/action/article_list/", e = {
            huxiu_hash_code: huxiu_hash_code,
            is_ajax: 1,
            catid: "23",
            page: a,
            is_free: $("#report_is_free").val()
        };
        $.ajax({
            type: "post", url: c, data: e, dataType: "json", async: !0, success: function (a) {
                1 == a.result ? b(a) : d.showMessagePrompt(a.msg, "error")
            }, error: function (a) {
            }
        })
    };
    $(document).on("click", ".js-report-tag", function () {
        var a = $(this);
        $(".js-report-tag").removeClass("active"), a.addClass("active"), $("#report_is_free").val(a.attr("data-value"));
        var b = function (b) {
            $(".mod-info-flow").empty().append(b.data), a.removeClass("disabled")
        };
        a.hasClass("disabled") || (a.addClass("disabled"), i(1, b))
    }), $(document).on("click", ".js-get-more-report", function () {
        var a = $(this), b = function (b) {
            $(".mod-info-flow").append(b.data), a.attr("data-cur-page", parseInt(a.attr("data-cur-page")) + 1), a.removeClass("disabled")
        };
        a.hasClass("disabled") || (a.addClass("disabled"), i(a.attr("data-cur-page"), b))
    }), $(".title-box").length > 0 && ($("body").css({overflow: "hidden"}), $("#pl-wrap-article").remove())
});