define("modal_tg", function (a, b, c) {

    // 弹出框
    function d(a, b, c) {
        var d = '<div id="' + a + '" class="modal" role="dialog"><div class="modal-dialog" style="width: 700px"><div class="modal-content"><div class="modal-body modal-body-alert"><div class="modal-alert-title">' + b + '</div> <i class="icon icon-alert-close js-alert-close" data-dismiss="modal"></i>' + c + "</div></div></div></div>";
        $("#" + a).length > 0 && $("#" + a).remove(), $("body").append(d), $("#" + a).modal(), $("#" + a).removeClass("in")
    }

    // 检查url格式是否正确
    function e(a) {
        var b = a, c = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w .\/?%&=]*)?/, d = new RegExp(c);
        return 1 == d.test(b) ? !0 : !1
    }

    // 调用QQ在线视频播放器，预览视频
    function f(a) {
        if (!a)return "";
        var b, c, d = 340, f = 610;
        if (e(a))
            if (a.indexOf("qq.com") > 0)
                if (a.indexOf("vid") > 0)
                    b = a.trim(a).replace(/v\.qq\.com\/.+[\?\&]vid=([^&]+).*$/i, "v.qq.com/iframe/player.html?vid=$1&tiny=0&auto=0"),
                        b = b.replace("http", "https"),
                        c = "<iframe id='video_play' frameborder='0' height='" + d + "' width='" + f + "' src='" + b + "' allowfullscreen></iframe>";
                else {
                    var g = a.split("/");
                    if (g[g.length - 1].indexOf(".html") > 0) {
                        var h = g[g.length - 1].replace(".html", "");
                        11 == h.length ? (b = "https://v.qq.com/iframe/player.html?vid=" + h + "&tiny=0&auto=0", c = "<iframe id='video_play' frameborder='0' height='" + d + "' width='" + f + "' src='" + b + "' allowfullscreen></iframe>") : c = '<a href="' + a + '" target="_blank" class="border-none videoA"></a>'
                    } else c = c = '<a href="' + a + '" target="_blank" class="border-none videoA"></a>'
                }
            else c = '<a href="' + a + '" target="_blank" class="border-none videoA"></a>';
        else c = "";
        return c
    }

    // 检查视频地址是否合法
    function g(a) {
        if (a) {
            var b = f(a);
            if (b) {
                var c = '<p class="text-center">' + f(a) + "</p>";
                $(".video-box").empty().append(c)
            } else $(".video-box").empty().append('<div class="error-info-box">暂不支持此网站视频，换一个视频地址试试</div>')
        }
    }

    var h;
    a.async("modal_build", function (a) {
        h = a
    }),
        // UE.getEditor("tgEditor").execCommand("getlocaldata")  // 获取富文本编辑器中内容
        // 打开页面延迟半秒钟后，刷新编辑框中内容
    $(".js-editor").length > 0 && (window.onload = function () {
        setTimeout(function () {
            "" != UE.getEditor("tgEditor").execCommand("getlocaldata") &&
            UE.getEditor("tgEditor").setContent(UE.getEditor("tgEditor").execCommand("getlocaldata"))
        }, 500)
    }),

        // 固定上传框位置
        $(document).ready(function () {
            if ($("#articlePicGroup").length > 0) {
                var a = $("#articlePicGroup"), b = a.offset().top - 55;
                $(window).scroll(function () {
                    if ($(window).scrollTop() > b) {
                        var c = $(window).scrollTop() - b + "px";
                        a.stop().css({top: c})
                    } else a.stop().css({top: 0})
                })
            }
        });


    var i = (UE.getEditor("tgEditor"), function () {
            $.each($(".js-pic-list li"), function () {
                var a = $(this), b = a.find("img"), c = b.attr("src"), d = new Image, e = "", f = "";
                d.src = c, d.onload = function () {
                    e = d.width, f = d.height, e / f > 16 / 9 || 84 > e && 84 > f ? a.css({"line-height": "68px"}) : b.css({
                        "max-height": "100%",
                        width: "auto"
                    })
                }
            })
        }),

        j = function () {
            $(".nano").nanoScroller({preventPageScrolling: !1})
        },

        // 图片上传
        k = function (a, b) {
            var c = document.forms[0], d = new FormData(c);
            d.append("img", b),
                d.append("is_ajax", 1),
                d.append("huxiu_hash_code", "huxiu_hash_code");

            var e = '<li id="pic_list' + a + '"><div class="loading-box"><img src="/static/img/loading.png" alt=""><div class="text">上传中</div></div><div class="btn-icon-box js-delect-pic"><i class="i-icon2 icon2-delete"></i></div></li>';
            0 == $(".list-ul-box").height() && ($(".list-ul-box").height("220"), j(),
                $(".article-pic-box .box-label").addClass("active")),
                $(".js-pic-list").append(e),
                $.ajax({
                    url: "/article/img_upload/",
                    type: "post",
                    data: d,
                    dataType: "json",
                    processData: !1,
                    contentType: !1,
                    success: function (b) {
                        var c = '<img class="js-add-pic-article" src="' + b.url + '">';
                        $("#pic_list" + a).append(c).find(".loading-box").remove(),
                            $("#pic_list" + a).removeAttr("id"),
                            $(".pic-number").html($(".js-pic-list li").length), i()
                    },
                    error: function (a) {
                    }
                })
        };


    $(".nano").length > 0 && a.async(["jquery.nanoscroller"], function () {
        var a = function () {
            $(".nano").nanoScroller({preventPageScrolling: !1})
        };
        a()
    }),

        $("body").on("change", "#article-pic", function () {
            for (var a = ($(this), document.getElementById("article-pic")), b = a.files, c = 0; c < b.length; c++)
                a.files && a.files[c] && k(c, a.files[c])
        }),

        // 添加图片
        $("body").on("click", ".js-add-pic-article", function () {
            var a = $(this), b = '<p><span class="img-center-box" style="display:block;"><img src="' + a.attr("src") + '"></span></p>';
            UE.getEditor("tgEditor").execCommand("insertHtml", b)
        }),

        // 删除图片
        $("body").on("click", ".js-delect-pic", function (a) {
            var b = $(this);
            b.parents("li").remove(), $(".pic-number").html($(".js-pic-list li").length),
            0 == $(".js-pic-list li").length &&
            ($(".article-pic-box .box-label").removeClass("active"),
                $(".list-ul-box").height(0))
        }),

        // 打开上传视频窗口
        $("body").on("click", ".js-add-video", function () {
            var a = ($(this), '<div class="control-group"></div><div class="video-group"><label class="video-label">视频地址：<input id="video_url" type="text" placeholder="视频地址"></label></div><div class="video-box"><div class="error-info-box hide">暂不支持此视频，换一个视频地址试试</div></div><div class="edit-title-box"><div class="btn-group"><div class="btn btn-determine js-sure-add-video">确定</div><div class="btn btn-cancel" data-dismiss="modal">取消</div></div></div>');
            d("videoModal", "上传视频", a)
        }),

        // 当接受视频地址的input发生改变时，显示预览图
        $("body").on("change", "#video_url", function () {
            var a = ($(this), $("#video_url").val());
            g(a)
        }),

        // 添加视频
        $("body").on("click", ".js-sure-add-video", function () {
            if (1 != $(".video-box").find(".error-info-box").length) {
                var a = "";
                if ($(".video-box p iframe").length > 0) {
                    var b = $(".video-box p iframe").attr("src");
                    a = '<p style="text-align:center"><iframe height="400" width="710" src="' + b + '" frameborder="0" allowfullscreen=""></iframe></p>'
                }
                else
                    a = '<p class="text-center">' + $(".video-box p").html() + "</p>";
                UE.getEditor("tgEditor").execCommand("insertHtml", a), $("#videoModal").modal("hide")
            }
        });

    // 错误提示框
    var l = function (a) {
        $(".error-box").html(a).show(), setTimeout(function () {
            $(".error-box").html("").hide()
        }, 2e3)
    };

    // 提交
    $("body").on("click", ".js-contribute-submit", function () {
        var a = $(this),
            b = "/article/submit/",
            c = UE.getEditor("tgEditor").getContent(), d = {
                aid: aid,
                did: did,
                title: $("#title").val(),
                content: c,
                auth_way: $("input[name='auth_way']:checked").val(),
                auth_reprinted: $("#auth_reprinted").prop("checked") ? 1 : 0,
                article_memo: $("#article_memo").val(),
                tag: $("#tag").prop("checked") ? 1 : 0
            };
        return 0 == $.trim(d.title).length ? (l("标题不能为空"), !1) : UE.getEditor("tgEditor").getContentTxt().length < 200 ? (l("正文不能少于200字"), !1) : void(a.hasClass("disabled") || $.ajax({
            type: "post",
            url: b,
            data: d,
            dataType: "json",
            async: !0,
            success: function (b) {
                "1" == b.result ? (h.showMessagePrompt(b.msg, "success"), UE.getEditor("tgEditor").execCommand("clearlocaldata"), setTimeout(function () {
                    window.location.href = "/member/" + uid + "/verify_article/#menu"
                }, 1e3)) : h.showMessagePrompt(b.msg, "error"), a.removeClass("disabled")
            },
            error: function (a) {
            }
        }))
    }),

        // 保存草稿
        $("body").on("click", ".js-contribute-save", function () {
            var a = $(this),
                b = "/article/save/",
                c = UE.getEditor("tgEditor").getContent(),
                d = {
                    did: did,
                    title: $("#title").val(),
                    content: c
                };
            return 0 == $.trim(d.title).length ? (l("标题不能为空"), !1) : void(a.hasClass("disabled") ||
            $.ajax({
                type: "post",
                url: b,
                data: d,
                dataType: "json",
                async: !0,
                success: function (b) {
                    "1" == b.result ? (h.showMessagePrompt(b.msg, "success"),
                        UE.getEditor("tgEditor").execCommand("clearlocaldata"),
                        setTimeout(function () {
                            window.location.href = "/member/" + uid + "/draft_article/#menu"
                        }, 1e3)) : h.showMessagePrompt(b.msg, "error"), a.removeClass("disabled")
                },
                error: function (a) {
                }
            }))
        });


    // 投稿提示的打开与关闭
    var m = function () {
        var a = '<div class="control-group"><p>欢迎在线投稿: </p> <p>1、请保证投递的稿件为原创；</p> <p>2、不排斥一稿多投，但更欢迎独家首发稿件；</p> <p>3、软文枪文，敬请绕道。盗稿行为零容忍，一经发现立即封号；</p> <p>4、稿件其他问题可联系1615810141@qq.com或添加15063817524（手机同微信）沟通。</p><p><br></p></div><div class="edit-title-box" style="text-align: center;"><div class="btn-group" style="left: auto;margin-left: 0;"><div class="btn btn-determine js-add-ok" data-dismiss="modal" style="margin-right: 0;">我知道了~</div></div></div>';
        d("promptModal", "投稿提示", a)
    };

    $("body").on("click", ".js-open-tg-prompt", function () {
        $(this);
        m()
    }), $("body").on("click", ".js-add-ok", function () {
        $(this);
        localStorage.setItem("tgFlag", !0)
    }), localStorage.getItem("tgFlag") || (window.onload = function () {
        m()
    }), $("body").on("click", ".js-alert-close", function () {
        var a = $(this);
        a.parents(".modal").remove()
    })
});