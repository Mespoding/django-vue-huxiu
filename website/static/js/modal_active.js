define("modal_active", function (a, b) {
    function c(a, b) {
        $("#" + a).modal("hide"), setTimeout(function () {
            d.showBoxContent("success", "", b)
        }, 500)
    }

    var d, e = function () {
        $(".input-date").datetimepicker({
            language: "zh-CN",
            format: "yyyy-mm-dd",
            autoclose: !0,
            todayBtn: !0,
            minView: "month"
        }).on("click", function (a) {
        })
    };
    a.async("modal_build", function (a) {
        d = a
    }), a.async(["jquery-qrcode.min"], function () {
    }), a.async(["datetimepicker/bootstrap-datetimepicker.js"], function () {
        $.fn.datetimepicker.dates["zh-CN"] = {
            days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
            daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
            months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            today: "今日",
            suffix: [],
            meridiem: ["上午", "下午"]
        }
    }), $("body").on("click", ".js-menu-item", function () {
        $(this).parents(".js-dropdown-menu").find(".js-dropdown-show").html($(this).html()), $(this).parents(".js-dropdown-menu").find(".js-dropdown-show").attr("value", $(this).attr("value"))
    }), $(".carousel").length > 0 && $(".carousel").carousel({interval: 2e3}), $("body").on("click", ".js-get-more", function () {
        var a = $(this);
        a.parents("section").find(".review-past-warp").toggleClass("active")
    });
    var f = 2;
    $("body").on("click", ".js-btn-more", function () {
        var a = $(this), b = "/active/more", c = {
            is_ajax: "1",
            huxiu_hash_code: huxiu_hash_code,
            page: f
        }, e = '<section class="transition"><div class="activity-pic"><a href="{{link}}" target="_blank"><img src="{{pic}}"></a></div><div class="activity-content-warp"><div class="pull-right activity-type {{activity_type}}">{{state}}</div><div class="activity-title"><a href="{{link}}" target="_blank">{{title}}</a></div></div><div class="activity-info"><div class="pull-right"><i class="icon2 icon2-time"></i>{{date}}</div><div class="activity-address"><i class="icon2 icon2-address"></i>{{address}}</div></div></section>';
        $.ajax({
            type: "post", url: b, data: c, dataType: "json", async: !0, success: function (b) {
                if ("1" == b.result) {
                    var c = "";
                    for (var g in b.data)c += e.replace("{{link}}", b.data[g].link).replace("{{link}}", b.data[g].link).replace("{{pic}}", b.data[g].pic).replace("{{state}}", b.data[g].state).replace("{{title}}", b.data[g].title.length >= 20 ? b.data[g].title.substring(0, 20) + "..." : b.data[g].title).replace("{{date}}", b.data[g].date).replace("{{address}}", b.data[g].address.length >= 13 ? b.data[g].address.substring(0, 13) + "..." : b.data[g].address).replace("{{activity_type}}", "未开始" == b.data[g].state ? "activity-type-not" : "进行中" == b.data[g].state ? "" : "activity-type-end");
                    $(".activity-list-external-warp").append(c), f += 1
                } else d.showMessagePrompt(b.msg, "error");
                a.removeClass("disabled")
            }
        })
    }), $("body").on("click", ".share-group ul li", function () {
        var a = $(this), b = "/action/share", c = "", d = "", e = "", f = "";
        if (d = "undefined" == typeof a.attr("aid") ? "" : a.attr("aid"), e = "undefined" == typeof a.attr("pid") ? "" : a.attr("pid"), f = "undefined" == typeof $("#hid").val() ? "" : $("#hid").val(), a.hasClass("li-weibo"))c = "hxs_tsina"; else {
            if (!a.hasClass("li-qzone"))return !1;
            c = "hxs_qzone"
        }
        $.myDetection.htmDetection("活动详情页-分享,点击,点击"), window.open(b + "?huxiu_hash_code=" + huxiu_hash_code + "&aid=" + d + "&pid=" + e + "&des=" + c + "&hid=" + f)
    }), $(document).on("mouseenter", ".share-group ul .weixin", function () {
        var a = $(this), b = a.find(".active-wx-share");
        $(".active-wx-share").empty().qrcode({
            render: "table",
            size: 100,
            text: window.location.href + "?f=" + a.attr("data-f")
        }), a.hasClass("disabled") || (a.addClass("disabled"), b.stop().css({
            opacity: "0",
            "margin-top": "-145px"
        }).show().animate({opacity: "1", "margin-top": "-135px"}, 300))
    }), $(document).on("mouseleave", ".share-group ul .weixin", function () {
        var a = $(this), b = a.find(".active-wx-share");
        b.stop().animate({opacity: "0", "margin-top": "-145px"}, 400, function () {
            b.hide()
        }), a.removeClass("disabled")
    }), $(".nav-floating").length > 0 && $(window).scroll(function () {
        var a = $(window).scrollTop();
        a >= 500 ? $(".nav-floating").slideDown() : $(".nav-floating").slideUp()
    }), $("body").on("click", ".js-sign-up", function () {
        if (0 == uid)$(".login-link-box .js-login").trigger("click"); else {
            var a = $(this), b = a.attr("data-prompt"), c = '<div class="activity-form"><div class="form-warp"><label class="control-label"><em>*</em>姓名：</label><input class="control-input" value="" placeholder="姓名" id="name"> <div class="error-msg"><i class="icon2 icon2-error-msg"></i><span>请填写您的姓名</span></div></div><div class="form-warp"><label class="control-label"><em>*</em>电话：</label><input class="control-input" value="" placeholder="手机" id="mobile"><div class="error-msg"><i class="icon2 icon2-error-msg"></i><span>手机号格式不正确</span></div></div><div class="form-warp"><label class="control-label"><em>*</em>邮箱：</label><input class="control-input" type="email" value="" placeholder="邮箱地址" id="email"><div class="error-msg"><i class="icon2 icon2-error-msg"></i><span>邮箱格式不正确</span></div></div><div class="form-warp"><label class="control-label"><em></em>微信：</label><input class="control-input" value="" placeholder="微信账号" id="weixin"></div><div class="form-warp"><label class="control-label"><em></em>行业：</label><div class="btn-group  btn-group-box pull-right js-dropdown-menu"><span class="btn btn-default btn-dropdown-show js-dropdown-show" data-toggle="dropdown" data-pmt="birthyear" value="" id="industry">请选择</span><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></button><ul class="dropdown-menu"><li><span class="trangle trangle-top"></span></li><li class="menu-item js-menu-item" value="IT">IT</li><li class="menu-item js-menu-item" value="金融">金融</li><li class="menu-item js-menu-item" value="房地产">房地产</li><li class="menu-item js-menu-item" value="商业服务">商业服务</li><li class="menu-item js-menu-item" value="贸易/零售批发">贸易/零售批发</li><li class="menu-item js-menu-item" value="加工制造">加工制造</li><li class="menu-item js-menu-item" value="仓储物流">仓储物流</li><li class="menu-item js-menu-item" value="制药医疗/生物/卫生保健">制药医疗/生物/卫生保健</li><li class="menu-item js-menu-item" value="教育/专业服务/培训">教育/专业服务/培训</li><li class="menu-item js-menu-item" value="酒店/餐饮/旅游">酒店/餐饮/旅游</li><li class="menu-item js-menu-item" value="文化/体育/娱乐业">文化/体育/娱乐业</li><li class="menu-item js-menu-item" value="能源相关">能源相关</li><li class="menu-item js-menu-item" value="政府/非盈利机构">政府/非盈利机构</li><li class="menu-item js-menu-item" value="学生">学生</li><li class="menu-item js-menu-item" value="其他">其他</li></ul></div></div><div class="form-warp"><label class="control-label"><em></em>职位：</label><input class="control-input" value="" placeholder="填写您的职位" id="position"></div>';
            b && (c += '<div class="form-warp form-textarea-warp"><label class="control-label">入席必答：</label><textarea class="control-input" rows="3" id="remark" placeholder="' + b + '"></textarea></div>'), c += '<a class="btn btn-article js-btn-sign-submit" data-hid="' + a.attr("data-hid") + '">确认报名</a></div>', $.myDetection.htmDetection("内部活动报名-第一步,点击,点击"), d.showBoxContent("sign-up", "活动报名", c)
        }
    }), $("body").on("click", ".js-btn-sign-submit", function () {
        var a = $(this), b = '<div class="activity-form"><div class="success-title">报名成功！<i class="icon2 icon2-success"></i></div><div class="success-info">感谢您的参与！您的活动申请已成功提交。云酒会尽快完成审核，请耐心等待。如果审核通过，我们会尽快在云酒“活动”中展示。谢谢您的支持！</div><a class="btn btn-article" href="javascript:void()" data-dismiss="modal">确认</a></div>', e = {}, f = ["hid", "name", "weixin", "position", "email", "mobile"];
        for (key in f)e[f[key]] = $("#" + f[key]).val().trim();
        e.profession = $("#industry").attr("value"), e.huxiu_hash_code = huxiu_hash_code, e.prompt = $("#remark").val(), e.platform = "web";
        var g = !1;
        $(".error-msg").hide(), "" == e.name || void 0 == e.name ? ($("#name").parent().find(".error-msg").show(), g = !0) : $("#name").parent().find(".error-msg").hide();
        var h = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        return 0 == h.test(e.mobile) ? ($("#mobile").parent().find(".error-msg").show(), g = !0) : $("#mobile").parent().find(".error-msg").hide(), 0 == /\S+@\S+\.\S+/.test(e.email) ? ($("#email").parent().find(".error-msg").show(), g = !0) : $("#email").parent().find(".error-msg").hide(), g ? !1 : void $.ajax({
            type: "post",
            url: "/shop_action/order_free",
            data: e,
            dataType: "json",
            async: !0,
            success: function (e) {
                "1" == e.result ? ($.myDetection.htmDetection("内部活动报名-第二步,点击,点击"), c("sign-up", b), $(".js-sign-up").addClass("disabled").html("已报名"), setTimeout(function () {
                    location.reload()
                }, 2e3), a.removeClass("disabled")) : d.showMessagePrompt(e.msg, "error")
            }
        })
    }), $(document).on("click", ".js-sign-up-table", function () {
        var a = '<div class="field-tag"><label>标签名称：</label><input id="focus-name" placeholder="每个标签最多6个字"></div><div class="edit-title-box"><div class="btn-group"><div class="btn btn-determine js-add-focus">确定</div><div class="btn btn-cancel" data-dismiss="modal">取消</div></div></div>';
        d.showBoxContent("focusModal", "", a)
    }), $("body").on("click", ".js-content-submit", function () {
        if ("0" == uid)$(".login-link-box .js-login").trigger("click"); else {
            var a = ($(this), '<div class="activity-form admin-activity-form"><div class="form-warp"><label class="control-label"><em>*</em>活动名称：</label><input class="control-input" value="" placeholder="活动名称（最少4个字）" data-type="名称" id="title"><div class="error-msg"><i class="icon2 icon2-error-msg"></i><span>活动名称不正确</span></div></div><div class="form-warp"><label class="control-label"><em>*</em>活动时间：</label><input class="control-input start-time input-date" data-type="开始时间" value="" placeholder="开始时间" id="start-time"><label class="control-label control-label-to">至</label><input class="control-input end-time input-date" data-type="结束时间" placeholder="结束时间" value="" id="end-time"><div class="error-msg"><i class="icon2 icon2-error-msg"></i><span>时间不能为空</span></div></div><div class="form-warp time"><label class="control-label"><em>*</em>活动地点：</label><input class="control-input" value="" placeholder="活动地点" data-type="活动地点" id="address"><div class="error-msg"><i class="icon2 icon2-error-msg"></i><span>活动地点不能为空</span></div></div><div class="form-warp link-box"><label class="control-label"><em>*</em>活动链接：</label><input class="control-input" value="" placeholder="请输入活动链接地址" data-type="活动链接" id="link"><div class="error-msg"><i class="icon2 icon2-error-msg"></i><span>活动链接不能为空</span></div></div><div class="form-warp upload_img"><label class="control-label"><em>*</em>活动封面：</label><label class="btn-file">本地上传<input type="file" id="pub_upload_img" name="pub_upload_img" accept="image/*" class="hide"></label><span class="control-info">（格式： GIF，JPG，JPEG，PNG；尺寸：370*208；小于500KB）</span><div class="error-msg"><i class="icon2 icon2-error-msg"></i><span>活动封面不能为空</span></div></div><div class="pic-warp hide"><img id="pic_activity" src=""></div><a class="btn btn-article js-btn-content-submit">提交活动</a></div>');
            $.myDetection.htmDetection("外部活动提交-第一步,点击,点击"), d.showBoxContent("content_modal", "活动提交", a), e()
        }
    }), a("ajaxfileupload"), $("body").on("change", "#pub_upload_img", function (a) {
        return $.ajaxFileUpload({
            data: {is_ajax: "1", huxiu_hash_code: huxiu_hash_code},
            url: "/active/uploadImage",
            secureuri: !1,
            fileElementId: "pub_upload_img",
            dataType: "json",
            success: function (a) {
                "1" == a.result ? ($("#pic_activity").attr("src", a.data.url), $(".upload_img").find(".error-msg").hide(), d.showMessagePrompt(a.msg, "success"), $(".pic-warp").length > 0 && $(".pic-warp").removeClass("hide")) : d.showMessagePrompt(a.msg, "error")
            }
        }), !1
    }), $(document).on("input propertychange", ".admin-activity-form input,.activity-form input", function () {
        "" == $(this).val() || void 0 == $(this).val() ? $(this).parents(".form-warp").find(".error-msg").show() : $(this).parents(".form-warp").find(".error-msg").hide(), "title" == $(this).attr("id") && $.trim($(this).val().length) < 4 && $(this).parents(".form-warp").find(".error-msg").show()
    }), $("body").on("click", ".js-btn-content-submit", function () {
        var a = ($(this), {
            is_ajax: "1",
            huxiu_hash_code: huxiu_hash_code,
            title: $("#title").val(),
            start_date: $("#start-time").val(),
            end_date: $("#end-time").val(),
            link: $("#link").val(),
            address: $("#address").val()
        }), b = !1;
        return $(".error-msg").hide(), $.each($(".control-input"), function () {
            $(this);
            ("" == $(this).val() || void 0 == $(this).val()) && ($(this).parent(".form-warp").find(".error-msg").show(), b = !0)
        }), $.trim($("#title").val()).length < 4 && ($("#title").parent(".form-warp").find(".error-msg").show(), b = !0), "" == a.link && ($(".link-box").find(".error-msg").show().html("活动链接不能为空"), b = !0), 0 == /^https?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?.*?/.test(a.link) && ($(".link-box").find(".error-msg").show().html("请输入正确的连接地址"), b = !0), "" == $("#pic_activity").attr("src") && ($(".upload_img").find(".error-msg").show(), b = !0), b ? !1 : (a.pic = $("#pic_activity").attr("src"), void $.ajax({
            type: "post",
            url: "/active/addOtherActivity",
            data: a,
            dataType: "json",
            async: !0,
            success: function (a) {
                if ("1" == a.result) {
                    $.myDetection.htmDetection("外部活动提交-第二步,点击,点击"), $("#content_modal").modal("hide");
                    var b = '<div class="activity-form"><div class="success-title">活动提交成功！<i class="icon2 icon2-success"></i></div><div class="success-info">感谢您的参与！您的活动申请已成功提交。云酒会尽快完成审核，请耐心等待。如果审核通过，我们会尽快在云酒“活动”中展示。谢谢您的支持！</div><a class="btn btn-article" href="javascript:void()" data-dismiss="modal">确认</a></div>';
                    setTimeout(function () {
                        c("active_sub", b)
                    }, 300)
                } else d.showMessagePrompt(a.msg, "error")
            }
        }))
    }), $("#activity-detail").length > 0 && setTimeout(function () {
        a.async(["comment"], function (a) {
        })
    }, 1e3), $(document).on("click", ".js-shop-index", function () {
        var a = $(this);
        0 == uid ? $(".login-link-box .js-login").trigger("click") : window.open("/shop/index/" + a.attr("data-id"), "_blank")
    })
});