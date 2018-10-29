define("modal_log", function (a, b, c) {
    var d = {}, e = navigator.userAgent.toLowerCase();
    try {
        d.name = -[1] ? e.indexOf("firefox") > 0 ? "firefox" : e.indexOf("chrome") > 0 ? "chrome" : window.opera ? "opera" : window.openDatabase ? "safari" : "unkonw" : "ie"
    } catch (f) {
    }
    try {
        d.version = "ie" == d.name ? e.match(/msie ([\d.]+)/)[1] : "firefox" == d.name ? e.match(/firefox\/([\d.]+)/)[1] : "chrome" == d.name ? e.match(/chrome\/([\d.]+)/)[1] : "opera" == d.name ? e.match(/opera.([\d.]+)/)[1] : "safari" == d.name ? e.match(/version\/([\d.]+)/)[1] : "0"
    } catch (f) {
    }
    try {
        d.shell = e.indexOf("360ee") > -1 ? "360极速浏览器" : e.indexOf("360se") > -1 ? "360安全浏览器" : e.indexOf("se") > -1 ? "搜狗浏览器" : e.indexOf("aoyou") > -1 ? "遨游浏览器" : e.indexOf("theworld") > -1 ? "世界之窗浏览器" : e.indexOf("worldchrome") > -1 ? "世界之窗极速浏览器" : e.indexOf("greenbrowser") > -1 ? "绿色浏览器" : e.indexOf("qqbrowser") > -1 ? "QQ浏览器" : e.indexOf("baidu") > -1 ? "百度浏览器" : "未知或无壳"
    } catch (f) {
    }
    var g = {
        platform: function () {
            var a = navigator.userAgent, b = (navigator.appVersion, ""), c = {
                android: a.indexOf("Android") > -1 || a.indexOf("Linux") > -1,
                iPhone: a.indexOf("iPhone") > -1,
                iPad: a.indexOf("iPad") > -1,
                windows: a.indexOf("Windows NT") > -1,
                mac: a.indexOf("Mac") > -1
            };
            return c.android ? b = "Android" : c.iPhone ? b = "iPhone" : c.iPad ? b = "iPad" : c.windows ? b = "windows" : c.mac && (b = "mac"), b
        }(), language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }, h = function () {
        var a = navigator.userAgent.toLowerCase();
        return "micromessenger" == a.match(/MicroMessenger/i) ? !0 : !1
    };
    // ({
    //     time: Date.parse(new Date) / 1e3,
    //     actionTypeId: "1",
    //     productId: productId,
    //     itemId: itemId,
    //     userId: uid,
    //     sourceId: 1,
    //     cookieId: $.cookie("huxiu_analyzer_wcy_id"),
    //     platform: g.platform,
    //     browser: h() ? "微信" : d.name,
    //     browserVersion: parseInt(d.version),
    //     resolution: window.screen.width + "x" + window.screen.height,
    //     url: window.location.href,
    //     signAna: signAna,
    //     signTime: signTime,
    //     channel: channel,
    //     related_article: relatedArticle
    // });
    // !function (a) {
    //     var b = a.sdk_url, c = a.name, d = window, e = document, f = "script", g = null, h = null;
    //     d.sensorsDataAnalytic201505 = c, d[c] = d[c] || function (a) {
    //             return function () {
    //                 (d[c]._q = d[c]._q || []).push([a, arguments])
    //             }
    //         };
    //     for (var i = ["track", "quick", "register", "registerPage", "registerOnce", "registerSession", "registerSessionOnce", "trackSignup", "trackAbtest", "setProfile", "setOnceProfile", "appendProfile", "incrementProfile", "deleteProfile", "unsetProfile", "identify"], j = 0; j < i.length; j++)d[c][i[j]] = d[c].call(null, i[j]);
    //     d[c]._t || (g = e.createElement(f), h = e.getElementsByTagName(f)[0], g.async = 1, g.src = b, h.parentNode.insertBefore(g, h), d[c]._t = 1 * new Date, d[c].para = a)
    // }({
    //     sdk_url: "/static/js/sensorsdata.sdk.js",
    //     name: "sa",
    //     show_log: !1,
    //     server_url: "https://sdata.huxiu.com/sa?project=huxiu_data"
    // }),
    //     sa.track("visit", {
    //         add_time: Date.parse(new Date) / 1e3,
    //         action_type_id: 1,
    //         product_id: parseInt(productId),
    //         item_id: parseInt(itemId),
    //         huxiu_user_id: parseInt(uid),
    //         source_id: 1,
    //         cookie_id: $.cookie("huxiu_analyzer_wcy_id"),
    //         platform: g.platform,
    //         resolution: window.screen.width + "x" + window.screen.height,
    //         url: window.location.href,
    //         channel: channel,
    //         related_article: relatedArticle,
    //         device_id: "",
    //         visitor_id: 0,
    //         refer: ""
    //     })
});