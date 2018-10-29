/*
 判断浏览器名称和版本
 目前只能判断:ie/firefox/chrome/opera/safari
 浏览器内核UA:UA;
 浏览器内核名称:NV.name;
 浏览器内核版本:NV.version;
 浏览器外壳名称:NV.shell;
 */
var NV = {};
var UA = navigator.userAgent.toLowerCase();
try {
    NV.name = !-[1,] ? 'ie' :
        (UA.indexOf("firefox") > 0) ? 'firefox' :
            (UA.indexOf("chrome") > 0) ? 'chrome' :
                window.opera ? 'opera' :
                    window.openDatabase ? 'safari' :
                        'unkonw';
} catch (e) {
}
;
try {
    NV.version = (NV.name == 'ie') ? UA.match(/msie ([\d.]+)/)[1] :
        (NV.name == 'firefox') ? UA.match(/firefox\/([\d.]+)/)[1] :
            (NV.name == 'chrome') ? UA.match(/chrome\/([\d.]+)/)[1] :
                (NV.name == 'opera') ? UA.match(/opera.([\d.]+)/)[1] :
                    (NV.name == 'safari') ? UA.match(/version\/([\d.]+)/)[1] :
                        (NV.name == 'UC') ? UA.match(/UCBrowser\/([\d.]+)/)[1] :
                            '0';
} catch (e) {
}
;
try {
    NV.shell = (UA.indexOf('360ee') > -1) ? '360极速浏览器' :
        (UA.indexOf('360se') > -1) ? '360安全浏览器' :
            (UA.indexOf('se') > -1) ? '搜狗浏览器' :
                (UA.indexOf('aoyou') > -1) ? '遨游浏览器' :
                    (UA.indexOf('theworld') > -1) ? '世界之窗浏览器' :
                        (UA.indexOf('worldchrome') > -1) ? '世界之窗极速浏览器' :
                            (UA.indexOf('greenbrowser') > -1) ? '绿色浏览器' :
                                (UA.indexOf('qqbrowser') > -1) ? 'QQ浏览器' :
                                    (UA.indexOf('baidu') > -1) ? '百度浏览器' :
                                        '未知或无壳';
} catch (e) {
}
;


var Terminal = {
    // 辨别移动终端类型
    platform: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        var name = '';
        var r = {
            // android终端或者uc浏览器
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
            // 是否为iPhone或者QQHD浏览器
            iPhone: u.indexOf('iPhone') > -1,
            // 是否iPad
            iPad: u.indexOf('iPad') > -1,
            // 是否为windows
            windows: u.indexOf('Windows NT') > -1,
            // 是否为mac
            mac: u.indexOf('Mac') > -1
        };

        if (!!r.android) {
            name = 'Android';
        } else if (!!r.iPhone) {
            name = 'iPhone';
        } else if (!!r.iPad) {
            name = 'iPad';
        } else if (!!r.windows) {
            name = 'windows';
        } else if (!!r.mac) {
            name = 'mac';
        }

        return name;
    }(),
    // 辨别移动终端的语言：zh-cn、en-us、ko-kr、ja-jp...
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};


/**
 * post log 日志
 */
var postLog = function (url, data) {
    $.ajax({
        type: 'post',
        //url: $(".analyzer-server-url").val() + '/log/send',
        url: 'https://analyzer.huxiu.com/log/send',
        data: data,
        dataType: 'json',
        async: true,
        success: function (data) {
        },
        error: function (e) {
        }
    });
};

/**
 * log
 */
var isWeixin = function () {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
};
var data = {
    time: Date.parse(new Date()) / 1000,
    actionTypeId: '1',
    productId: productId,
    itemId: itemId,
    userId: uid,
    sourceId: 2,
    cookieId: $.cookie('huxiu_analyzer_wcy_id'), // 读取 cookie
    platform: Terminal.platform,
    browser: NV.name,
    browserVersion: parseInt(NV.version),
    resolution: window.screen.width + 'x' + window.screen.height,
    url: window.location.href,
    signAna: signAna,
    signTime: signTime,
    channel:channel,
    related_article:typeof(relatedArticle)== "undefined" ? '' : relatedArticle
};
//if (itemId != '0' && productId != '0') {
//    postLog('/log/send', data);
//}

(function(para) {
    var p = para.sdk_url, n = para.name, w = window, d = document, s = 'script',x = null,y = null;
    w['sensorsDataAnalytic201505'] = n;
    w[n] = w[n] || function(a) {return function() {(w[n]._q = w[n]._q || []).push([a, arguments]);}};
    var ifs = ['track','quick','register','registerPage','registerOnce','registerSession','registerSessionOnce','trackSignup', 'trackAbtest', 'setProfile','setOnceProfile','appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify'];
    for (var i = 0; i < ifs.length; i++) {
        w[n][ifs[i]] = w[n].call(null, ifs[i]);
    }
    if (!w[n]._t) {
        x = d.createElement(s), y = d.getElementsByTagName(s)[0];
        x.async = 1;
        x.src = p;
        y.parentNode.insertBefore(x, y);
        w[n]._t = 1 * new Date();
        w[n].para = para;
    }
})({
    sdk_url: '/static_2016/js/sensorsdata.sdk.js',
    name: 'sa',
    show_log:false,
    server_url:'https://sdata.huxiu.com/sa?project=huxiu_data'
});

//visit事件标记
sa.track('visit',{
    add_time: Date.parse(new Date()) / 1000,
    action_type_id: 1,
    product_id: parseInt(productId),
    item_id: parseInt(itemId),
    huxiu_user_id: parseInt(uid),
    source_id: 2,
    cookie_id: $.cookie('huxiu_analyzer_wcy_id'), // 读取 cookie
    platform: Terminal.platform,
    //browser: !!isWeixin() ? '微信' : NV.name,
    //browser_version: parseInt(NV.version),
    resolution: window.screen.width + 'x' + window.screen.height,
    url: window.location.href,
    channel:channel,
    related_article:typeof(relatedArticle)== "undefined" ? '' : relatedArticle,
    device_id:'',
    visitor_id:0,
    refer:''
});
