define("modal_article", function (require, exports) {
    function showBox(a, b, c, d) {
        var e = '<div id="' + a + '" class="modal fade" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button><h4 class="modal-title">' + b + '</h4></div><div class="modal-body">' + c + '</div><div class="modal-footer">' + d + "</div></div></div></div>";
        $("#" + a).length > 0 && $("#" + a).remove(), $("body").append(e), $("#" + a).modal()
    }

    function dpFilterRep(a) {
        return a = a.replace(/’<q>‘/g, ""), a = a.replace(/’<\/q>‘/g, "")
    }

    // 弹出错误对话框
    function errorAn(a) {
        a.find("textarea").css({"background-color": "#fdf4eb"}), a.css({position: "relative"}).stop(!0, !0).animate({right: "10px"}, 100).animate({right: "-10px"}, 100).animate({right: "7px"}, 90).animate({right: "-7px"}, 90).animate({right: "4px"}, 80).animate({right: "-4px"}, 80).animate({right: "0"}, 70, function () {
            a.find("textarea").css({"background-color": "#fff"})
        })
    }

    // 弹出正确对话框
    function boxAnSuccess(a, b, c) {
        var d = '<div id="new_msg_wrap" style="position:absolute;width:100%;height:100%;right:0;padding:5px;background:#b4ffc7;border-radius:5px;overflow:hidden;">' + c + "</div>";
        a.css({position: "relative"}).append(d), $("#new_msg_wrap").animate({
            width: "0",
            height: "0",
            bottom: "0"
        }, 500, function () {
            $(this).animate({bottom: "-80", opacity: "0"}, 200, function () {
                $("#new_msg_wrap").remove(), b.eq(0).stop(!0, !0).animate({height: "100%", opacity: "1"}, 600)
            })
        }), setTimeout(function () {
            $("#new_msg_wrap").remove()
        }, 500)
    }

    // 关联微博
    function getRelatedInfo(showBox, type, weiboUrl, btn) {
        if (!btn.hasClass("disabled")) {
            btn.addClass("disabled");
            var url = "/user_action/weibo_related", param = {
                is_ajax: 1,
                huxiu_hash_code: huxiu_hash_code,
                aid: aid,
                type: type,
                url: weiboUrl
            };
            $.post(url, param, function (data) {
                if (data = eval("(" + data + ")"), 1 == data.result)if ("get" == type) {
                    var str = "";
                    void 0 == data.mid_urls || 0 == data.mid_urls.length ? str += "<li>暂时没有关联的网址</li>" : $.each(data.mid_urls, function (a, b) {
                        str += '<li><a class="url" target="_blank" href="' + b + '">' + b + '</a><span class="glyphicon glyphicon-remove js-remove"></span></li>'
                    });
                    var id = "related_box", title = "管理-关联微博", body = '<div class="js-alert"></div><div class="relating-wrap"><a class="btn btn-default pull-right js-submit" href="javascript:void(0);">提交</a><input class="form-control js-text" type="text" /></div><div class="related-wrap"><p>已关联微博</p><ul class="js-related-wrap">' + str + "</ul></div> ", footer = '<button type="button" class="btn btn-gray" data-dismiss="modal">关闭</button>';
                    showBox(id, title, body, footer)
                } else"add" == type ? ($(".js-related-wrap").prepend('<li><a class="url" href="' + weiboUrl + '">' + weiboUrl + '</a><span class="glyphicon glyphicon-remove js-remove"></span></li>'), $(".js-text").val(""), $(".js-alert").addClass("alert alert-success").html(data.msg), setTimeout(function () {
                    $(".js-alert").removeClass("alert alert-success").html("")
                }, 2e3)) : "del" == type && (btn.parents("li").remove(), $(".js-alert").addClass("alert alert-success").html(data.msg), setTimeout(function () {
                    $(".js-alert").removeClass("alert alert-success").html("")
                }, 2e3)); else $(".js-alert").addClass("alert alert-danger").html(data.msg), setTimeout(function () {
                    $(".js-alert").removeClass("alert alert-danger").html("")
                }, 2e3);
                btn.removeClass("disabled")
            })
        }
    }

    // 屏蔽文章理由
    function getIgnoredList(btn) {
        if (!btn.hasClass("disabled")) {
            btn.addClass("disabled");
            var url = "/admin/article_reasons", post_data = {
                huxiu_hash_code: huxiu_hash_code,
                is_ajax: 1
            }, aid = btn.attr("aid");
            $.post(url, post_data, function (data) {
                if (data = eval("(" + data + ")"), 1 == data.result) {
                    for (var html = "", i = 0; i < data.data.length; i++)html += '<label class="new-lb"><input id="' + data.data[i].id + '" name="reason" value="' + data.data[i].message + '" type="checkbox" />' + data.data[i].message + "</label>";
                    var id = "ignoreModal", body = '<div class="js-alert"></div><div class="clearfix"><div class="pull-left">忽略理由如下:</div><div class="modal-manage pull-right"><a class="js-modal-manage" href="javascript:void(0);">管理</a></div></div><div class="reason-box js-reason-box">' + html + '<label class="new-lb"><textarea class="form-control js-custom-reason" placeholder="您可在此输入自定义忽略理由"></textarea></label></div><div class="reason-edit-box js-reason-edit-box"></div>', title = "忽略", footer = '<button class="btn btn-success article-check-ignore-conform" aid=' + aid + ">确定</button>";
                    showBox(id, title, body, footer)
                } else showBox("ignoreModal", "忽略", data.msg, '<button class="btn btn-success" data-dismiss="modal" aria-hidden="true">关闭</button>');
                btn.removeClass("disabled")
            })
        }
    }

    require.async(["jquery-qrcode.min"], function () {
    });
    var modal_build;
    require.async("modal_build", function (a) {
        modal_build = a
    }),

        $(document).on("click", ".js-qr-ds", function () {
            $(this).css({
                opacity: "0",
                height: "0",
                overflow: "hidden"
            }).hide().animate(300, function () {
                $(this).css({display: "none"})
            });
            var a = $(".js-qr-img");
            a.removeClass("hide"), a.addClass("info-true")
        }),

        // 点评列表的展开/收起
        $(document).on("click", ".js-show-hide-dp-box", function () {
            var a = $(this);
            if ("true" == a.attr("data-buttom")) {
                var b = $(".span-mark-article-pl");
                b.attr("data-show", "false"), b.html("展开"), a.parents(".dp-box").find(".dl-user-list").slideDown(), a.parents(".dp-box").find(".dp-list-box").hide()
            } else"dl-user" == a.attr("data-type") ? (a.parent(".dp-box").find(".span-mark-article-pl").html("收起"), a.parent(".dp-box").find(".span-mark-article-pl").attr("data-show", "true"), a.parent(".dp-box").find(".dl-user-list").hide(), a.parent(".dp-box").find(".dp-list-box").slideDown()) : "false" == a.attr("data-show") ? (a.html("收起"), a.parent(".dp-box").find(".dl-user-list").hide(), a.parent(".dp-box").find(".dp-list-box").slideDown(), a.attr("data-show", "true")) : (a.html("展开"), a.parents(".dp-box").find(".dl-user-list").slideDown(), a.parents(".dp-box").find(".dp-list-box").hide(), a.attr("data-show", "false"))
        }),

        // 朋友圈分享二维码
        function () {
            var a = null, b = function (b) {
                clearTimeout(a), a = setTimeout(function () {
                    $(".weixin-Qr-code").stop().animate({opacity: 0, "margin-left": "80px"}, 400, function () {
                        $(".weixin-Qr-code").hide()
                    })
                }, 100)
            }, c = function (b) {
                clearTimeout(a), $(".weixin-Qr-code").stop().animate({opacity: 1, "margin-left": "70px"}).show()
            };
            $(document).on("mouseenter", ".article-left-btn-group .js-weixin", function () {
                var a = $(this);
                $(".weixin-Qr-code").find("img").attr("src") ? $.myDetection.gaDetection("第三方分享,文章页,朋友圈") : ($(".weixin-Qr-code").empty().qrcode({
                    render: "table",
                    size: 130,
                    text: window.location.href + "?f=" + a.attr("data-f")
                }), "pc-friends-article" == a.attr("data-f") ? $.myDetection.gaDetection("第三方分享,文章页,朋友圈") : "pc-topic" == a.attr("data-f") && $.myDetection.gaDetection("第三方分享,热议话题,微信分享")), a.hasClass("disabled") || (a.addClass("disabled"), c(a))
            }), $(document).on("mouseenter", ".article-left-btn-group .js-wx-Qr-code", function () {
                var a = $(this);
                a.hasClass("disabled") || (a.addClass("disabled"), c(a))
            }), $(document).on("mouseleave", ".article-left-btn-group .js-weixin", function () {
                var a = $(this);
                b(a), a.removeClass("disabled")
            }), $(document).on("mouseleave", ".article-left-btn-group .js-wx-Qr-code", function () {
                var a = $(this);
                b(a), a.removeClass("disabled")
            })
        }(),

        // 支付宝分享二维码
        function () {
            var a = null, b = function (b) {
                clearTimeout(a), a = setTimeout(function () {
                    $(".zhifubao-Qr-code").stop().animate({opacity: 0, "margin-left": "80px"}, 400, function () {
                        $(".zhifubao-Qr-code").hide()
                    })
                }, 100)
            }, c = function (b) {
                clearTimeout(a), $(".zhifubao-Qr-code").stop().animate({opacity: "1", "margin-left": "70px"}).show()
            };

            $(document).on("mouseenter", ".article-left-btn-group .js-zhifubao", function () {
                var a = $(this);
                $(".zhifubao-Qr-code").find("img").attr("src") ? $.myDetection.gaDetection("第三方分享,文章页,朋友圈") : ($(".zhifubao-Qr-code").empty().qrcode({
                    render: "table",
                    size: 130,
                    text: window.location.href + "?f=" + a.attr("data-f")
                }), "pc-friends-article" == a.attr("data-f") ? $.myDetection.gaDetection("第三方分享,文章页,生活号") : "pc-topic" == a.attr("data-f") && $.myDetection.gaDetection("第三方分享,热议话题,微信分享")), a.hasClass("disabled") || (a.addClass("disabled"), c(a))
            }),

                $(document).on("mouseenter", ".article-left-btn-group .js-zhifubao-Qr-code", function () {
                    var a = $(this);
                    a.hasClass("disabled") || (a.addClass("disabled"), c(a))
                }),

                $(document).on("mouseleave", ".article-left-btn-group .js-zhifubao", function () {
                    var a = $(this);
                    b(a), a.removeClass("disabled")
                }),

                $(document).on("mouseleave", ".article-left-btn-group .js-zhifubao-Qr-code", function () {
                    var a = $(this);
                    b(a), a.removeClass("disabled")
                })
        }(),

        $(document).on("mouseleave", ".js-show-promote-qr", function () {
            var a = $(this), b = a.parents(".promote-warp").find(".qr-box");
            b.stop().animate({opacity: "0", right: "180px"}, 400, function () {
                b.hide()
            }), a.removeClass("disabled")
        }),

        $(document).on("mouseenter", ".js-show-promote-qr", function () {
            var a = $(this), b = a.parents(".promote-warp").find(".qr-box");
            a.hasClass("disabled") || (a.addClass("disabled"), b.stop().css({
                opacity: "0",
                right: "180px"
            }).show().animate({opacity: "1", right: "160px"}, 300))
        }),

        // 分享文章到微博/朋友圈
        $(document).on("click", ".js-share-article", function () {
            var a, b = $(this), c = b.attr("aid"), d = b.attr("pid"), e = (b.attr("fid"), b.attr("topic_id"), "/article/share/");
            b.hasClass("js-weibo") ? (a = "hxs_tsina", "article" == b.attr("data-location") ? $.myDetection.gaDetection("第三方分享,文章页,微博") : "index" == b.attr("data-location") ? $.myDetection.gaDetection("第三方分享,首页,微博") : "index" == b.attr("data-location") && $.myDetection.gaDetection("第三方分享,栏目页,微博")) : b.hasClass("js-qzone") ? (a = "hxs_qzone", "article" == b.attr("data-location") ? ($.myDetection.gaDetection("第三方分享,文章页,QQ空间"), ga("send", "event", "第三方分享", "文章页", "QQ空间")) : "index" == b.attr("data-location") ? ($.myDetection.gaDetection("第三方分享,首页,QQ空间"), ga("send", "event", "第三方分享", "首页", "QQ空间")) : "index" == b.attr("data-location") && $.myDetection.gaDetection("第三方分享,栏目页,QQ空间")) : b.hasClass("js-thread") && (a = "hxs_tsina", $.myDetection.gaDetection("第三方分享,群组内容页,微博")), window.open(e + "?huxiu_hash_code=" + huxiu_hash_code + "&aid=" + c + "&pid=" + d + "&des=" + a + "&f=" + b.attr("data-f") + "&fid=" + b.attr("fid") + "&topic_id=" + b.attr("topic_id"))
        }),

        $(document).on("click", ".js-add-dp-box", function () {
            if ($(".dp-article-box").slideUp(), $(".hu-pl-box").slideUp(), $("#saytext_reply").length > 0 && ($(".pl-box-wrap textarea").attr("id", ""), $(".pl-box-wrap textarea").attr("name", "")), "none" == $(this).parent(".pl-box-btm").find(".dp-article-box").css("display")) {
                $(this).parent(".pl-box-btm").find(".dp-article-box").slideDown();
                var a = $(this).parent(".pl-box-btm").find(".dp-article-box").find("textarea");
                a.attr("id", "saytext_reply"), a.attr("name", "saytext_reply")
            } else $(this).parent(".pl-box-btm").find(".dp-article-box").slideUp()
        }),

        $(document).on("click", ".js-hf-article-pl", function () {
            if ($(".dp-article-box").slideUp(), $(".hu-pl-box").slideUp(), $("#saytext_reply").length > 0 && ($(".pl-box-wrap  textarea").attr("id", ""), $(".pl-box-wrap textarea").attr("name", "")), "none" == $(this).parent(".one-pl-content").find(".hu-pl-box").css("display")) {
                $(this).parent(".one-pl-content").find(".hu-pl-box").slideDown();
                var a = $(this).parent(".one-pl-content").find(".hu-pl-box").find("textarea");
                a.attr("id", "saytext_reply"), a.attr("name", "saytext_reply");
                var b = $(this).parent(".one-pl-content").find(".content").find(".name").eq(0).text(), c = "// @" + b + " ：" + $(this).parent(".one-pl-content").find(".author-content").text();
                a.data({dpData: "<q>" + dpFilterRep(c) + "</q>"}).val("回复 @" + b + " ：")
            } else $(this).parent(".one-pl-content").find(".hu-pl-box").slideUp()
        }), $(document).on("click", ".js-search-letter-close", function () {
        var a = $(".search-letter-btn");
        a.attr("data-show-box", "false"), a.animate({height: "58px"}, 600), a.css({"border-bottom-color": "#f0f0f0"}), setTimeout(function () {
            $(".search-letter-box").slideUp(), a.removeClass("active")
        }, 100)
    }),

        // textarea的大小随输入内容的增多而变大
    $("#saytext").length > 0 && require.async(["autoresize.min"], function () {
        $(".pl-form-box textarea").autoResize({
            onResize: function () {
                $(this).css({opacity: .8})
            }, animateCallback: function () {
                $(this).css({opacity: 1})
            }, animateDuration: 300, extraSpace: 30
        })
    }),

        $(document).on("mouseover", ".article-zfb-wx-box ul li", function () {
            var a = "";
            $(this).find(".icon-zhifb").length > 0 ? a = $(this).find(".zfbdashang-wrap") : $(this).find(".icon-weix").length > 0 && (a = $(this).find(".wxdashang-wrap")), a && a.stop().css({
                opacity: "0",
                "margin-top": "-190px"
            }).show().animate({opacity: "1", "margin-top": "-180px"}, 300)
        }),

        $(document).on("mouseout", ".article-zfb-wx-box ul li", function () {
            var a = "";
            $(this).find(".icon-zhifb").length > 0 ? a = $(this).find(".zfbdashang-wrap") : $(this).find(".icon-weix").length > 0 && (a = $(this).find(".wxdashang-wrap")), a && a.stop().animate({
                opacity: "0",
                "margin-top": "-180px"
            }, 400, function () {
                a.hide()
            })
        }),

        // 评论文章或活动
        $(document).on("click", ".js-article-pl,.js-chuangye-pl", function () {
            var a = $(this), b = parseInt(1e5 * Math.random()), c = "", d = "", e = $("#saytext").val(),
                f = {
                    is_ajax: "1",
                    random: b,
                    huxiu_hash_code: huxiu_hash_code,
                    message: e
                }, g = $("#hid").val();
            return "active" == $("#comment-type").val() ? (c = "/active/comment/", d = "active", f.hid = g, f = addTaobaoParams(f))
                : "chuangye" == $("#comment-type").val() ? (c = "/chuangye/add_comments", d = "chuangye", f.com_id = $("#com_id").val())
                : (c = "/article/add_comment/", d = "article", f.aid = aid), "" == e || null == e
                ? (errorAn($(".pl-form-box")), modal_build.showMessagePrompt("评论内容不能为空", "error"), !1)
                : e.length < 8 ? (errorAn($(".pl-form-box")), modal_build.showMessagePrompt("客官，8个字起评，不讲价哟", "error"), !1)
                : void(a.hasClass("disabled") || (a.addClass("disabled"), console.log(c), console.log(f),
                $.ajax({
                    type: "post",
                    url: c,
                    data: f,
                    dataType: "json",
                    async: !0,
                    success: function (b) {
                        if (1 == b.result) {
                            alert('评论成功！');
                            $("#saytext").val("");
                            window.location.reload();
                        } else modal_build.showMessagePrompt(b.msg, "error");
                        a.removeClass("disabled")
                    },
                    error: function (a) {
                    }
                })))
        }),

        $(document).on("click", ".js-icon-like", function () {
            if (0 == uid)return !1;
            var a = $(this);
            a.hasClass("active") ? $(".icon-like-prompt").find(".c1").html("-1") : $(".icon-like-prompt").find(".c1").html("+1");
            var b = $(this).parents(".article-type").find(".icon-like-prompt");
            b.css({opacity: "1"}).animate({opacity: "0", "margin-top": "-25px"}, 400, function () {
                b.css({"margin-top": "-13px"})
            })
        }),

        $(document).on("click", ".js-no-icon-like", function () {
            if (0 == uid)return !1;
            var a = $(this);
            a.hasClass("active") ? $(".icon-no-like-prompt").find(".c1").html("-1") : $(".icon-no-like-prompt").find(".c1").html("+1");
            var b = $(this).parents(".article-type").find(".icon-no-like-prompt");
            b.css({opacity: "1"}).animate({opacity: "0", "margin-top": "-27px"}, 400, function () {
                b.css({"margin-top": "-17px"})
            })
        }),

        // 点赞、取消点赞
        $(document).on("click", ".js-icon-like,.js-no-icon-like", function () {
            if (0 == uid)return $(".login-link-box .js-login").trigger("click"), !1;
            var a = $(this), b = "", c = parseInt(1e5 * Math.random()), d = a.parents(".pl-box-wrap ").attr("data-pid"), e = {
                is_ajax: "1",
                random: c,
                huxiu_hash_code: huxiu_hash_code,
                pid: d
            };
            a.hasClass("disabled") || (a.addClass("disabled"), b = a.hasClass("active") ? "like" == a.attr("data-type") ? "/action/agree" : "/action/disagree" : "like" == a.attr("data-type") ? "/action/agree" : "/action/disagree", $.ajax({
                type: "post",
                url: b,
                data: e,
                dataType: "json",
                async: !0,
                success: function (b) {
                    a.hasClass("js-icon-like") ? $.myDetection.gaDetection("评论相关,文章页,点赞") : $.myDetection.gaDetection("评论相关,文章页,点差");
                    var c = a.find(".like");
                    "1" == b.result ? a.hasClass("active") ? (a.removeClass("active"), c.text(parseInt(c.text()) - 1), a.find("i").removeClass("active"), modal_build.showMessagePrompt(b.msg, "success")) : (c.text(parseInt(c.text()) + 1), a.addClass("active"), a.find("i").addClass("active"), modal_build.showMessagePrompt(b.msg, "success")) : modal_build.showMessagePrompt(b.msg, "error"), a.removeClass("disabled")
                },
                error: function (a) {
                }
            }))
        }),

        $(document).on("click", ".js-article-pl-anchor", function () {
            var a = ($(this), 100), b = ($(this).attr("data-href"), $("#pl-wrap-article").offset().top - a);
            $("html, body").animate({scrollTop: b}, 500), $("#saytext").focus()
        }),

        // 显示收藏夹列表
        $(document).on("click", ".js-collection-article", function () {
            var a = $(this), b = "/member/get_favorite_category_all_list/", c = {
                huxiu_hash_code: huxiu_hash_code,
                aid: aid
            };
            0 == uid ? (localStorage.setItem("loginBack", "collection"), $(".login-link-box .js-login").trigger("click")) : a.hasClass("disabled") || (a.addClass("disabled"), $.ajax({
                type: "post",
                url: b,
                data: c,
                dataType: "json",
                async: !0,
                success: function (b) {
                    if ("1" == b.result) {
                        var c = "";
                        $.each(b.data, function (a, b) {
                            var d = '<i class="icon icon-favor-radio pull-right hide"></i>';
                            c += '<div class="favorites-box js-choose-favorites" data-cid="' + b.cid + '">' + d + '<div class="favorites-name">' + b.name + '</div><div class="favorites-articel-number">' + b.count + "篇文章</div></div>"
                        });
                        var d, e;
                        d = "添加到收藏夹", e = '<div class="favorites-warp">' + c + '</div><div class="btn btn-add-default js-btn-add-default"><i class="icon icon-group-add"></i>创建收藏夹</div><div class="add-favorites-box hide"><input placeholder="收藏夹名称（最多可输入20字）" id="favorites_name"><a class="btn btn-add-default js-add-favorites">创建</a></div><div class="edit-title-box"><div class="btn-group"><div class="btn btn-determine js-favorite-category">确定</div><div class="btn btn-cancel" data-dismiss="modal">取消</div></div></div>', modal_build.showBoxContent("collection-article", d, e)
                    } else modal_build.showMessagePrompt(b.msg, "error");
                    a.removeClass("disabled")
                },
                error: function (a) {
                }
            }))
        }),

        $(document).on("click", ".js-choose-favorites", function () {
            var a = $(this);
            a.find(".icon-favor-radio").toggleClass("hide")
        }),

        $(document).on("click", ".js-btn-add-default", function () {
            $(this).addClass("hide"), $(".add-favorites-box").removeClass("hide")
        }),

        // 添加收藏夹
        $(document).on("click", ".js-add-favorites", function () {
            if ("" != $("#favorites_name").val()) {
                var a = ($(this), "/member/add_favorite_category/"),
                    b = {
                        huxiu_hash_code: huxiu_hash_code,
                        name: $("#favorites_name").val()
                    };
                $.ajax({
                    type: "post", url: a, data: b, dataType: "json", async: !0, success: function (a) {
                        if ("1" == a.result) {
                            var b = '<div class="favorites-box js-choose-favorites" data-cid="' + a.cid + '"><i class="icon icon-favor-radio pull-right"></i><div class="favorites-name">' + $("#favorites_name").val() + '</div><div class="favorites-articel-number">0篇文章</div></div>';
                            $(".favorites-warp").append(b), $("#favorites_name").val(""),
                                $(".add-favorites-box").addClass("hide"),
                                $(".js-btn-add-default").removeClass("hide"),
                                $.myDetection.gaDetection("收藏,文章页,文章收藏-新建收藏夹")
                        } else modal_build.showMessagePrompt(a.msg, "error")
                    }, error: function (a) {
                    }
                })
            } else alert("还没有填写收藏夹名字哦~~")
        }),

        // 添加到收藏夹
        $(document).on("click", ".js-favorite-category", function () {
            var a = ($(this), "/member/add_favorite/"),
                b = {
                    huxiu_hash_code: huxiu_hash_code,
                    aid: aid,
                    cid: ""
                },
                c = $(".favorites-warp").find(".favorites-box");
            c.length > 0 && (
                $.each(c, function (a, d) {
                    c.eq(a).find(".icon-favor-radio").hasClass("hide") || (b.cid += c.eq(a).attr("data-cid") + ",")
                }),
                b.cid.indexOf(",") >= 0 && (b.cid = b.cid.substring(0, b.cid.length - 1)), b.cid.length > 0 ?
                    $.ajax({
                        type: "post",
                        url: a,
                        data: b,
                        dataType: "json",
                        async: !0,
                        success: function (a) {
                            "1" == a.result ? ($.myDetection.gaDetection("收藏,文章页,文章收藏-收藏成功"), modal_build.showMessagePrompt(a.msg, "success"))
                                : modal_build.showMessagePrompt(a.msg, "error"),
                                $("#collection-article").modal("hide")
                        },
                        error: function (a) {
                        }
                    }) : modal_build.showMessagePrompt("请选择收藏夹", "error"))
        }),

        // 点赞
        $(document).on("click", ".js-like-article", function () {
            var a = $(this),
                b = "/article/like/",
                c = {
                    huxiu_hash_code: huxiu_hash_code,
                    aid: "like" == a.attr("data-type") ? aid : -parseInt(aid)
                };
            $.ajax({
                type: "post", url: b, data: c, dataType: "json", async: !0, success: function (b) {
                    if ("1" == b.result) {
                        a.hasClass("active") ? $(".praise-box-add").find("span").html("-1") : $(".praise-box-add").find("span").html("+1");
                        var c = a.find(".praise-box-add");
                        c.css({opacity: "1"}).animate({opacity: "0", "margin-top": "-65px"}, 400, function () {
                            c.css({"margin-top": "-40px"})
                        }),
                            a.hasClass("active") ? $(".praise-box").find(".num").text(parseInt($(".praise-box").find(".num").html()) - 1) :
                                $(".praise-box").find(".num").text(parseInt($(".praise-box").find(".num").html()) + 1),
                            "like" == a.attr("data-type") ? a.attr("data-type", "dislike") : a.attr("data-type", "like"),
                            a.toggleClass("active"), modal_build.showMessagePrompt(b.msg, "success"),
                            $.myDetection.gaDetection("点赞,文章页,文章点赞")
                    } else modal_build.showMessagePrompt(b.msg, "error")
                }, error: function (a) {
                }
            })
        }),

        $(document).on("click", ".js-pl-dz, .js-pl-yl, .js-pl-zz", function () {
            var a = $(this), b = "", c = {
                is_ajax: 1,
                pid: a.parents(".pl-box-wrap").attr("data-pid"),
                actype: a.attr("actype"),
                huxiu_hash_code: huxiu_hash_code
            };
            "active" == $("#comment-type").val() ? (b = "/active/recommendComment/", c.hid = $("#hid").val(), c = addTaobaoParams(c)) :
                b = "/article/comment_recommend/",
                $.ajax({
                    type: "post",
                    url: b,
                    data: c,
                    dataType: "json",
                    async: !0,
                    success: function (b) {
                        1 == b.result ? ("del_recommend" == a.attr("actype") || "del_article_eye" == a.attr("actype") ? (a.parents(".pl-box-wrap").find(".btm-yl").remove(), a.attr("actype", a.attr("actype").slice(4, a.attr("actype").length)), a.parents(".pl-box-wrap").removeClass("active"), a.find("span").remove()) : (a.parents(".pl-box-wrap").find(".btm-yl").length > 0 ? a.parents(".pl-box-wrap").find("btm-yl").html(a.html()) : a.parents(".pl-box-wrap").prepend('<div class="btm-yl">' + a.html() + "</div>"), a.parents(".pl-box-wrap").addClass("active"), a.attr("actype", "del_" + a.attr("actype")), a.html("<span>取消</span>" + a.html())), modal_build.showMessagePrompt(b.msg, "success")) : modal_build.showMessagePrompt(b.msg, "error")
                    },
                    error: function (b) {
                        modal_build.showMessagePrompt("网络错误提交失败，请重试。", "success"), a.removeClass("disabled")
                    }
                })
        }),

        $(document).on("click", ".js-pl-banned", function () {
            var a = $(this), b = "/setuser/stop_user/", c = {
                is_ajax: "1",
                uid: a.attr("uid"),
                pid: a.parents(".pl-box-wrap").attr("data-pid"),
                type: a.attr("type"),
                huxiu_hash_code: huxiu_hash_code
            };
            $.ajax({
                type: "post", url: b, data: c, dataType: "json", async: !0, success: function (b) {
                    1 == b.result ? ("startuser" == a.attr("type") ? (a.attr("type", "stopuser"), a.find("span").remove()) : (a.attr("type", "startuser"), a.html("<span>取消</span>" + a.html())), modal_build.showMessagePrompt(b.msg, "success")) : modal_build.showMessagePrompt(b.msg, "error")
                }
            })
        }),

        // 删除评论
        $(document).on("click", ".js-delpl-btn", function () {
            var a = $(this),
                b = parseInt(1e5 * Math.random()),
                c = a.attr("pid"),
                d = (a.attr("cid"), "comment"),
                e = "/article/deldata/",
                f = {
                    is_ajax: "1",
                    random: b,
                    huxiu_hash_code: huxiu_hash_code,
                    pid: c,
                    actype: d
                };

            a.hasClass("disabled") || (a.addClass("disabled"),
                $.ajax({
                    type: "post",
                    url: e,
                    data: f,
                    dataType: "json",
                    async: !0,
                    success: function (b) {
                        if ("1" == b.result) {
                            var d = $("#g_pid" + c);
                            d.css({opacity: " 0.3"}).find(".pl-box-nr").css({
                                height: "56px",
                                overflow: "hidden"
                            }), d.slideUp(200, function () {
                                $(this).remove()
                            }), modal_build.showMessagePrompt(b.msg, "success")
                        } else modal_build.showMessagePrompt(b.msg, "error");
                        a.removeClass("disabled")
                    }
                }))
        }),

        // 删除点评
        $(document).on("click", ".js-deldp-btn", function () {
            var a = $(this), b = parseInt(1e5 * Math.random()), c = a.attr("cid"), d = "recomment", e = "/article/deldata/", f = {
                is_ajax: "1",
                random: b,
                huxiu_hash_code: huxiu_hash_code,
                cid: c,
                actype: d
            };
            a.hasClass("disabled") || (a.addClass("disabled"), $.ajax({
                type: "post",
                url: e,
                data: f,
                dataType: "json",
                async: !0,
                success: function (b) {
                    "1" == b.result ? ($(".del-pl" + a.attr("cid")).remove(), 0 == $(".dp-box").find(".dp-list-box").find(".dl-user").length && $(".dp-box").remove()) : modal_build.showMessagePrompt(b.msg, "error"), a.removeClass("disabled")
                }
            }))
        }),

        // 点评别人对文章的评论
        $(document).on("click", ".js-article-dp", function () {
            if (0 == uid)return $(".login-link-box .js-login").trigger("click"), !1;
            var a = $(this),
                b = a.parents(".pl-box-wrap"),
                c = parseInt(1e5 * Math.random()),
                d = b.attr("data-pid"),
                e = a.parents(".dp-article-box"),
                f = $("#saytext_reply").val(),
                g = e.find(".dp-article-box textarea").data("dpData"),
                h = "undefined" == typeof g ? "" : g,
                i = "/article/recomment/",
                j = {
                    is_ajax: "1",
                    random: c,
                    huxiu_hash_code: huxiu_hash_code,
                    pid: d,
                    // message: encodeURI(f + h)
                    message: f + h
                };
            if (j.aid = aid, "" == f || null == f)
                return errorAn(a.parents(".dp-article-box")), modal_build.showMessagePrompt("内容不能为空", "error"), !1;
            var k = $(this).parents(".one-pl-content").find(".content").find(".name").text();
            return f.replace("回复 @" + k + " ：", "").length < 8 ? (errorAn(a.parents(".dp-article-box")), errorAn(a.parents(".hu-pl-box")), modal_build.showMessagePrompt("客官，8个字起评，不讲价哟", "error"), !1) :
                void(a.hasClass("disabled") || (a.addClass("disabled"),
                    j['message'] = j['message'].replace("回复 @" + k + " ：", ""),
                    j['at_name'] = k,
                    console.log(j),
                    $.ajax({
                        type: "post",
                        url: i,
                        data: j,
                        dataType: "json",
                        async: !0,
                        success: function (b) {
                            var c = b;
                            if (1 == b.result) {
                                $(".pl-box-wrap textarea").val(""),
                                    modal_build.showMessagePrompt(b.msg, "success"),
                                "false" == a.parents(".pl-box-wrap").find(".span-mark-article-pl").attr("data-show") && a.parents(".pl-box-wrap").find(".span-mark-article-pl").trigger("click");
                                var d = $(".pl-form-author ").find("img").attr("src"),
                                    e = $(".pl-form-author ").find(".author-name").text(),
                                    f = is_vip ? '<a href="/vip" target="_blank"><i class="i-vip icon-vip"></i></a>' : "", g = is_vip ? '<span class="icon-s"><i class="i-vip icon-vip"></i></span>' : "";

                                // 如果点评框存在，在点评框中新加一个头像；没有框，则新增一个框
                                if (a.parents(".pl-box-wrap").find(".dp-box").length > 0) {
                                    var h, i, j = a.parents(".pl-box-wrap").find(".dp-box"), k = "";
                                    k = '<li><a href="/member/' + uid + '/" target="_blank"><img src="' + d + '"></a>' + g + "</li>", h = '<div class="dl-user del-pl' + c.reppid + '"><ul><li><a href="/member/' + uid + '.html" target="_blank"><img src="' + d + '"></a></li></ul><div class="one-pl-content"><div class="pull-right time">刚刚</div><p class="content"><span class="name">' + e + "</span>" + f + '<span class="author-content">&nbsp;&nbsp;:' + c.message + '</span></p><div class="js-hf-article-pl"><span>回复</span></div><div class="dropdown"><button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></button><ol class="dropdown-menu" aria-labelledby="dropdownMenu1"><li class="pl-kill js-deldp-btn" cid="' + c.reppid + '">删除</li></ol></div><div class="hu-pl-box"><textarea class="form-control" placeholder="客官，8个字起评，不讲价哟" id="" name=""></textarea><button class="btn btn-article js-article-dp" data-type="hf">发表</button></div></div></div>', i = '<span class="span-mark-article-pl js-show-hide-dp-box" data-show="false">展开</span>', j.find(".dl-user-list").find("ul").append(k), j.find(".dp-list-box").prepend(h),
                                        a.parents(".pl-box-wrap").find(".one-pl-content-box").remove()
                                } else {
                                    var l = '<div class="dp-box del-pl' + c.reppid + '"><span class="span-mark-author">点评</span><span class="span-mark-article-pl js-show-hide-dp-box" data-show="false">展开</span><div class="dl-user dl-user-list"><ul><li class="del-pl' + c.reppid + '"><a href="/member/' + uid + '/" target="_blank"><img src="' + d + '"></a></li></ul><div class="one-pl-content one-pl-content-box"><div class="pull-right time">刚刚</div><p class="content"><span class="name">' + e + "</span>" + f + '<span class="author-content">&nbsp;&nbsp;:' + c.message + '</span></p><div class="js-hf-article-pl"><span>回复</span></div><div class="dropdown"><button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></button><ol class="dropdown-menu" aria-labelledby="dropdownMenu1"><li class="pl-kill js-deldp-btn" cid="' + c.reppid + '">删除</li></ol></div><div class="hu-pl-box"><textarea class="form-control" placeholder="客官，8个字起评，不讲价哟"></textarea><button class="btn btn-article js-article-dp" data-type="hf">发表</button></div></div></div><div class="dp-list-box"><div class="dl-user del-pl' + c.reppid + '"><ul><li><a href="/member/' + uid + '/" target="_blank"><img src="' + d + '"></a></li></ul><div class="one-pl-content"><div class="pull-right time">刚刚</div><p class="content"><span class="name">' + e + "</span>" + c.message + '</p><div class="js-hf-article-pl"><span>回复</span></div><div class="dropdown"><button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></button><ol class="dropdown-menu" aria-labelledby="dropdownMenu1"><li class="pl-kill js-deldp-btn" cid="' + c.reppid + '">删除</li></ol></div><div class="hu-pl-box"><textarea class="form-control" placeholder="客官，8个字起评，不讲价哟"></textarea><button class="btn btn-article js-article-dp" data-type="hf">发表</button></div></div></div><div class="close-dp-list-box js-show-hide-dp-box" data-buttom="true">收起</div></div></div>';
                                    a.parents(".pl-box-wrap").find(".pl-box-top").append(l).slideDown()
                                }
                                $(".dp-article-box").slideUp(), $(".hu-pl-box").slideUp(), $("#saytext_reply").length > 0 && ($(".pl-box-wrap  textarea").attr("id", ""), $(".pl-box-wrap  textarea").attr("name", "")), "hf" == a.attr("data-type") ? $.myDetection.gaDetection("评论相关,文章页,回复点评") : $.myDetection.gaDetection("评论相关,文章页,点评")
                            } else modal_build.showMessagePrompt(b.msg, "error");
                            !a.removeClass("disabled")
                        },
                        error: function (a) {
                        }
                    })))
        }),

        // 展开/收起点评列表
        $(document).on("click", ".dp-box .dl-user q", function () {
            var a = $(this);
            a.hasClass("js-open") ? (a.removeClass("js-open"), a.css({
                display: "inline-block",
                background: "#0479c4",
                color: "#fff"
            }, 100)) : (a.addClass("js-open"), a.css({
                display: "inline",
                background: "transparent",
                color: "#555"
            }, 100))
        }),

        // 点击 "默认评论" 和 "最新评论"
        $(document).on("click", ".js-default-new-pl", function () {
            $(".js-get-pl-more-list").removeClass("hide");
            var a = $(this), b = "/article/comment_list/", c = {
                huxiu_hash_code: huxiu_hash_code,
                page: a.attr("data-cur_page"),
                // type: a.attr("data-type")
            };
            console.log(c);
            c.aid = aid, $(".js-default-new-pl").removeClass("active"), a.addClass("active"),
                $.ajax({
                    type: "post",
                    url: b,
                    data: c,
                    dataType: "json",
                    async: !0,
                    beforeSend: function (a) {
                        $(".pl-loading").removeClass("hide")
                    },
                    success: function (b) {
                        1 == b.result && ($(".pl-box-wrap ").remove(),
                            $(".pl-list-wrap").append(b.data), // b.data是html格式的
                            $(".js-get-pl-more-list").attr("data-cur_page", b.cur_page),
                            // $(".js-get-pl-more-list").attr("data-type", a.attr("data-type"))),
                        b.cur_page == b.total_page && $(".js-get-pl-more-list").addClass("hide"), // 就一页的话，隐藏"加载更多"
                            $(".pl-loading").addClass("hide"))
                    },
                    error: function (a) {
                    }
                })
        }),

        // 获取更多评论
        $(document).on("click", ".js-get-pl-more-list", function () {
            var a = $(this), b = "/article/comment_list/", c = {
                huxiu_hash_code: huxiu_hash_code,
                page: parseInt(a.attr("data-cur_page")) + 1,
                type: a.attr("data-type")
            };
            return c.aid = aid, a.hasClass("disabled") ? (modal_build.showMessagePrompt("没有更多评论了", "error"), !1) : void $.ajax({
                type: "post",
                url: b,
                data: c,
                dataType: "json",
                async: !0,
                success: function (b) {
                    1 == b.result && ("" == b.data && modal_build.showMessagePrompt("没有更多评论了", "error"),
                        $(".pl-list-wrap").append(b.data),
                        a.attr("data-cur_page", parseInt(a.attr("data-cur_page")) + 1)),
                    b.cur_page == b.total_page && a.addClass("hide")
                },
                error: function (a) {
                }
            })
        }),

        $(document).on("click", ".js-report-pl,.js-report-dp,.js-group-report", function () {
            var a = $(this), b = "";
            if (a.hasClass("js-report-pl"))var c = a.attr("pid"), d = "js-rep-pl-btn"; else if (a.hasClass("js-report-dp"))var c = a.attr("reppid"), d = "js-rep-dp-btn"; else if (a.hasClass("js-group-report")) {
                var c = a.attr("reppid"), b = a.attr("data-type");
                d = "js-group-report-btn"
            }
            if (!a.hasClass("disabled")) {
                a.addClass("disabled");
                var e = a.attr("aid"), f = '<div class="rep-wrap"><div class="form-horizontal rep-moder-box" type="' + b + '" aid="' + e + '" reportid="' + c + '"><label class="radio-inline"><i class="icon icon-radio"></i><input type="radio" name="repRadio" id="repRadio1" value="色情"> 色情</label><label class="radio-inline"><i class="icon icon-radio"></i><input type="radio" name="repRadio" id="repRadio2" value="谣言"> 谣言</label><label class="radio-inline"><i class="icon icon-radio"></i><input type="radio" name="repRadio" id="repRadio3" value="网络钓鱼/广告">网络钓鱼/广告</label><label class="radio-inline"><i class="icon icon-radio"></i><input type="radio" name="repRadio" id="repRadio4" value="政治"> 政治</label><label class="radio-inline"><i class="icon icon-radio"></i><input type="radio" name="repRadio" id="repRadio5" value="侵权"> 侵权</label><label class="radio-inline"><i class="icon icon-radio"></i><input type="radio" name="repRadio" id="repRadio6" value="人身攻击"> 人身攻击</label><h4 class="t-h4">补充说明</h4><div class="textarea-box"><textarea class="form-control" rows="3"></textarea></div></div></div>', g = '<div class="clearfix text-right rep-moder-btm"><button class="btn btn-blue ' + d + '">提交</button></div>';
                showBox("jb_model", "举报", f, g), a.removeClass("disabled")
            }
        }),

        $(document).on("click", ".js-rep-pl-btn,.js-rep-dp-btn", function () {
            var a = $(this);
            if (a.hasClass("js-rep-pl-btn"))var b = "comment"; else if (a.hasClass("js-rep-dp-btn"))var b = "dianping";
            var c = $(".rep-moder-box"), d = parseInt(1e5 * Math.random()), e = "/setuser/report", f = c.attr("reportid"), g = c.attr("aid"), h = c.find("input:checked").val(), i = c.find(".textarea-box textarea").val(), j = {
                is_ajax: "1",
                random: d,
                huxiu_hash_code: huxiu_hash_code,
                reportid: f,
                aid: g,
                type: b,
                description: encodeURI("#" + h + "#" + i)
            };
            return "undefined" == typeof h ? (modal_build.showMessagePrompt("请选择一个举报类型", "error"), !1) : void(a.hasClass("disabled") || (a.addClass("disabled"), $.ajax({
                type: "post",
                url: e,
                data: j,
                dataType: "json",
                async: !0,
                success: function (b) {
                    if ("1" == b.result) {
                        if (a.hasClass("js-rep-pl-btn")) {
                            var c = $("#g_pid" + f);
                            c.find(".pl-box").css({background: "#fcb8b8"})
                        } else if (a.hasClass("js-rep-dp-btn")) {
                            var c = $(".dianping-box[reppid=" + f + "]");
                            c.css({opacity: ".6"})
                        }
                        modal_build.showMessagePrompt(b.msg, "success")
                    } else modal_build.showMessagePrompt(b.msg, "error");
                    $("#jb_model").modal("hide"), a.removeClass("disabled")
                }
            })))
        }),

        // 获取更多标签
        $(document).on("click", ".js-get-tag-more-list", function () {
            var a = $(this), b = "/action/tag_article_list/", c = {
                huxiu_hash_code: huxiu_hash_code,
                page: a.attr("data-cur_page"),
                tag_id: a.attr("data-tag_id")
            };

            a.hasClass("disabled") ? modal_build.showMessagePrompt("没有更多标签了", "error") :
                $.ajax({
                    type: "post",
                    url: b,
                    data: c,
                    dataType: "json",
                    async: !0,
                    beforeSend: function (b) {
                        a.html("正在加载..."), a.removeClass("js-get-tag-more-list")
                    },
                    success: function (b) {
                        if (1 == b.result) {
                            var c = "";
                            $.each(b.data, function (a, b) {
                                c += '<li><a href="' + b.url + '" target="_blank">' + b.title + '</a><span class="pull-right time">' + b.time + "</span></li>"
                            }), a.attr("data-cur_page", parseInt(a.attr("data-cur_page")) + 1), $(".related-article ul").append(c), parseInt(a.attr("data-cur_page")) - 1 == b.total_page && (a.addClass("disabled"), a.remove())
                        } else modal_build.showMessagePrompt(b.msg, "error");
                        a.addClass("js-get-tag-more-list"), a.html("点击加载更多")
                    },
                    error: function (a) {
                    }
                })
        }),

    $(".js-pc-del").length > 0 && $(".js-pc-del").click(function () {
        btn = $(this);
        var a = "del_article_top", b = "删除", c = "确认要删除吗？", d = '<div><button class="btn js-pc-del-article" data-dismiss="modal">删除</button><button type="button" class="btn btn-gray" data-dismiss="modal">取消</button></div>';
        showBox(a, b, c, d)
    }),

        $(document).on("click", ".js-btn-related", function () {
            var a = "get";
            getRelatedInfo(showBox, a, "", $(this))
        }),

        $(document).on("click", ".js-submit", function () {
            var a = "add", b = $(".js-text").val();
            getRelatedInfo(showBox, a, b, $(this))
        }),

        $(document).on("click", ".js-remove", function () {
            var a = "del", b = $(this).parents("li").find(".url").html();
            getRelatedInfo(showBox, a, b, $(this))
        }),

        $(document).on("click", ".js-btn-ignored", function () {
            getIgnoredList($(this))
        }),

        $(document).on("click", "#ignoreModal .article-check-ignore-conform", function () {
            var btn = $(this), oParent = btn.parents(".modal"), oReasonBox = oParent.find(".js-reason-box"), iReason = oReasonBox.find(".js-custom-reason").val(), aid = $(this).attr("aid"), url = "/admin/article_ignore_action", param = {
                huxiu_hash_code: huxiu_hash_code,
                aid: aid
            }, reason = new Array, i = 0;
            if (!btn.hasClass("disabled")) {
                if ($.each(oReasonBox.find('.new-lb input[type="checkbox"]'), function (a, b) {
                        var c = $(b).val(), d = $(b).attr("id"), e = 1 == $(b).prop("checked") ? !0 : !1;
                        e && (reason[i] = {id: d, message: c}, i++)
                    }), "" != iReason && (reason[reason.length] = {
                        id: 0,
                        message: iReason
                    }), !reason[0] && "" == iReason && 0 == $("#is-group-message").prop("checked"))return void alert("请至少选择一种忽略理由");
                param.reasons = reason, param.ismessage = 1 == $("#is-group-message").prop("checked") ? 1 : 0, $.post(url, param, function (data) {
                    var data = eval("(" + data + ")");
                    1 == data.result ? ($("#ignoreModal").modal("hide"), window.location.reload()) : ($(".js-alert").addClass("alert alert-danger").removeClass("alert-success").html("忽略理由修改失败"), setTimeout(function () {
                        $(".js-alert").removeClass("alert alert-danger").html("")
                    }, 1500)), btn.removeClass("disabled")
                })
            }
        }),

        $(document).on("click", "#ignoreModal .js-modal-manage", function () {
            var a = $(this), b = a.parents(".modal"), c = b.find(".js-reason-box"), d = b.find(".js-reason-edit-box");
            $.each(c.find('.new-lb input[type="checkbox"]'), function (a, b) {
                var c = '<label class="new-lb"><span class="remove-article-reason">-</span><input class="form-control" id="' + $(b).attr("id") + '" name="reason" type="text" value="' + $(b).val() + '" /></label>';
                d.append(c)
            }), c.css("display", "none"), a.attr("class", "js-btn-reason-add").html("添加"), b.find(".article-check-ignore-conform").attr("class", "btn btn-success js-btn-article-manage-ignore")
        }),

        $(document).on("click", "#ignoreModal .js-reason-edit-box .new-lb span", function () {
            var btn = $(this), iReasonBox = btn.parent().find('input[type="text"]'), url = "/admin/article_reason_delete_action", param = {
                huxiu_hash_code: huxiu_hash_code,
                reason_id: iReasonBox.attr("id")
            };
            return void 0 == iReasonBox.attr("id") ? void iReasonBox.parent().remove() : void $.post(url, param, function (data) {
                data = eval("(" + data + ")"), 1 == data.result ? btn.parent().remove() : ($(".js-alert").addClass("alert alert-danger").removeClass("alert-success").html("忽略理由修改失败"), setTimeout(function () {
                    $(".js-alert").removeClass("alert alert-danger").html("")
                }, 1500))
            })
        }),

        $(document).on("click", ".js-btn-reason-add", function () {
            var a = $(this), b = a.parents(".modal"), c = b.find(".js-reason-edit-box");
            c.prepend('<label class="new-lb"><span class="remove-article-reason">-</span><input class="form-control" name="reason" type="text" value="" /></label>'), c.find(".new-lb:first-child input").focus()
        }), $(document).on("click", ".js-btn-article-manage-ignore", function () {


        var btn = $(this), oParent = btn.parents(".modal"), oReasonEditBox = oParent.find(".js-reason-edit-box"), urlModify = "/admin/article_reason_edit_action", urlAdd = "/admin/article_reason_add_action", paramAdd = {huxiu_hash_code: huxiu_hash_code}, paramModify = {huxiu_hash_code: huxiu_hash_code}, arrModify = [], arrAdd = [];
        btn.hasClass("disabled") || (btn.addClass("disabled"), $.each(oReasonEditBox.find('.new-lb input[type="text"]'), function (a, b) {
            if (void 0 == $(b).attr("id"))arrAdd.push($(b).val()); else {
                var c = {};
                c.id = $(b).attr("id"), c.message = $(b).val(), arrModify.push(c)
            }
            paramAdd.reason = arrAdd, paramModify.reason = arrModify
        }), arrAdd.length > 0 && $.post(urlAdd, paramAdd, function (data) {
            var data = eval("(" + data + ")");
            1 == data.result ? $("#ignoreModal").modal("hide") : ($(".js-alert").addClass("alert alert-danger").removeClass("alert-success").html("忽略理由修改失败"), setTimeout(function () {
                $(".js-alert").removeClass("alert alert-danger").html("")
            }, 1500)), btn.removeClass("disabled")
        }), arrModify.length > 0 && $.post(urlModify, paramModify, function (data) {
            var data = eval("(" + data + ")");
            1 == data.result ? $("#ignoreModal").modal("hide") : ($(".js-alert").addClass("alert alert-danger").removeClass("alert-success").html("忽略理由修改失败"), setTimeout(function () {
                $(".js-alert").removeClass("alert alert-danger").html("")
            }, 1500)), btn.removeClass("disabled")
        }))
    }),

        $(document).on("mouseover", ".zhifb-mouseover", function () {
            if ($(this).find(".icon-zhifb").length > 0) {
                var a = "文章打赏_支付宝,作家名称," + aid;
                $.myDetection.htmDetection(a)
            }
        }),

        $(document).on("mouseover", ".weix-mouseover", function () {
            if ($(this).find(".icon-weix").length > 0) {
                var a = "文章打赏_微信,作家名称," + aid;
                $.myDetection.htmDetection(a)
            }
        }),

        $(document).on("click", ".js-push-model", function () {
            var a = $(this);
            if ("main" == a.attr("data-location")) {
                var b = "/v2_admin_action/push_article_get", c = {
                    is_ajax: 1,
                    huxiu_hash_code: huxiu_hash_code,
                    aid: aid
                };
                $.ajax({
                    type: "post", url: b, data: c, dataType: "json", async: !0, success: function (b) {
                        var c = "", d = "", e = 0;
                        1 == b.result ? ($.each(b.list, function (b, f) {
                            1 == f.pushed ? (c += '<label class="btn" title="' + f.name + '" push_type="' + f.push_type + '" for="itemid' + f.push_type + '" disabled><input  id="itemid' + f.push_type + '" name="item" type="radio" disabled>' + f.name + "</label>", e += 1, d += '<span class="btn active" push_type="' + f.push_type + '" aid="' + a.attr("aid") + '" title="' + f.name + '"><i></i><input type="checkbox" checked="checked">' + f.name + "</span>") : c += '<label class="btn" title="' + f.name + '" push_type="' + f.push_type + '" for="itemid' + f.push_type + '" ><input  id="itemid' + f.push_type + '" name="item" type="radio">' + f.name + "</label>"
                        }), c = '<div class="btn-group checkbox-list modal-push-box" data-toggle="buttons">' + c + "</div>", d = e > 0 ? '<br/><br/><div class="alert alert-success push-modal-title">已推送到下列位置</div><div class="btn-group checkbox-list modal-push-box new-manage-push-btn-wrap" data-toggle="buttons">' + d + "</div>" : '<br/><br/><hr style="margin:10px 0;"><div class="text-center"><span class="label" style="padding:5px 10px;">这篇文章还没有被推送过</span></div>') : c = '<div class="alert alert-error">' + b.msg + "</div>";
                        var f = '<div class="modal-body"><div class="alert alert-success push-modal-title">推送列表：</div>' + c + d + "</div>", g = '<button class="btn btn-success new-push-modal2" aid="' + a.attr("aid") + '" data-dismiss="modal" aria-hidden="true">确定</button><button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>';
                        showBox("newPushModal", "新版管理推送", f, g)
                    }
                })
            }
        }),

        $(document).on("click", ".new-push-modal2", function () {
            var a = $(this), b = "/v2_admin_action/push_article_add", c = {
                huxiu_hash_code: huxiu_hash_code,
                aid: a.attr("aid"),
                push_type: $(".modal-push-box").eq(0).find('.btn input[type="radio"]:checked').parent().attr("push_type")
            };
            return void 0 == c.push_type ? (modal_build.showMessagePrompt("请选择推送位置", "error"), !1) : void $.ajax({
                type: "post",
                url: b,
                data: c,
                dataType: "json",
                async: !0,
                success: function (a) {
                    1 == a.result ? modal_build.showMessagePrompt(a.msg, "success") : modal_build.showMessagePrompt(a.msg, "error")
                }
            })
        }),

        $(document).on("click", ".new-manage-push-btn-wrap .btn", function () {
            if (confirm("确认要取消推送么？")) {
                var a = $(this), b = "/v2_admin_action/push_article_delete", c = {
                    huxiu_hash_code: huxiu_hash_code,
                    aid: a.attr("aid"),
                    push_type: a.attr("push_type")
                };
                $.ajax({
                    type: "post", url: b, data: c, dataType: "json", async: !0, success: function (b) {
                        if (1 == b.result) {
                            modal_build.showMessagePrompt(b.msg, "success"), a.remove();
                            var c = $(".modal-push-box").find("label");
                            $.each(c, function (b, d) {
                                c.eq(b).attr("push_type") == a.attr("push_type") && (c.eq(b).removeAttr("disabled"), c.eq(b).find("input").removeAttr("disabled"))
                            })
                        } else modal_build.showMessagePrompt(b.msg, "error")
                    }
                })
            }
        }),

        // 删除文章
        $(document).on("click", ".js-pc-del-article", function () {
            var a = ($(this), "/article/deldata/"), b = {
                huxiu_hash_code: huxiu_hash_code,
                is_ajax: 1,
                actype: "article",
                aid: aid
            };
            $.ajax({
                type: "post", url: a, data: b, dataType: "json", async: !0, success: function (a) {
                    1 == a.result ? modal_build.showMessagePrompt(a.msg, "success") : modal_build.showMessagePrompt(a.msg, "error")
                }
            })
        }),

        $(document).on("click", ".js-push-outs", function () {
            var a = ($(this), "/pushdata"), b = {
                huxiu_hash_code: huxiu_hash_code,
                aid: aid,
                ftype: "pushAd",
                is_ajax: 1,
                act: "getList"
            };
            $.ajax({
                type: "post", url: a, data: b, dataType: "json", async: !0, success: function (a) {
                    if (1 == a.result) {
                        var b = "";
                        $.each(a.content, function (a, c) {
                            var d = "";
                            1 == c.status && (d = "checked"), b += '<label class="checkbox-inline"><input name="pro[]" oid="' + c.oid + '" openid="' + c.openid + '" ' + d + ' type="checkbox" >' + c.openname + "</label>"
                        });
                        var c = "push_box_three_party", d = "管理第三方推送", e = '<div class="js-msg"></div><div class="">' + b + "</div>", f = '<button type="button" class="btn btn-success js-btn-push-three">提交</button> <button type="button" class="btn btn-gray" data-dismiss="modal">关闭</button>';
                        showBox(c, d, e, f)
                    } else modal_build.showMessagePrompt(a.msg, "error")
                }
            })
        }),

        $(document).on("click", ".js-btn-shensu", function () {
            var a = "d_shensu_box", b = '<div class="js-alert"></div><div><p>您可以再次<a href="/contribute?aid=' + $(this).attr("aid") + '">编辑</a>您的稿件，然后在这里写下您的申诉理由。我们会对您的稿件进行复核。复核为终审，如果您的稿件还是没有通过，我们只能表示非常遗憾。</p><textarea class="form-control js-text" placeholder="您可在此输入申诉理由" rows="5"></textarea></div>', c = "填写申诉理由", d = '<button class="btn btn-success js-btn-submit" aid="' + $(this).attr("aid") + '">确定</button>';
            showBox(a, c, b, d)
        }),

        $(document).on("click", "#d_shensu_box .js-btn-submit", function () {
            var btn = $(this);
            if (!btn.hasClass("disabled")) {
                btn.addClass("disabled");
                var url = "/setuser/author_reason", param = {
                    huxiu_hash_code: huxiu_hash_code,
                    is_ajax: 1,
                    aid: aid,
                    message: $("#d_shensu_box .js-text").val()
                };
                $.each($(".js-radio-box input"), function (a, b) {
                    return 1 == $(b).prop("checked") ? void(param.clickid = $(b).val()) : void 0
                }), $.post(url, param, function (data) {
                    data = eval("(" + data + ")"), 1 == data.result ? (btn.removeClass("disabled"), $(".js-alert").addClass("alert alert-success").removeClass("alert-danger").html("申诉成功"), setTimeout(function () {
                        $(".js-alert").removeClass("alert alert-success").html(""), location.reload()
                    }, 1500)) : ($(".js-alert").addClass("alert alert-danger").removeClass("alert-success").html(data.msg), setTimeout(function () {
                        $(".js-alert").removeClass("alert alert-danger").html("")
                    }, 1500)), btn.removeClass("disabled")
                })
            }
        }),

        $(document).on("click", ".js-btn-push-three", function () {
            var a = ($(this), []);
            $.each($(".modal-body").find(".checkbox-inline"), function (b, c) {
                var d = $(c).find("input:checked").attr("openid");
                a[b] = d
            });
            var b = "/pushdata", c = {
                huxiu_hash_code: huxiu_hash_code,
                aid: aid,
                act: "getSubmit",
                pro: a,
                ftype: "pushAd"
            };
            $.ajax({
                type: "post", url: b, data: c, dataType: "json", async: !0, success: function (a) {
                    1 == a.result ? (modal_build.showMessagePrompt(a.msg, "success"), setTimeout(function () {
                        location.reload()
                    }, 2e3)) : modal_build.showMessagePrompt(a.msg, "error")
                }
            })
        }),

        $(document).on("click", ".js-push-topic", function () {
            var a = ($(this), "/pushdata"), b = {
                huxiu_hash_code: huxiu_hash_code,
                aid: aid,
                act: "getList",
                ftype: "pushZt"
            };
            $.ajax({
                type: "post", url: a, data: b, dataType: "json", async: !0, success: function (a) {
                    if (1 == a.result) {
                        var b = '<li class="js-type-opt" ztnameen="default" zid="0">默认无选择</li>', c = "<li>还未选择专题</li>";
                        $.each(a.content, function (a, c) {
                            b += '<li class="js-type-opt" ztnameen="' + c.ztnameen + '" zid="' + c.zid + '">' + c.zanzhushang + "</li>"
                        });
                        var d = "push_box_zt", e = "管理专题推送", f = '<div class="js-msg"></div><div class="clearfix"><ul class="form-control js-zt-type">' + b + '</ul><ul class="form-control js-zt-type-cnt">' + c + "</ul></div>", g = '<button type="button" class="btn btn-success js-btn-push-zt">提交</button> <button type="button" class="btn btn-gray" data-dismiss="modal">关闭</button>';
                        showBox(d, e, f, g)
                    } else modal_build.showMessagePrompt(a.msg, "error")
                }
            })
        }),

        $(document).on("click", ".js-zt-type .js-type-opt, .js-zt-type-cnt .js-type-opt", function () {
            $(this).parent().find("li").removeClass("active"), $(this).addClass("active")
        }),

        $(document).on("click", ".js-zt-type .js-type-opt", function () {
            var a = $(this).attr("zid");
            if (0 == a)$(".js-zt-type-cnt").html("<li>还未选择专题</li>"); else {
                var b = "/pushdata", c = {
                    huxiu_hash_code: huxiu_hash_code,
                    aid: aid,
                    act: "getClass",
                    ftype: "pushZt",
                    zid: a
                };
                $.ajax({
                    type: "post", url: b, data: c, dataType: "json", async: !0, success: function (a) {
                        if (1 == a.result) {
                            var b = "";
                            $.each(a.content, function (a, c) {
                                b += '<li class="js-type-opt" tid="' + c.tid + '">' + c.ztclassname + "</li>"
                            }), $(".js-zt-type-cnt").html(b)
                        } else $(".js-msg").addClass("alert alert-danger").removeClass("hidden").html(a.msg), setTimeout(function () {
                            $(".js-msg").removeClass("alert alert-danger").html("")
                        }, 2e3)
                    }
                })
            }
        }),

        $(document).on("click", ".js-btn-push-zt", function () {
            var a = $(".js-zt-type-cnt").find("li.active").attr("tid"), b = $(".js-zt-type").find("li.active").attr("ztnameen"), c = $(".js-zt-type").find("li.active").attr("zid"), d = {};
            $(".js-zt-type-cnt li").length > 1 ? (void 0 == a && (a = $(".js-zt-type-cnt li").eq(1).attr("tid")), d = {
                huxiu_hash_code: huxiu_hash_code,
                aid: aid,
                act: "getSubmit",
                ftype: "pushZt",
                zid: c,
                tid: a,
                ztnameen: b
            }) : 0 == $(".js-zt-type").find("li.active").length ? ($(".js-msg").addClass("alert alert-danger").html("您还没有选择"), setTimeout(function () {
                $(".js-msg").removeClass("alert alert-danger").html("")
            }, 2e3)) : 0 == c && (d = {huxiu_hash_code: huxiu_hash_code, aid: aid, act: "getSubmit", ftype: "pushZt"});
            var e = "/pushdata";
            $.ajax({
                type: "post", url: e, data: d, dataType: "json", async: !0, success: function (a) {
                    1 == a.result ? (modal_build.showMessagePrompt(a.msg, "success"), setTimeout(function () {
                        location.reload()
                    }, 2e3)) : modal_build.showMessagePrompt(a.msg, "error")
                }
            })
        })
});