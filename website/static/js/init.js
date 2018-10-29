// define(function(require, exports, module){ // 模块代码});
// 注解：
// require 是一个方法，接受模块标识作为唯一参数，用来获取其他模块提供的接口；　
// exports 是一个对象，用来向外提供模块接口， 是 module.exports 的一个引用
// module 是一个对象，上面存储了与当前模块相关联的一些属性和方法。

define("init", function (require, exports) {
    window.console = window.console || function () {
            var a = {};
            return a.log = a.warn = a.debug = a.info = a.error = a.time = a.dir = a.profile = a.clear = a.exception = a.trace = a.assert = function () {
            }, a  // 这句话逗号前面给ａ赋值，逗号后面直接把ａ返回
        }(),
        require.async(["bootstrap", "jquery.cookie", "modal_build", "modal_login", "jquery.ellipsis.min.js"], function () {
            // console.log(b);
            window.location.href.indexOf("?r=") > 0 && $(".login-link-box .js-login").trigger("click");
            var a = function () {
                var a = window.screen.width, b = window.screen.height, c = window.devicePixelRatio;
                $.cookie("screen", JSON.stringify({w: a, h: b, d: c}), {expires: 1e6})
            };
            a(),
                localStorage.removeItem("loginBack"),
                localStorage.removeItem("callback_url"),
                $(".msubstr-row2").ellipsis({row: 3}),
                $(".msubstr-row3").ellipsis({row: 3}),
                $(".msubstr-row5").ellipsis({row: 7})
        }),
    $("#index").length > 0 && require.async(["modal_index"], function () {  // 主页
    }), $("#article").length > 0 && require.async(["modal_article"], function () {  // 文章列表页、详情页、标签下的文章页
    }), $("#activity").length > 0 && require.async(["modal_active"], function () {  // 活动
    }), $("#cy_center").length > 0 && require.async(["modal_cy"], function () {  // 创业白板
    }), $("#rumor_center").length > 0 && require.async(["modal_rumor"], function () {  // 传言
    }), $("#story_center").length > 0 && require.async(["modal_story"], function () {  // 早知道
    }), $("#modal_report").length > 0 && require.async(["modal_report"], function () {
    }), $("#modal_topic").length > 0 && require.async(["modal_topic"], function () {  // 热议
    }), $("#modal_rz").length > 0 && require.async(["modal_rz"], function () {
    }), $("#modal_tg").length > 0 && require.async(["modal_tg"], function () {  // 投稿页
    }), $("#modal_vip").length > 0 && require.async(["zoom-pic.js", "mustache.min.js", "modal_vip"], function () {  // 会员专享
    }), $("#per_center").length > 0 && require.async(["per_center"], function () {  // 个人中心页(包含自己和他人)
    }), $("#tags").length > 0 && require.async(["modal_tags"], function () {  // 全部标签页
    }),
    localStorage.getItem("index-nums-prompt") || $(".navbar-nav li:last-child em").show(),
    localStorage.getItem("index-topic-nums-prompt") || $(".nums-prompt-topic").show(),
    localStorage.getItem("guide") || $(".app-guide").find(".guide-prompt").show(),
    $(".login-box").length > 0 && $(".go-top").remove(),
        require.async(["modal_log"], function () {
        })
});