define("modal_index", function (a, b) {
    $(document).on("click", ".js-get-mod-more-list", function () {
        var a = $(this),
            b = "/action/article_list/",
            c = {
                huxiu_hash_code: huxiu_hash_code,
                page: parseInt(a.attr("data-cur_page")) + 1,
                catid: a.attr("data-catid"),
                last_dateline: a.attr("data-last_dateline")
            };
        console.log(c);
        // "23" == c.catid && (c.is_free = $("#report_is_free").val()),
        $.ajax({
            type: "post",
            url: b,
            data: c,
            dataType: "json",
            async: !0,
            beforeSend: function (b) {
                a.html("正在加载..."), a.removeClass("js-get-mod-more-list")
            },
            success: function (b) {
                1 == b.result && ("0" == a.attr("data-cur_page") && $(".mod-info-flow").empty(),
                    a.attr("data-last_dateline", b.last_dateline),
                    $(".mod-info-flow").append(b.data),
                    a.attr("data-cur_page", parseInt(a.attr("data-cur_page")) + 1),
                    $("#loading").remove(),
                    $("img.lazy").lazyload({
                        placeholder: "/static/img/bg.png",
                        effect: "fadeIn",
                        threshold: 1
                    })),
                parseInt(a.attr("data-cur_page")) == b.total_page && a.remove(),
                    a.html("点击加载更多"),
                    a.addClass("js-get-mod-more-list"),
                    $(".msubstr-row2").ellipsis({row: 3})
            },
            error: function (a) {
            }
        })
    })
});