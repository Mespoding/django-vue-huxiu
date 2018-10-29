define("modal_tags", function (a, b) {
    $(document).on("click", ".js-search-letter-btn", function () {
        var a = $(this);
        $(this).toggleClass("dropup"), $(this).toggleClass("active"), "true" == a.attr("data-show-box") ? (a.attr("data-show-box", "false"), a.css({"border-bottom-color": "#f0f0f0"}), a.animate({height: "58px"}, 600), setTimeout(function () {
            $(".search-letter-box").slideUp()
        }, 100)) : ($(".search-letter-box").slideDown(), a.css({"border-bottom-color": "#fff"}), a.attr("data-show-box", "true"), a.animate({height: "79px"}, 500))
    }), $(document).on("click", ".js-sea-more", function () {
        $(this).hasClass("active") ? ($(".tag-content-all").slideDown(), $(".tag-content-local").hide(), $(this).html('收起<span class="caret"></span>')) : ($(".tag-content-all").hide(), $(".tag-content-local").slideDown(), $(this).html('更多<span class="caret"></span>'))
    })
});