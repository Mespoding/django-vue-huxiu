define("modal_build", function (require, exports, c) {
    function d() { // 定时跳转页面
        var a = $("#delayTime"), b = a.attr("data_url"), c = parseInt(a.html());
        return c > 1 ? (c--, a.html(c), setTimeout(function () {
            d()
        }, 1e3), void 0) : (window.top.location.href = b, !1)
    }

    window.innerWidth < 900 && ($("header").css({position: "relative"}), $(".placeholder-height").css({display: "none"})),

        // 弹出modal窗口
        exports.showBoxContent = function (a, b, c) {
            var d = '<div id="' + a + '" class="modal fade" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-body modal-body-alert"><div class="modal-alert-title">' + b + '</div> <i class="icon-modal icon-alert-close" data-dismiss="modal"></i>' + c + "</div></div></div></div>";
            // console.log(d);
            $("#" + a).length > 0 && ($("#" + a).remove(), $(".modal-backdrop").remove()),  // 只准弹出单窗口
                $("body").append(d),
                $("#" + a).modal()
        },

        // 获取时间a距现在多久
        exports.getDateDiff = function (a) {
            var b = parseInt((new Date).getTime() / 1e3), c = parseInt(Date.parse(new Date(a)) / 1e3), d = b - c;
            return 10 > d ? "刚刚" : 60 > d ? d + "秒前" : 3600 > d ? parseInt(d / 60) + "分钟前" : 86400 > d ? parseInt(d / 3600) + "小时前" : 2592e3 > d ? parseInt(d / 86400) + "天前" : a
        },

        // 显示提示框，然后自己隐藏
        exports.showMessagePrompt = function (a, b) {
            var c, d = $(".message-prompt"), e = b ? b : "success";
            clearTimeout(c), a && ("error" == e ? d.addClass("error") : d.removeClass("error"), d.empty().append("<span>" + a + "</span>").stop().css({top: "-50px"}).show().animate({top: "0"}, 50), c = setTimeout(function () {
                d.hide()
            }, 3e3))
        },

        // 给参数a设置三个淘宝属性
        exports.addTaobaoParams = function (a) {
            return a.tb_appkey = "", a.tb_scene = "", a.tb_token = "", a
        },


        exports.loadScript = function (a, b) {
            var c = document.createElement("script");
            c.type = "text/javascript", c.readyState ? c.onreadystatechange = function () {
                ("loaded" == c.readyState || "complete" == c.readyState) && (c.onreadystatechange = null, b())
            } : c.onload = function () {
                b()
            }, c.src = a, document.body.appendChild(c)
        };
    var e = "70px", f = "90px";
    if ($(".go-top").length > 0) {  // 如果"滚动到顶部"按钮，则绑定滚动方法
        var g = $(".js-go-top");
        g.click(function () {
            $("body, html").animate({scrollTop: 0}, 500)
        })
    }

    // 鼠标移到有数字的li上时，消除数字
    $(document).on("mouseover", ".navbar-nav li", function () {
        $(this).find(".nums-prompt").length > 0 && ($(this).find(".nums-prompt").hide(), localStorage.setItem("index-nums-prompt", !0), localStorage.setItem("index-topic-nums-prompt", !0))
    });


    var h = window.location.href;
    if ($(window).scroll(function () {  // 页面自适应
            if (window.innerWidth < 1320)$(".go-top").hide(), $(".min-feedback").show(); else if ($(".js-go-top").length > 0) {
                var a = $(".js-go-top").offset().top, b = $(".footer").offset().top;
                if (g.offset().top > $(window).height())if (g.fadeIn(500), a > b) {
                    var c = "140px";
                    $(".go-top").css({bottom: c})
                } else $(".js-go-top").css({bottom: "151px"}); else $(".js-go-top").fadeOut(500)
            }
            // h.indexOf("active") > 0 || h.indexOf("chuangye") > 0 ? ($("header").css("position", "relative"), $(".placeholder-height").remove()) :
            //     $(window).scrollTop() > 70 ? ($("header").addClass("active"), e = "60px") :
            //         ($("header").removeClass("active"), e = "70px")
        }),
            // 绑定下拉菜单事件
            $(document).on("mouseenter", ".js-show-menu", function () {
                var a = $(this), b = a.find(".menu-box");
                a.hasClass("active") || (a.addClass("active"), b.stop().css({
                    opacity: "0",
                    "margin-top": f
                }).show().animate({opacity: "1", "margin-top": e}, 200))
            }),

            // 离开时，收起下拉菜单
            $(document).on("mouseleave", ".js-show-menu", function () {
                var a = $(this), b = a.find(".menu-box");
                b.stop().animate({opacity: "0", "margin-top": e}, 300, function () {
                    b.hide()
                }), a.removeClass("active")
            }),

            // 打开搜索窗口
            $(document).on("click", ".js-show-search-box", function () {
                var a = $(".search-box"), b = $("#history_ul");
                if (a.hasClass("search-box-last"))
                    if (a.hasClass("active"))
                        $("#history").addClass("hide"),
                            a.removeClass("active"),
                            a.addClass("hide"),
                            $(".search-content").removeClass("overlay-dialog-animate"),
                            $(document.body).removeClass("modal-open"),
                            $(document.body).removeAttr("style");
                    else {
                        if ($.cookie("huxiu_search_history")) {
                            var c = $.cookie("huxiu_search_history").split(",");
                            if (c.length > 0) {
                                var d = "";
                                $.each(c, function (a, b) {
                                    d += '<li class="transition"><a href="/search?s=' + b + '">' + b + "</a></li>"
                                }), $("#history").removeClass("hide"), b.empty().append(d)
                            }
                        }
                        a.addClass("active"), $(".search-content").addClass("overlay-dialog-animate"), a.removeClass("hide"), $(document.body).css({"padding-right": " 17px"})
                    }
                else if (a.hasClass("active"))
                    $("#history").addClass("hide"),
                        a.removeClass("active"),
                        $(".search-content").removeClass("overlay-dialog-animate"),
                        $(document.body).removeClass("modal-open"),
                        $(document.body).removeAttr("style");
                else {
                    if ($.cookie("huxiu_search_history")) {
                        var c = $.cookie("huxiu_search_history").split(",");
                        if (c.length > 0) {
                            var d = "";
                            $.each(c, function (a, b) {
                                d += '<li class="transition"><a href="/search.html?s=' + b + '">' + b + "</a></li>"
                            }), $("#history").removeClass("hide"), b.empty().append(d)
                        }
                    }
                    a.addClass("active"), $(".search-content").addClass("overlay-dialog-animate"), $(document.body).addClass("modal-open"), $(document.body).css({"padding-right": " 17px"})
                }
            }),

            // 清空搜索记录
            $(document).on("click", ".js-empty-history", function () {
                $("#history").addClass("hide"),
                    $.cookie("huxiu_search_history", "", {expires: -1})
            }),

            // 顶部二维码显示
            $(document).on("mouseenter", ".js-app-guide", function () {
                var a = $(this), b = a.find(".app-guide-box");
                a.find(".guide-prompt").hide(), localStorage.setItem("guide", !0), a.hasClass("disabled") || (a.addClass("disabled"), b.stop().css({
                    opacity: "0",
                    "margin-top": "15px"
                }).show().animate({opacity: "1", "margin-top": "0"}, 300))
            }),

            // 顶部二维码隐藏
            $(document).on("mouseleave", ".js-app-guide", function () {
                var a = $(this), b = a.find(".app-guide-box");
                b.stop().animate({opacity: "0", "margin-top": "0px"}, 400, function () {
                    b.hide()
                }), a.removeClass("disabled")
            }),

            // 点击二维码 -->app的下载
            $(document).on("click", ".js-app-guide", function () {
                window.open("/app")
            }),

            // 侧面二维码的显示
            $(document).on("mouseenter", ".js-app-feedback", function () {
                var a = $(this), b = a.find(".app-footer-guide");
                a.hasClass("disabled") || (a.addClass("disabled"), b.stop().css({
                    opacity: "0",
                    left: "-155px"
                }).show().animate({opacity: "1", left: "-140px"}, 300))
            }),

            // 侧面二维码的隐藏
            $(document).on("mouseleave", ".js-app-feedback", function () {
                var a = $(this), b = a.find(".app-footer-guide");
                b.stop().animate({opacity: "0", left: "-155px"}, 400, function () {
                    b.hide()
                }), a.removeClass("disabled")
            }),
            window.innerWidth < 1320 ? ($(".go-top").hide(), $(".min-feedback").show()) : 0 == $("#vip-zt-body").length && ($(".min-feedback").hide(), $(".go-top,.go-feedback").show()),
            $(window).resize(function () {
                window.innerWidth < 1320 ? ($(".go-top").hide(), $(".min-feedback").show()) : 0 == $("#vip-zt-body").length && ($(".min-feedback").hide(), $(".go-top,.go-feedback").show())
            }),

            // 退出
            $(document).on("click", ".js-btn-logout", function () {
                var a = $(this), c = parseInt(1e5 * Math.random()), d = "/user/logout/", e = {
                    is_ajax: "1",
                    random: c,
                    huxiu_hash_code: huxiu_hash_code
                };
                a.hasClass("disabled") || $.ajax({
                    type: "post",
                    url: d,
                    data: e,
                    dataType: "json",
                    async: !0,
                    success: function (a) {
                        "1" == a.result ? (exports.showMessagePrompt(a.msg), window.location.href = "/" ) : exports.showMessagePrompt(a.msg, "error")
                        // "undefined" != typeof page ?

                        // : window.location.reload())
                    }
                })
            }),

            // 显示反馈窗口
            $(document).on("click", ".js-show-feedback-box", function () {
                $(".js-modal-backdrop").show(), $(".feedback-box").show()
            }),

            // 关闭反馈窗口
            $(document).on("click", ".js-feedback-close", function () {
                $(".js-modal-backdrop").hide(), $(".feedback-box").hide()
            }),

            // 提交反馈
            $(document).on("click", ".js-feedback-submit", function () {
                if (0 == $("#content").val().length)
                    return $(".will-choose-error").show().html("请输入反馈信息"), !1;
                var a = $(this), c = "/user_action/feedback/", d = {
                    // huxiu_hash_code: huxiu_hash_code,
                    content: $("#content").val(),
                    contact: $("#contact").val()
                };
                a.addClass("disabled"), $.ajax({
                    type: "post",
                    url: c,
                    data: d,
                    dataType: "json",
                    async: !0,
                    beforeSend: function (b) {
                        a.html("正在提交"), a.removeClass("js-feedback-submit")
                    },
                    success: function (c) {
                        if (1 == c.result) {
                            $("#content").val(""), $("#contact").val("");
                            var d = document.location.href;
                            d.indexOf("article") >= 0 ? $.myDetection.htmDetection("用户反馈-文章页,点击,用户反馈成功") : d.indexOf("com/1.html") >= 0 ? $.myDetection.htmDetection("用户反馈-栏目页,点击,用户反馈成功") : $.myDetection.htmDetection("用户反馈-首页,点击,用户反馈成功"),
                                exports.showMessagePrompt(c.msg),
                                $(".js-feedback-close").trigger("click"),
                                a.removeClass("disabled")
                        } else
                            exports.showMessagePrompt(c.msg, "error"), a.removeClass("disabled");
                        a.html("提交"), a.addClass("js-feedback-submit")
                        window.location.reload();
                    },
                    error: function (a) {
                    }
                })
            }),

            // 底部二维码的显示
            $(document).on("mouseenter", ".footer-icon-list .Qr-code-footer", function () {
                var a = $(this), b = a.find(".app-qrcode");
                a.hasClass("disabled") || (a.addClass("disabled"), b.stop().css({
                    opacity: "0",
                    "margin-top": "-150px"
                }).show().animate({opacity: "1", "margin-top": "-140px"}, 300))
            }),

            // 底部二维码的隐藏
            $(document).on("mouseleave", ".footer-icon-list .Qr-code-footer", function () {
                var a = $(this), b = a.find(".app-qrcode");
                b.stop().animate({opacity: "0", "margin-top": "-150px"}, 400, function () {
                    b.hide()
                }), a.removeClass("disabled")
            }),

        $(".vip-zt-body").length > 0 && $(".go-top").remove(),
        $("#page_404").length > 0 && d(),
        // $(".js-yarcrontab").length > 0 && $.get("https://www.huxiu.com/yarcrontab.html", function (a) {
        // }),
        $("#container").length > 0 && $("#container").css("height", "0"),

        0 == uid && -1 == window.location.href.indexOf("/user/login")) {
        var i = window.location.href.replace("http://" + window.location.host, "");  // 设置当前网址为登录后的回调网址
        console.log(i);
        localStorage.setItem("callback_url", i)
    }

    // 单选按钮的操作
    $(document).on("click", ".radio-inline input", function () {
        var a = $(this);
        $(".radio-inline").removeClass("active"), a.parent(".radio-inline").addClass("active")
    }),


    0 != uid && $.ajax({  // 已经登录用户，获取最新消息
        type: "post",
        url: "/member/get_message_count/",
        data: {huxiu_hash_code: huxiu_hash_code},
        dataType: "json",
        async: !0,
        success: function (a) {
            if (1 == a.result) {
                var b = a.data.comment_message_num, c = a.data.system_message_num, d = a.data.private_message_num;
                b + c + d && $(".message-num").show(), $(".comment_message").html(b ? b : ""), $(".system_message").html(c ? c : ""), $(".private_message").html(d ? d : "")
            }
        }
    }),
    $(".title-box").length > 0 && ($("body").css({overflow: "hidden"}), $("#pl-wrap-article").remove()), require.async(["jquery.lazyload"],
        function () {
            $("img.lazy").lazyload({placeholder: "/static/img/bg.png", effect: "fadeIn", threshold: 1})
        }),

        // 打开投稿界面，未登录的时候弹出登录框
        $(document).on("click", ".js-open-contribute", function () {
            0 == uid ? (localStorage.setItem("callback_url", "/article/contribute/"),
                $(".login-link-box .js-login").trigger("click")) : window.location.href = "/article/contribute/"
        }),

        // 打开创业界面
        $(document).on("click", ".js-open-cy", function () {
            0 == uid ? (localStorage.setItem("callback_url", "/chuangye/register.html"),
                $(".login-link-box .js-login").trigger("click")) : window.location.href = "/chuangye/register.html"
        })
});