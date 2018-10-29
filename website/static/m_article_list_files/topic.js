
var goScrollTop = function(id){
    var offset = 170;
    if ($('#'+id).length > 0) {
        var target = $('#'+id).offset().top - offset;
        $('html, body').animate({
            scrollTop: target
        }, 500);
    }
};

if(!localStorage.getItem('nums_topic')){
    $('.nums-nav-topic,.nums').show();
}

$('body').on('click','.js-hide-nums',function(){
    localStorage.setItem('nums_topic',true);
    window.location.href = '/topic_list';
});

/**
 * 获取更多topic
 */
$('body').on('click','.js-more-topic',function(){
    var t = $(this),
        url = '/topic_list',
        data = {
            page: parseInt(t.attr('data-cur_page'))
        };
    if(!t.hasClass('disabled')){
        t.addClass('disabled');
        $.ajax({
            type: 'post',
            url: url,
            data: data,
            dataType: 'json',
            async: true,
            success: function (data) {
                $('.topic-section-wrap').append(data);
                t.attr('data-cur_page',parseInt(t.attr('data-cur_page')) + 1);
                t.removeClass('disabled');
                if(data.length < 20){
                    t.remove();
                }
            },
            error: function (e) {

            }
        });
    }
});

/**
 * 热议收藏
 */
$('body').on('click','.js-topic-collect',function(){
    if(uid == 0){
        window.location.href = '/user/login';
    }else{
        var t = $(this),
            url = t.hasClass('active') ? '/topic/delete_favorite' : '/topic/add_favorite',
            data = {
                is_ajax:1,
                topic_id:$('#topicId').val()
            };
        if(!t.hasClass('disabled')){
            t.addClass('disabled');
            $.ajax({
                type: 'post',
                url: url,
                data: data,
                dataType: 'json',
                async: true,
                success: function (data) {
                    if(data.result == 1){
                        var num = parseInt($('.js-topic-num').text());
                        if(!t.hasClass('active')){
                            t.html('取消关注');
                            $.myDetection.gaDetection('关注,话题详情页,话题关注-关注成功');
                            $('.js-topic-num').html(num + 1);
                        }else{
                            t.html('关注话题');
                            $('.js-topic-num').html(num - 1);
                        }
                        t.toggleClass('active');
                    }else{

                        messenger(data.msg);
                    }
                    t.removeClass('disabled');
                },
                error: function (e) {

                }
            });
        }
    }
});


/**
 * 打开评论框
 */
$('body').on('click', '#topic-pl-footer-input', function () {

    var t = $(this);
    t.blur();
    if (uid == 0) {
        window.location.href = '/user/login';
    } else {
        openContentModal();
        $('#topic-pl-box').stop().show();
        $('.pl-form-box').attr('data-type', 'topic-pl');
        $('.pl-textarea').attr('placeholder','在这里说点什么吧').focus();
    }
});

/**
 * 打开点评框
 */
$('body').on('click', '#topic-dp-input', function () {

    var t = $(this);
    t.blur();
    if (uid == 0) {
        window.location.href = '/user/login';
    } else {
        openContentModal();
        $('#topic-dp-box').stop().show();
        $('.pl-form-box').attr('data-type', 'topic-dp');
        $('.pl-textarea').attr('placeholder','在这里说点什么吧').focus();
    }
});

/**
 * 打开点评 点击事件
 */
$('body').on('click','.js-topic-dp',function(){
    var t = $(this);
    if (uid == 0) {
        window.location.href = '/user/login';
    } else {
        openContentModal();
        $('#topic-pl-box').stop().show().attr({
            'data-type':'topic-dp',
            'data-touid':t.attr('data-uid'),
            'data-id': t.attr('data-id')
        });
        $('.pl-textarea').attr('placeholder','在这里说点什么吧').focus();
    }
});
/**
 * 打开回复点评 点击事件
 */
$('body').on('click','.js-topic-hf-dp',function(){
    var t = $(this);
    if (uid == 0) {
        window.location.href = '/user/login';
    } else {
        openContentModal();
        $('#topic-dp-box').stop().show().attr({
            'data-type':'topic-hf',
            'data-touid': t.attr('data-id')
        });
        $('.pl-textarea').focus().attr('placeholder','回复  '+ t.attr('data-name'));

    }
});

/**
 * 获取评论列表
 */

/**
 * 获取更多评论
 */
var getMoreTopicComment = function (backfn) {
    $.ajax({
        type: 'post',
        url: '/topic/detail',
        data: {
            huxiu_hash_code: huxiu_hash_code,
            is_ajax:1,
            topic_id: $('#topicId').val(),
            page: parseInt($('#comment_page').val()) + 1,
            sort_type: $('#comment_type').val()
        },
        dataType: 'json',
        async: true,
        success: function (data) {
            if (data.result == '1') {
                backfn(data);
            } else {
                //messenger(data.msg, 0);
            }
        }
    });
};
/**
 * 标签页切换
 */
$('body').on('click', '.js-topic-tab-comment', function () {
    var t = $(this);
    $('.pl-list-title ul li').removeClass('active');
    t.addClass('active');
    $('#comment_type').val(t.attr('data-type'));
    $('#comment_page').val(0);
    var getMore = function (data) {
        $('.topic-pl-ul-box').empty().append(data.datalist);
        if(!!isWeixin()){
            $('.btn-content ul li:nth-child(2)').hide();
            $('.btn-content ul li').css({'width': '50%'});
        }
    };
    getMoreTopicComment(getMore);
    $('#comment_page').val(parseInt($('#comment_page').val()) + 1);
});
/**
 * 评论点赞
 */
$('body').on('click','.js-topic-zan',function(){
    if(uid == 0){
        window.location.href = '/user/login';
    }else{
        var t = $(this),
            url = '/topic/zan',
            data = {
                itemid: t.parents('.content-box').attr('comment_id'),
                idtype:'topic_comment'
            };
        if(!t.hasClass('disabled')){
            t.addClass('disabled');
            $.ajax({
                type: 'post',
                url: url,
                data: data,
                dataType: 'json',
                async: true,
                success: function (data) {
                    if(data.result == 1){
                        t.find('.number').html(parseInt(t.find('.number').html()) + 1);
                        t.find('i').addClass('active');
                        messenger(data.data.msg);
                        $.myDetection.gaDetection('热议评论,点赞,点赞成功');
                    }else{
                        messenger('您已经点过赞了',0);
                    }
                    t.removeClass('disabled');
                },
                error: function (e) {

                }
            });
        }
    }

});

/**
 * 确认发布评论
 */
$('body').on('click','.js-topic-submit-pl-form',function(){
    var t = $(this),
        url = $('#topic-pl-box').attr('data-type') == 'topic-pl' ? '/topic/add_comment' : '/topic/add_reply',
        data = {
            topic_id:$('#topicId').val(),
            type:1,
            content:$('#topic-pl-textarea').val()
        };
    var flag = true;
    if($('#topic-pl-box').attr('data-type') == 'topic-dp'){
        data.comment_id = $('#topic-pl-box').attr('data-id');
    }else{
        if(data.content.length < 8){
            messenger('客官，8字起评,不讲价呦',0);
            flag = false;
        }
    }
    if(!!flag){
        if(!t.hasClass('disabled')){
            t.addClass('disabled');
            $.ajax({
                type: 'post',
                url: url,
                data: data,
                dataType: 'json',
                async: true,
                success: function (data) {
                    var id = $('#topic-pl-box').attr('data-id');

                    if(data.result == 1){
                        if($('#topic-pl-box').attr('data-type') == 'topic-pl'){
                            $('.pl-list-title ul li').removeClass('active');
                            $('.pl-list-title ul li:last-child').addClass('active');
                            $('#comment_type').val('is_new');
                            $('#comment_page').val(0);

                            var callback = function(data){
                                $('.topic-pl-ul-box').empty().append(data.datalist);
                            };
                            getMoreTopicComment(callback);
                            $.myDetection.gaDetection('热议评论,话题评论,发表成功');
                        }else{
                            var html =
                                '<li>'
                                +'<p class="dp-content"><span class="name">'+ data.datalist.userinfo.username +'&nbsp;:&nbsp;</span>'+ data.datalist.content +'</p>'
                                +'</li>';
                            $('#content_'+$('#topic-pl-box').attr('data-id')).find('.dp-content-wrap').show();
                            $('#content_'+$('#topic-pl-box').attr('data-id')).find('.dp-content-wrap ul').prepend(html);
                            $.myDetection.gaDetection('热议评论,评论点评,发表成功');
                        }
                        setTimeout(function () {
                            closeContentModal();
                            if(!!id){
                                goScrollTop('content_'+id);
                            }else{
                                goScrollTop('pl-list-title');
                            }
                        }, 2000);
                        messenger(data.msg);
                    }else{
                        messenger(data.msg,0);
                    }
                    t.removeClass('disabled');
                },
                error: function (e) {

                }
            });
        }
    }

});
/**
 * 确认发布点评
 */
$('body').on('click','.js-topic-submit-dp-form',function(){
    var t = $(this),
        url = '/topic/add_reply',
        data = {
            topic_id:$('#topicId').val(),
            type:1,
            content:$('#topic-dp-textarea').val(),
            comment_id:$('#commentId').val()
        };
    if($('#topic-dp-box').attr('data-type') == 'topic-hf'){
        data.to_uid = $('#topic-dp-box').attr('data-touid');
    }
    if(!t.hasClass('disabled')){
        t.addClass('disabled');
        $.ajax({
            type: 'post',
            url: url,
            data: data,
            dataType: 'json',
            async: true,
            success: function (data) {
                var vip_html = !!is_vip ? '<span class="icon-s"><i class="i-vip icon-vip"></i></span>' : '';
                if(data.result == 1){
                    $('#pl-wrap').show();
                    var title = '';
                    if($('#topic-dp-box').attr('data-type') == 'topic-dp'){
                        title = '<div class="title">'+ data.datalist.content +'</div>'
                    }else{
                        title = '<div class="title">回复&nbsp;'+ data.datalist.to_userinfo.username +'&nbsp;:&nbsp;'+ data.datalist.content +'</div>'
                    }
                    var html = '<li id="hf_'+ data.datalist.id +'" data-pid="'+ data.datalist.id +'">'
                        +'<div class="face-box">'+ vip_html +'<img src="'+ data.datalist.userinfo.avatar +'"></div>'
                        +'<div class="pl-info">'
                        +'<div class="name">'+ data.datalist.userinfo.username +'</div>'
                        + title
                        +'<div class="hf-pl pull-right js-topic-hf-dp" data-name="'+ data.datalist.userinfo.username +'" data-id="'+ data.datalist.userinfo.uid +'">回复</div>'
                        +'<div class="time">刚刚</div>'
                        +'</div>'
                        +'</li>';

                    $('.pl-ul-box').prepend(html);

                    goScrollTop('pl-wrap');

                    if($('#topic-dp-box').attr('data-type') == 'topic-hf'){
                        $.myDetection.gaDetection('热议点评,点评回复,发表成功');
                    }else{
                        $.myDetection.gaDetection('热议评论,评论点评,发表成功');
                    }


                    setTimeout(function () {
                        closeContentModal();
                    }, 2000);
                    messenger(data.msg);
                    $('.topic-no-content-box').hide();
                }else{
                    messenger(data.msg,0);
                }
                t.removeClass('disabled');
            },
            error: function (e) {

            }
        });
    }
});

/**
 * 跳转链接
 */
$(document).on('click','.js-open-comment',function(){
    var t = $(this),id = t.attr('data-id');
    window.location.href = '/topic/comment/'+ id +'?f=reyi_detail_com'
});


/**
 * 查看详情
 */
$(document).on('click','.js-open-h-content',function(){
    var t = $(this),con = $('#share_desc'),h = $('#t-c-h').height()/(20/375*w) + 1.2 + 'rem';
    if(t.hasClass('active')){
        con.animate({'height': '6rem','overflow':'hidden'}, 300);
        t.find('i').removeClass('active');
        t.removeClass('active');
    }else{
        con.animate({'height': h,'overflow':'auto'}, 300);
        t.find('i').addClass('active');
        t.addClass('active');
    }
});
/**
 * 分享按钮位置
 */
/*var top_h = 0;
if($('.guide-box').css('display') != 'none'){
    top_h = 3;
    if(!bw.isWX){
        $('.share-flex-box').stop().animate({'top':3+top_h+'rem'},300);
    }
}
if(bw.isWX){
    $('.share-flex-box').stop().animate({'top':1+top_h+'rem'},300);
}else{*/
    /**
     * 显示隐藏 分享,评论按钮,
     */
    /*$(window).scroll(function () {

        if ($(window).scrollTop() > $('.topic-wrap').height() || $(window).scrollTop() > ($(document).height() - $(window).height() -100) ) {
            $('.share-flex-box').stop().hide();
        } else {
            $('.share-flex-box').stop().show();
        }

    });
}*/




