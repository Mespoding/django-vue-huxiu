define("modal_rumor", function (a, b) {
    var c;
    a.async("modal_build", function (a) {
        c = a
    });
    var d = !0;
    d && ($(".js-modal-bruntdrop").hide(), $("#obl_box").hide()), $(document).on("click", ".js-show-bruntback-box1", function () {
        var a = $(this), b = a.attr("data-url"), d = "我要爆料", e = '<div class="brunt-box-content"><div class="content-box"><div class="brunt-little-title"><div class="brunt-star">*</div><p>爆料消息：</p></div><textarea id="brunt-content" class="form-control" placeholder="请输入爆料信息（不能少于10个字）"></textarea><div class="content-error-box"><i class="icon-error pull-left"></i><p class="brunt-content-error pull-left">爆料信息不能少于10个字</p><div class="clear"></div></div></div><div class="contact-box"><div class="brunt-little-title contact-title"><div class="brunt-star">*</div><p>联系方式：</p></div><input class="form-control" id="brunt-contact" placeholder="请输入手机/邮箱，云酒管理员可见，放心填写"><div class="contact-error-box"><i class="icon-error pull-left"></i><p class="brunt-content-error pull-left">联系方式格式不正确</p><div class="clear"></div></div></div><div class="source-box"><div class="brunt-little-title  contact-title"><p>消息来源：</p></div><input class="form-control" id="brunt-source" placeholder="来源"></div><a class="btn btn-article obrunt-submit transition" data-url="' + b + '">提交</a></div>';
        c.showBoxContent("obl_box", d, e), _hmt.push(["_trackEvent", "首页-我要爆料第一步", "点击", "点击"])
    }), $(document).on("click", ".js-obruntback-close", function () {
        setTimeout(function () {
            $("#obl_box").modal("hide")
        }, 0)
    }), $(document).on("mouseover", "#obl_box", function () {
        d = !1
    }), $(document).on("mouseout", "#obl_box", function () {
        d = !0
    });
    var e = function (a, b, d, e) {
        var f = $("#brunt-content").val(), g = $("#brunt-contact").val(), h = $("#brunt-source").val(), i = !1, j = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/, k = /\S+@\S+\.\S+/;
        if (f.trim().length < 10 ? ($(".content-error-box").show(), $("#brunt-content").focus(), i = !0) : $(".content-error-box").hide(), 0 == j.test(g) && 0 == k.test(g) ? ($(".contact-error-box").show(), $("#brunt-contact").focus(), i = !0) : $(".contact-error-box").hide(), i)return !1;
        var l = a.attr("data-url"), m = {content: f, contact: g, source: h};
        b && (m.rumor_id = b), a.addClass("disabled"), $.ajax({
            type: "post",
            url: l,
            data: c.addDefenseRobotParam(m),
            dataType: "json",
            async: !0,
            xhrFields: {withCredentials: !0},
            beforeSend: function (b) {
                a.html("正在提交"), a.addClass("disabled")
            },
            success: function (f) {
                f.success ? ($("#content").val(""), $("#contact").val(""), a.removeClass("disabled"), b ? ($("#bl_box").modal("hide"), setTimeout(function () {
                    c.showBoxContent("bl_success_box", d, e)
                }, 500)) : ($("#obl_box").modal("hide"), setTimeout(function () {
                    c.showBoxContent("obl_success_box", d, e)
                }, 500))) : (c.showMessagePrompt(f.error.message, "error"), a.removeClass("disabled"))
            }
        })
    };
    $(document).on("click", ".osuccess-ensure", function () {
        setTimeout(function () {
            $("#obl_success_box").modal("hide")
        }, 0)
    }), $(document).on("click", ".obrunt-submit", function () {
        var a = $(this), b = " ", c = '<p class="brunt-success-title">爆料提交成功！<span class="icon-success"></span></p><p class="brunt-success-detail">爆料消息已成功提交！<br/>云酒会尽快与您联系求证，请耐心等待！谢谢您的参与！</p><a class="btn btn-article osuccess-ensure transition">确定</a>';
        e(a, null, b, c)
    }), $(document).on("click", ".brunt-box-content .obrunt-submit", function () {
        var a = $("#brunt-content").val().length, b = $("#brunt-contact").val().length;
        0 != a && 0 != b && _hmt.push(["_trackEvent", "首页-我要爆料第二步", "点击", "点击"])
    })
});