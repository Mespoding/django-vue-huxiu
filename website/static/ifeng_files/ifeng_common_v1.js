function getScript_cds(c, d) {
    var a = document.getElementsByTagName("head")[0];
    var b = document.createElement("script");
    b.setAttribute("src", c);
    b.onload = b.onreadystatechange = function () {
        if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
            a.removeChild(b);
            if (d) {
                d()
            }
        }
    };
    a.appendChild(b)
}
function getElementsByClassName(b, d, e) {
    var f = b.getElementsByTagName(d);
    var a = [];
    for (var c = 0; c < f.length; c++) {
        if ((" " + f[c].className + " ").indexOf(" " + e + " ") != -1) {
            a.push(f[c])
        }
    }
    return a
}
function ifeng_round(b, c) {
    var a = 1;
    a = Math.pow(10, c);
    return parseInt(b * a + 0.5) / a
}
function getQueryString(a) {
    var b = new RegExp("(^|\\?|&)" + a + "=([^&]*)(\\s|&|$)", "i");
    if (b.test(location.href)) {
        return RegExp.$2.replace(/\+/g, " ")
    }
    return ""
}
var CookieManager = {
    getExpiresDate: function (d, a, c) {
        var b = new Date();
        if (typeof d == "number" && typeof a == "number" && typeof c == "number") {
            b.setDate(b.getDate() + parseInt(d));
            b.setHours(b.getHours() + parseInt(a));
            b.setMinutes(b.getMinutes() + parseInt(c));
            return b.toGMTString()
        }
    }, _getValue: function (b) {
        var a = document.cookie.indexOf(";", b);
        if (a == -1) {
            a = document.cookie.length
        }
        return unescape(document.cookie.substring(b, a))
    }, get: function (d) {
        var b = d + "=";
        var f = b.length;
        var a = document.cookie.length;
        var e = 0;
        while (e < a) {
            var c = e + f;
            if (document.cookie.substring(e, c) == b) {
                return this._getValue(c)
            }
            e = document.cookie.indexOf(" ", e) + 1;
            if (e == 0) {
                break
            }
        }
        return ""
    }, set: function (b, d, a, f, c, e) {
        document.cookie = b + "=" + escape(d) + ((a) ? "; expires=" + a : "") + ((f) ? "; path=" + f : "") + ((c) ? "; domain=" + c : "") + ((e) ? "; secure" : "")
    }, remove: function (a, c, b) {
        if (this.get(a)) {
            document.cookie = a + "=" + ((c) ? "; path=" + c : "") + ((b) ? "; domain=" + b : "") + "; expires=Thu, 01-Jan-70 00:00:01 GMT"
        }
    }, clear: function () {
        var b = document.cookie.split(";");
        for (var a = 0; a < b.length; a++) {
            var c = b[a].split("=")[0]
        }
        if (c == "ProductListIds") {
            this.remove(c)
        }
    }
};