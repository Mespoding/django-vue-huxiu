define("modal_cy", function (require, exports) {
    function search_home(a, b, c) {
        var d = "/chuangye/ajax_home", e = {
            is_ajax: "1",
            huxiu_hash_code: huxiu_hash_code,
            tag: a.tag,
            city: a.city,
            order: a.order,
            rongzi: a.rongzi,
            page: b
        };
        $.ajax({
            type: "post", url: d, data: e, dataType: "json", async: !0, success: function (a) {
                if ("1" == a.result) {
                    var c = a.data;
                    1 == b ? ($(".cy-cp-list").empty(), $(".get-mod-more").removeClass("js-get-chuangye-more-list"), $(".get-mod-more").addClass("js-search-li-more"), a.total_page > 1 ? $(".get-mod-more").removeClass("hide") : $(".get-mod-more").addClass("hide"), $(".get-mod-more").attr("data-cur_page", 1)) : ($(".get-mod-more").attr("data-cur_page", parseInt($(".get-mod-more").attr("data-cur_page")) + 1), a.total_page == $(".get-mod-more").attr("data-cur_page") && $(".get-mod-more").addClass("hide")), $(".cy-cp-list").append(c), 0 == a.total_page ? $(".no-content").removeClass("hide") : $(".no-content").addClass("hide")
                } else modal_build.showMessagePrompt(a.msg, "error")
            }
        })
    }

    function showBoxContent(a, b, c) {
        var d = '<div id="' + a + '" class="modal fade" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-body modal-body-alert"><div class="modal-alert-title">' + b + '</div> <i class="icon icon-alert-close" data-dismiss="modal"></i>' + c + "</div></div></div></div>";
        $("#" + a).length > 0 && $("#" + a).remove(), $("body").append(d), $("#" + a).modal()
    }

    function tag_modal(a) {
        var b = $("#cy-content-tag-box").find("ul li"), c = "", d = "", e = 0;
        $.each(b, function (a, b) {
            void 0 != $(this).attr("data-tag-id") && (e += 1, c += '<li data-tag-id="' + $(this).attr("data-tag-id") + '">' + $(this).text() + '<i class="icon3 icon3-tag-cancel js-icon3-tag-cancel"></i></li>')
        }), $.each(a, function (a, c) {
            var e = !1;
            $.each(b, function () {
                return c.id == $(this).attr("data-tag-id") ? (e = !0, !1) : void 0
            }), d += e ? '<li class="selected" data-tag-id="' + c.id + '">' + c.tag_name + "</li>" : '<li data-tag-id="' + c.id + '">' + c.tag_name + "</li>"
        });
        var c = '<div class="cy-content-tag edit-title-box cy-content-tag-modal"><div class="selected-title selected-tag">已设置<span>（<em id="the_selected">' + e + '</em>）</span>个标签：</div><ul class="selected-ul">' + c + '</ul><div class="selected-title no-selected-tag">还可以选择<span>（<em id="optional">' + parseInt(4 - e) + '</em>）</span>个标签：</div><ul class="selected-optional">' + d + '</ul><div class="btn-group"><div class="btn btn-determine js-edit-tag-modal">确定</div><div class="btn btn-cancel" data-dismiss="modal">取消</div></div></div>';
        showBoxContent("cy-tag", "添加相关标签", c)
    }

    function search_company() {
        var a = $("#company_name"), b = "/chuangye/search_company", c = {name: a.val()};
        $.ajax({
            type: "post", url: b, data: c, dataType: "json", async: !0, beforeSend: function (a) {
                $(".select-loading-box").show()
            }, success: function (a) {
                var b = "";
                if ($(".select-loading-box").hide(), 1 == a.result) {
                    "none" == $(".company-search-box ul").css("display") && $(".company-search-box ul").show();
                    for (var c = 0; c < a.data.length; c++)b += '<li class="">' + a.data[c] + "</li>";
                    $(".company-search-box ul").empty().append(b)
                } else $(".company-search-box ul").empty().hide()
            }
        })
    }

    function imgUploadPost(a, b) {
        $.ajaxFileUpload({
            data: {is_ajax: 1, huxiu_hash_code: huxiu_hash_code},
            url: "/chuangye/upload_image",
            secureuri: !1,
            fileElementId: a,
            dataType: "json",
            success: function (a) {
                b(a)
            }
        })
    }

    function imgUploadPostJcrop(a, b, c) {
        $.ajaxFileUpload({
            data: c,
            url: "/chuangye/upload_image_with_size",
            secureuri: !1,
            fileElementId: a,
            dataType: "json",
            success: function (a) {
                b(a)
            }
        })
    }

    function getRandom(a) {
        return Math.floor(Math.random() * a + 1)
    }

    var modal_build;
    require.async("modal_build", function (a) {
        modal_build = a
    }), require.async(["jquery-qrcode.min"], function () {
    });
    var generate_input_date = function () {
        $(".input-date").datetimepicker({
            language: "zh-CN",
            format: "yyyy-mm-dd",
            autoclose: !0,
            todayBtn: !0,
            minView: "month"
        }).on("click", function (a) {
            $(".input-date").datetimepicker("setEndDate", new Date)
        })
    };
    $(".input-date").length > 0 && require.async(["datetimepicker/bootstrap-datetimepicker.js"], function () {
        $.fn.datetimepicker.dates["zh-CN"] = {
            days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
            daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
            months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            today: "今日",
            suffix: [],
            meridiem: ["上午", "下午"]
        }, generate_input_date()
    });
    var showMessage = function (a, b) {
        b || a.parents(".cy-edit-intro-warp").find(".error-msg").show()
    }, checkMobile = function (a) {
        var b = !1, c = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        return c.test(a) && (b = !0), b
    }, checkEmail = function (a) {
        var b = !1;
        return a.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) && (b = !0), b
    };
    require.async(["ajaxfileupload"], function () {
    }), $(".js-dropdown-menu").length > 0 && $("body").on("click", ".js-menu-item", function () {
        $(this).parents(".js-dropdown-menu").find(".js-dropdown-show").html($(this).html()), $(this).parents(".js-dropdown-menu").find(".js-dropdown-show").attr("value", $(this).attr("value"))
    }), $(".cy_center_search").length > 0 && (document.onmousedown = function () {
        isOut && $(".cy-search").find("input").addClass("hide")
    }), $("body").on("click", ".jd-see-more", function () {
        var a = $(this), b = a.parent(".sl-v-list");
        b.toggleClass("active"), b.hasClass("active") ? a.html('收起<span class="caret"></span>') : a.html('更多<span class="caret"></span>')
    }), $("#search_cy").bind("keypress", function (a) {
        "13" == a.keyCode && $(".js-icon-cy-search").trigger("click")
    }), $("body").on("click", ".js-icon-cy-search", function (a) {
        var b = $(this), c = b.parent(".cy-search").find("input");
        if (c.hasClass("hide"))c.removeClass("hide"); else {
            var d = $("#search_cy").val();
            "undefined" == typeof d || "" == d ? modal_build.showMessagePrompt("内容不能为空", "error") : window.open("/chuangye/search?s=" + d)
        }
    }), $("body").on("click", ".js-get-chuangye-more-list", function () {
        var a = $(this), b = "/chuangye/ajax_get_company_list_for_index", c = {
            huxiu_hash_code: huxiu_hash_code,
            page: parseInt(a.attr("data-cur_page")) + 1
        };
        $.ajax({
            type: "post", url: b, data: c, dataType: "json", async: !0, beforeSend: function (b) {
                a.html("正在加载..."), a.removeClass("js-get-chuangye-more-list")
            }, success: function (b) {
                1 == b.result ? ($(".mod-info-flow").append(b.data), $("#loading").remove(), $("img.lazy").lazyload({
                    placeholder: "/static_2015/img/bg.png",
                    effect: "fadeIn",
                    threshold: 1
                }), parseInt(a.attr("data-cur_page")) + 1 >= b.total_page ? a.remove() : a.attr("data-cur_page", parseInt(a.attr("data-cur_page")) + 1), $.myDetection.htmDetection("创业板-首页-加载更多,点击,点击")) : modal_build.showMessagePrompt(b.msg, "error"), parseInt(a.attr("data-cur_page")) == b.total_page && a.remove(), a.html("点击加载更多"), a.addClass("js-get-chuangye-more-list")
            }, error: function (a) {
                console.log(a)
            }
        })
    }), $(".carousel").length > 0 && (window.onload = function () {
        $(".carousel").carousel({interval: 6e3})
    }), $("body").on("click", ".js-agree-disagree", function () {
        if (0 == uid)return $(".login-link-box .js-login").trigger("click"), !1;
        var a = $(this), b = "/chuangye/user_click_agree_disagree", c = {
            huxiu_hash_code: huxiu_hash_code,
            act: a.attr("data-type"),
            id: a.attr("data-id"),
            uid: uid
        };
        return a.hasClass("active") ? (modal_build.showMessagePrompt("您已经操作过了", "error"), !1) : void $.ajax({
            type: "post",
            url: b,
            data: c,
            dataType: "json",
            async: !0,
            beforeSend: function (a) {
            },
            success: function (b) {
                if (1 == b.result)if (modal_build.showMessagePrompt(b.msg), a.addClass("active"), "agree_chuangye" == a.attr("data-type")) {
                    var c = parseInt(a.text()) + 1;
                    a.html('<i class="icon3 icon3-praise"></i>' + c), $.myDetection.htmDetection("创业板-详情页-顶,点击,点击")
                } else {
                    var c = parseInt(a.text()) + 1;
                    a.html('<i class="icon3 icon3-step"></i>' + c), $.myDetection.htmDetection("创业板-详情页-踩,点击,点击")
                } else modal_build.showMessagePrompt(b.msg, "error")
            },
            error: function (a) {
                console.log(a)
            }
        })
    }), $("body").on("click", ".js-back-company", function () {
        var a = $(this), b = "/chuangye/ajax_get_back", c = {
            huxiu_hash_code: huxiu_hash_code,
            claimant: $("#claimant").val(),
            position: $("#position").val(),
            email: $("#email").val(),
            tel: $("#tel").val(),
            company: $("#company").val(),
            pic: $("#pic_logo_img").attr("src"),
            com_id: a.attr("data_com_id")
        };
        $.each($(".cy-content-input"), function (a, b) {
            var c = !1;
            "require" == $(this).find("input").attr("data-cy-require") && ("" == $(this).find("input").val() || void 0 == $(this).find("input").val()) && (c = !0, $(this).parent(".form-cy-warp").find(".error-msg").css({display: "block"}));
            var d = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            "mobile" == $(this).find("input").attr(" data-validate") && (d.test($(this).find("input").val()) || (c = !0, $(this).parent(".form-cy-warp").find(".error-msg").css({display: "block"}))), "email" == $(this).find("input").attr("data-validate") && ($(this).find("input").val().match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) || (c = !0, $(this).parent(".form-cy-warp").find(".error-msg").css({display: "block"})))
        }), "" == $("#pic_logo_img").attr("src") && $(".upload-file-warp").find(".error-msg").show();
        var d = !1;
        return $.each($(".error-msg"), function (a, b) {
            return "block" == $(this).css("display") && (d = !0), !1
        }), d ? !1 : void $.ajax({
            type: "post", url: b, data: c, dataType: "json", async: !0, success: function (b) {
                "1" == b.result ? (modal_build.showMessagePrompt(b.msg, "success"), window.location.href = "/chuangye/success?com_id=" + b.com_id) : modal_build.showMessagePrompt(b.msg, "error"), a.removeClass("disabled")
            }
        })
    });
    var ImageWH = function (a) {
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
    };
    $("body").on("click", ".js-search-li li,.js-search-li-more", function () {
        var a, b = $(this), c = "";
        b.hasClass("get-mod-more") ? c = b.attr("data-cur_page") : (b.parent("ul").find("li").removeClass("active"), b.addClass("active"));
        var d = "", e = "", f = "", g = "";
        $.each($("#search-tags-ul li"), function () {
            var a = $(this);
            return a.hasClass("active") ? (d = a.attr("data-id"), !1) : void 0
        }), $.each($("#search-city-ul li"), function () {
            var a = $(this);
            return a.hasClass("active") ? (e = a.attr("data-id"), !1) : void 0
        }), $.each($("#search-order-ul li"), function () {
            var a = $(this);
            return a.hasClass("active") ? (f = a.attr("data-id"), !1) : void 0
        }), $.each($("#search-rongzi-ul li"), function () {
            var a = $(this);
            return a.hasClass("active") ? (g = a.attr("data-id"), !1) : void 0
        }), a = {
            tag: d,
            city: e,
            order: f,
            rongzi: g
        }, b.hasClass("get-mod-more") ? search_home(a, parseInt(c) + 1, b) : search_home(a, 1, b), "tag" == b.parent("ul").attr("data-type") ? $.myDetection.htmDetection("创业板-首页-条件筛选-行业,点击,点击") : "city" == b.parent("ul").attr("data-type") ? $.myDetection.htmDetection("创业板-首页-条件筛选-地区,点击,确点击定") : "rongzi" == b.parent("ul").attr("data-type") ? $.myDetection.htmDetection("创业板-首页-条件筛选-融资阶段,点击,点击") : $.myDetection.htmDetection("创业板-首页-条件筛选-排序,点击,点击")
    }), 0 == $("#cy_center_edit").length && $(document).ready(function () {
        $(window).scroll(function () {
            for (var a = $(".cy-cp-intro-warp"), b = 0; b < a.length - 1; b++) {
                var c = $(a[b]), d = $(a[b + 1]);
                $(window).scrollTop() >= c.offset().top - 200 && $(window).scrollTop() < d.offset().top - 200 && ($(".cy-cp-nav ul li").removeClass("active"), $($(".cy-cp-nav ul li")[b]).addClass("active"))
            }
        })
    }), $("#cy_center_edit").length > 0 && $(document).ready(function () {
        $(window).scroll(function () {
            for (var a = $(".cy-cp-edit-intro-warp"), b = 0; b < a.length - 1; b++) {
                var c = $(a[b]), d = $(a[b + 1]);
                $(window).scrollTop() >= c.offset().top - 200 && $(window).scrollTop() < d.offset().top - 200 && ($(".cy-cp-nav ul li").removeClass("active"), $($(".cy-cp-nav ul li")[b]).addClass("active"))
            }
        })
    }), $("body").on("click", "#gallery-img-modal", function () {
        $(this).hide(), $("body").css("overflow-y", "auto")
    });
    var cy_img_length = $(".gallery-img-box li").length;
    1 == cy_img_length && $(".js-arrow-left,.js-arrow-right").hide(), $("body").on("click", ".js-arrow-left", function (a) {
        a.stopPropagation();
        var b = $(".gallery-img-box li"), c = "";
        $.each(b, function () {
            var a = $(this);
            return a.hasClass("active") ? ($(".gallery-img-box li").removeClass("active"), a.prev("li").length > 0 ? (a.prev("li").addClass("active"), c = a.prev("li").find("img").attr("src").replace("!80x142", "")) : ($(".gallery-img-box li:last-child").addClass("active"), c = $(".gallery-img-box li:last-child").find("img").attr("src").replace("!80x142", "")), ImageWH(c), $(".gallery-img").attr("src", c), !1) : void 0
        });
        var d = new Image, e = "", f = "";
        d.src = c, d.onload = function () {
            if (e = d.width, f = d.height, 800 > e && 450 > f) {
                var a = (450 - f) / 2;
                $(".gallery-big-warp .gallery-img").css({width: "auto", height: "auto", "margin-top": a})
            }
        }
    }), $(".gallery-big-warp").length > 0 && (window.onload = function () {
        var a = new Image, b = "", c = "";
        a.src = $("#gallery-img").attr("src"), a.onload = function () {
            b = a.width, c = a.height, b > 800 ? $(".gallery-big-warp img").css({width: "100%"}) : $(".gallery-big-warp img").css({width: "auto"})
        }
    }), $("body").on("click", ".js-arrow-right", function (a) {
        var b = $(".gallery-img-box li"), c = "";
        a.stopPropagation(), $.each(b, function () {
            var a = $(this);
            return a.hasClass("active") ? ($(".gallery-img-box li").removeClass("active"), a.next("li").length > 0 ? (a.next("li").addClass("active"), c = a.next("li").find("img").attr("src").replace("!80x142", "")) : ($(".gallery-img-box li:first-child").addClass("active"), c = $(".gallery-img-box li:first-child").find("img").attr("src").replace("!80x142", "")), ImageWH(c), $(".gallery-img").attr("src", c), !1) : void 0
        })
    }), $("body").on("click", ".gallery-img-box li", function () {
        var a = $(this);
        $(".gallery-img-box li").removeClass("active"), a.addClass("active"), $("#gallery-img").attr("src", a.find("img").attr("src").replace("!80x142", ""))
    }), window.onload = function () {
        $("#gallery-img").attr("src", $(".gallery-img-box li:first-child").find("img").attr("src"));
        var a = new Image, b = "", c = "", d = $(".gallery-img-box li:first-child").find("img").attr("src");
        void 0 != d && (a.src = d, a.onload = function () {
            if (b = a.width, c = a.height, 800 > b && 450 > c) {
                var d = (450 - c) / 2;
                $(".gallery-big-warp .gallery-img").css({width: "auto", height: "auto", "margin-top": d})
            }
        })
    }, $("body").on("click", ".js-gallery-zoom-in", function () {
        var a = $("#gallery-img").attr("src");
        $("#gallery-modal-img").attr("src", a), $("#gallery-img-modal").show(), ImageWH(a), $("body").css("overflow-y", "hidden")
    }), $("body").on("click", ".js-white-close", function () {
        $(this);
        setTimeout(function () {
            $("#gallery-img-modal").hide()
        }, 1e3)
    });
    var scroll_flag = !1;
    $(window).scroll(function () {
        if ($(".cy-cp-nav").length > 0) {
            var a = ($(".cy-cp-nav").offset().top, $(document).scrollTop());
            if ($("#cy_center_edit").length > 0)var b = (window.innerWidth - 910) / 2, c = "0 " + b + "px"; else var b = (window.innerWidth - 1180) / 2, c = "0 " + b + "px";
            a > 315 ? $(".cy-cp-nav").css({
                position: "fixed",
                top: "0",
                width: "100%",
                "z-index": "100",
                "margin-left": -b,
                padding: c,
                "box-shadow": "0 4px 6px rgba(18,21,21,.19)"
            }) : $(".cy-cp-nav").attr("style", "")
        }
    }), 0 == $("#cy_center_edit").length && $("body").on("click", ".cy-cp-nav ul li a", function () {
        var a = $(this);
        $(".cy-cp-nav ul li").removeClass("active"), a.parent("li").addClass("active");
        var b = 170, c = $(this).attr("data-href");
        if ($("#" + c).length > 0) {
            var d = $("#" + c).offset().top - b;
            $("html, body").animate({scrollTop: d}, 500)
        }
        "cy-cp-intro-warp" == a.attr("data-type") && $.myDetection.htmDetection("创业板-详情页-tab产品简介,点击,点击"), "advantage" == a.attr("data-type") && $.myDetection.htmDetection("创业板-详情页-tab竞争优势,点击,点击"), "results" == a.attr("data-type") && $.myDetection.htmDetection("创业板-详情页-tab产品成绩,点击,点击"), "team" == a.attr("data-type") && $.myDetection.htmDetection("创业板-详情页-tab团队介绍,点击,点击"), "interview" == a.attr("data-type") && $.myDetection.htmDetection("创业板-详情页-tab云酒访谈,点击,点击"), "company" == a.attr("data-type") && $.myDetection.htmDetection("创业板-详情页-tab公司报道,点击,点击")
    }), $("#cy_center_edit").length > 0 && $("body").on("click", ".cy-cp-nav ul li a", function () {
        var a = $(this);
        $(".cy-cp-nav ul li").removeClass("active"), a.parent("li").addClass("active");
        var b = 170, c = $(this).attr("data-href");
        if ($("#" + c).length > 0) {
            var d = $("#" + c).offset().top - b;
            $("html, body").animate({scrollTop: d}, 500)
        }
    });
    var tag = [];
    $("body").on("click", ".js-add-avtive-tag", function () {
        if (0 == tag.length) {
            var a = ($(this), "/chuangye/get_tags"), b = {};
            $.ajax({
                type: "post", url: a, data: b, dataType: "json", async: !0, success: function (a) {
                    tag = a, tag_modal(tag)
                }, error: function (a) {
                    console.log(a)
                }
            })
        } else tag_modal(tag)
    }), $("body").on("click", ".selected-optional li", function () {
        var a = $(this);
        if (!a.hasClass("selected") && parseInt($("#the_selected").text()) < 4) {
            var b = "<li>" + a.text() + '<i class="icon3 icon3-tag-cancel js-icon3-tag-cancel"></i></li>';
            $(".selected-ul").append(b), a.addClass("selected"), $("#the_selected").html(parseInt($("#the_selected").text()) + 1), $("#optional").html(parseInt($("#optional").text()) - 1)
        }
    }), $("body").on("click", ".js-icon3-tag-cancel", function () {
        var a = $(this), b = a.parent("li").text(), c = $(".selected-optional").find("li");
        $.each(c, function (d, e) {
            return c.eq(d).text() == b ? ($(this).removeClass("selected"), a.parent("li").remove(), !1) : void 0
        }), $("#the_selected").html(parseInt($("#the_selected").text()) - 1), $("#optional").html(parseInt($("#optional").text()) + 1)
    }), $("body").on("click", ".js-edit-tag-modal", function () {
        var a = ($(this), "");
        $.each($(".selected-optional").find("li"), function () {
            $(this).hasClass("selected") && (a += '<li data-tag-id="' + $(this).attr("data-tag-id") + '">' + $(this).html() + "</li>")
        });
        var b = '<li class="active js-add-avtive-tag"><i class="icon icon-bind-add"></i>添加行业标签</li>' + a;
        $("#cy-content-tag-box").find("ul").empty().append(b), $("#cy-tag").modal("hide")
    }), $("body").on("focus", ".form-cy-warp .cy-content-input", function () {
        var a = $(this);
        a.parents(".form-cy-warp").css({"border-color": "#bbbbbb"})
    }), $("body").on("blur", ".form-cy-warp .cy-content-input", function () {
        $(".form-cy-warp").css({"border-color": "#f0f0f0"})
    }), $("body").on("click", ".js-financing-menu-item", function () {
        if ($("#financing-box").length > 0 && $("#financing-box").remove(), 5 != $(this).attr("value")) {
            var a = $(this), b = a.attr("value"), c = a.text(), d = '<div class="financing-warp" id="financing-box" value="' + b + '"><div class="financing-title"><em>*</em><i class="sign">' + c + '</i>融资详情</div><div class="form-warp form-cy-warp"><label class="cy-label"><em>*</em>融资时间：</label><div class="cy-content-input"><input placeholder="融资时间"  class="addtime input-date" placeholder="请选择时间"></div><div class="error-msg" data-type="input"><i class="icon3 icon3-error-msg"></i>融资时间不能为空</div></div><div class="form-warp form-cy-warp"><label class="cy-label"><em>*</em>&nbsp;投&nbsp;资&nbsp;方：</label><div class="cy-content-input"><input placeholder="投资方" class="touzifang"></div><div class="error-msg" data-type="input"><i class="icon3 icon3-error-msg"></i>投资方不能为空</div></div><div class="form-warp form-cy-warp"><label class="cy-label"><em>*</em>融资金额：</label><div class="cy-content-input"><input placeholder="填写金额" class="jine"><span style="margin-left: 50px;">万</span></div><div class="error-msg" data-type="input"><i class="icon3 icon3-error-msg"></i>融资金额不能为空</div><div class="btn-group  btn-group-box pull-right js-dropdown-menu" style="margin-right: 0"><span class="btn btn-default btn-dropdown-show js-dropdown-show currency" value="0">人民币</span><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></button><ul class="dropdown-menu"><li><span class="trangle trangle-top"></span></li><li class="menu-item js-menu-item" value="0">人民币</li><li class="menu-item js-menu-item" value="1">美元</li></ul></div></div><div class="edit-title-box"><div class="btn-group"><div class="btn btn-determine js-add-financing" data-num="1">确定</div><div class="btn btn-cancel js-remove-financing" >取消</div></div></div></div>';
            $("#btn-financing").before(d), generate_input_date()
        }
    }), $("body").on("click", ".js-add-financing", function () {
        var a = $(this), b = $("#financing-box").find(".sign").text(), c = $("#financing-box").attr("value"), d = $(".addtime").val(), e = $("#financing-box").find(".touzifang").val(), f = $("#financing-box").find(".jine").val(), g = $("#financing-box").find(".currency").attr("value"), h = $("#financing-box").find(".currency").text();
        $("#financing-box").find(".jieduan").length > 0 && (c = $("#financing-box").find(".jieduan").attr("value")), 0 == $("#financing-box").find(".sign").length && (b = $("#financing-box").find(".jieduan-menu").find(".jieduan").text());
        var i = !1;
        if (("" == d || void 0 == d) && ($(".addtime").parents(".form-warp").find(".error-msg").show(), i = !0), "" == e && ($(".touzifang").parents(".form-warp").find(".error-msg").show(), i = !0), "" == f && ($(".jine").parents(".form-warp").find(".error-msg").show(), i = !0), i)return !1;
        var j = "", k = '<li><i class="icon icon-delete js-del-financing"></i></li>';
        "1" == a.attr("data-num") && (j = "1", k = "");
        var l = '<div class="financing-warp-tab" value="' + c + '"><ul class="financing-warp-tab-ul"><li class="financing-warp-tab-li"><div class="financing-title financing-info "><em>*</em><i>' + b + '</i>融资详情</div><div class="financing-time">' + d + '</div><div class="financing-company">' + e + '</div><div class="financing-amount "><i>' + f + "</i>万" + h + '<span class="dropdown " text="' + h + '" value="' + g + '"></span></div><div class="edit-form"><ul><li><i class="icon icon-edit js-edit-financing-info" data-num="' + j + '" data-type="edit"></i></li>' + k + "</ul></div></li></ul></div>";
        "1" == a.attr("data-num") ? ($("#phase_sign").attr("value", c).text(b).removeClass("hide"), $("#phase").addClass("hide"), $("#phase").find(".btn-dropdown-show").attr("value", "5").text("未融资")) : $("#financing-box").attr("value", $(".jieduan").attr("value")), $("#btn-financing").before(l), $("#financing-box").remove()
    }), $("body").on("click", ".js-edit-financing", function () {
        var a = $(this), b = $("#financing-box").find(".sign").text(), c = $("#financing-box").attr("value"), d = $(".addtime").val(), e = $("#financing-box").find(".touzifang").val(), f = $("#financing-box").find(".jine").val(), g = $("#financing-box").find(".currency").attr("value"), h = $("#financing-box").find(".currency").text();
        $("#financing-box").find(".jieduan").length > 0 && (c = $("#financing-box").find(".jieduan").attr("value")), 0 == $("#financing-box").find(".sign").length && (b = $("#financing-box").find(".jieduan-menu").find(".jieduan").text());
        var i = !1;
        if (("" == d || void 0 == d) && ($(".addtime").parents(".form-warp").find(".error-msg").show(), i = !0), "" == e && ($(".touzifang").parents(".form-warp").find(".error-msg").show(), i = !0), "" == f && ($(".jine").parents(".form-warp").find(".error-msg").show(), i = !0), i)return !1;
        var j = "";
        a.attr("data-num") && (j = "1");
        var k = !1, l = !1;
        return $.each($(".financing-warp-tab"), function () {
            return parseInt(c) < parseInt($(this).attr("value")) && "1" == a.attr("data-num") && !$(this).hasClass("hide") && (l = !0), $(this).attr("value") != c || $(this).hasClass("hide") ? void($(this).hasClass("hide") && ($(this).attr("value", c), $(this).find(".financing-title").find("i").html(b), $(this).find(".financing-time").html(d), $(this).find(".financing-amount").html("<i>" + f + "</i>" + h + '<span class="dropdown " text="' + h + '" value="' + g + '"></span>'))) : (k = !0, !1)
        }), k ? (modal_build.showMessagePrompt("不能添加重复的融资信息", "error"), !1) : l ? (modal_build.showMessagePrompt("不能低于新添加的融资信息", "error"), !1) : ("1" == a.attr("data-num") && $("#phase_sign").attr("value", c).text(b), $(".financing-warp-tab").removeClass("hide"), void $("#financing-box").remove())
    }), $("body").on("click", ".js-remove-financing", function () {
        var a = ($(this), $("#financing-box").attr("value"));
        $.each($(".financing-warp-tab"), function (b, c) {
            $(this).attr("value") == a && $(this).removeClass("hide")
        }), $("#financing-box").remove()
    });
    var financing_sgin = [{key: "5", value: "未融资"}, {key: "6", value: "天使轮"}, {key: "7", value: "Pre-A"}, {
        key: "8",
        value: " A轮"
    }, {key: "9", value: "B轮"}, {key: "10", value: "C轮"}, {key: "11", value: "D轮"}], financing_sgin2 = [{
        key: "6",
        value: "天使轮"
    }, {key: "7", value: "Pre-A"}, {key: "8", value: " A轮"}, {key: "9", value: "B轮"}, {
        key: "10",
        value: "C轮"
    }, {key: "11", value: "D轮"}];
    $("body").on("click", ".js-add-financing-info", function () {
        if ($("#financing-box").length > 0)return modal_build.showMessagePrompt("请填完整融资信息", "error"), !1;
        if (0 == $(".financing-warp-tab").length)return modal_build.showMessagePrompt("请选择融资阶段", "error"), !1;
        var a = $(this), b = "", c = "", d = "", e = "", f = "", g = "";
        if ($.each(financing_sgin, function (b, c) {
                var d = !0;
                $.each($(".financing-warp-tab"), function () {
                    return a.hasClass("hide") || $(this).attr("value") != c.key ? void 0 : (d = !1, !1)
                }), d && "5" != c.key && (e += '<li value="' + c.key + '" class="menu-item js-menu-item">' + c.value + "</li>", f = c.key, g = c.value)
            }), e.length > 0) {
            var h = '<div class="financing-warp" id="financing-box" value="' + f + '"><div class="form-warp form-cy-warp  max-width-dropdown max-md-width-dropdown"><label class="cy-label"><em>*</em>融资阶段：</label><div class="btn-group  btn-group-box js-dropdown-menu jieduan-menu"><span class="btn btn-default btn-dropdown-show js-dropdown-show jieduan" value="' + f + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + g + '</span><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></button><ul class="dropdown-menu"><li><span class="trangle trangle-top"></span></li>' + e + '</ul></div></div><div class="form-warp form-cy-warp"><label class="cy-label"><em>*</em>融资时间：</label><div class="cy-content-input"><input placeholder="请选择时间" class="addtime input-date" value="' + b + '"></div><div class="error-msg" data-type="input"><i class="icon3 icon3-error-msg"></i>融资时间不能为空</div></div><div class="form-warp form-cy-warp"><label class="cy-label"><em>*</em>&nbsp;投&nbsp;资&nbsp;方：</label><div class="cy-content-input"><input placeholder="投资方" class="touzifang" value="' + d + '"></div><div class="error-msg" data-type="input"><i class="icon3 icon3-error-msg"></i>投资方不能为空</div></div><div class="form-warp form-cy-warp"><label class="cy-label"><em>*</em>融资金额：</label><div class="cy-content-input"><input placeholder="填写金额" class="jine" value="' + c + '"><span style="margin-left: 50px;">万</span></div><div class="error-msg" data-type="input"><i class="icon3 icon3-error-msg"></i>融资金额不能为空</div><div class="btn-group  btn-group-box pull-right js-dropdown-menu" style="margin-right: 0"><span class="btn btn-default btn-dropdown-show js-dropdown-show currency" value="0">人民币</span><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></button><ul class="dropdown-menu"><li><span class="trangle trangle-top"></span></li><li class="menu-item js-menu-item" value="0">人民币</li><li class="menu-item js-menu-item" value="1">美元</li></ul></div></div><div class="edit-title-box"><div class="btn-group"><div class="btn btn-determine js-add-financing" data-type="' + a.attr("data-type") + '">保存</div><div class="btn btn-cancel js-remove-financing" >取消</div></div></div></div>';
            $("#btn-financing").before(h), generate_input_date()
        } else modal_build.showMessagePrompt("不能再添加了", "error")
    }), $("body").on("click", ".js-edit-financing-info", function () {
        var a = $(this);
        if ($("#financing-box").length > 0)return modal_build.showMessagePrompt("请填完整融资信息", "error"), !1;
        a.parents(".financing-warp-tab").addClass("hide");
        var a = $(this), b = a.parents(".financing-warp-tab").find(".financing-time").text(), c = a.parents(".financing-warp-tab").find(".financing-amount").find("i").html(), d = a.parents(".financing-warp-tab").find(".financing-company").html(), e = "", f = "", g = "";
        $.each(financing_sgin, function (a, b) {
            var c = !0;
            $.each($(".financing-warp-tab"), function () {
                var a = $(this);
                return a.hasClass("hide") || a.attr("value") != b.key ? void 0 : (c = !1, !1)
            }), c && "5" != b.key && (e += '<li value="' + b.key + '" class="menu-item js-menu-item">' + b.value + "</li>")
        }), f = a.parents(".financing-warp-tab").attr("value"), g = a.parents(".financing-warp-tab").find(".financing-title").find("i").html();
        var h = "";
        if ("1" == a.attr("data-num") && (h = "1"), e.length > 0) {
            var i = '<div class="financing-warp" id="financing-box" value="' + f + '"><div class="form-warp form-cy-warp  max-width-dropdown max-md-width-dropdown"><label class="cy-label"><em>*</em>融资阶段：</label><div class="btn-group  btn-group-box js-dropdown-menu jieduan-menu"><span class="btn btn-default btn-dropdown-show js-dropdown-show jieduan" value="' + f + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + g + '</span><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></button><ul class="dropdown-menu"><li><span class="trangle trangle-top"></span></li>' + e + '</ul></div></div><div class="form-warp form-cy-warp"><label class="cy-label"><em>*</em>融资时间：</label><div class="cy-content-input"><input placeholder="融资时间" type="date" class="addtime" value="' + b + '"></div><div class="error-msg" data-type="input"><i class="icon3 icon3-error-msg"></i>融资时间不能为空</div></div><div class="form-warp form-cy-warp"><label class="cy-label"><em>*</em>&nbsp;投&nbsp;资&nbsp;方：</label><div class="cy-content-input"><input placeholder="投资方" class="touzifang" value="' + d + '"></div><div class="error-msg" data-type="input"><i class="icon3 icon3-error-msg"></i>投资方不能为空</div></div><div class="form-warp form-cy-warp"><label class="cy-label"><em>*</em>融资金额：</label><div class="cy-content-input"><input placeholder="填写金额" class="jine" value="' + c + '"><span style="margin-left: 50px;">万</span></div><div class="error-msg" data-type="input"><i class="icon3 icon3-error-msg"></i>融资金额不能为空</div><div class="btn-group  btn-group-box pull-right js-dropdown-menu" style="margin-right: 0"><span class="btn btn-default btn-dropdown-show js-dropdown-show currency" value="0">人民币</span><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></button><ul class="dropdown-menu"><li><span class="trangle trangle-top"></span></li><li class="menu-item js-menu-item" value="0">人民币</li><li class="menu-item js-menu-item" value="1">美元</li></ul></div></div><div class="edit-title-box"><div class="btn-group"><div class="btn btn-determine js-edit-financing" data-type="edit" data-num="' + h + '">保存</div><div class="btn btn-cancel js-remove-financing" >取消</div></div></div></div>';
            $("#btn-financing").before(i)
        } else modal_build.showMessagePrompt("不能再添加了", "error")
    }), $("body").on("click", ".js-del-financing", function () {
        var a = $(this);
        a.parents(".financing-warp-tab").remove(), 0 == $(".financing-warp-tab").length && ($("#phase_sign").addClass("hide").attr("value", "").text(""), $("#phase").removeClass("hide"))
    }), $("body").on("click", ".js-add-team-box", function () {
        if ($(".team-warp").length > 0)return modal_build.showMessagePrompt("请填完整团队信息", "error"), !1;
        var a = $(this), b = "", c = "", d = "";
        "edit" == a.attr("data-type") && (b = a.parents(".team-tab-warp").find(".team-tab-name").text(), c = a.parents(".team-tab-warp").find(".team-tab-position").text(), d = a.parents(".team-tab-warp").find(".team-tab-info").text());
        var e = '<div class="team-warp"><div class="form-cy-warp"><label class="cy-label"><em></em>团队成员：</label><div class="cy-content-input"><input id="name" placeholder="团队成员" value="' + b + '"></div></div><div class="form-cy-warp"><label class="cy-label"><em></em>担任职务：</label><div class="cy-content-input"><input id="position" placeholder="担任职务" value="' + c + '"></div></div><div class="form-cy-warp"><label class="cy-label"><em></em>个人简介：</label><div class="cy-content-input"><input id="memo" placeholder="个人简介" value="' + d + '"></div></div><div class="edit-title-box"><div class="btn-group"><div class="btn btn-determine js-submit-team">保存</div><div class="btn btn-cancel js-cancel-team" data-dismiss="modal">取消</div></div></div></div>';
        $("#btn-team").before(e), "edit" == a.attr("data-type") && a.parents(".team-tab-warp").addClass("hide")
    }), $("body").on("click", ".js-submit-team", function () {
        var a = ($(), '<div class="team-tab-warp team-tab"><ul class="team-tab-warp-ul"><li class="team-tab-warp-li"><div class="financing-title team-tab-name ">' + $("#name").val() + '</div><div class="team-tab-position">' + $("#position").val() + '</div><div class="team-tab-info ">' + $("#memo").val() + '</div><div class="edit-form pull-right"><ul><li><i class="icon icon-edit js-add-team-box" data-type="edit"></i></li><li><i class="icon icon-delete js-del-team"></i></li></ul></div></li></ul></div>');
        "" == $("#name").val() && "" == $("#position").val() && "" == $("#memo").val() ? $(".team-warp").remove() : ($("#btn-team").before(a), $(".team-warp").remove()), $.each($(".team-tab-warp"), function () {
            return $(this).hasClass("hide") ? ($(this).remove(), !1) : void 0
        })
    }), $("body").on("click", ".js-del-team", function () {
        $(this).parents(".team-tab-warp").remove()
    }), $("body").on("click", ".js-cancel-team", function () {
        $(this);
        $.each($(".team-tab-warp"), function () {
            $(this).hasClass("hide") && $(this).removeClass("hide")
        }), $(".team-warp").remove()
    }), 1 == $(".cy-section").length && $(".cy-section").addClass("active"), $("body").on("change", "#pic_logo,#pic_qr,#pic", function (a) {
        var b = $(this);
        return "pic" == b.attr("data-type") && 5 == $("#qr-pic-box").find("ul").find("li").length ? (modal_build.showMessagePrompt("最多只能传5个", "error"), $("#pic").val(""), !1) : ($.ajaxFileUpload({
            data: {
                is_ajax: "1",
                huxiu_hash_code: huxiu_hash_code,
                type: b.attr("data-type")
            },
            url: "/chuangye/upload_pic",
            secureuri: !1,
            fileElementId: b.attr("id"),
            dataType: "json",
            success: function (a) {
                if ("1" == a.result) {
                    if ("pic_logo" == b.attr("data-type") && ($("#pic_logo_img").parent().css({display: "block"}), $("#pic_logo_img").parents(".upload-file-warp").addClass("active"), $("#pic_logo_img").attr("src", a.pic_url), $(".upload-file-warp").length > 0 && $(".upload-file-warp").find(".error-msg").hide()), "pic_qr" == b.attr("data-type") && ($("#pic_qr_img").parents(".upload-file-warp").addClass("active"), $("#pic_qr_img").parent().css({display: "block"}), $("#pic_qr_img").removeClass("hide").attr("src", a.pic_url)), "pic" == b.attr("data-type")) {
                        $("#pic_logo_img").parents(".upload-file-warp").addClass("active");
                        var c = 0, c = parseInt($("#qr-pic-box").find("ul").find("li").length) + 1, d = '<li><i class="icon3 icon-pic-cancel js-del-pic"></i><img src="' + a.pic_url + '"><span>' + c + "</span></li>";
                        $("#qr-pic-box").css({display: "block"}), $("#qr-pic-box").find("ul").append(d)
                    }
                    modal_build.showMessagePrompt(a.msg)
                } else modal_build.showMessagePrompt(a.msg, "error")
            }
        }), !1)
    }), $("body").on("click", ".js-del-pic", function () {
        var a = $(this);
        a.parent("li").remove(), $.each($("#qr-pic-box ul li"), function (a, b) {
            $(this).find("span").text(a + 1)
        })
    }), $("body").on("click", ".js-add-news-modal", function () {
        if ($("#news-warp").length > 0)return modal_build.showMessagePrompt("请填完整报道信息", "error"), !1;
        var a = $(this), b = "", c = "", d = "";
        "edit" == a.attr("data-type") && (b = a.parents("li").find(".news_title").html(), c = a.parents("li").find(".news_url").html(), d = a.parents("li").find(".news_date").html());
        var e = '<div class="team-warp news-warp" id="news-warp"><div class="form-cy-warp"><label class="cy-label">新闻标题：</label><div class="cy-content-input"><input placeholder="新闻标题" class="news_title" value="' + b + '"></div></div><div class="form-cy-warp"><label class="cy-label">新闻网址：</label><div class="cy-content-input"><input placeholder="新闻网址" class="news_url" value="' + c + '"></div></div><div class="edit-title-box"><div class="btn-group"><div class="btn btn-determine js-add-news">保存</div><div class="btn btn-cancel js-cancel-news" data-dismiss="modal">取消</div></div></div></div>';
        $("#news-btn").before(e)
    }), $("body").on("click", ".js-edit-news-modal", function () {
        var a = $(this);
        if ($("#news-warp").length > 0)return modal_build.showMessagePrompt("请填完整报道信息", "error"), !1;
        a.parents(".news-tab").addClass("hide");
        var a = $(this), b = "", c = "", d = "";
        b = a.parents("li").find(".news_title").html(), c = a.parents("li").find(".news_url").html(), d = a.parents("li").find(".news_date").html();
        var e = '<div class="team-warp news-warp" id="news-warp"><div class="form-cy-warp"><label class="cy-label">新闻标题：</label><div class="cy-content-input"><input placeholder="新闻标题" class="news_title" value="' + b + '"></div></div><div class="form-cy-warp"><label class="cy-label">新闻网址：</label><div class="cy-content-input"><input placeholder="新闻网址" class="news_url" value="' + c + '"></div></div><div class="edit-title-box"><div class="btn-group"><div class="btn btn-determine js-edit-news">保存</div><div class="btn btn-cancel js-cancel-news" data-dismiss="modal">取消</div></div></div></div>';
        $("#news-btn").before(e)
    }), $("body").on("click", ".js-add-news", function () {
        var a = ($(this), ""), b = "";
        a = $("#news-warp").find(".news_title").val(), b = $("#news-warp").find(".news_url").val();
        var c = '<div class="team-tab-warp news-tab"><ul class="team-tab-warp-ul"><li class="team-tab-warp-li"><div class="financing-title news-title news_title">' + a + '</div><div class="news-link news_url">' + b + '</div><div class="edit-form pull-right"><ul><li><i class="icon icon-edit js-edit-news-modal" data-type="edit"></i></li><li><i class="icon icon-delete js-del-news"></i></li></ul></div></li></ul></div>';
        $("#news-btn").before(c), $("#news-warp").remove()
    }), $("body").on("click", ".js-edit-news", function () {
        var a = ($(this), ""), b = "", c = "";
        a = $("#news-warp").find(".news_title").val(), b = $("#news-warp").find(".news_url").val(), c = $("#news-warp").find(".news_date").val(), $.each($(".news-tab"), function () {
            $(this).hasClass("hide") && ($(this).find(".news_title").html(a), $(this).find(".news_url").html(b), $(this).find(".news_date").html(c)), $(this).removeClass("hide")
        }), $("#news-warp").remove()
    }), $("body").on("click", ".js-cancel-news", function () {
        $(this);
        $("#news-warp").remove(), $.each($(".news-tab"), function () {
            $(this).hasClass("hide") && $(this).removeClass("hide")
        })
    }), $("body").on("click", ".js-del-news", function () {
        var a = $(this);
        a.parents(".team-tab-warp").remove()
    }), $(document).on("input propertychange", "input", function () {
        "" == $(this).val() || void 0 == $(this).val() ? $(this).parents(".form-cy-warp").find(".error-msg").css({display: "block"}) : $(this).parents(".form-cy-warp").find(".error-msg").css({display: "none"})
    }), $("body").on("click", ".js-menu-city-item", function () {
        var a = $(this);
        $.ajax({
            type: "post",
            url: "/chuangye/get_city_list",
            data: {pid: a.attr("value")},
            dataType: "json",
            async: !0,
            success: function (a) {
                $("#address_city").attr("value", a[0].id).html(a[0].name);
                var b = "";
                $.each(a, function (a, c) {
                    b += '<li class="menu-item js-menu-item" value="' + c.id + '">' + c.name + "</li>"
                }), $(".city-dropdown-menu").empty().append(b)
            }
        })
    }), $(document).on("mouseenter", ".js-interview", function () {
        var a = $(this), b = a.parents(".hx-interview-box").find(".flex-box");
        a.hasClass("disabled") || (a.addClass("disabled"), b.stop().css({
            opacity: "0",
            "margin-top": "-200px"
        }).show().animate({opacity: "1", "margin-top": "-180px"}, 300))
    }), $(document).on("mouseleave", ".js-interview", function () {
        var a = $(this), b = a.parents(".hx-interview-box").find(".flex-box");
        b.stop().animate({opacity: "0", "margin-top": "-200px"}, 400, function () {
            b.hide()
        }), a.removeClass("disabled")
    }), $(document).on("mouseenter", ".praise-step-warp ul li:nth-child(2),.praise-step-warp ul li:nth-child(3)", function () {
        var a = $(this), b = $("." + a.attr("data-box"));
        a.hasClass("disabled") || (a.addClass("disabled"), b.stop().css({
            opacity: "0",
            "margin-top": "62px"
        }).show().animate({
            opacity: "1",
            "margin-top": "52"
        }, 300)), console.log(a.attr("data-f")), b.find("img").attr("data-src") || (b.empty().qrcode({
            render: "table",
            size: 125,
            text: window.location.href + "?f=" + a.attr("data-f")
        }), $.myDetection.htmDetection("创业详情-微信分享,点击,点击"))
    }), $(document).on("mouseleave", ".praise-step-warp ul li:nth-child(2),.praise-step-warp ul li:nth-child(3)", function () {
        var a = $(this), b = $("." + a.attr("data-box"));
        b.stop().animate({opacity: "0", "margin-top": "62px"}, 400, function () {
            b.hide()
        }), a.removeClass("disabled")
    }), $("body").on("click", ".praise-step-warp ul li", function () {
        var a = $(this), b = "/action/share";
        "qq" == a.attr("data-type") ? $.myDetection.htmDetection("创业详情-QQ分享,点击,点击") : $.myDetection.htmDetection("创业详情-微博分享,点击,点击"), a.attr("data-type") && window.open(b + "?huxiu_hash_code=" + huxiu_hash_code + "&aid=" + aid + "&com_id=" + $("#com_id").val() + "&des=" + a.attr("data-des"))
    });
    var sto_time;
    $("#company_name").keyup(function () {
        try {
            clearTimeout(sto_time)
        } catch (a) {
        }
        sto_time = setTimeout(search_company, 500)
    }).blur(function () {
        try {
            clearTimeout(sto_time)
        } catch (a) {
        }
    }), $(document).click(function () {
        $(".company-search-box ul").hide()
    }), $("body").on("click", ".company-search-box ul li", function () {
        var a = $(this), b = "/chuangye/get_company_info", c = {name: a.html()};
        $("#company_name").val(a.text()), $.ajax({
            type: "post",
            url: b,
            data: c,
            dataType: "json",
            async: !0,
            success: function (a) {
                $("#company_time").val(a.data.company_time)
            },
            error: function (a) {
            }
        })
    }), $("body").on("click", ".js-cy-register-submit", function () {
        $(".error-msg").css({display: "none"}), $.myDetection.gaDetection("创业板,提交创业信息,点击");
        var a = $(this), b = "", c = {
            huxiu_hash_code: huxiu_hash_code,
            name: a.attr("data-name"),
            project_name: $("#project_name").val(),
            description: $("#description").val(),
            create_time: $("#create_time").val(),
            tags: "",
            url: $("#url").val(),
            summary: $("#summary").val(),
            strength: $("#strength").val(),
            product_score: $("#product_score").val(),
            company_name: $("#company_name").val(),
            company_time: $("#company_time").val(),
            address: $("#address").val(),
            financing: $("#phase_sign").attr("value"),
            founder_name: $("#founder_name").val(),
            founder_email: $("#founder_email").val(),
            founder_tel: $("#founder_tel").val(),
            founder_summary: $("#founder_summary").val(),
            pic_logo: $("#pic_logo_img").attr("src"),
            pic_qr: $("#pic_qr_img").attr("src"),
            news_title: $("#news_title").val(),
            news_url: $("#news_url").val(),
            linkman: $("#linkman").val(),
            position: $("#position").val(),
            email: $("#email").val(),
            telphone: $("#telphone").val(),
            city: $("#address_city").attr("value"),
            scale: $("#company-scale").attr("value"),
            pic: [],
            rongzi: [],
            team: [],
            news: [],
            diaocha: "",
            weifangtan: $(".weifangtan").prop("checked"),
            is_rongzi: $(".is_rongzi").prop("checked")
        };
        $.each($("#cy-content-tag-box ul li"), function () {
            "" != $(this).attr("data-tag-id") && void 0 != $(this).attr("data-tag-id") && (b += $(this).attr("data-tag-id") + ",")
        }), b.indexOf(",") > 0 && (b = b.substring(0, b.length - 1)), 0 == b.length ? $("#tags").find(".error-msg").css({display: "block"}) : c.tags = b;
        var d = $(".survey-box ul li"), e = "";
        if ($.each(d, function (a, b) {
                $(this).find("input").prop("checked") && (e += $(this).attr("data-index") + ",")
            }), e.indexOf(",") > 0 && (e = e.substring(0, e.length - 1)), e.length > 0 && (c.diaocha = e), $(".financing-warp-tab").length > 0) {
            var f = [];
            $.each($(".financing-warp-tab"), function () {
                f.push({
                    addtime: $(this).find(".financing-time").html(),
                    set_id: $(this).attr("value"),
                    touzifang: $(this).find(".financing-company").html(),
                    jine: $(this).find(".financing-amount").find("i").html(),
                    sign: $(this).find(".financing-amount").find("span").attr("value")
                })
            }), c.rongzi = f
        }
        if ("5" != $("#phase").find(".btn-dropdown-show").attr("value") && 0 == c.rongzi.length && $("#phase_sign").parents(".form-warp").find(".error-msg").show(), $(".team-tab").length > 0 && $.each($(".team-tab"), function () {
                c.team.push({
                    name: $(this).find(".team-tab-name").html(),
                    position: $(this).find(".team-tab-position").html(),
                    memo: $(this).find(".team-tab-info").html()
                })
            }), $(".news-tab").length > 0) {
            $.each($(".news-tab"), function () {
                c.news.push({
                    news_title: $(this).find(".news_title").html(),
                    news_url: $(this).find(".news_url").html()
                })
            })
        }
        if ($.each($(".cy-content-input"), function (a, b) {
                var c = !1;
                "require" == $(this).find("input").attr("data-cy-require") && ("" == $(this).find("input").val() || void 0 == $(this).find("input").val() || 0 == $.trim($(this).find("input").val()).length) && (c = !0, $(this).parent(".form-cy-warp").find(".error-msg").css({display: "block"}));
                var d = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                "mobile" == $(this).find("input").attr("data-validate") && (d.test($(this).find("input").val()) || (c = !0, $(this).parent(".form-cy-warp").find(".error-msg").css({display: "block"}))), "email" == $(this).find("input").attr("data-validate") && ($(this).find("input").val().match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) || (c = !0, $(this).parent(".form-cy-warp").find(".error-msg").css({display: "block"})))
            }), $.each($("textarea"), function () {
                var a = !1;
                ("" == $(this).val() || void 0 == $(this).val()) && (a = !0, $(this).parents(".form-cy-warp").find(".error-msg").css({display: "block"}))
            }), ("" == $("#pic_logo_img").attr("src") || void 0 == $("#pic_logo_img").attr("src")) && $("#cy-pic-logo-error").css({display: "block"}), 0 == $(".upload_preview .upload_append_list").length && $("#cy-pic-error").css({display: "block"}), $(".upload_preview").length > 0) {
            var g = [], h = 0;
            $.each($(".upload_preview .upload_append_list"), function () {
                var a = $(this);
                "none" != a.css("display") && (a.find(".upload_image").attr("src").indexOf("huxiu") > 0 || a.find(".upload_image").attr("src").indexOf("bipush") > 0) && (g.push({pic: a.find(".upload_image").attr("src")}), h++)
            }), 0 == h && $("#cy-pic-error").css({display: "block"}), c.pic = g
        }
        var i = !1;
        return $.each($(".error-msg"), function (a, b) {
            var c = "";
            $(this);
            return "input" == $(this).attr("data-type") ? $(this).parents(".form-cy-warp").find("input").length > 0 ? "block" == $(this).css("display") && (c = $(this).parents(".form-cy-warp").find("input").attr("id")) : "block" == $(this).css("display") && (c = $(this).parents(".form-cy-warp").find("textarea").attr("id")) : "select" == $(this).attr("data-type") ? "block" == $(this).css("display") && (c = "phase") : "block" == $(this).css("display") && (c = $(this).parents(".form-cy-warp").attr("id")), "" != c ? (i = !0, $.ajax({
                type: "post",
                url: "/chuangye/tongji_error_nums",
                data: {error_title: "upload-logo" == c ? "pic-logo" : "upload-pic" == c ? "pic" : "phase" == c ? "financing" : c},
                dataType: "json",
                async: !0,
                success: function (a) {
                }
            }), window.location.href = window.location.href.replace(window.location.hash, "") + "#" + c, !1) : void 0
        }), i ? !1 : void(a.hasClass("disabled") || (a.addClass("disabled"), $.ajax({
            type: "post",
            url: "/chuangye/register",
            data: c,
            dataType: "json",
            async: !0,
            success: function (b) {
                1 == b.result ? (modal_build.showMessagePrompt(b.msg), window.location.href = "/chuangye/reg_success") : modal_build.showMessagePrompt(b.msg, "error"), a.removeClass("disabled")
            }
        })))
    }), "startup" == $("#comment-item").val() && setTimeout(function () {
        require.async(["comment"], function (a) {
        })
    }, 1e3), $("#qr-pic-btn").length > 0 && $(window).load(function () {
        $("#qr-pic-btn").zyUpload({
            width: "790px",
            height: "400px",
            itemWidth: "142px",
            itemHeight: "80px",
            url: "/chuangye/upload_image",
            multiple: !0,
            dragDrop: !1,
            del: !0,
            finishDel: !1,
            tailor: !1,
            onSelect: function (a, b) {
            },
            onProgress: function (a, b, c) {
            },
            onDelete: function (a, b) {
            },
            onSuccess: function (file, response) {
                response = eval("(" + response + ")"), "1" == response.result ? $("#uploadImage_" + file.index).attr("src", response.url) : modal_build.showMessagePrompt(response.msg, "success")
            },
            onFailure: function (a, b) {
            },
            onComplete: function (a) {
            }
        })
    }), $("body").on("change", "#address_provincial", function () {
        var a = $(this);
        $.ajax({
            type: "post",
            url: "/chuangye/get_city_list",
            data: {pid: a.val()},
            dataType: "json",
            async: !0,
            success: function (a) {
                $("#address_city").val(a[0].id);
                var b = "";
                $.each(a, function (a, c) {
                    b += '<option class="menu-item js-menu-item" value="' + c.id + '">' + c.name + "</option>"
                }), $("#address_city").empty().append(b)
            }
        })
    }), $("body").on("change", "#add-product-img", function () {
        var a = ($(this), function (a) {
            if ("1" == a.result)var b = '<li><div class="img-box"><label><i class="icon3 icon-pic-cancel js-del-pic"></i><img src="' + a.url + '"><input type="file" id="add-img' + parseInt($(".pic-list li").length) + '" class="hide add-img" name="Filedata" accept="image/jpeg,image/png"></label></div><div class="title-default">点击图片进行修改</div></li>';
            $(".last-add-li").before(b), $(".pic-list li").length < 6 ? $(".last-add-li").show() : $(".last-add-li").hide()
        });
        imgUploadPost("add-product-img", a)
    }), $("body").on("change", ".add-img", function () {
        var a = $(this).attr("id"), b = $(this), c = function (b) {
            "1" == b.result && $("#" + a).parents("li").find("img").attr("src", b.url)
        };
        imgUploadPost(b.attr("id"), c)
    }), $("body").on("change", "#edit-qr-img", function () {
        var a = ($(this).attr("id"), $(this)), b = function (a) {
            "1" == a.result && ($("#qr-pic").attr("src", a.url), modal_build.showMessagePrompt(a.msg, "success"), $("#edit-qr-img").parents("label").removeClass("pic-btn"), $("#edit-qr-img").parents("label").find("span").addClass("hide"), $(".cy-qr-prompt").removeClass("hide"), $("#qr-pic").removeClass("hide"))
        };
        imgUploadPost(a.attr("id"), b)
    }), $("body").on("click", ".js-open-edit-box", function () {
        var a = $(this);
        $(".cy-detail-" + a.attr("data-type")).hide(), $(".cy-detail-edit-" + a.attr("data-type")).show(), a.hide()
    }), $("body").on("click", ".js-down-edit-box", function () {
        var a = $(this);
        $(".cy-detail-" + a.attr("data-type")).show(), $(".cy-detail-edit-" + a.attr("data-type")).hide(), $(".js-open-edit-box").show()
    }), $("body").on("click", ".js-open-edit-logo-box", function () {
        var a = $(this);
        $(".error-msg").hide(), $(".cy-detail-edit-logo .name").val($("#project_name").html()), $(".cy-detail-edit-logo .edit-logo-src").attr("src", $("#logo-pic").attr("src")), $(".cy-detail-edit-logo .description").val($("#description").html()), $(".cy-detail-edit-logo .create-time").val($("#create_time").html()), $(".cy-detail-edit-logo .create-url").val($("#url").html());
        var b = $(".cy-tag-list ul li"), c = '<li class="active js-add-avtive-tag"><i class="icon icon-bind-add"></i>添加行业标签</li>';
        $.each(b, function (a, d) {
            c += '<li data-tag-id="' + b.eq(a).attr("data-tag-id") + '">' + b.eq(a).html() + "</li>"
        }), $(".edit-tags").empty().append(c), $(".cy-detail-" + a.attr("data-type")).hide(), $(".cy-detail-edit-" + a.attr("data-type")).show(), a.hide()
    }), $("body").on("click", ".js-down-edit-logo-box", function () {
        $(this);
        $(".cy-detail-logo").show(), $(".cy-detail-edit-logo").hide(), $(".js-open-edit-logo-box").show()
    }), $("body").on("click", ".js-determine-edit-logo", function () {
        var a = ($(this), !1);
        if ($(".cy-detail-edit-logo .name").val() || (showMessage($(".cy-detail-edit-logo .name")), a = !0), $(".cy-detail-edit-logo .description").val() || (showMessage($(".cy-detail-edit-logo .description")), a = !0), 1 == $(".edit-tags li").length && (showMessage($(".edit-tags")), a = !0), $(".cy-detail-edit-logo .create-url").val() || (showMessage($(".cy-detail-edit-logo .create-url")), a = !0), $(".cy-detail-edit-logo .create-time").val() || (showMessage($(".cy-detail-edit-logo .create-time")), a = !0), a)return !1;
        $("#project_name").html($(".cy-detail-edit-logo .name").val()), $("#logo-pic").attr("src", $(".cy-detail-edit-logo .edit-logo-src").attr("src")), $("#description").html($(".cy-detail-edit-logo .description").val()), $("#create_time").html($(".cy-detail-edit-logo .create-time").val()), $("#url").html($(".cy-detail-edit-logo .create-url").val());
        var b = $(".edit-tags li"), c = "";
        $.each(b, function (a, d) {
            0 != a && (c += '<li data-tag-id="' + b.eq(a).attr("data-tag-id") + '">' + b.eq(a).html() + "</li>")
        }), $(".cy-tag-list ul").empty().append(c), $(".cy-detail-logo").show(), $(".cy-detail-edit-logo").hide(), $(".js-open-edit-logo-box").show()
    }), $("body").on("click", ".js-open-edit-summary-box,.js-open-edit-strength-box,.js-open-edit-product_score-box", function () {
        var a = $(this);
        $(".error-msg").hide(), $(".cy-detail-" + a.attr("data-type")).hide(), $(".cy-detail-edit-" + a.attr("data-type")).show(), $("#text-" + a.attr("data-type")).val($(".cy-detail-" + a.attr("data-type")).html().replace(/<br>/g, "\n"))
    }), $("body").on("click", ".js-down-edit-summary-box,.js-down-edit-strength-box,.js-down-edit-product_score-box", function () {
        var a = $(this);
        $(".cy-detail-" + a.attr("data-type")).show(), $(".cy-detail-edit-" + a.attr("data-type")).hide()
    }), $("body").on("click", ".js-determine-edit-summary,.js-determine-edit-strength,.js-determine-edit-product_score", function () {
        var a = $(this), b = !1;
        return "summary" == a.attr("data-type") && ($("#text-summary").val() || (showMessage($("#text-summary")), b = !0)), "strength" == a.attr("data-type") && ($("#text-strength").val() || (showMessage($("#text-strength")), b = !0)), "product_score" == a.attr("data-type") && ($("#text-product_score").val() || (showMessage($("#text-product_score")), b = !0)), b ? !1 : ($("#" + a.attr("data-type")).html($("#text-" + a.attr("data-type")).val().replace(/\n/g, "<br>")), $(".cy-detail-" + a.attr("data-type")).show(), void $(".cy-detail-edit-" + a.attr("data-type")).hide())
    }), $("body").on("click", ".js-open-edit-company-box", function () {
        $(this);
        $(".error-msg").hide(), $(".cy-detail-edit-company .company_name").val($("#company_name").html()), $(".cy-detail-edit-company .city").val($("#city").attr("data-id")), $(".cy-detail-edit-company .scale_value").val($("#scale_value").attr("data-id")), $(".cy-detail-edit-company .company_time").val($("#company_time").html()), $(".cy-detail-company").hide(), $(".cy-detail-edit-company").show()
    }), $("body").on("click", ".js-down-edit-company-box", function () {
        $(this);
        $(".cy-detail-company").show(), $(".cy-detail-edit-company").hide()
    }), $("body").on("click", ".js-determine-edit-company", function () {
        var a = ($(this), !1);
        return $(".cy-detail-edit-company .company_name").val() || (showMessage($(".cy-detail-edit-company .company_name")), a = !0), $(".cy-detail-edit-company .company_time").val() || (showMessage($(".cy-detail-edit-company .company_name")), a = !0), a ? !1 : ($("#company_name").html($(".cy-detail-edit-company .company_name").val()), $("#city").attr("data-id", $("#address_city").val()), $("#city").html($(".cy-detail-edit-company #address_city").find("option:selected").text()), $("#scale_value").attr("data-id", $(".cy-detail-edit-company .scale_value").val()), $("#scale_value").html($(".cy-detail-edit-company .scale_value").find("option:selected").text()), $("#company_time").html($(".cy-detail-edit-company .company_time").val()), $(".cy-detail-company").show(), void $(".cy-detail-edit-company").hide())
    }), $("body").on("click", ".js-add-financing-box", function () {
        $(this);
        if ($(".error-msg").hide(), "none" != $(".cy-detail-edit-financing").css("display"))return !1;
        var a = $(".financing-box ul li"), b = "";
        $.each(financing_sgin2, function (c, d) {
            var e = !0;
            $.each(a, function (b, c) {
                return d.key == a.eq(b).attr("data-id") ? (e = !1, !1) : void 0
            }), e && (b += '<option value="' + d.key + '">' + d.value + "</option>")
        }), $("#edit_financing_phase").empty().append(b), "none" == $(".cy-detail-edit-financing").css("display") && $(".cy-detail-edit-financing").show()
    }), $("body").on("click", ".js-open-edit-financing-box", function () {
        var a = $(this);
        a.parents("li").hide(), $(".error-msg").hide();
        var b = $(".financing-box ul li"), c = "";
        $.each(financing_sgin2, function (a, d) {
            var e = !0;
            $.each(b, function (a, c) {
                var f = $(this);
                return "none" != f.css("display") && d.key == b.eq(a).attr("data-id") ? (e = !1, !1) : void 0
            }), e && (c += '<option value="' + d.key + '">' + d.value + "</option>")
        }), $("#edit_financing_phase").empty().append(c), $("#edit_financing_phase").val(a.parents("li").attr("data-id")), $("#edit_financing_time").val(a.parents("li").find(".financing_time").html()), $("#edit_financing_touzifang").val(a.parents("li").find(".financing_touzifang").html()), $("#edit_financing_jine").val(a.parents("li").find(".financing_jine").html().replace("万", "")), $(".cy-detail-edit-" + a.attr("data-type")).show()
    }), $("body").on("click", ".js-determine-edit-financing", function () {
        var a = ($(this), !1), b = !1;
        if ($.each($(".financing-box ul li"), function (b, c) {
                var d = $(this);
                return "none" == d.css("display") ? (a = !0, !1) : void 0
            }), $("#edit_financing_time").val() || (showMessage($("#edit_financing_time")), b = !0), $("#edit_financing_touzifang").val() || (showMessage($("#edit_financing_touzifang")), b = !0), $("#edit_financing_jine").val() || (showMessage($("#edit_financing_jine")), b = !0), b)return !1;
        if (a)$.each($(".financing-box ul li"), function (a, b) {
            var c = $(this);
            "none" == c.css("display") && (c.attr("data-id", $("#edit_financing_phase").val()), c.find("strong").html($("#edit_financing_phase").find("option:selected").text()), c.find(".financing_time").html($("#edit_financing_time").val()), c.find(".financing_touzifang").html($("#edit_financing_touzifang").val()), c.find(".financing_jine").html($("#edit_financing_jine").val()), c.find(".financing_jine").attr("data-sing", $("#edit_financing_sing").val()), c.find(".financing_sing").html($("#edit_financing_sing").find("option:selected").text()))
        }); else {
            var c = '<li data-id="' + $("#edit_financing_phase").val() + '"><div class="cy-edit-icon-box"><span class="collect-title"><span><i class="icon icon-edit-h js-open-edit-financing-box" data-type="financing"></i></span><span><i class="icon icon-line-pl"></i></span><i class="icon icon-delete-h js-delete-financing"></i></span></div><p><strong>' + $("#edit_financing_phase").find("option:selected").text() + '</strong></p><p>融资时间:<span class="financing_time">' + $("#edit_financing_time").val() + '</span></p><p>融资机构:<span class="financing_touzifang">' + $("#edit_financing_touzifang").val() + '</span</p><p>融资金额:<span class="financing_jine" data-sing="' + $("#edit_financing_sing").val() + '">' + $("#edit_financing_jine").val() + "万</span>" + $("#edit_financing_sing").find("option:selected").text() + "</p></li>";
            $(".js-add-financing-box").before(c)
        }
        $("#edit_financing_jine").val(""), $("#edit_financing_time").val(""), $("#edit_financing_touzifang").val(""), $(".cy-detail-edit-financing").hide(), $(".financing-box li").show()
    }), $("body").on("click", ".js-down-edit-financing-box", function () {
        var a = $(this);
        $("#edit_financing_jine").val(""), $("#edit_financing_time").val(""), $("#edit_financing_touzifang").val(""), $(".cy-detail-edit-" + a.attr("data-type")).hide(), $(".financing-box li").show()
    }), $("body").on("click", ".js-delete-financing", function () {
        var a = $(this);
        a.parents("li").remove()
    }), $("body").on("click", ".js-open-edit-founder-box", function () {
        var a = $(this);
        $(".cy-detail-edit-founder").find(".founder_name").val($.trim($("#founder_name").text())), $(".cy-detail-edit-founder").find(".founder_email").val($.trim($("#founder_email").text())), $(".cy-detail-edit-founder").find(".founder_tel").val($.trim($("#founder_tel").text())), $(".cy-detail-edit-founder").find(".founder_summary").val($.trim($("#founder_summary").text())), $(".cy-detail-edit-" + a.attr("data-type")).show(), a.parents("li").hide()
    }), $("body").on("click", ".js-down-edit-founder-box", function () {
        var a = $(this);
        $(".cy-detail-edit-" + a.attr("data-type")).hide(), $(".cy-cp-team li").show()
    }), $("body").on("click", ".js-determine-edit-founder", function () {
        var a = ($(this), !1);
        return $(".cy-detail-edit-founder").find(".founder_name").val() || (showMessage($(".cy-detail-edit-founder").find(".founder_name")), a = !0), $(".cy-detail-edit-founder").find(".founder_email").val() ? checkEmail($(".cy-detail-edit-founder").find(".founder_email").val()) || (showMessage($(".cy-detail-edit-founder").find(".founder_email")), a = !0) : (showMessage($(".cy-detail-edit-founder").find(".founder_email")), a = !0), $(".cy-detail-edit-founder").find(".founder_tel").val() ? checkMobile($(".cy-detail-edit-founder").find(".founder_tel").val()) || (showMessage($(".cy-detail-edit-founder").find(".founder_tel")), a = !0) : (showMessage($(".cy-detail-edit-founder").find(".founder_tel")), a = !0), $(".cy-detail-edit-founder").find(".founder_summary").val() || (showMessage($(".cy-detail-edit-founder").find(".founder_summary")), a = !0), a ? !1 : ($("#founder_name").html($(".cy-detail-edit-founder").find(".founder_name").val()), $("#founder_email").html($(".cy-detail-edit-founder").find(".founder_email").val()), $("#founder_tel").html($(".cy-detail-edit-founder").find(".founder_tel").val()), $("#founder_summary").html($(".cy-detail-edit-founder").find(".founder_summary").val()), $(".cy-detail-edit-founder").hide(), void $(".cy-cp-team li").show())
    }), $("body").on("click", ".js-open-edit-members-box", function () {
        var a = $(this);
        $(".error-msg").hide(), $(".cy-detail-edit-members").find(".name").val($.trim(a.parents("li").find(".name").html())), $(".cy-detail-edit-members").find(".position").val($.trim(a.parents("li").find(".position").html())), $(".cy-detail-edit-members").find(".memo").val($.trim(a.parents("li").find(".memo").html())), $(".cy-detail-edit-members").show(), a.parents("li").hide()
    }), $("body").on("click", ".js-del-edit-members-box", function () {
        var a = $(this);
        a.parents("li").remove()
    }), $("body").on("click", ".js-open-add-members-box", function () {
        $(".error-mag").hide(), $(".cy-detail-edit-members").show()
    }), $("body").on("click", ".js-down-edit-members-box", function () {
        var a = $(this);
        $(".cy-detail-edit-" + a.attr("data-type")).hide(), $(".cy-cp-team li").show(), $(".cy-detail-edit-members").find(".name").val(""), $(".cy-detail-edit-members").find(".position").val(""), $(".cy-detail-edit-members").find(".memo").val("")
    }), $("body").on("click", ".js-determine-edit-members", function () {
        var a = ($(this), !0), b = !1;
        if ($(".cy-detail-edit-members").find(".name").val() || (showMessage($(".cy-detail-edit-members").find(".name")), b = !0), $(".cy-detail-edit-members").find(".name").val() || (showMessage($(".cy-detail-edit-members").find(".position")), b = !0), $(".cy-detail-edit-members").find(".name").val() || (showMessage($(".cy-detail-edit-members").find(".memo")), b = !0), b)return !1;
        if ($.each($(".cy-cp-team li"), function (b, c) {
                var d = $(this);
                "none" == d.css("display") && (a = !1, 0 != b && (d.find(".name").html($(".cy-detail-edit-members").find(".name").val()), d.find(".position").html($(".cy-detail-edit-members").find(".position").val()), d.find(".memo").html($(".cy-detail-edit-members").find(".memo").val())))
            }), a) {
            var c = '<li><div class="cy-edit-icon-box"><span class="collect-title"><span><i class="icon icon-edit-h js-open-edit-members-box" data-type="members"></i></span><span><i class="icon icon-line-pl"></i></span><i class="icon icon-delete-h js-del-edit-members-box"></i></span></div><div class="team-personnel-name name">' + $(".cy-detail-edit-members").find(".name").val() + '</div><div class="team-personnel-position position">' + $(".cy-detail-edit-members").find(".position").val() + '</div><div class="team-personnel-intro memo">' + $(".cy-detail-edit-members").find(".memo").val() + "</div></li>";
            $(".cy-cp-team").append(c)
        }
        $(".cy-detail-edit-members").find(".name").val(""), $(".cy-detail-edit-members").find(".position").val(""), $(".cy-detail-edit-members").find(".memo").val(""), $(".cy-detail-edit-members").hide(), $(".cy-cp-team li").show()
    }), $("body").on("click", ".js-open-add-news", function () {
        $(".cy-detail-edit-news").show(), $(".error-msg").hide()
    }), $("body").on("click", ".js-open-edit-news-box", function () {
        var a = $(this);
        $(".error-msg").hide(), $(".cy-detail-edit-news .url").val(a.parents(".section-list").find(".news-href").attr("href")), $(".cy-detail-edit-news .title").val(a.parents(".section-list").find(".news-href").html()), $(".cy-detail-edit-news").show(), a.parents(".section-list").hide()
    }), $("body").on("click", ".js-down-edit-news-box", function () {
        $(this);
        $(".cy-detail-edit-news").hide(), $(".section-list").show()
    }), $("body").on("click", ".js-del-edit-news-box", function () {
        var a = $(this);
        a.parents(".section-list").remove()
    }), $("body").on("click", ".js-determine-news", function () {
        var a = ($(this), !0), b = !1;
        if ($(".cy-detail-edit-news .title").val() || (showMessage($(".cy-detail-edit-news .title")), b = !0), $(".cy-detail-edit-news .url").val() || (showMessage($(".cy-detail-edit-news .url")), b = !0), b)return !1;
        if ($.each($(".cy-cp-advantage .section-list"), function () {
                var b = $(this);
                "none" == b.css("display") && (a = !1, b.find(".news-href").html($(".cy-detail-edit-news .title").val()), b.find(".news-href").attr("href", $(".cy-detail-edit-news .url").val()))
            }), a) {
            var c = '<div class="section-list"><div class="cy-edit-icon-box"><span class="collect-title"><span><i class="icon icon-edit-h js-open-edit-news-box" data-type="news"></i></span> <span><i class="icon icon-line-pl "></i></span> <i class="icon icon-delete-h js-del-edit-news-box"></i></span></div><a class="news-href" href="' + $(".cy-detail-edit-news .url").val() + '" target="_blank">' + $(".cy-detail-edit-news .title").val() + "</a></div>";
            $(".js-open-add-news").before(c)
        }
        $(".cy-detail-edit-news .url").val(""), $(".cy-detail-edit-news .title").val(""), $(".cy-detail-edit-news").hide(), $(".section-list").show()
    }), $("body").on("click", ".js-open-edit-linkman-box", function () {
        $(this);
        $(".error-msg").hide(), $(".cy-detail-edit-linkman .linkman").val($("#linkman").html()), $(".cy-detail-edit-linkman .position").val($("#position").html()), $(".cy-detail-edit-linkman .email").val($("#email").html()), $(".cy-detail-edit-linkman .telphone").val($("#telphone").html()), $(".cy-detail-edit-linkman").show(), $(".cy-cp-linkman").hide()
    }), $("body").on("click", ".js-down-edit-linkman-box", function () {
        $(this);
        $(".cy-detail-edit-linkman").hide(), $(".cy-cp-linkman").show()
    }), $("body").on("click", ".js-determine-edit-linkman", function () {
        var a = ($(this), !1);
        return $(".cy-detail-edit-linkman .linkman").val() || (showMessage($(".cy-detail-edit-linkman .linkman")), a = !0), $(".cy-detail-edit-linkman .position").val() || (showMessage($(".cy-detail-edit-linkman .position")), a = !0), $(".cy-detail-edit-linkman .email").val() ? checkEmail($(".cy-detail-edit-linkman .email").val()) || (showMessage($(".cy-detail-edit-linkman .email")), a = !0) : (showMessage($(".cy-detail-edit-linkman .email")), a = !0), $(".cy-detail-edit-linkman .telphone").val() ? checkMobile($(".cy-detail-edit-linkman .telphone").val()) || (showMessage($(".cy-detail-edit-linkman .telphone")), a = !0) : (showMessage($(".cy-detail-edit-linkman .telphone")), a = !0), a ? !1 : ($("#linkman").html($(".cy-detail-edit-linkman .linkman").val()),
            $("#position").html($(".cy-detail-edit-linkman .position").val()), $("#email").html($(".cy-detail-edit-linkman .email").val()), $("#telphone").html($(".cy-detail-edit-linkman .telphone").val()), $(".cy-detail-edit-linkman").hide(), void $(".cy-cp-linkman").show())
    }), $("#cy_center").length > 0 && $(document).ready(function () {
        var a = "/chuangye/get_company_info", b = {name: $("#company_name").html()};
        $.ajax({
            type: "post", url: a, data: b, dataType: "json", async: !0, success: function (a) {
                1 == a.result && ($(".get-company-box").find(".company_time").html(a.data.company_time), $(".get-company-box").find(".founder_name").html(a.data.founder_name), $(".get-company-box").find(".type").html(a.data.type), $(".get-company-box").removeClass("hide"))
            }
        })
    }), $("body").on("click", ".js-close-footer", function () {
        var a = $(this);
        a.parents(".footer-prompt").remove()
    });
    var updateCoords = function (a) {
        $("#x").val(a.x), $("#y").val(a.y), $("#w").val(a.w), $("#h").val(a.h)
    }, jcrop_api, boundx, boundy, $preview = "", $pcnt = "", $pimg = "", xsize = "", ysize = "", init = function () {
        function a(a) {
            if (parseInt(a.w) > 0) {
                var b = xsize / a.w, c = ysize / a.h;
                $pimg.css({
                    width: Math.round(b * boundx) + "px",
                    height: Math.round(c * boundy) + "px",
                    marginLeft: "-" + Math.round(b * a.x) + "px",
                    marginTop: "-" + Math.round(c * a.y) + "px"
                })
            }
            updateCoords(a)
        }

        $preview = $("#preview-pane"), $pcnt = $("#preview-pane .preview-container"), $pimg = $("#preview-pane .preview-container img"), xsize = $pcnt.width(), ysize = $pcnt.height(), $("#target").Jcrop({
            onChange: a,
            onSelect: a,
            allowSelect: !0,
            allowResize: !0,
            setSelect: [0, 0, 200, 200],
            aspectRatio: 1,
            addClass: "jcrop-dark"
        }, function () {
            var a = this.getBounds();
            boundx = a[0], boundy = a[1], jcrop_api = this;
            var b = $("#target").height(), c = $("#target").width();
            b > c ? $(".jcrop-holder").css({left: -c / 2, "margin-left": "50%"}) : $(".jcrop-holder").css({
                top: -b / 2,
                "margin-top": "50%"
            })
        })
    };
    $("body").on("click", ".js-open-logo-modal", function () {
        var a = ($(this), "修改logo"), b = "logo-modal", c = "", d = "";
        $("#cy_center_edit").length > 0 && (d = $(".edit-logo-src").attr("src")), c = '<div class="logo-warp"><div class="logo-box"><img id="target" accept="image/png,image/jpeg"></div><div><div id="preview-pane"><div class="preview-container"><img class="jcrop-preview"></div></div><label class="logo-btn btn btn-default"><input id="logo"  name="Filedata" type="file" class="hide"><input id="x" class="hide"><input id="y" class="hide"><input id="w" class="hide"><input id="h" class="hide">选择图片</label></div></div><div class="edit-title-box"><div class="btn-group"><div class="btn btn-determine js-favorite-category">保存</div><div class="btn btn-cancel" data-dismiss="modal">取消</div></div></div>', showBoxContent(b, a, c)
    }), $("body").on("click", ".js-favorite-category", function () {
        var a = ($(this), function (a) {
            "1" == a.result ? ($("#cy_center_edit").length > 0 ? ($(".edit-logo-src").attr("src", a.url), $("#logo-modal").modal("hide")) : ($("#pic_logo_img").parent().css({display: "block"}), $("#pic_logo_img").parents(".upload-file-warp").addClass("active"), $("#pic_logo_img").attr("src", a.url), $(".upload-file-warp").length > 0 && $(".upload-file-warp").find(".error-msg").hide()), $("#logo-modal").modal("hide")) : modal_build.showMessagePrompt(a.msg, "error")
        }), b = {
            is_ajax: 1,
            huxiu_hash_code: huxiu_hash_code,
            x: $("#x").val(),
            y: $("#y").val(),
            w: $("#w").val(),
            h: $("#h").val(),
            img_w: $(".jcrop-holder").width() + 2,
            img_h: $(".jcrop-holder").height() + 2,
            src: $("#target").attr("src").indexOf("huxiu.com") > 0 ? $("#target").attr("src") : ""
        };
        imgUploadPostJcrop("logo", a, b)
    }), $("body").on("change", "#logo", function (a) {
        var b = a.target.files[0];
        if (b) {
            var c = new FileReader;
            c.onload = function () {
                var a = {pic: c.result};
                jcrop_api && ($("#target").removeAttr("style"), jcrop_api.destroy()), $("#target").attr("src", a.pic), $("#preview-pane .preview-container img").attr("src", a.pic);
                var b = $("#target").height(), d = $("#target").width();
                b > d ? $("#target").css({height: "100%", width: "auto"}) : $("#target").css({
                    width: "100%",
                    height: "auto"
                }), init()
            }, c.readAsDataURL(b)
        }
    }), $("body").on("click", ".js-del-pic", function (a) {
        a.stopPropagation();
        var b = $(this);
        return b.parents("li").remove(), $(".last-add-li").removeClass("hide"), !1
    }), $("body").on("click", ".js-cy-edit-submit", function () {
        var a = $(this), b = "/chuangye/update_product", c = "", d = [], e = [], f = "5", g = {
            com_id: $("#com_id").val(),
            huxiu_hash_code: huxiu_hash_code,
            name: $("#project_name").html(),
            project_name: $("#project_name").html(),
            description: $("#description").html(),
            create_time: $("#create_time").html(),
            tags: "",
            url: $("#url").html(),
            summary: $("#summary").html(),
            strength: $("#strength").html(),
            product_score: $("#product_score").html(),
            company_name: $("#company_name").html(),
            company_time: $("#company_time").html(),
            financing: "5",
            founder_name: $("#founder_name").html(),
            founder_email: $("#founder_email").html(),
            founder_tel: $("#founder_tel").html(),
            founder_summary: $("#founder_summary").html(),
            pic_logo: $("#logo-pic").attr("src"),
            pic_qr: $("#qr-pic").attr("src"),
            linkman: $("#linkman").html(),
            position: $("#position").html(),
            email: $("#email").html(),
            telphone: $("#telphone").html(),
            city: $("#city").attr("data-id"),
            scale: $("#scale_value").attr("data-id"),
            pic: [],
            rongzi: [],
            team: [],
            news: [],
            url: $("#url").html(),
            weifangtan: $(".weifangtan").prop("checked"),
            is_rongzi: $(".is_rongzi").prop("checked")
        };
        if ($.each($(".cy-tag-list ul li"), function () {
                var a = $(this);
                c += a.attr("data-tag-id") + ","
            }), c.indexOf(",") > 0 && (c = c.substring(0, c.length - 1)), g.tags = c, $.each($(".pic-list li"), function () {
                var a = $(this);
                a.hasClass("last-add-li") || d.push({pic: $(this).find("img").attr("src")})
            }), g.pic = d, 0 == d.length) {
            var h = 170;
            if ($("#cy-cp-pic").length > 0) {
                var i = $("#cy-cp-pic").offset().top - h;
                $("html, body").animate({scrollTop: i}, 500)
            }
            return $("#cy-cp-pic").find(".error-msg").show(), !1
        }
        $.each($(".financing-box ul li"), function () {
            var a = $(this);
            a.hasClass("js-add-financing-box") || (parseInt(a.attr("data-id")) > parseInt(f) && (f = a.attr("data-id")), e.push({
                addtime: a.find(".financing_time").html(),
                set_id: a.attr("data-id"),
                touzifang: a.find(".financing_touzifang").html(),
                jine: a.find(".financing_jine").html(),
                sign: a.find(".financing_jine").attr("data-sing")
            }))
        }), g.financing = f, g.rongzi = e, $(".cy-cp-team li").length > 1 && $.each($(".cy-cp-team li"), function (a) {
            var b = $(this);
            a > 0 && g.team.push({
                name: b.find(".name").html(),
                position: b.find(".position").html(),
                memo: b.find(".memo").html()
            })
        }), $(".section-list").length > 0 && $.each($(".section-list"), function () {
            $(this);
            g.news.push({
                news_title: $(this).find(".news-href").html(),
                news_url: $(this).find(".news-href").attr("href")
            })
        }), a.hasClass("disabled") || (a.addClass("disabled"), $.ajax({
            type: "post",
            url: b,
            data: g,
            dataType: "json",
            async: !0,
            success: function (b) {
                console.log(b), a.removeClass("disabled"), 1 == b.result ? (setTimeout(function () {
                    window.location.href = "/chuangye/update_success"
                }, 500), modal_build.showMessagePrompt(b.msg, "error")) : modal_build.showMessagePrompt(b.msg, "error")
            },
            error: function (a) {
                console.log(g)
            }
        }))
    })
});