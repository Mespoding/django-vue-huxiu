define("modal_rz", function (a, b, c) {
    var d;
    if (a.async("modal_build", function (a) {
            d = a
        }), $("#successRz").length > 0) {
        var e = 5, f = function () {
            e > 1 ? ($(".countdown-number").html(e - 1), e--) : window.location.href = "/member/" + uid + ".html"
        };
        setInterval(f, 1e3)
    }
    $(document).on("click", ".js-rz-btn-2", function () {
        $(this);
        "" == $("#rz-email").html() ? d.showMessagePrompt("邮箱不能为空", "error") : "" == $("#rz-mobile").html() ? d.showMessagePrompt("手机号不能为空", "error") : window.location.href = "/member/authorapply/3.html"
    }), $(document).on("click", ".js-user-renzheng-save", function () {
        var a = $(this), b = "/user/usersetting", c = {
            is_ajax: "1",
            huxiu_hash_code: huxiu_hash_code,
            name: $("#name").val(),
            sex: $("#sex").find(".active").find("input").val(),
            birthyear: $("#b_y_show").text(),
            birthmonth: $("#b_m_show").text(),
            birthday: $("#b_d_show").text(),
            company: $("#company").val(),
            position: $("#position").val(),
            address: $("#address").val(),
            weibo: $("#weibo").val(),
            weixin: $("#weixin").val(),
            wx_public: $("#wx_public").val()
        }, e = "", f = $(".js-dropdown-show");
        if ($.each(f, function (a, b) {
                if (void 0 != f.eq(a).attr("data-pmt")) {
                    var d = f.eq(a).attr("value"), e = "pmt[" + f.eq(a).attr("data-pmt") + "]";
                    c[e] = d
                }
            }), $(".error-msg").hide(), $.each($(".cy-content-input"), function (a) {
                var b = !1, c = $(this);
                "require" == c.find("input").attr("data-require") && ("" == c.find("input").val() || void 0 == c.find("input").val()) && (b = !0, c.parent(".form-cy-warp").find(".error-msg").css({display: "block"}))
            }), $.each($(".error-msg"), function () {
                var a = $(this);
                return a.parents(".form-cy-warp").find("input").length > 0 && "block" == a.css("display") ? (e = a.parents(".form-cy-warp").find("input").attr("id"), !1) : void 0
            }), "" != e) {
            var g = 170;
            if ($("#" + e).length > 0) {
                var h = $("#" + e).offset().top - g;
                $("html, body").animate({scrollTop: h}, 500)
            }
            return !1
        }
        return $(".author-tag-box ul li").length < 2 ? ($("#tagError").show(), !1) : void(a.hasClass("disabled") || (a.addClass("disabled"), $.ajax({
            type: "post",
            url: b,
            data: c,
            dataType: "json",
            async: !0,
            success: function (b) {
                1 == b.result ? window.location.href = "/member/authorapply/4.html" : d.showMessagePrompt(b.msg, "error"), a.removeClass("disabled")
            }
        })))
    })
});