define("modal_topic", function (a, b, c) {
    var d, e, f;
    window.onload = function () {
        d = "", e = "", f = ""
    };
    var g;
    a.async("modal_build", function (a) {
        g = a
    }), a.async(["jquery-qrcode.min"], function () {
    });
    var h = function (a) {
        var b = 170;
        if ($("#" + a).length > 0) {
            var c = $("#" + a).offset().top - b;
            $("html, body").animate({scrollTop: c}, 500)
        }
    };
    $("body").on("click", ".js-ry-icon-pl", function () {
        var a = $(this);
        if ($(".dp-article-box").slideUp(), $(".hu-pl-box").slideUp(), $("#saytext_reply").length > 0 && ($(".pl-box-wrap textarea").attr("id", ""), $(".pl-box-wrap textarea").attr("name", "")), "none" == a.parents(".pl-box-btm").find(".dp-article-box").css("display")) {
            a.parents(".pl-box-btm").find(".dp-article-box").slideDown();
            var b = a.parents(".pl-box-btm").find(".dp-article-box").find("textarea");
            b.attr("id", "saytext_reply"), b.attr("name", "saytext_reply")
        } else a.parents(".pl-box-btm").find(".dp-article-box").slideUp()
    }), $("body").on("click", ".js-ry-dp", function () {
        if (0 == uid)$(".login-link-box .js-login").trigger("click"); else {
            var a = $(this), b = "/topic/add_reply", c = {
                is_ajax: "1",
                huxiu_hash_code: huxiu_hash_code,
                to_uid: a.attr("data-touid"),
                topic_id: $("#topicId").val(),
                comment_id: a.parents(".pl-box-wrap").attr("data-pid"),
                content: $("#saytext_reply").val(),
                reply_id: a.parents(".dl-user").attr("data-reply_id"),
                tb_appkey: d,
                tb_scene: e,
                tb_token: f
            };
            if ("" == $("#saytext_reply").val().length)return g.showMessagePrompt("客官，评论不能为空哟", "error"), !1;
            var h = 0;
            a.hasClass("disabled") || $.ajax({
                type: "post",
                url: b,
                data: c,
                dataType: "json",
                async: !0,
                beforeSend: function (a) {
                },
                success: function (b) {
                    if (1 == b.result) {
                        h = a.parents(".pl-box-wrap").find(".ry-box").length > 0 ? a.parents(".pl-box-wrap").find(".dl-user-list ul li").length > 1 ? 2 : 1 : 0;
                        var c, d = "";
                        d = '<span class="span-mark-article-pl js-open-ry-dp-box" data-show="true">收起</span>';
                        var e = is_vip ? '<a href="javascript:void(0);"><i class="i-vip icon-vip"></i></a>' : "", f = is_vip ? '<span class="icon-s"><i class="i-vip icon-vip"></i></span>' : "";
                        if (0 == h)c = '<div class="dp-box ry-box"><span class="span-mark-author">点评</span><div class="dl-user dl-user-list js-open-ry-dp-box" data-type="dl-user" style="display:none"><ul><li class="del-pl' + b.datalist.id + '"><a href="' + b.datalist.userinfo.uid + '" target="_blank"><img src="' + b.datalist.userinfo.avatar + '"></a>' + f + '</li></ul></div><div class="dl-user dl-user-list" data-type="dl-user" style="display:none"><ul><li class="del-pl' + b.datalist.id + '"><a href="/member/' + b.datalist.userinfo.uid + '.html" target="_blank"><img src="' + b.datalist.userinfo.avatar + '"></a></li></ul></div><div class="dp-list-box" style="display:block"><div class="dl-user del-pl' + b.datalist.id + '"><ul><li><a href="/member/' + b.datalist.userinfo.uid + '.html" target="_blank"><img src="' + b.datalist.userinfo.avatar + '"></a></li></ul><div class="one-pl-content"><div class="pull-right time">刚刚</div><p class="content"><span class="name">' + b.datalist.userinfo.username + "</span>" + e + '<span class="author-content">&nbsp;&nbsp; : ' + b.datalist.content + '</span></p><div class="dp-reply-box js-hf-ry-pl"><span>回复</span></div><div class="hu-pl-box"><textarea class="form-control"></textarea><button class="btn btn-article btn-topic-article js-ry-dp" data-type="hf" data-touid="' + b.datalist.userinfo.uid + '">发表</button></div></div></div></div></div>', a.parents(".pl-box-wrap").find(".pl-box-top").after(c); else {
                            var i = '<li class="del-pl' + b.datalist.id + '"><a href="/member/' + b.datalist.userinfo.uid + '.html" target="_blank"><img src="' + b.datalist.userinfo.avatar + '"></a>' + f + "</li>", j = "";
                            j = b.datalist.to_userinfo ? '<span class="author-content">回复 <a href="/member/' + b.datalist.to_userinfo.uid + '.html" target="_blank">' + b.datalist.to_userinfo.username + "</a> : " + b.datalist.content + "</span>" : '<span class="author-content">' + b.datalist.content + "</span>", c = '<div class="dl-user del-pl73857"><ul><li><a href="/member/' + b.datalist.userinfo.uid + '.html" target="_blank"><img src="' + b.datalist.userinfo.avatar + '"></a></li></ul><div class="one-pl-content"><div class="pull-right time">刚刚</div><p class="content"><span class="name">' + b.datalist.userinfo.username + "</span>" + e + '<span class="author-content">&nbsp;&nbsp; : ' + j + '</span></p><div class="dp-reply-box js-hf-ry-pl"><span>回复</span></div><div class="hu-pl-box"><textarea class="form-control"></textarea><button class="btn btn-article btn-topic-article js-ry-dp" data-type="hf" data-touid="' + b.datalist.userinfo.uid + '">发表</button></div></div></div>', a.parents(".pl-box-wrap").find(".dp-list-box").prepend(c), a.parents(".pl-box-wrap").find(".dl-user-list ul").prepend(i), 1 == h && a.parents(".pl-box-wrap").find(".dl-user-list").before(d)
                        }
                        a.parents(".hu-pl-box").slideUp(), a.parents(".dp-article-box").slideUp(), $("textarea").val(""), 0 == h ? $.myDetection.gaDetection("热议评论,点评,发表成功") : $.myDetection.gaDetection("热议评论,点评回复,发表成功")
                    } else g.showMessagePrompt(b.msg, "error");
                    a.removeClass("disabled")
                },
                error: function (b) {
                    a.removeClass("disabled")
                }
            })
        }
    }), $("body").on("click", ".js-hf-ry-pl", function () {
        var a = $(this);
        if ($(".dp-article-box").slideUp(), $(".hu-pl-box").slideUp(), $("#saytext_reply").length > 0 && ($(".pl-box-wrap  textarea").attr("id", ""), $(".pl-box-wrap textarea").attr("name", "")), "none" == a.parent(".one-pl-content").find(".hu-pl-box").css("display")) {
            a.parent(".one-pl-content").find(".hu-pl-box").slideDown();
            var b = a.parent(".one-pl-content").find(".hu-pl-box").find("textarea");
            b.attr("id", "saytext_reply"), b.attr("name", "saytext_reply");
            var c = a.parent(".one-pl-content").find(".content").find(".name").eq(0).text();
            "// " + c + " ：" + a.parent(".one-pl-content").find(".author-content").text();
            b.attr("placeholder", "回复 " + c + " ：")
        } else a.parent(".one-pl-content").find(".hu-pl-box").slideUp()
    }), $("body").on("click", ".js-open-ry-dp-box", function () {
        var a = $(this);
        a.hasClass("dl-user-list") ? a.parents(".dp-box").find(".span-mark-article-pl").trigger("click") : "true" == a.attr("data-show") ? (a.attr("data-show", "false"), a.html("展开"), a.parents(".dp-box").find(".dl-user-list").slideDown(), a.parents(".dp-box").find(".dp-list-box").hide(), a.parents(".dp-box").find(".dp-list-box").hide(), a.parents(".dp-box").find(".close-dp-list-box").hide()) : (a.attr("data-show", "true"), a.html("收起"), a.parents(".dp-box").find(".dl-user-list").hide(), a.parents(".dp-box").find(".dp-list-box").slideDown(), a.parents(".dp-box").find(".close-dp-list-box").show())
    }), $("body").on("click", ".js-del-box", function () {
        var a = $(this), b = "/topic/", c = {};
        confirm("确定要删除吗?") && (a.parents(".pl-box-wrap").remove(), $.ajax({
            type: "post",
            url: b,
            data: c,
            dataType: "json",
            async: !0,
            beforeSend: function (a) {
            },
            success: function (b) {
                a.removeClass("disabled")
            },
            error: function (b) {
                a.removeClass("disabled")
            }
        }))
    }), $("body").on("click", ".js-add-ry-pl", function () {
        var a = $(this), b = "/topic/add_comment", c = {
            huxiu_hash_code: huxiu_hash_code,
            topic_id: $("#topicId").val(),
            type: "1",
            content: $("#saytext").val(),
            tb_appkey: d,
            tb_scene: e,
            tb_token: f
        };
        return $("#saytext").val().length < 8 ? (g.showMessagePrompt("客官，8个字起评，不讲价哟", "error"), !1) : void(a.hasClass("disabled") || $.ajax({
            type: "post",
            url: b,
            data: c,
            dataType: "json",
            async: !0,
            beforeSend: function (a) {
            },
            success: function (b) {
                if (a.removeClass("disabled"), "1" == b.result) {
                    var c = b.datalist.id;
                    $(".js-topic-pl a").removeClass("active"), $(".js-topic-pl a:last-child").addClass("active");
                    var b = {
                        huxiu_hash_code: huxiu_hash_code,
                        is_ajax: 1,
                        topic_id: $("#topicId").val(),
                        sort_type: $(".js-topic-pl a:last-child").attr("data-sort-type"),
                        page: 1
                    }, d = function (b) {
                        var d = "g_pid" + c;
                        $(".pl-topic-box-group").empty().append(b.data), a.removeClass("disabled"), h(d)
                    };
                    a.hasClass("disabled") || (a.addClass("disabled"), i(b, d)), $("#saytext").val("")
                } else g.showMessagePrompt(b.msg, "error");
                $.myDetection.gaDetection("热议评论,话题评论,发表成功")
            },
            error: function (b) {
                a.removeClass("disabled")
            }
        }))
    }), $("body").on("click", ".js-get-more-ry-dp", function () {
        $(this)
    }), $("body").on("click", ".js-go-pl", function () {
        $(this);
        h("addPl")
    }), $(document).on("mouseenter", ".js-ry-icon-wx", function () {
        var a = $(this);
        a.find(".pl-share-box").find("img").attr("src") || (a.find(".pl-share-box").empty(), a.find(".pl-share-box").qrcode({
            render: "table",
            size: 110,
            text: "https://m.huxiu.com/topic/comment/" + a.parents(".pl-box-wrap").attr("data-pid") + "?f=pc_comment_weixin"
        }), $.myDetection.gaDetection("第三方分享,热议评论,微信分享"));
        var b = a.find(".pl-share-box");
        a.hasClass("active") || (a.addClass("active"), b.stop().css({
            opacity: "0",
            left: "-160px"
        }).show().animate({opacity: "1", left: "-140px"}, 200))
    }), $(document).on("mouseleave", ".js-ry-icon-wx", function () {
        var a = $(this), b = a.find(".pl-share-box");
        b.stop().animate({opacity: "0", left: "-140px"}, 300, function () {
            b.hide()
        }), a.removeClass("active")
    }), $("body").on("click", ".js-get-more-topic", function () {
        var a = $(this), b = "/topic_list", c = {
            huxiu_hash_code: huxiu_hash_code,
            is_ajax: 1,
            page: a.attr("data-page")
        };
        a.hasClass("disabled") || ($.ajax({
            type: "post",
            url: b,
            data: c,
            dataType: "json",
            async: !0,
            success: function (b) {
                $(".ry-list-wrap").append(b), a.attr("data-page", parseInt(a.attr("data-page")) + 1), b.length < 20 && a.remove()
            },
            error: function (a) {
            }
        }), a.removeClass("disabled"))
    }), $("body").on("click", ".js-ry-icon-zan", function () {
        if (0 == uid)$(".login-link-box .js-login").trigger("click"); else {
            var a = $(this), b = "/topic/zan", c = {
                huxiu_hash_code: huxiu_hash_code,
                is_ajax: 1,
                itemid: a.parents(".pl-box-wrap").attr("data-pid"),
                idtype: "topic_comment"
            };
            a.hasClass("disabled") || ($.ajax({
                type: "post",
                url: b,
                data: c,
                dataType: "json",
                async: !0,
                success: function (b) {
                    1 == b.result ? (a.find(".like").html(parseInt(a.find(".like").html()) + 1), g.showMessagePrompt(b.msg), $.myDetection.gaDetection("点赞,话题详情页,评论点赞")) : g.showMessagePrompt("你已经点过赞了", "error")
                }
            }), a.removeClass("disabled"))
        }
    }), $("body").on("click", ".js-topic-favorite", function () {
        if (0 == uid)$(".login-link-box .js-login").trigger("click"); else {
            var a = $(this), b = "add" == a.attr("data-type") ? "/topic/add_favorite" : "/topic/delete_favorite", c = {
                huxiu_hash_code: huxiu_hash_code,
                is_ajax: 1,
                topic_id: $("#topicId").val()
            };
            a.hasClass("disabled") || ($.ajax({
                type: "post",
                url: b,
                data: c,
                dataType: "json",
                async: !0,
                success: function (b) {
                    if ("1" == b.result) {
                        a.toggleClass("active"), "add" == a.attr("data-type") ? (a.attr("data-type", "delete"), a.html("取消关注"), $("#favorite_num").html(parseInt($("#favorite_num").html()) + 1), $.myDetection.gaDetection("收藏,话题详情页,话题关注-关注成功")) : (a.attr("data-type", "add"), a.html("关注话题"), $("#favorite_num").html(parseInt($("#favorite_num").html()) - 1));
                        var c = "add" == a.attr("data-type") ? "取消关注话题成功" : "关注话题成功";
                        g.showMessagePrompt(c, "success")
                    } else g.showMessagePrompt(b.data.msg, "error")
                }
            }), a.removeClass("disabled"))
        }
    });
    var i = function (a, b) {
        var c = "/topic/topic_comment";
        $.ajax({
            type: "post", url: c, data: a, dataType: "json", async: !0, success: function (a) {
                "1" == a.result ? b(a) : g.showMessagePrompt(a.data.msg, "success")
            }
        })
    };
    $("body").on("click", ".js-topic-pl a", function () {
        var a = $(this);
        $(".js-topic-pl a").removeClass("active"), a.addClass("active");
        var b = {
            huxiu_hash_code: huxiu_hash_code,
            is_ajax: 1,
            topic_id: $("#topicId").val(),
            sort_type: a.attr("data-sort-type"),
            page: 1
        }, c = function (b) {
            $(".pl-topic-box-group").empty().append(b.data), a.attr("data-page", 2), a.removeClass("disabled"), $(".js-get-topic-comment-more").show()
        };
        a.hasClass("disabled") || (a.addClass("disabled"), i(b, c))
    }), $("body").on("click", ".js-get-topic-comment-more", function () {
        var a = $(this), b = {
            huxiu_hash_code: huxiu_hash_code,
            is_ajax: 1,
            topic_id: $("#topicId").val(),
            sort_type: $(".js-topic-pl a.active").attr("data-sort-type"),
            page: a.attr("data-page")
        }, c = function (b) {
            $(".pl-topic-box-group").append(b.data), a.attr("data-page", parseInt(a.attr("data-page")) + 1), a.removeClass("disabled"), b.data.length < 10 && a.hide()
        };
        a.hasClass("disabled") || (a.addClass("disabled"), i(b, c))
    })
});