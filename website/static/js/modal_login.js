define("modal_login", function (a, b, c) {
    var d;
    a.async("modal_build", function (a) {
        d = a
    });  // d 接收 modal_build中暴露的属性或方法集合

    //
    // var e = function () { // 生成国家下拉列表
    //     $.ajax({
    //         type: "post", url: "/user_action/countryList/", dataType: "html", async: !0, success: function (a) {                // var b = "";
    //             // for (var c in a.data)" " != c && $.each(a.data[c], function (a, c) {
    //             //     b += '<li data-code="' + c.country + '"><span class="name">' + c.name + '</span><span class="code">' + c.country + "</span></li>"
    //             // });
    //             $(".country-ul").empty().append(a)
    //         }, error: function (a) {
    //             "use strict";
    //             console.log(a)
    //         }
    //     })
    // };

    // $(document).on("click", ".js-label-select", function () {  // 点击手机号前缀按钮，展开或收缩下拉列表
    //     $(".country-box").slideToggle(200)
    // // });
    // $(document).on("click", ".js-country-ul li", function () {  // 点击下拉列表中某项，前缀更改
    //     var a = $(this), b = a.find(".code").text();
    //     $(".label-select-box span").text(b), $(".country-box").slideToggle(200)
    // });

    var f = function () {  // 极速注册：手机号+短信验证方式
            var a = "";
            return a = '<div class="user-register-box"><div class="login-form sms-box"><label class="login-label col-xs-label transition"><input id="sms_username" class="login-input username" placeholder="手机号"><span class="error-box">请输入账号</span></label><label class="login-label captcha"><input id="sms_captcha" class="login-input" placeholder="输入6位验证码" maxlength="6"><span class="error-box">请输入验证码</span><span class="js-btn-captcha btn-captcha">获取验证码</span></label><a class="js-label-select label-select-box text-center"><span class="js-country-sms">+86</span></a><div class="country-box"><ul class="country-ul js-country-ul"></ul></div><button class="js-btn-sms-login btn-login">注&nbsp;册</button></div><div class="js-user-login register-text">已有账号，立即登录</div></div>'
        },
        g = function () {  // 显示极速验证码
            d.loadScript("https://static.geetest.com/static/tools/gt.js", function () {
                var a = function (a) {
                    i = a, a.appendTo(".geetest_login_box")
                };
                initGeetest({gt: "a5a3b6cdb1b821dd0e3033efa7ebc2e9", challenge: data.challenge, product: ""}, a)
            })
        },
        h = function () {  // 绑定验证用户名的方法
            $(".login-username,.reset-username").bind("input propertychange", function () {
                var a = $(this), b = a.val(), c = $(".login-label-select"), d = /^(([0-9])+\d{5})$/;
                d.test(b) ? (a.parent(".login-label").addClass("col-xs-label"), c.removeClass("hide")) : (a.parent(".login-label").removeClass("col-xs-label"), c.addClass("hide"))
            })
        };

    // 打开登录窗口
    $(document).on("click", ".js-login", function () {
        var a = $(this);
        a.hasClass("disabled") || (a.addClass("disabled"),  // 打开窗口前，使登录按钮不可用，防止重复点击
            $.ajax({
                type: "post",
                url: "/user_action/loginHtml/",
                dataType: "json",
                async: !0,
                success: function (b) {
                    if (a.removeClass("disabled"), b.success) {
                        var c = b.data;
                        d.showBoxContent("login-modal", "登录云酒", c), h(), $(".geetest_login_box").length > 0 && g()
                    } else d.showMessagePrompt(b.msg, "error")
                }
            }))
    });

    // 打开注册窗口
    $(document).on("click", ".js-register", function () {
        var a = f();
        d.showBoxContent("login-modal", "极速注册", a)
    });

    // 登陆后跳转到回调页面
    var i, j = function (a) {
        if (a.success) {
            var b = $.cookie("hx_callback_url"), c = localStorage.getItem("callback_url");
            c ? (localStorage.removeItem("callback_url"), window.location.href = c) : b ? window.location.href = b : window.location.href = "/"
        } else d.showMessagePrompt(a.error.message, "error")
    };

    // 普通登录操作
    if ($(document).on("click", ".js-btn-login", function () {
            var a = $(this), b = "/user_action/login/", c = {
                huxiu_hash_code: huxiu_hash_code,
                username: $("#login_username").val(),
                password: $("#login_password").val(),
                autologin: 1 == $("#autologin").prop("checked") ? "1" : "0",
                country: $(".js-country-user").text(),
                geetest_challenge: $(".geetest_login_box .geetest_challenge").val(),
                geetest_validate: $(".geetest_login_box .geetest_validate").val(),
                geetest_seccode: $(".geetest_login_box .geetest_seccode").val()
            };
            return "" == $.trim(c.username) ? (d.showMessagePrompt("帐号不能为空", "error"), !1) : "" == $.trim(c.password) ? (d.showMessagePrompt("密码不能为空", "error"), !1) : void(a.hasClass("disabled") || (a.addClass("disabled"), $.ajax({
                type: "post",
                url: b,
                data: c,
                dataType: "json",
                async: !0,
                success: function (b) {
                    b.success ? (d.showMessagePrompt(b.msg), j(b)) : (d.showMessagePrompt(b.error.message, "error"),
                        "geetest" == b.error.type && void 0 == c.geetest_challenge ? ($(".login-operation").before('<div class="geetest_login_box"></div>'), g()) : void 0 != c.geetest_challenge && i.refresh()), a.removeClass("disabled")
                }
            })))
        }),

            // 切换到短信验证窗口
            $(document).on("click", ".js-open-sms-login", function () {
                $(".country-box").slideUp(100),
                    $(".username-box").hasClass("hide") ? ($(".username-box").removeClass("hide"), $(".sms-box").addClass("hide")) : ($(".username-box").addClass("hide"), $(".sms-box").removeClass("hide"))
            }),

            // 获取短信验证码
            $(document).on("click", ".js-btn-captcha", function () {
                function a(c) {
                    var d = !0;
                    // 倒计时结束时，才可以重新点击验证码按钮
                    0 == g ? (c.empty().html("获取验证码"), g = 59, d = !1, b.removeClass("disabled")) : (c.empty().html('<span class="number">' + g + "</span>s后重发"), g--), d && setTimeout(function () {
                        a(c)
                    }, 1e3)
                }

                var b = $(this), c = $("#sms_username").val(), e = $(".js-country-sms").text(), f = /^(([0-9])+\d{5})$/;
                if (!f.test(c))return d.showMessagePrompt("请输入正确的手机号", "error"), !1;
                if (!b.hasClass("disabled")) {
                    b.addClass("disabled");
                    var g = 59;
                    $.ajax({
                        type: "post",
                        url: "/user_action/resetCaptcha/",
                        data: {username: c, country: e, huxiu_hash_code: huxiu_hash_code},
                        dataType: "json",
                        async: !0,
                        success: function (c) {
                            c.success ? (a(b), d.showMessagePrompt(c.data.message)) : (d.showMessagePrompt(c.error.message, "error"), b.removeClass("disabled"))
                        }
                    })
                }
            }),

            // 短信登录
            $(document).on("click", ".js-btn-sms-login", function () {
                var a = $(this), b = "/user_action/loginSms/", c = {
                    username: $("#sms_username").val(),
                    country: $(".js-country-sms").text(),
                    captcha: $("#sms_captcha").val()
                };
                a.hasClass("disabled") || (a.addClass("disabled"), $.ajax({
                    type: "post",
                    url: b,
                    data: c,
                    dataType: "json",
                    async: !0,
                    success: function (b) {
                        j(b), a.removeClass("disabled")
                    }
                }))
            }),

            // link：极速登录
            $(document).on("click", ".js-open-register", function () {
                var a = f(), b = $("#login-modal").find(".modal-body");
                $(".user-login-box").remove(), b.append(a), b.find(".modal-alert-title").html("极速注册")
            }),

            // link：已有账号，直接登录
            $(document).on("click", ".js-user-login", function () {
                $.ajax({
                    type: "post",
                    url: "/user_action/loginHtml/",
                    dataType: "json",
                    data: {1: 1},
                    async: !0,
                    success: function (a) {
                        if (a.success) {
                            var b = a.data, c = $("#login-modal").find(".modal-body");
                            $(".user-register-box").remove(), c.append(b),
                                c.find(".modal-alert-title").html("登录云酒"), h(),
                            $(".geetest_login_box").length > 0 && g()
                        } else d.showMessagePrompt(a.msg, "error")
                    }
                })
            }),

            // 微信扫码登录
            $(document).on("click", ".js-login-switch", function () {
                var a = $(this), b = $(".account-box"), c = $(".wx-box");
                if (a.hasClass("active"))
                    b.removeClass("hide"), c.addClass("hide"), a.removeClass("active");
                else {
                    new WxLogin({
                        id: "login_container",  // 扫码登录页面显示的位置
                        appid: "wx9719d921e921f2a9",
                        scope: "snsapi_login",
                        redirect_uri: "http://www.yunjiuwang.com.cn/complete/weixin/",
                        state: parseInt(1e5 * Math.random()),
                        style: "",
                        href: ""
                    });
                    b.addClass("hide"), c.removeClass("hide"), a.addClass("active")
                }
            }),


        $(".retrieve-password-box").length > 0) {  // 绑定找回密码的验证方法
        h();
        var k = $(".retrieve-password-box"), l = $(window).innerHeight() - 250 > 400 ? $(window).innerHeight() - 250 : 400;
        k.css({height: l})
    }

    // 重置验证码
    $(document).on("click", ".js-reset-captcha,.js-bind-captcha", function () {
        function a(c) {
            var d = !0;
            0 == f ? (c.empty().html("获取验证码"), f = 59, d = !1, b.removeClass("disabled")) : (c.empty().html('<span class="number">' + f + "</span>s后重发"), f--), d && setTimeout(function () {
                a(c)
            }, 1e3)
        }

        var b = $(this), c = b.hasClass("js-reset-captcha") ? "/user_action/resetCaptcha/" : "/user_action/bindCaptcha/", e = b.hasClass("js-reset-captcha") ? {
            username: $("#reset_username").val(),
            country: $(".js-reset-country-user").text()
        } : {username: $(".bind-username").val(), country: $(".js-bind-country-user").text()};
        if (0 == e.username.length)return d.showMessagePrompt("请输入手机号／邮箱／云酒账号", "error"), !1;
        if (!b.hasClass("disabled")) {
            b.addClass("disabled"), b.addClass("disabled");
            var f = 59;
            $.ajax({
                type: "post", url: c, data: e, dataType: "json", async: !0, success: function (c) {
                    c.success ? (a(b), d.showMessagePrompt(c.data.message)) : d.showMessagePrompt(c.error.message, "error")
                }
            })
        }
    }),

        // 修改密码
        $(document).on("click", ".js-reset-password", function () {
            var a = $(this), b = "/user_action/resetPassword/", c = {
                username: $("#reset_username").val(),
                country: $(".js-reset-country-user").text(),
                password: $(".reset-password1").val(),
                password2: $(".reset-password2").val(),
                captcha: $(".reset-captcha").val()
            };
            return 0 == c.username.length ? (d.showMessagePrompt("请输入手机号／邮箱／云酒账号", "error"), !1) : $.trim(c.password) != $.trim(c.password2) ? (d.showMessagePrompt("请输入相同的密码", "error"), !1) : void(a.hasClass("disabled") || (a.addClass("disabled"), $.ajax({
                type: "post",
                url: b,
                data: c,
                dataType: "json",
                async: !0,
                success: function (b) {
                    b.success ? (d.showMessagePrompt("密码修改成功"), window.location.href = "/") : d.showMessagePrompt(b.error.message, "error"), a.removeClass("disabled")
                }
            })))
        }),

        // 第三方验证后的登陆，可以不用第三方的用户名
        $(document).on("click", ".js-user-register-oauth", function () {
            var a = $(this), b = "/user_action/registerOauth/", c = {
                bid: $("#bid").val(),
                username: $(".three-username").val(),
            };
            a.hasClass("disabled") || (a.addClass("disabled"), $.ajax({
                type: "post",
                url: b,
                data: c,
                dataType: "json",
                async: !0,
                success: function (b) {
                    b.success ? (d.showMessagePrompt(b.data.message), window.location.href = "/") : d.showMessagePrompt(b.error.message, "error"), a.removeClass("disabled")
                }
            }))
        }),

        // 打开关联界面
        $(document).on("click", ".js-associated-huxiu", function () {
            var a = ($(this), $(".three-associated")), b = $(".three-login");
            a.hasClass("hide") ? (a.addClass("hide"), b.removeClass("hide")) : (a.removeClass("hide"), b.addClass("hide"))
        }),

        // 关联第三方账号
        $(document).on("click", ".js-bind-huxiu", function () {
            var a = $(this), b = {
                bid: $("#bid").val(),
                username: $(".bind-username").val(),
                password: $(".bind-password").val(),
                captcha: $(".bind-captcha").val(),
                country: $(".js-bind-country-user").text()
            };
            a.hasClass("disabled") || (a.addClass("disabled"), $.ajax({
                type: "post",
                url: "/user_action/bind/",
                data: b,
                dataType: "json",
                async: !0,
                success: function (b) {
                    b.success ? (d.showMessagePrompt(b.data.message), window.location.href = "/") : d.showMessagePrompt(b.error.message, "error"), a.removeClass("disabled")
                }
            }))
        }),

        // 绑定手机号
        $(document).on("click", ".js-mobile-bind-huxiu", function () {
            var a = $(this), b = $(".bind-username");
            a.hasClass("active") ? ($(".password-box,.js-mobile").addClass("hide"), $(".captcha-box,.js-username,.bind-label-select").removeClass("hide"), b.attr("placeholder", "手机号"), b.parent(".login-label").addClass("col-xs-label")) : ($(".password-box,.js-mobile").removeClass("hide"), $(".captcha-box,.js-username,.bind-label-select").addClass("hide"), b.attr("placeholder", "用户名"), b.parent(".login-label").removeClass("col-xs-label"))
        }),

        // 更改用户名
        $(".bind-username").bind("input propertychange", function () {
            var a = $(this), b = a.val(), c = $(".bind-label-select"), d = /^(([0-9])+\d{5})$/;
            d.test(b) ? (a.parent(".login-label").addClass("col-xs-label"), c.removeClass("hide")) : (a.parent(".login-label").removeClass("col-xs-label"), c.addClass("hide"))
        })
        , $(".bind-username").length > 0 && e()
});