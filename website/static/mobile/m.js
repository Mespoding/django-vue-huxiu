
/**
 * 消除移动端300毫秒的延迟点击事件
 */

FastClick.attach(document.body);

/**
 * 唤起APP
 */
function openAPP(href) {

    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        var loadDateTime = new Date();
        if($('#openAppType').length > 0){
            window.location.href = 'huxiu://com.huxiu.app/'+ $('#openAppType').val() +'/'+ itemId;
        }else{
            window.location.href = "huxiu://com.huxiu.app";
        }
        window.setTimeout(function () {
            var timeOutDateTime = new Date();
            if (timeOutDateTime - loadDateTime < 5000) {
                window.location.href = href;
            } else {
                window.close();
            }
        }, 2000);

    } else if (navigator.userAgent.match(/android/i)) {
        var loadDateTime = new Date();
        if($('#openAppType').length > 0){
            window.location.href = 'huxiu://com.huxiu.app/'+ $('#openAppType').val() +'/'+ itemId;
        }else{
            window.location.href = "huxiu://com.huxiu.app";
        }
        window.setTimeout(function () {
            var timeOutDateTime = new Date();
            if (timeOutDateTime - loadDateTime < 5000) {
                window.location.href = href;
            } else {
                window.close();
            }
        }, 1000);
    }
};
/**
 * 关闭评论框
 */
function closeContentModal(){
    $('.pl-textarea').val('');
    $('#pl-box,#topic-pl-box,#topic-dp-box,#brief-pl-box').stop().hide().removeAttr('data-type data-id');
    var top = -(parseInt($('.htmlBox').css('top').replace('px')));
    $('.htmlBox').css({'position':'relative','overflow':'auto','height':'auto',top:0});
    $('html, body').animate({
        scrollTop: top
    },0);
    $('.guide-box').css({'z-index':'1000'});
}
function openContentModal(){
    $('.htmlBox').css({'position':'fixed','top':-($(window).scrollTop())});
    $('.guide-box').css({'z-index':'0'});
}
/**
 * 首页轮播图
 */
if ($('#slider').length > 0) {
    var bullets = document.getElementById('position').getElementsByTagName('li');
    var slider = Swipe(document.getElementById('slider'), {
        auto: 5000,
        continuous: true,
        callback: function (pos) {

            var i = bullets.length;
            while (i--) {
                bullets[i].className = ' ';
            }
            bullets[pos].className = 'active';

        }
    });

    /**
     * 计算引导图高度
     */
    var h = window.innerWidth < 640 ? window.innerWidth / 16 * 9 : 640 / 16 * 9;

    if ($('.swipe-wrap li').length > 1) {
        $('.shuffling-ol').show();

        if(!!$('#list-content.list-content').length>0){
            var ol = document.querySelector('.shuffling-ol.ol-list');
            var olW = -(ol.offsetWidth/2);
            ol.style.marginLeft = olW+'px';
        }

    }

    $('.swipe-wrap').show();
}

/**
 * 判断浏览器类型
 * @type {{isUc, isWX, isQQ}}
 */
var bw = (function () {
    var UserAgent = navigator.userAgent.toLowerCase();
    return {
        isUc: /uc/.test(UserAgent), // UC浏览器
        isWX: /micromessenger/.test(UserAgent), // 微信内置浏览器
        isQQ: /qq/.test(UserAgent) // QQ浏览器
    };
}());

/**
 * 所有提示信息 提示层
 */
function messenger(html, type) {
    var t = $('#messenger');
    t.removeClass('error');
    if (type == 0) {
        t.addClass('error');
    }
    t.stop().slideDown(300).html(html);
    setTimeout(function () {
        t.stop().slideUp(300);
    }, 2000);
}

/**
 * 图片懒加载
 */
$("img.lazy").lazyload({placeholder: "/static_2016/images/bg.png", effect: "fadeIn", threshold: 300});

/**
 * 图片首页图片轮播
 */

var isPlatform = function () {
    //"您的位置是："+o.mPos.x +" "+ o.mPos.y ;
    var u = navigator.userAgent, app = navigator.appVersion;
    var name = '';
    var r = {
        // android终端或者uc浏览器
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
        // 是否为iPhone或者QQHD浏览器
        iPhone: u.indexOf('iPhone') > -1,
        // 是否iPad
        iPad: u.indexOf('iPad') > -1,
    };
    if (!!r.android) {
        name = 'Android';
    } else if (!!r.iPhone) {
        name = 'iPhone';
    } else if (!!r.iPad) {
        name = 'iPad';
    }
    return name;
};

/**
 * 打开菜单栏
 */
$('body').on('click', '.js-open-nav', function () {

    var t = $('nav');
    t.hide();
    $('.search-wrap').hide();
    if ($('.user-wrap').css('display') == 'block') {
        $('.htmlBox,body').removeAttr('style');
        t.stop().animate({'opacity': '0'}, 200, function () {
            t.hide();
        });
        $('.user-wrap').hide();
    } else {
        $('.htmlBox,body').css({'overflow': 'hidden','height':document.documentElement.clientHeight});
        t.show().animate({'opacity': '1'}, 300);
        $('.user-wrap').show()
    }
    $('.navbar-toggle').toggleClass('active');

    /*if($('#news').length > 0){
        $.myDetection.htmDetection('简讯,导航栏,点击');
        var oA = $('.user-wrap').find('a');
        $.each(oA,function(){
            var t = $(this);
            var a_href= t.attr('href') + '?f=n_brief_news';
            t.attr('href',a_href);
        })
    }*/
});

/**
 * 阻止事件冒泡 关闭侧边栏
 */
$('body').on('click', '.nav-box', function (event) {
    // 阻止事件冒泡
    event.stopPropagation();
});

/**
 * 关闭引导
 */
$('body').on('click', '.js-close-guide', function () {
    var t = $(this);
    t.parents('.guide-box').hide();
    var w_h =  $(window).scrollTop() - 55 +'px';
    if($(window).scrollTop() < 55){
        $('.placeholder-box').hide();
        $('body, html').animate({'scrollTop': 0}, 0);
    }
    if($(window).scrollTop() > 55){
        $('.placeholder-box').hide();
        $('body, html').animate({'scrollTop': w_h}, 0);
    }
    localStorage.setItem('guide', true);
});


/**
 * 判断是否是微信
 */

var isWeixin = function () {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
};

/***
 * 短趣展开关闭
 */
$('body').on('click', '.story-box ul li .story-title,.story-box ul li .info', function () {
    var t = $(this);
    if (t.parents('li').hasClass('active')) {
        $('.story-ul li').removeClass('active');
    } else {
        $('.story-ul li').removeClass('active');
        t.parents('li').addClass('active');
        $.myDetection.htmDetection('短趣-点开标题,点击,点击');
    }
});

/**
 * 打开关闭搜索框
 */
$('body').on('click', '.js-search-cancel', function () {
    var t = $('.search-wrap');
    $('nav').hide();
    $('.user-wrap').hide();
    $('.navbar-toggle').removeClass('active');
    if (t.css('display') == 'none') {
        $('nav').show().animate({'opacity': '1'}, 300);
        openContentModal();
        $('.search-wrap').show();
    } else {
        $('nav').stop().animate({'opacity': '0'}, 200, function () {
            t.hide();
        });
        $('.htmlBox').removeAttr('style');
        $('.search-wrap').hide();
    }
});


/**
 * 关闭侧边栏
 */
$('body').on('click', 'nav', function () {
    var t = $('nav');
    t.stop().animate({'opacity': '0'}, 300, function () {
        t.hide()
    });
    $('.htmlBox').removeAttr('style');
    $('.user-wrap').hide();
    $('.search-wrap').hide();
    $('.navbar-toggle').removeClass('active');
});


/**
 * 是否有引导
 */
var init = function () {

    //if (!localStorage.getItem('guide')) {
    //    $('.guide-box').show();
    //    $('.placeholder-box').show();
    //}
    if (!!isWeixin()) {
        $('.share-box').hide();
        $('.activity-share').hide();
        $('.activity-zzs').css({'padding-left':'0'});
        $('.btn-group ul li:last-child').hide();
        $('.exceptional-box').show();
        $('.btn-content ul li:nth-child(2)').hide();
        $('.btn-content ul li').css({'width': '50%'});
        $('.footer-icon-group .icon-share').hide();
        $('.footer-input-from').css({'padding': '7px 60px 0 15px'});
        $('.footer-one-input-from').css({'padding': '7px 15px 0 15px'});
    }else{
        $('.btn-group ul li:first-child').hide();
    }

    if(typeof(camcardcom) !="undefined"){
        if(camcardcom == true){
            $('header').remove();
        }
    }

    if ($('#comment').length > 0) {
        $('footer').hide();
    }

$("p[style='white-space: normal;']").remove();
    // if($('#article').length > 0){
    //     if(!!isWeixin()){
    //         $('header').remove();
    //     }
    // }

};
init();




/**
 * 打开意见反馈
 */
$('body').on('click', '.js-open-feedback', function () {
    $('#feedback-box').stop().slideToggle(100);
    setTimeout(function () {
        if ($('#feedback-box').css('display') == 'block') {
            openContentModal();
        } else {
            closeContentModal();
        }
    }, 200);
});

/**
 * 返回顶部
 */
$('body').on('click', '.js-go-to', function () {
    $('body,html').animate({'scrollTop': 0}, 200);
});

var navShareNative = function(){
    "use strict";
    if ($('#'+nav_share.id).length == 0) {

        var nav_share_modal = '<div class="nav-share" id="'+ nav_share.id +'">'
            +'<div class="share-wrap">'
            +'<div class="share-box">'
            +'<ul class="share-ul">'
            +'<li class="nativeShare weixin js-share-detection" data-f="?f='+ nav_share.share_wx_f +'"'
            +'data-detection="'+ nav_share.share_wx_d +'" data-app="weixin">'
            +'<a><i class="icon icon-wx"></i></a>'
            +'</li>'
            +'<li class="nativeShare js-share-detection" data-f="?f='+ nav_share.share_time_line_f +'" data-detection="'+ nav_share.share_time_line_d +'"'
            +'data-app="weixinFriend">'
            +'<a><i class="icon icon-timeLine"></i></a>'
            +'</li>'
            +'<li class="nativeShare js-share-detection" data-f="?f='+ nav_share.share_wb_f +'" data-detection="'+ nav_share.share_wb_d +'"'
            +'data-app="sinaWeibo">'
            +'<a><i class="icon icon-wb"></i></a>'
            +'</li>'
            +'<li class="nativeShare js-share-detection" data-f="?f='+ nav_share.share_qq_f +'" data-detection="'+ nav_share.share_qq_d +'"'
            +'data-app="QQ">'
            +'<a><i class="icon icon-qq"></i></a>'
            +'</li>'
            +'<li class="nativeShare js-share-detection" data-f="?f='+ nav_share.share_qq_zone_f +'" data-detection="'+ nav_share.share_qq_zone_d +'"'
            +'data-app="QZone">'
            +'<a><i class="icon icon-qqZone"></i></a>'
            +'</li>'
            +'<li></li>'
            +'</ul>'
            +'</div>'
            +'<div><i class="icon icon-white-close js-open-share"></i></div>'
            +'</div>'
            +'</div>';

        $('body').append(nav_share_modal);

        openContentModal();
        $('.nav-share').stop().animate({'opacity': '1'}, 300);
        if (!!bw.isUc) {
            var config = {
                url: nav_share.url,
                title: nav_share.title,
                desc: nav_share.desc,
                img: nav_share.share_img,
                img_title: ''
            };
            var share_obj = new nativeShare('nativeShare', config);
        }else{
            $('.share-ul li:nth-child(1),.share-ul li:nth-child(2),.share-ul li:nth-child(4),.share-ul li:nth-child(6)').hide();
        }

    } else {
        $('#'+nav_share.id).remove();
        closeContentModal();
    }
};

/**
 * UC QQ 浏览器打开分享
 *
 * 文章,活动,vip会员,圆桌,同意方法:  热议,热议评论(特殊处理),专题列表
 * 页面中添加 nav_share 参数;
 */
$('body').on('click', '.js-open-share, .js-open-article-share', function () {
    navShareNative();
});

/**
 * 热议 特殊处理
 */
$('body').on('click','.js-topic-share',function(){
    var t = $(this);
    nav_share = nav_share_detail;
    navShareNative();
});
/**
 * 热议评论分享  特殊处理
 */
$('body').on('click','.js-topic-comment-share',function(){
    var t = $(this);
    nav_share_comment.url = window.location.protocol + '//' + window.location.host +'/topic/comment/'+ t.attr('comment_id'),
    nav_share = nav_share_comment;
    navShareNative();
});


/**
 * UC,QQ浏览器统计
 * 分享方法,UC,QQ直接调用客户端,其他浏览器调用链接
 */
$('body').on('click', '.js-share-detection', function () {
    var t = $(this);
    $.myDetection.gaDetection(t.attr('data-detection'));
    if (!!bw.isUc) {
        $('#nav-share').hide();
        closeContentModal();
    }else{

        var data_id = 'aid',data_f_wb = '',data_f_qq = '', hxs_url;
        if(nav_share.share_type == 'article'){
            data_id = 'aid';
            data_f_wb = 'article_weibo_un';
            data_f_qq = 'article_QQZone_un';
        }else if(nav_share.share_type == 'topic'){
            data_id = 'topic_id';
            data_f_wb = 'reyi_weibo2';
            data_f_qq = 'reyi_zone2';
        }else if(nav_share.share_type == 'topic_comment'){
            data_id = 'topic_comment_id';
            data_f_wb = 'reyi_comment_weibo2';
            data_f_qq = 'reyi_comment_zone2';
        }else if(nav_share.share_type == 'activity'){
            data_id = 'hid';
            data_f_wb = 'active_weibo2';
            data_f_qq = 'active_zone2';
        }else if(nav_share.share_type == 'table'){
            data_id = 'hid';
            data_f_wb = 'table_weibo2';
            data_f_qq = 'table_QQZone2';
        }else if(nav_share.share_type == 'vip'){
            data_id = 'vip';
            data_f_wb = 'vip_weibo2';
            data_f_qq = 'vip_QQZone2';
        }else if(nav_share.share_type == 'vip_article'){
            data_id = 'vip_article';
            data_f_wb = 'vip_weibo2';
            data_f_qq = 'vip_QQZone2';
        }else if(nav_share.share_type == 'briefnews'){
            data_id = 'brief_news_id';
            data_f_wb = 'briefnews_weibo2';
            data_f_qq = 'briefnews_QQZone2';
        }else if(nav_share.share_type == 'special'){
            data_id = 'special_id';
            data_f_wb = 'm_special_weibo';
            data_f_qq = 'm_special_QQZone';
        }

        if (t.attr('data-app') == 'sinaWeibo') {
            hxs_url = "https://www.huxiu.com/action/share?huxiu_hash_code=" + huxiu_hash_code + '&'+ data_id +'=' + nav_share.data_id + '&des=hxs_tsina&f='+ data_f_wb;
            window.open(hxs_url);
        } else if (t.attr('data-app') == 'QZone') {
            hxs_url = "https://www.huxiu.com/action/share?huxiu_hash_code=" + huxiu_hash_code + '&'+ data_id +'=' + nav_share.data_id + '&des=hxs_qzone&f='+ data_f_qq;
            window.open(hxs_url);
        }
    }
});

if($('#article').length){
    if(!bw.isWX || !bw.isQQ){
        $('.share-ul li:nth-child(1),.share-ul li:nth-child(2),.share-ul li:nth-child(4),.share-ul li:nth-child(6)').hide();
    }
}

/**
 * 获取更多文章,首页,列表页
 */

$('body').on('click', '.js-more-article', function () {
    var t = $(this),
        url = '/maction/article_list',
        data = {
            catid: t.attr('data-catid'),
            page: parseInt(t.attr('data-cur_page')) + 1
        };

    if (!t.hasClass('disabled')) {
        t.html('加载中...');
        t.addClass('disabled');
        $.ajax({
            type: 'post',
            url: url,
            data: data,
            dataType: 'json',
            async: true,
            success: function (data) {
                if (data.result == '1') {
                    $('.article-append-box').append(data.data);
                    t.attr('data-cur_page', parseInt(t.attr('data-cur_page')) + 1);
                    if (data.total_page == (t.attr('data-cur_page'))) {
                        t.remove();
                    }
                    if (!!t.attr('data-detection')) {
                        $.myDetection.htmDetection(t.attr('data-detection'));
                    }
                    $("img.lazy").lazyload({placeholder: "/static_2016/images/bg.png", effect: "fadeIn", threshold: 300});
                } else {
                    messenger('没有更多文章了!');
                }
                t.removeClass('disabled');
                t.html('点击加载更多');
            }
        });
    }
});

/**
 * 获取更多的搜索
 */
$('body').on('click', '.js-more-search', function () {
    var t = $(this),
        url = '/maction/search',
        data = {
            s: $('#search-s').val(),
            page: parseInt(t.attr('data-cur_page')) + 1
        };

    if (!t.hasClass('disabled')) {
        t.html('加载中...');
        t.addClass('disabled');
        $.ajax({
            type: 'post',
            url: url,
            data: data,
            dataType: 'json',
            async: true,
            success: function (data) {
                if (data.result == '1') {
                    $('.search-append').append(data.data);
                    t.attr('data-cur_page', parseInt(t.attr('data-cur_page')) + 1);
                    if (data.total_page == (t.attr('data-cur_page'))) {
                        t.remove();
                    }
                }
                t.removeClass('disabled');
                t.html('点击加载更多');
            }
        });
    }
});

/**
 * 意见反馈
 */
$('body').on('click', '.js-submit-feedback-form', function () {
    var t = $(this),
        url = '/maction/feedback',
        data = {
            huxiu_hash_code: huxiu_hash_code,
            content: $('#content').val(),
            contact: $('#contact').val()
        };

    if ($('#content').val() == '') {
        messenger('反馈意见不能为空!', 0);
    } else {
        if (!t.hasClass('disabled')) {
            t.addClass('disabled');
            $.ajax({
                type: 'post',
                url: url,
                data: data,
                dataType: 'json',
                async: true,
                success: function (data) {
                    if (data.result == '1') {
                        messenger(data.msg);
                        setTimeout(function () {
                            $('#content').val('');
                            $('#contact').val('');
                            $('#feedback-box').stop().slideToggle(100);
                            $('.htmlBox').removeAttr('style');
                        }, 2000)
                    } else {
                        messenger(data.msg, 0);
                    }
                    t.removeClass('disabled');
                }
            });
        }
    }
});

function formatDate(now) {
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();

    return year + "-" + month + "-" + date;
}

/* 时间格式化（与现在的时间差, 例如2小时前，30秒前）*/
var getDateDiff = function (dateTime) {
    var now = parseInt(new Date().getTime() / 1000);
    var time = parseInt(Date.parse(new Date(dateTime)) / 1000);
    var diffSeconds = now - time;
    if (diffSeconds < 10) {
        return '刚刚';
    } else if (diffSeconds < 60) {
        return diffSeconds + '秒前';
    } else if (diffSeconds < 3600) {
        return parseInt(diffSeconds / 60) + '分钟前';
    } else if (diffSeconds < 86400) {
        return parseInt(diffSeconds / 3600) + '小时前';
    } else if (diffSeconds < 86400 * 30) {
        return parseInt(diffSeconds / 86400) + '天前';
    } else {
        return formatDate(new Date(dateTime));
    }
};

/**
 * 短趣点赞
 */
$('body').on('click', '.js-story-praise', function () {
    var t = $(this);
    $('.icon-like-prompt').find('.c1').html('+1');

    var appKey = "",
        scene = "",
        token = "";

    var url = 'https://analyzer.huxiu.com/discuss/agree',
        data = {
            appKey: appKey,
            scene: scene,
            token: token,
            itemId: $(this).attr("data-id"),
            product: 'story'
        };
    $.ajax({
        type: 'post',
        url: url,
        data: data,
        dataType: 'json',
        async: true,
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            if (!!data.success) {
                t.find('i').addClass('active');
                t.find('em').text(parseInt(t.find('em').text()) + 1);
                $.myDetection.htmDetection('短趣-点赞,点击,点击');
            } else {
                //messenger(data.message, 0);
            }
            t.removeClass('disabled');
        }
    });
});

/**
 * 获取更多的短趣
 */
$('body').on('click', '.js-get-more-story', function () {
    var t = $(this),
        url = 'story/more/' + t.attr('data-cur_page') + '/' + t.attr('data-list');

    if ($('.story-ul li').length == t.attr('data-index')) {

        window.location.href = '/story/index';

    } else {
        if (!t.hasClass('disabled')) {
            t.html('加载中...');
            t.addClass('disabled');
            $.ajax({
                type: 'post',
                url: url,
                dataType: 'json',
                async: true,
                success: function (data) {
                    if (data.result == '1') {

                        t.attr('data-cur_page', parseInt(t.attr('data-cur_page')) + 1);
                        var html = '';
                        $.each(data.data, function (index, d) {
                            html += '<li class="">'
                                + '<div class="story-title">' + d.title + '<span class="story-arrow"></span>'
                                + '</div>'
                                + '<div class="info">'
                                + d.content
                                + '<a href="' + d.source_url + '" target="_blank" class="outlink">详情&raquo;</a>'
                                + '</div>'
                                + ' <span class="story-praise js-story-praise" data-id="' + d.id + '"><i class="icon icon-pl-praise"></i><em>0</em></span>'
                                + '<div class="time">' + d.ftime + '</div>'
                                + '</li>';
                        });

                        $('.story-ul').append(html);
                        t.removeClass('disabled');
                        if ($('.story-ul li').length == t.attr('data-index')) {
                            t.html('进入短趣列表');
                        } else {
                            t.html('查看更多');
                        }
                        $.myDetection.htmDetection('首页-短趣-查看更多,点击,点击');

                    } else {
                        messenger(data.msg, 0);
                    }
                    t.removeClass('disabled');
                }
            });
        }
    }

});

/**
 * 搜索为空不提交
 */
var search_box = function () {
    if ($('#top-search').val() == '') {
        return false;
    }
};



/**
 * 获取历史信息
 */
if (!!$.cookie('huxiu_search_history')) {
    var search_history = $.cookie('huxiu_search_history').split(','); // 读取 cookie
    if (search_history.length > 0) {
        var history_html = '';
        $.each(search_history, function (index, _history) {
            history_html += '<li class="transition"><a href="/search.html?s=' + _history + '&f=history_search">' + _history + '</a></li>'
        });
        $('.search-history-act').show();
        $('.search-history').show().empty().append(history_html);
    }
}

/**
 * 点赞
 */
$('body').on('click', '.js-article-praise', function () {
    var t = $(this),
        url = '/maction/like',
        data = {
            huxiu_hash_code: huxiu_hash_code,
            aid: aid
        };
    if (!t.find('i').hasClass('active')) {
        if (!t.hasClass('disabled')) {
            t.addClass('disabled');
            $.ajax({
                type: 'post',
                url: url,
                data: data,
                dataType: 'json',
                async: true,
                success: function (data) {
                    if (data.result == '1') {
                        $('.js-article-praise').find('i').addClass('active');
                        $('.js-article-praise').addClass('active');
                        if ($('.praise-box').find('.number').length > 0) {
                            $('.praise-box').find('.number').html(parseInt($('.praise-box').find('.number').text()) + 1);
                        }
                        if($('.js-number').length > 0){
                            $('.js-number').show().html(parseInt($('.js-number').text()) + 1);
                        }
                    } else if (data.result == '-1') {
                        window.location.href = data.url;
                    } else {
                        messenger(data.msg, 0);
                    }
                    t.removeClass('disabled');
                }
            });
        }
    } else {
        messenger('您已经赞过了', 0);
    }
});
/**
 * 收藏
 */
$('body').on('click', '.js-article-collection', function () {
    var t = $(this),
        url = '/maction/favorite',
        data = {
            huxiu_hash_code: huxiu_hash_code,
            aid: aid
        };
    if (!t.find('i').hasClass('active')) {
        if (!t.hasClass('disabled')) {
            t.addClass('disabled');
            $.ajax({
                type: 'post',
                url: url,
                data: data,
                dataType: 'json',
                async: true,
                success: function (data) {
                    if (data.result == '1') {
                        t.find('i').addClass('active');
                    } else if (data.result == '-1') {
                        window.location.href = data.url;
                    } else {
                        messenger(data.msg, 0);
                    }
                    t.removeClass('disabled');
                }
            });
        }
    } else {
        messenger('您已经收藏过了', 0);
    }

});

/**
 * 点评打开关闭
 */
$('body').on('click', '.js-open-dp', function () {
    var t = $(this);
    if (!t.hasClass('active')) {
        t.addClass('active');
        t.html('收起<i class="icon icon-down"></i>');
        t.parents('.pl-info').find('.dp-box').show();
    } else {
        t.removeClass('active');
        t.html('展开<i class="icon icon-up"></i>');
        t.parents('.pl-info').find('.dp-box').hide();
        t.parents('.pl-info').find('.dp-wrap').find('.dp-box:first-child').show();
    }
});

/**
 * 打开评论框
 */
$('body').on('focus', '#pl-footer-input', function () {
    var t = $(this);
    t.blur();
    if (uid == 0) {
        localStorage.setItem('callback_url',window.location.href);//指定登录后跳转页面
        window.location.href = '/user/login';
    } else {
        openContentModal();
        $('#pl-box').stop().slideDown(100);
        $('.pl-textarea').focus();
        $('.pl-form-box').attr('data-type', 'pl');
    }
});

/**
 * 关闭评论框
 */
$('body').on('click', '.js-close-pl-form', function () {

    closeContentModal();
});

/**
 * 回复点评
 */
$('body').on('click', '.js-hf-dp', function () {
    if (uid == 0) {
        localStorage.setItem('callback_url',window.location.href);//指定登录后跳转页面
        window.location.href = '/user/login';
    } else {
        openContentModal();
        var t = $(this);
        $('#pl-box').stop().slideDown(100).attr('data-type', 'dp').attr('data-pid', t.parents('li').attr('data-pid'));
        var dpName = $.trim($(this).parents('.dp-box').find('.pl-info').find('.name').text());
        $('.pl-textarea').val('回复 @'+dpName+' ：');
    }

});
/**
 * 回复评论
 */
$('body').on('click', '.js-hf-pl', function () {
    if (uid == 0) {
        localStorage.setItem('callback_url',window.location.href);//指定登录后跳转页面
        window.location.href = '/user/login';
    } else {
        openContentModal();
        var t = $(this);
        $('#pl-box').stop().slideDown(100).attr('data-type', 'hf').attr('data-pid', t.parents('li').attr('data-pid'));
        var dpName = $(this).parents('li').find('.pl-info').find('.name').eq(0).text();
        $('.pl-textarea').val('回复 @' + dpName + ' ：');
    }
});

/**
 * 提交评论
 */
$('body').on('click', '.js-submit-pl-form', function () {
    var t = $(this), t2 = $('#pl-box'),
        url = t2.attr('data-type') == 'pl' ? '/maction/comment' : '/maction/recomment',
        data = t2.attr('data-type') == 'pl' ? {
            huxiu_hash_code: huxiu_hash_code,
            aid: aid,
            message: $('#pl-textarea').val()
        } : {
            huxiu_hash_code: huxiu_hash_code,
            message: $('#pl-textarea').val(),
            pid: t2.attr('data-pid')
        };

    if (!t.hasClass('disabled')) {
        t.addClass('disabled');
        $.ajax({
            type: 'post',
            url: url,
            data: data,
            dataType: 'json',
            async: true,
            success: function (data) {
                var vip_html = !!is_vip ? '<span class="icon-s"><i class="i-vip icon-vip"></i></span>' : '';
                if (data.result == '1') {
                    if (t2.attr('data-type') == 'pl') {
                        var img_url = $('.user-face-box').find('img').attr('src'),
                            name = $('.author-name').text(),
                            html = '<li data-pid="' + data.pid + '">'
                                + '<div class="face-box">'+ vip_html +'<img src="' + img_url + '"></div>'
                                + '<div class="pl-info">'
                                + '<div class="praise">'
                                + '<span class="js-pl-praise" data-type="agree"><i class="icon icon-pl-praise"></i><em>0</em></span>'
                                + '<span class="js-pl-praise" data-type="disagree"><i class="icon icon-pl-step"></i><em>0</em></span>'
                                + '</div>'
                                + '<div class="name"><a>' + name + '</a></div>'
                                + '<div class="title">' + data.message + '</div>'
                                + '<div class="hf-pl pull-right js-hf-pl">回复</div>'
                                + '<div class="time">刚刚</div>'
                                + '</div>'
                                + '</li>';

                        if ($('.no-content-box').length > 0) {
                            html = '<div class="pl-wrap pl-list-box"><ul class="pl-ul-box">' + html + '</ul></div>';

                            $('.no-content-box').before(html);
                            $('.no-content-box').remove();
                        } else {
                            $('.pl-ul-box').prepend(html);
                        }

                        if ($('#comment_type').val() == 'agree') {
                            $('.pl-list-title ul li:first-child').trigger('click');
                        }


                        $.myDetection.gaDetection('文章互动,新发表评论,点击');
                    } else {
                        var img_url = $('.user-face-box').find('img').attr('src'),
                            name = $('.author-name').text(),
                            html = '<div class="dp-box">'
                                + '<div class="face-box">'+ vip_html +'<img src="' + img_url + '">'
                                + '</div>'
                                + '<div class="pl-info">'
                                + '<div class="name">' + name + '</div>'
                                + '</div>'
                                + '<p class="pl-content">' + data.message + '</p>'
                                + '<div class="hf-pl pull-right js-hf-dp">回复</div>'
                                + '<div class="time">刚刚</div>'
                                + '</div>';

                        $.each($('.pl-ul-box li'), function (index, li) {
                            var t_li = $(this);
                            if (t_li.attr('data-pid') == t2.attr('data-pid')) {

                                if (t_li.find('.pl-info').find('.dp-wrap').length > 0) {
                                    t_li.find('.pl-info').find('.dp-wrap').prepend(html);
                                } else {
                                    html = '<div class="dp-wrap-title">点评</div><div class="dp-wrap">' + html + '</div>';
                                    t_li.find('.pl-info').find('.title').after(html);
                                }

                                return false;
                            }
                        });
                        $.myDetection.gaDetection('文章互动,新回复评论,点击');
                    }

                    setTimeout(function () {
                        $('#pl-box').stop().slideUp(100);
                        $('.pl-textarea').val('');
                        $('#pl-box').removeAttr('data-type');
                        $('#pl-box').removeAttr('data-id');
                        $('.htmlBox').removeAttr('style');
                    }, 2000);

                    messenger(data.msg, 1);
                } else {
                    messenger(data.msg, 0);
                }
                t.removeClass('disabled');
            }
        });
    }
});

/**
 * 评论的顶踩
 */
$('body').on('click', '.js-pl-praise', function () {

    if (uid == 0) {
        localStorage.setItem('callback_url',window.location.href);//指定登录后跳转页面
        window.location.href = '/user/login';
    } else {
        var t = $(this),
            url = t.attr('data-type') == 'agree' ? '/maction/agree' : '/maction/disagree',
            data = {
                huxiu_hash_code: huxiu_hash_code,
                pid: t.parents('li').attr('data-pid')
            };

        if (!t.hasClass('disabled')) {
            t.addClass('disabled');
            $.ajax({
                type: 'post',
                url: url,
                data: data,
                dataType: 'json',
                async: true,
                success: function (data) {
                    if (data.result == '1') {
                        t.find('em').text(parseInt(t.find('em').text()) + 1);
                        t.find('i').addClass('active');
                        if (t.attr('data-type') == 'agree') {
                            $.myDetection.gaDetection('文章互动,新顶评论,点击');
                        } else {
                            $.myDetection.gaDetection('文章互动,新踩评论,点击');
                        }

                    } else if (data.result == '-1') {
                        window.location.href = data.url;
                    } else {
                        var msg = '';
                        msg = '您已经赞或踩过了';
                        messenger(msg, 0);
                    }
                    t.removeClass('disabled');
                }
            });
        }
    }
});

/**
 * 获取更多评论
 */
var getMoreComment = function (backfn) {
    $.ajax({
        type: 'post',
        url: '/maction/comment_list',
        data: {
            huxiu_hash_code: huxiu_hash_code,
            aid: aid,
            page: parseInt($('#comment_page').val()) + 1,
            type: $('#comment_type').val()
        },
        dataType: 'json',
        async: true,
        success: function (data) {
            if (data.result == '1') {
                backfn(data);
                if (data.total_page == data.cur_page) {
                    $('.js-get-more-comment').hide();
                } else {
                    $('.js-get-more-comment').show();
                }
            } else {
                messenger(data.msg, 0);
            }
        }
    });
};
/**
 * 获取更多评论
 */
$('body').on('click', '.js-get-more-comment', function () {
    var t = $(this);
    if (!t.hasClass('disabled')) {
        t.html('加载中...');
        t.addClass('disabled');
        var getMore = function (data) {
            $('.pl-ul-box').append(data.data);
            t.removeClass('disabled');
            t.html('查看更多');
            if (data.total_page == data.cur_page) {
                t.hide();
            } else {
                t.show();
            }
        };
        getMoreComment(getMore);
        $('#comment_page').val(parseInt($('#comment_page').val()) + 1);
    }
});

/**
 * 标签页切换
 */
$('body').on('click', '.js-get-tab-comment', function () {
    var t = $(this);
    $('.pl-list-title ul li').removeClass('active');
    t.addClass('active');
    $('#comment_type').val(t.attr('data-type'));
    $('#comment_page').val(0);
    var getMore = function (data) {
        $('.pl-ul-box').empty().append(data.data);
    };
    getMoreComment(getMore);
    $('#comment_page').val(parseInt($('#comment_page').val()) + 1);

    if (t.attr('data-type') == 'dateline') {
        $.myDetection.htmDetection('文章评论-最新,点击,点击');
    } else {
        $.myDetection.htmDetection('文章评论-最热,点击,点击');
    }

});

/**
 * 返回顶部显示隐藏
 */
$(window).scroll(function () {
    if ($(window).scrollTop() > $(window).height()) {
        $('.goTo').stop().show();
    } else {
        $('.goTo').stop().hide();
    }

});


/*
*  列表获取更多
* */
$(document).on('click','.js-more-zt-article',function(){
    var t=$(this),
        postData = {
            catId: t.attr('data-catid'),
            page: parseInt(t.attr('data-cur_page')) + 1
        };
    if($('#special-article-box').length>0){
        var url='/special/ajaxGetMore';
        moreArticle(t,url,postData);
    }

    if($('#collection-article-box').length>0){
        var url='/collection/ajaxGetMore';
        moreArticle(t,url,postData);
    }

    if($('#channel-article-box').length>0){
        var url='/channel/ajaxGetMore';
        moreArticle(t,url,postData);
    }
});

var moreArticle=function(obj,url,postData){
    if (!obj.hasClass('disabled')) {
        obj.html('加载中...');
        obj.addClass('disabled');
        $.ajax({
            type: 'post',
            url: url,
            data: postData,
            dataType: 'json',
            async: true,
            success: function (data) {
                if (data.success == true) {
                    if (data.data.total_page <= postData.page) {
                        var html = '<div class="end-box"><span>END</span></div>';
                        obj.before(html).remove();
                    }

                    $('.zt-article-append-box').append(data.data.data);
                    obj.attr('data-cur_page', parseInt(obj.attr('data-cur_page')) + 1);

                    $("img.lazy").lazyload({placeholder: "/static_2016/images/bg.png", effect: "fadeIn", threshold: 1});

                    if (parseInt(obj.attr('data-cur_page')) == data.data.total_page) {
                        obj.remove();
                    }

                    if (!!obj.attr('data-detection')) {
                        $.myDetection.htmDetection(obj.attr('data-detection'));
                    }
                }else {
                    messenger('没有更多文章了!');
                }
                obj.removeClass('disabled').html('点击加载更多');
            }
        });
    }
};

document.addEventListener('touchmove',function(event){
    if($(window).scrollTop() > 0){
        $('.guide-box').css({'position': 'fixed'});
        if($('.guide-box').length > 0){
            $('.placeholder-box').height('55px');
        }
    }else{
        $('.guide-box').css({'position': 'relative'});
        if($('.guide-box').length > 0){
            $('.placeholder-box').height(0);
        }
    }
}, false);
