
(function ($) {
    /**
     * 埋点统计方法调用;
     */
    var htmDC = function (t) {
        var detection = t.split(',');
        if (typeof(_hmt) != 'undefined') {
            _hmt.push(['_trackEvent', detection[0], detection[1], detection[2]]);
        }
    };
    var gaDC = function (t) {
        var detection = t.split(',');
        if (typeof(ga) != 'undefined') {
            ga('send', 'event', detection[0], detection[1], detection[2]);
        }
    };
    $.extend({
        myDetection: {
            /**
             * 百度统计  事件成功统计
             * @param t 统计代码 形如"首页,第一次,点击";
             * 用法 $.myDetection.htmDetection('第三方登录,点击,确定');
             *
             */
            htmDetection: function (t) {
                htmDC(t);
            },
            /**
             * ga统计  事件成功统计
             * @param t 统计代码 形如"首页,第一次,点击";
             * 用法 $.myDetection.gaDetection('第三方登录,点击,确定');
             *
             */
            gaDetection: function (t) {
                gaDC(t);
            }
        }
    });

    /**
     * 点击事件百度统计
     */
    $('body').on('click', ".js-hmt-detection", function () {
        var t = $(this);
        htmDC(t.attr('data-detection'));
    });
    /**
     * 点击事件ga统计
     */
    $('body').on('click', ".js-ga-detection", function () {
        var t = $(this);
        gaDC(t.attr('data-detection'));
    });

    $.extend({
        alertModal:function(data){
            var body = data.body;
            var html =
                '<div class="alert-shade"></div>'
                +'<div class="alert-content">'
                + data.body
                +'</div>'

            $('body').append(html);
        },
        hx_validation : {
            mobile:function(val){
                var myreg = /^((1[0-9])+\d{9})$/,flag = true;
                if(!myreg.test(val)){
                    flag = false;
                }
                return flag;
            }
        }
    });

})(jQuery);