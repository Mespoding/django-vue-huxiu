!function () {
    var a = document.createElement("script");
    a.src = "//hm.baidu.com/hm.js?324368ef52596457d064ca5db8c6618e";
    var b = document.getElementsByTagName("script")[0];
    b.parentNode.insertBefore(a, b)
}(), function (a, b, c, d, e, f, g) {
    a.GoogleAnalyticsObject = e, a[e] = a[e] || function () {
            (a[e].q = a[e].q || []).push(arguments)
        }, a[e].l = 1 * new Date, f = b.createElement(c), g = b.getElementsByTagName(c)[0], f.async = 1, f.src = d, g.parentNode.insertBefore(f, g)
}(window, document, "script", "//www.google-analytics.com/analytics.js", "ga"), ga("create", "UA-64799684-1", "auto"), ga("send", "pageview"), function (a) {
    var b = function (a) {
        var b = a.split(",");
        "undefined" != typeof _hmt && _hmt.push(["_trackEvent", b[0], b[1], b[2]])
    }, c = function (a) {
        var b = a.split(",");
        "undefined" != typeof ga && ga("send", "event", b[0], b[1], b[2])
    };
    a.extend({
        myDetection: {
            htmDetection: function (a) {
                b(a)
            }, gaDetection: function (a) {
                c(a)
            }
        }, show_Messenger: function (a, b) {
            Messenger().post({message: a, type: "1" == b ? "success" : "error", showCloseButton: !0})
        }
    }), a(document).on("click", ".js-hmt-detection", function () {
        var c = a(this);
        b(c.attr("data-detection"))
    }), a(document).on("click", ".js-ga-detection", function () {
        var b = a(this);
        c(b.attr("data-detection"))
    })
}(jQuery);