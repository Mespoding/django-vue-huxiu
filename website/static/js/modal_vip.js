define("modal_vip", function (a, b, c) {
    function d() {
        var a = $("#tpl_vip_pre_buy").html(), b = Mustache.render(a);
        f.showBoxContent("preBuyModal", "开通会员", b), l()
    }

    var e = window.innerHeight - 90;
    $(".min-height").css({"min-height": e}), $(".bg-fb").length > 0 && $("body").css({"background-color": "#f0f4fb"});
    var f;
    a.async("modal_build", function (a) {
        f = a
    }), $(document).on("click", ".js-order-pay", function () {
        $("#order-pay").show()
    }), $(document).on("click", ".js-go-on", function () {
        var a = $("#buy-vip").offset().top - 100;
        $("html, body").animate({scrollTop: a}, 500)
    }), $(document).on("click", ".js-close-zoom-pic", function () {
        $(".zoom-pic-box").hide().empty(), $("body").css("overflow", "auto")
    });
    var g = function () {
        var a = 0;
        return $.each($(".all-focus-ul li"), function () {
            var b = $(this);
            b.hasClass("active") && a++
        }), a += $(".my-focus-ul .focus-li").length
    };
    $(document).on("click", ".js-add-focus", function () {
        var a = $(this), b = "/vip_action/addFocus", c = {
            huxiu_hash_code: huxiu_hash_code,
            name: $("#focus-name").val()
        };
        g() < 5 ? a.hasClass("disabled") || (a.addClass("disabled"), $.ajax({
            type: "post",
            url: b,
            data: c,
            dataType: "json",
            async: !0,
            success: function (b) {
                if ("1" == b.result) {
                    f.showMessagePrompt(b.msg);
                    var c = '<li class="focus-li transition active" data-focus_id="' + b.id + '"><div class="close-sm-box js-delete-focus"></div>' + b.name + "</li>";
                    $(".my-focus-ul").append(c), $("#focus-name").val("")
                } else f.showMessagePrompt(b.msg, "error");
                a.removeClass("disabled")
            },
            error: function (b) {
                a.removeClass("disabled")
            }
        })) : f.showMessagePrompt("最多可选五项关注领域", "error")
    }), $(document).on("click", ".js-delete-focus", function () {
        var a = $(this), b = "/vip_action/deleteFocus", c = {
            huxiu_hash_code: huxiu_hash_code,
            focus_id: a.parents("li").attr("data-focus_id")
        };
        a.hasClass("disabled") || (a.addClass("disabled"), $.ajax({
            type: "post",
            url: b,
            data: c,
            dataType: "json",
            async: !0,
            success: function (b) {
                "1" == b.result ? (f.showMessagePrompt(b.msg), a.parents("li").remove()) : f.showMessagePrompt(b.msg, "error"), a.removeClass("disabled")
            },
            error: function (b) {
                a.removeClass("disabled")
            }
        }))
    }), $(document).on("click", ".js-choose-focus", function () {
        var a = [];
        $.each($(".all-focus-ul li"), function () {
            var b = $(this);
            b.hasClass("active") && a.push(b.attr("data-focus_id"))
        }), $.each($(".my-focus-ul .focus-li"), function () {
            var b = $(this);
            a.push(b.attr("data-focus_id"))
        });
        var b = $(this), c = "/vip_action/focus", d = {huxiu_hash_code: huxiu_hash_code, focus: a};
        b.hasClass("disabled") || (b.addClass("disabled"), $.ajax({
            type: "post",
            url: c,
            data: d,
            dataType: "json",
            async: !0,
            success: function (a) {
                "1" == a.result ? "pay" == b.attr("data-type") ? window.location.href = a.url : window.location.href = "/vip" : f.showMessagePrompt(a.msg, "error"), b.removeClass("disabled")
            },
            error: function (a) {
                b.removeClass("disabled")
            }
        }))
    }), $(document).on("click", ".js-selected-focus", function () {
        var a = $(this);
        a.hasClass("active") ? a.removeClass("active") : g() < 5 ? a.addClass("active") : f.showMessagePrompt("最多可选五项关注领域", "error")
    }), $("#weixin_bind_message").length > 0 && "" != $("#weixin_bind_message").html().trim() && (window.onload = function () {
        f.showMessagePrompt($("#weixin_bind_message").html(), "error")
    }), $(document).on("click", ".js-close-vip-f", function () {
        $(".vip-pay-f-box").remove()
    });
    var h, i = function () {
        var a = "/shop_action/order_pay_finished", b = {huxiu_hash_code: huxiu_hash_code, order_id: order_id};
        $.ajax({
            type: "post", url: a, data: b, dataType: "json", async: !0, success: function (a) {
                1 == a.result && (window.location.href = "/vip/success")
            }, error: function (a) {
            }
        })
    }, j = function () {
        var a = "/vip_action/pay", b = {
            huxiu_hash_code: huxiu_hash_code,
            num: num,
            invoice_type: $(".js-bill.active").attr("data-type"),
            invoice: $("#invoice").val(),
            name: $("#name").val(),
            mobile: $("#mobile").val(),
            address: $("#address").val()
        };
        $.ajax({
            type: "post", url: a, data: b, dataType: "json", async: !0, success: function (a) {
                "1" == a.result ? (order_id = a.order_id, $("#pay-pic").attr("src", a.img), $(".pay-link").attr("href", a.alipay_url), h && clearInterval(h), h = setInterval(i, 5e3)) : f.showMessagePrompt(a.msg, "error")
            }
        })
    };
    $(document).on("click", ".js-add-bill-info", function () {
        $(this);
        $(".buy-ticket-box,.buy-ticket-bill-box").toggleClass("hide")
    });
    var k = function () {
        var a = "2" == $(".js-bill.active").attr("data-type") ? 10 : 0, b = parseInt($(".ticket-price-ul li.active").attr("data-num")) + a;
        $(".js-num").html(b)
    };
    $(document).on("click", ".ticket-price-ul li", function () {
        var a = $(this);
        $(".ticket-price-ul li").removeClass("active"), a.addClass("active"), num = a.attr("data-n"), k(), j()
    }), $(document).on("click", ".js-vip-bill-save", function () {
        var a = ($(this), $("#invoice").val()), b = $("#name").val(), c = $("#mobile").val(), d = $("#address").val(), e = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if ("" == a)return f.showMessagePrompt("发票抬头不能为空", "error"), !1;
        if ("" == b)return f.showMessagePrompt("姓名不能为空", "error"), !1;
        if ("" == c)return f.showMessagePrompt("手机号不能为空", "error"), !1;
        if (!e.test(c))return f.showMessagePrompt("请输入正确的手机号", "error"), !1;
        if ("" == d)return f.showMessagePrompt("地址不能为空", "error"), !1;
        var g = $(".js-add-bill"), h = $(".js-edit-bill");
        $(".invoice").html(a), $(".name").html(b), $(".mobile").html(c), $(".address").html(d), g.addClass("hide"), g.removeClass("active"), h.addClass("active"), h.removeClass("hide"), $(".buy-ticket-box,.buy-ticket-bill-box").toggleClass("hide"), $(".bill-info-box").removeClass("hide"), j(), k()
    }), $(document).on("click", ".js-no-bill", function () {
        var a = ($(this), $(".js-add-bill")), b = $(".js-edit-bill");
        a.addClass("active"), a.removeClass("hide"), b.addClass("hide"), b.removeClass("active"), $(".bill-info-box").addClass("hide"), j(), k()
    });
    var l = function () {
        $.ajax({
            type: "post", url: "/user_action/countryList/", dataType: "html", async: !0, success: function (a) {
                // var b = "";
                // for (var c in a.data)" " != c && $.each(a.data[c], function (a, c) {
                //     b += '<li data-code="' + c.country + '"><span class="name">' + c.name + '</span><span class="code">' + c.country + "</span></li>"
                // });
                $(".country-ul").empty().append(a)
            }, error: function (a) {
                "use strict";
                console.log(a)
            }
        })
    };
    $("body").on("click", ".J_call_pre_buy", function () {
        if (0 == uid)$(".login-link-box .js-login").trigger("click"); else {
            var a = $("#tpl_vip_pre_buy").html(), b = Mustache.render(a);
            f.showBoxContent("preBuyModal", "开通会员", b), l()
        }
    }), $("body").on("click", ".J_call_cc_box", function () {
        $(".cc-box").slideToggle(200)
    }), $(document).on("click", ".J_country_ul li", function () {
        var a = $(this), b = a.find(".code").text();
        $(".cc-select-box span.J_country_sms").text(b), $(".cc-box").slideToggle(200)
    }), $("body").on("click", ".J_call_fields", function () {
        if (0 == uid)$(".login-link-box .js-login").trigger("click"); else {
            var a = $(this), b = a.parents(".modal-content"), c = b.find(".modal-alert-title");
            c.text("请选择 5 个您最专注领域"), $("#box_forms").hide(), $("#box_fields").show()
        }
    }), Array.prototype.removeByValue = function (a) {
        for (var b = 0; b < this.length; b++)if (this[b] == a) {
            this.splice(b, 1);
            break
        }
    };
    var m = [], n = function () {
        return m.length >= 5
    };
    $("body").on("click", ".fields-store .field-item span", function (a) {
        var b = $(this).parent(".field-item"), c = b.attr("data-focus_id"), d = b.find(".tag"), e = $(this).text(), g = d.is(":checked"), h = m, i = {
            id: c,
            text: e
        };
        if (g) {
            for (var j = 0; j < h.length; j++)if (h[j].id == c) {
                h.removeByValue(h[j]);
                break
            }
            m = h
        } else {
            if (n())return a.stopPropagation(), f.showMessagePrompt("最多可以选择5个关注领域", "error"), !1;
            m.push(i), m = h
        }
    }), $("body").on("click", ".J_add_field", function (a) {
        var b = $(this), c = $(".add-field"), d = $.trim(c.val()), e = "/vip_action/addFocus", g = {
            huxiu_hash_code: huxiu_hash_code,
            name: d
        };
        if (d) {
            if (d.length > 6)return f.showMessagePrompt("标签最多6个字", "error"), !1;
            n() ? f.showMessagePrompt("最多可以选择5个关注领域", "error") : b.hasClass("disabled") || (b.addClass("disabled"), $.ajax({
                type: "post",
                url: e,
                data: g,
                dataType: "json",
                async: !0,
                success: function (a) {
                    if ("1" == a.result) {
                        f.showMessagePrompt(a.msg);
                        var e = '<label class="field-item" data-focus_id="' + a.id + '">';
                        e += '<input name="tag" class="tag" type="checkbox" checked disabled>', e += "<span>" + d + "</span>", e += '<div class="rm" title="删除" data-focus_id="' + a.id + '"><i class="icon-remove"></i></div>', e += "</label>", $(".fields-gened").append(e), $("#pre_field").append('<i class="fld">' + d + "</i>"), c.val(""), m.push({
                            id: a.id,
                            text: a.name
                        })
                    } else f.showMessagePrompt(a.msg, "error");
                    b.removeClass("disabled")
                },
                error: function (a) {
                    b.removeClass("disabled")
                }
            }))
        }
    }), $("body").on("click", ".field-item .rm", function () {
        var a = $(this), b = a.attr("data-focus_id"), c = a.parent(".field-item"), d = "/vip_action/deleteFocus", e = {
            huxiu_hash_code: huxiu_hash_code,
            focus_id: b
        };
        a.hasClass("disabled") || (a.addClass("disabled"), $.ajax({
            type: "post",
            url: d,
            data: e,
            dataType: "json",
            async: !0,
            success: function (d) {
                if ("1" == d.result) {
                    f.showMessagePrompt(d.msg), c.remove();
                    for (var e = 0; e < m.length; e++)if (m[e].id == b) {
                        m.removeByValue(m[e]);
                        break
                    }
                } else f.showMessagePrompt(d.msg, "error");
                a.removeClass("disabled")
            },
            error: function (b) {
                a.removeClass("disabled")
            }
        }))
    }), $("body").on("click", ".J_save_fields", function () {
        var a = $(this), b = m.map(function (a) {
            return a.id
        }), c = m.map(function (a) {
            return a.text
        }), d = c.map(function (a) {
            return '<i class="fld">' + a + "</i>"
        }).join(""), e = "/vip_action/focus", g = {huxiu_hash_code: huxiu_hash_code, focus: b};
        a.hasClass("disabled") || (a.addClass("disabled"), $.ajax({
            type: "post",
            url: e,
            data: g,
            dataType: "json",
            async: !0,
            success: function (b) {
                "1" == b.result ? (f.showMessagePrompt(b.msg), $("#pre_field").empty().html(d), $("#box_forms").show(), $("#box_fields").hide()) : f.showMessagePrompt(b.msg, "error"), a.removeClass("disabled")
            },
            error: function (b) {
                a.removeClass("disabled")
            }
        }))
    }), $("body").on("click", ".J_go_back", function () {
        var a = $(this), b = a.parents(".modal-content"), c = b.find(".modal-alert-title");
        c.text("开通会员"), $("#box_forms").show(), $("#box_fields").hide()
    }), $("body").on("click", ".J_go_start", function () {
        var a = $(".J_country_sms").text(), b = $("#pre_mobile").val(), c = $("#pre_call").val(), d = $('input[name="gender"]:checked').val(), e = $("#pre_job").val(), g = $("#pre_industry").val(), h = m.map(function (a) {
            return a.id
        });
        b && c && e && g ? $.ajax({
            url: "/vip_action/submitProfile",
            type: "post",
            dataType: "json",
            data: {country: a, mobile: b, name: c, sex: d, position: e, profession: g, focus_id: h},
            success: function (a) {
                if (console.log(a), a.success) {
                    $(".modal").modal("hide");
                    var b = '<div class="buy-ticket-wrap"><div class="buy-ticket-box"><ul class="ticket-price-ul"><li class="active" data-num="1288" data-n="2"><div class="time">2年<span class="vip-r">省688</span></div><div class="price">¥1888</div></li><li data-num="1288" data-n="1"><div class="time">1年</div><div class="price">¥1288</div></li></ul><div class="bill-box"><div class="title-box"><span>发票（快递费10元）</span><div class="pull-right js-bill js-edit-bill hide" data-type="2"><a class="c6 js-add-bill-info">修改发票信息&nbsp;&nbsp;&nbsp;&nbsp;</a><a class="c6 js-no-bill">不需要发票了</a></div><div class="pull-right js-bill js-add-bill active" data-type="0"><span class="pull-right">我需要发票，<a class="c6 js-add-bill-info">去添加发票信息</a></span></div></div><div class="bill-info-box hide"><span class="invoice"></span><span class="name"></span><span class="mobile"></span><span class="address"></span></div></div><div class="pay-qr-box"><div class="price">应付金额&nbsp;&nbsp;<span>¥<span class="js-num">1888</span></span></div><img id="pay-pic" src=""><i class="icon-v icon-v-wx-p"></i><i class="icon-v icon-v-zfb"></i></div><a href="" class="pay-link" target="_blank">支付宝网页版</a></div><div class="buy-ticket-bill-box hide"><div class="title">发票信息</div><div class="infor-wrap"><label>抬头：<input id="invoice"></label></div><div class="infor-wrap"><label>收件人：<input id="name"></label></div><div class="infor-wrap"><label>手机号：<input id="mobile"></label></div><div class="infor-wrap"><label>邮寄地址：<input id="address"></label></div><div class="text-center"><a class="btn btn-vip-close active js-add-bill-info">返回</a><a class="btn btn-vip-save js-vip-bill-save">保存</a></div></div></div>';
                    f.showBoxContent("payVipModal", "开通会员", b), setTimeout(function () {
                        "use strict";
                        j()
                    }, 100)
                } else f.showMessagePrompt(a.error.message, "error")
            }
        }) : f.showMessagePrompt("请完整填写信息", "error")
    }), $("body").on("click", ".js-open-href", function () {
        0 == uid ? $(".login-link-box .js-login").trigger("click") : (d(), $("#pre_field .fld").each(function () {
            var a = $(this), b = a.attr("data-focus_id"), c = a.text();
            m.push({id: b, text: c})
        }), console.log("--focusIds: ", m))
    }), $(document).on("click", ".js-link-focus", function () {
        window.location.href = "/vip/member/focus"
    }), $(".v-c-b-banner").length > 0 && $(window).scroll(function () {
        $(window).scrollTop() < 450 || $(window).scrollTop() > $(document).height() - $(window).height() - 100 ? $(".vip-pay-f-box").hide() : $(".vip-pay-f-box").show()
    }), $(document).on("click", ".js-qxk-get-more", function () {
        var a = $(this), b = "/vip_action/articleList", c = {
            huxiu_hash_code: huxiu_hash_code,
            page: a.attr("data-cur_page")
        };
        a.hasClass("disabled") || (a.addClass("disabled"), $.ajax({
            type: "post",
            url: b,
            data: c,
            dataType: "json",
            async: !0,
            success: function (b) {
                if ("1" == b.result) {
                    $(".qxk-mod-info-flow").append(b.data);
                    var c = parseInt(a.attr("data-cur_page")) + 1;
                    a.attr("data-cur_page", c), b.cur_page == b.total_page && a.remove()
                } else f.showMessagePrompt(b.msg, "error");
                a.removeClass("disabled")
            },
            error: function (a) {
            }
        }))
    }), $(document).on("click", ".js-user-buy-table", function () {
        var b = $(this);
        a.async("modal_build", function (a) {
            f = a;
            var c = '<div class="table-vip-box"><div class="title">确定抢位吗？</div><p class="info">圆桌席位只面向真正需要的人士，抢位之前需要您慎重<br></p><div class="text-center"><a class="btn btn-table-link" data-dismiss="modal">取消</a><a class="btn btn-table-link active js-user-buy-table-submit" data-hid="' + b.attr("data-hid") + '" data-dismiss="modal">确定</a></div></div>';
            a.showBoxContent("tableVipModal", "", c)
        })
    }), $(document).on("click", ".js-user-buy-table-submit", function () {
        var a = $(this), b = "/vip_action/getTableSeat", c = {hid: a.attr("data-hid")};
        a.hasClass("disabled") || (a.addClass("disabled"), $.ajax({
            type: "post",
            url: b,
            data: c,
            dataType: "json",
            async: !0,
            success: function (b) {
                if ("1" == b.result) {
                    var c = '<div class="table-vip-box"><div class="title">' + b.data.title + '</div><p class="info">' + b.data.msg + '</p><div class="sm-title">' + b.data.msg1 + '</div><div class="text-center"><a class="btn btn-table-link active" data-dismiss="modal">朕知道了</a></div></div>';
                    if ("抢位成功" == b.data.title) {
                        var d = $(".js-user-buy-table");
                        d.addClass("disabled"), d.html("抢位成功"), d.removeClass("js-user-buy-table")
                    }
                    f.showBoxContent("tableVipModal", "", c)
                } else f.showMessagePrompt(b.msg, "error");
                a.removeClass("disabled")
            },
            error: function (a) {
            }
        }))
    })
});