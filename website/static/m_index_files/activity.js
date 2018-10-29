/**
 * 活动公用弹窗
 * @param data
 */
var alertModal = function(data){

    var w = window.innerWidth,
        left = (w*0.1) + 'px',
        footer = '';

    if(data.num == 1){
        footer = data.footer;
    }

    var html =
        '<div class="alert-shade"></div>'
        +'<div class="alert-modal" style="left:'+ left +'">'
        +'<div class="alert-body">'
        + data.content
        +'</div>'
        +footer;

    $('body').append(html);

};

/**
 * 获取更多活动
 */
$('body').on('click','.js-get-more-activity',function(){
    var t = $(this),page = t.attr('data-cur_page');
    if(!t.hasClass('disabled')){
        t.addClass('disabled');
        $.ajax({
            type: 'post',
            url: '/active/more',
            data: {
                page: page
            },
            dataType: 'json',
            async: true,
            success: function (data) {
                $('.topic-section-wrap').append(data);
                if(data.length < 10){
                    t.remove();
                }
                t.attr('data-cur_page',parseInt(t.attr('data-cur_page')) + 1);
                t.removeClass('disabled');
            },
            error: function (e) {
            }
        });
    }
});

/**
 * 滑块初始化
 */
//if($('.swiper-container').length > 0){
//    var swiper = new Swiper('.swiper-container', {
//        pagination: '.swiper-pagination',
//        slidesPerView: 'auto',
//        centeredSlides: true,
//        paginationClickable: true,
//        spaceBetween: 30
//    });
//}


/**
 * 弹出层
 */
if($('.lose-box').length > 0){
    //alertModal(data);
}

$('body').on('click','[data-close="close"]',function(){
    $('.alert-shade,.alert-modal').remove();
});

if(!!isWeixin()){
    $('.ticket-way-wx').show()
}else{
    $('.ticket-way-zfb').show()
}

/**
 * 打开购票
 */
$('body').on('click','.js-open-modal-ticket',function(){

    var t = $(this);
    openContentModal();
    $('.htmlBox').append('<div class="alert-shade"></div>');
    $('.buy-ticket-wrap').show();

});

$('#ticket_number').bind('input propertychange', function() {
   var t = $(this);
    if(t.val() > 40){
        $('.js-error-ticket').show();
    }else{
        $('.js-error-ticket').hide();
    }
});
/**
 * 关闭购票窗口
 */
$('body').on('click','.js-close-modal-ticket',function(){
    closeContentModal();
    $('.alert-shade').remove();
    $('.buy-ticket-wrap').hide();
});
/**
 * 选择票种
 */
$('body').on('click','.js-ticket-type',function(){
    var t = $(this);
    $('#ticket_number').val(t.attr('data-min-buy-count')).attr('maxlength', t.attr('data-inventory'));
    if(!t.hasClass('disabled')){
        $('.ticket-type').removeClass('active');
        t.addClass('active');
    }
});

/**
 * 减去票数
 */
$('body').on('click','.js-sub-ticket',function(){
    if($('.js-ticket-type.active').length > 0) {
        var t = $(this), n = '', i = $('.js-ticket-type.active').attr('data-min-buy-count');
        if (parseInt($('#ticket_number').val()) > i) {
            n = parseInt($('#ticket_number').val()) - 1;
            $('#ticket_number').val(n);
        }
        if($('#ticket_number').val() < 40){
            $('.js-error-ticket').hide();
        }
    }
});
/**
 * 添加票数
 */
$('body').on('click','.js-add-ticket',function(){
    if($('.js-ticket-type.active').length > 0){
        var t = $(this),n = 0;
        if($('#ticket_number').val() < parseInt($('.js-ticket-type.active').attr('data-inventory'))){
            n = parseInt($('#ticket_number').val()) + 1;
            $('#ticket_number').val(n);
        }

        if($('#ticket_number').val() > 40){
            $('.js-error-ticket').show();
        }
    }
});
/**
 * 二维码放大
 */
$('body').on('click','.js-open-explain-box',function(){
    var html =
        '<div class="alert-shade alert-shade06"><div class="share-wrap">'
        +'<i class="icon icon-white-close js-close-explain-box"></i>'
        +'</div></div>';
    $('body').append(html);
    $('.ticket-explain-box').show();
    var swiper = new Swiper('.swiper-container-modal', {
        pagination: '.swiper-pagination',
        slidesPerView: 'auto',
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 50
    });
});
/**
 * 关闭二维码弹窗
 */
$('body').on('click','.js-close-explain-box',function(){
    var t = $(this);
    $('.alert-shade').remove();
    $('.ticket-explain-box').hide();
});


/**
 * 获取更多往期回顾
 */
$('body').on('click','.js-more-relate-activities',function(){
    var t = $(this),page = t.attr('data-cur_page');
    if(!t.hasClass('disabled')){
        t.addClass('disabled');
        $.ajax({
            type: 'post',
            url: '/active/moreRelateActivities',
            data: {
                hid:$('#hid').val(),
                page: page
            },
            dataType: 'json',
            async: true,
            success: function (data) {
                var html = '';
                $.each(data.data,function(index,h){
                    
                    html += '<li>'
                        +'<a href="/active/content/'+ h.hid +'/1.html">'
                        +'<img src="'+ h.pic +'">'
                        +'<p>'+ h.title +'</p>'
                        +'</a>'
                        +'</li>'
                });

                if(data.data.length == 0){
                    t.remove();
                }

                $('.relate-activities').append(html);

                t.attr('data-cur_page',parseInt(t.attr('data-cur_page')) + 1);
                t.removeClass('disabled');
            },
            error: function (e) {
            }
        });
    }

});
/**
 * 获取专题报道
 */
$('body').on('click','.js-more-relate-acticle',function(){
    var t = $(this),page = t.attr('data-cur_page');
    if(!t.hasClass('disabled')){
        t.addClass('disabled');
        $.ajax({
            type: 'post',
            url: '/active/moreRelateArticles',
            data: {
                hid:$('#hid').val(),
                page: page
            },
            dataType: 'json',
            async: true,
            success: function (data) {
                console.log(data);
                var html = '';
                $.each(data.data,function(index,h){
                    html += '<li>'
                        +'<a href="/article/'+ h.aid +'.html">'
                        +'<img src="'+  h.pic +'!75x100">'
                        +'<p>'+ h.title +'</p>'
                        +'</a>'
                        +'</li>'
                });

                if(data.data.length == 0){
                    t.remove();
                }

                $('.relate-article').append(html);

                t.attr('data-cur_page',parseInt(t.attr('data-cur_page')) + 1);
                t.removeClass('disabled');
            },
            error: function (e) {
            }
        });
    }

});


/**
 * 报名跳转
 */
$('body').on('click','.js-location-sign-up',function(){
    var t = $(this);
    window.location.href = '/shop/submit/'+$('#hid').val();
});

/**
 * 购票提交
 */
$('body').on('click','.js-buy-tickets',function(){
    if($('.js-ticket-type.active').length > 0){
        var t = $(this),ticket = $('.js-ticket-type.active');
        var goods = {
            goods_id:ticket.attr('data-goods-id'),
            name:ticket.find('.js-name').html(),
            price:ticket.find('.js-price').html(),
            number:$('#ticket_number').val() > 40 ? 40 : $('#ticket_number').val()
        };
        if(parseInt(goods.number) > parseInt($('.js-ticket-type.active').attr('data-inventory'))){
            messenger('没有那么多的票',0);return false;
        }
        if(goods.number == 0 || goods.number == ''){
            messenger('请填写票的数量',0);return false;
        }

        localStorage.setItem('goods',JSON.stringify(goods));
        window.location.href = '/shop/submit/'+$('#hid').val();
    }
});


/**
 * 报名提交信息
 */
$('body').on('click','.js-sign-up',function(){
    var t = $(this),url = '/shop_action/order',
        data = {
            huxiu_hash_code: huxiu_hash_code,
            hid:$('#hid').val(),
            name:$('#name').val(),
            mobile:$('#mobile').val(),
            email:$('#email').val(),
            weixin:$('#weixin').val(),
            profession:$('#profession').val(),
            company:$('#company').val(),
            position:$('#position').val(),
            country:$('#country').html(),
            platform:'m'
        },
        myReg = /^1[3|4|5|7|8]\d{9}$/,
        myReg2 = /^[1-9]\d{5,}$/,
        myReg3 = /^\w+\@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,6}){1,2}$/;

    var countryNum=$('#country').html().replace('+','');

    if(t.hasClass('disabled')){
        return false;
    }

    if($('#name').val() == ''){
        messenger('姓名不能为空!',0);return false;
    }

    if($('#profession').val() == ''){
        messenger('请选择行业',0);return false;
    }

    if($('#company').val() == ''){
        messenger('请填写公司名称',0);return false;
    }

    if($('#position').val() == ''){
        messenger('请填写职位',0);return false;
    }

    if( $('#mobile').val() == ''){
        messenger('手机号不能为空',0);return false;
    }

    if(countryNum==86){
        if(!myReg.test($('#mobile').val())){
            messenger('手机号填写有误',0);
            return false;
        }
    }else {
        if(!myReg2.test($('#mobile').val())){
            messenger('手机号填写有误',0);
            return false;
        }
    }


    if( $('#email').val() == ''){
        messenger('邮箱不能为空',0);return false;
    }

    if(!myReg3.test($('#email').val())){
        messenger('邮箱格式填写错误',0);
        return false;
    }

    if(uid==0){
        var phoneNum=$('#mobile').val();
        t.parents('#active-apply-box').hide();
        $('.vip-login-wrap').show();
        $('#username').val(phoneNum);
        $('footer').hide();
        $('.mod-sidebar').hide();
        return;
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
                if(data.result == 1){

                    var post_data = {
                        num :'1',
                        content:'<div class="success-box success-sm-box"><i class="icon icon-sm-success"></i>提交成功！</div>' +
                        '如果您通过报名审核，虎嗅会在1-3个工作日将邀请邮件发送至您的邮箱。',
                        footer:
                        '<div class="alert-footer">'
                        +'<button class="btn-alone js-close-sign-up" data-close="close">我知道了</button>'
                        +'</div>'
                        +'</div>'
                    };
                    alertModal(post_data)
                }else{
                    messenger(data.msg,0);
                }
                t.removeClass('disabled');
            }
        });
    }

});

/*
 *  活动报名登陆
 * */
$(document).on('click','.js-login-sms-vip',function(){
    if($('#active-apply-box').length>0){
        var t = $(this),
            username = $('#username').val(),
            country = $('.js-country').text(),
            captcha = $('.captcha').val();

        var myReg = /^(([0-9])+\d{5})$/;
        if (!myReg.test(username)) {
            messengerCenter('请输入正确的手机号');
            return false;
        }
        if (captcha.length != 6 || captcha == '') {
            messengerCenter('请输入正确的验证码');
            return false;
        }

        if(!t.hasClass('disabled')){
            t.addClass('disabled');

            $.ajax({
                type: 'post',
                url: '/user_action/loginSms',
                data: {
                    'username':username,
                    'country':country,
                    'captcha':captcha
                },
                dataType: 'json',
                async: true,
                success: function (data) {
                    if (data.success) {

                            $('.js-sign-up').addClass('disabled');

                            $('.vip-login-wrap').hide();
                            $('#active-apply-box').show();
                            $('footer').show();
                            $('.mod-sidebar').show();

                            var postData = {
                                huxiu_hash_code: huxiu_hash_code,
                                hid: $('#hid').val(),
                                name: $('#name').val(),
                                mobile: $('#mobile').val(),
                                email: $('#email').val(),
                                profession: $('#profession').val(),
                                company: $('#company').val(),
                                position: $('#position').val(),
                                country: $('#country').html(),
                                platform: 'm'
                            };

                            $.ajax({
                                type: 'post',
                                url: '/shop_action/order',
                                data: postData,
                                dataType: 'json',
                                async: true,
                                success: function (result) {
                                    if(result.result == 1){
                                        var post_data = {
                                            num: '1',
                                            content: '<div class="success-box success-sm-box"><i class="icon icon-sm-success"></i>提交成功！</div>' +
                                            '如果您通过报名审核，虎嗅会在1-3个工作日将邀请邮件发送至您的邮箱。',
                                            footer: '<div class="alert-footer">'
                                            + '<button class="btn-alone js-close-sign-up" data-close="close">我知道了</button>'
                                            + '</div>'
                                            + '</div>'
                                        };
                                        alertModal(post_data);
                                    }else{
                                        messenger(result.msg,0);
                                        setTimeout(function(){
                                            window.location.href='/active/content/'+ $('#hid').val() +'.html'
                                        },2200);
                                    }
                                }
                            });

                    } else {
                        messengerCenter(data.error.message);
                    }
                    t.removeClass('disabled');
                }
            });
        }
    }
});

if($('.js-overtime').length > 0){
    var post_data = {
        num :'1',
        content:'您的订单已失效，请重新下单！',
        footer:
        '<div class="alert-footer">'
        +'<button class="btn-double" data-close="close">取消</button>'
        +'<a href="/active/content/'+ $("#hid").val() +'.html" class="btn-double active js-overtime">重新下单</a>'
        +'</div>'
    };
    alertModal(post_data);
}


/**
 * 超时重新下单
 */

$('body').on('click','.js-overtime',function(){

});

/**
 * 关闭
 */
$('body').on('click','.js-close-sign-up',function(){
    window.location.href = '/active/content/'+ $('#hid').val() +'.html'
});

/**
 * 显示购票信息
 */
if($('#shop_info').length>0){

    var goods = JSON.parse(localStorage.getItem('goods'));
    $('.ticket_name').html(goods.name);
    $('.ticket_price').html(goods.price);
    $('.ticket_number').html(goods.number);
    $('#goods_num').val(goods.number);
    $('.pay_price').html('¥'+ goods.number * (goods.price).replace('¥',''));
    $('#goods_id').val(goods.goods_id);
}

/**
 * 发票修改
 */
$('body').on('click','.js-invoice-radio',function(){
    var t = $(this);
    if(t.hasClass('active_type')){
        $('.invoice-box').hide();
        t.find('i').addClass('disabled active');
        t.removeClass('active_type');
    }else{
        $('.invoice-box').show();
        t.find('i').removeClass('disabled active');
        t.addClass('active_type');
    }
});

/**
 * 配送方式修改
 */
$('body').on('click','.js-invoice-type',function(){
    var t = $(this);
    $('.invoice_type').find('i').removeClass('active').addClass('disabled');
    t.find('i').removeClass('disabled').addClass('active');
});



/**
 * 购票下单提交信息
 */
$('body').on('click','.js-shop-order',function(){
    var t = $(this),
        url = '/shop_action/order',
        post_data = {
            hid:$('#hid').val(),
            goods_id:$('#goods_id').val(),
            goods_num:$('#goods_num').val(),
            huxiu_hash_code: huxiu_hash_code,
            name:$('#name').val(),
            mobile:$('#mobile').val(),
            email:$('#email').val(),
            profession:$('#profession').val(),
            company:$('#company').val(),
            position:$('#position').val(),
            invoice_type:$('.js-invoice-radio').find('i').hasClass('disabled')? 0 : $('.icon-radio.active').attr('data-type'),
            invoice:$('#invoice').val(),
            address:$('#address').val(),
            country:$('#country').html(),
            platform:'m'
        },

        myReg = /^1[3|4|5|7|8]\d{9}$/,
        myReg2 = /^[1-9]\d{5,}$/,
        myReg3 = /^\w+\@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,6}){1,2}$/;

    var countryNum=$('#country').html().replace('+','');

    if($('#name').val() == ''){
        messenger('姓名不能为空!',0);return false;
    }
    if( $('#mobile').val() == ''){
        messenger('手机号不能为空',0);return false;
    }
    if(countryNum==86){
        if(!myReg.test($('#mobile').val())){
            messenger('手机号填写有误',0);
            return false;
        }
    }else {
        if(!myReg2.test($('#mobile').val())){
            messenger('手机号填写有误',0);
            return false;
        }
    }

    if( $('#email').val() == ''){
        messenger('邮箱不能为空',0);return false;
    }
    if(!myReg3.test($('#email').val())){
        messenger('邮箱格式填写错误',0);
        return false;
    }


    if(post_data.invoice_type != 0){
        if($('#invoice').val() == ''){
            messenger('发票抬头不能为空',0);return false;
        }
        if(post_data.invoice_type == 2){
            if($('#address') == ''){
                messenger('地址不能为空',0);return false;
            }
        }
    }

    if(uid==0){
        var phoneNum=$('#mobile').val();
        t.parents('#shop-submit-box').hide();
        $('.vip-login-wrap').show();
        $('#username').val(phoneNum);
        $('footer').hide();
        $('.mod-sidebar').hide();
        return;
    }

    if(!t.hasClass('disabled')){
        t.addClass('disabled');
        $.ajax({
            type: 'post',
            url: url,
            data: post_data,
            dataType: 'json',
            async: true,
            success: function (data) {
                if(data.result == 1){
                    //localStorage.removeItem('goods');
                    window.location.href = data.data.url;
                }else{
                    messenger(data.msg,0);
                }
                t.removeClass('disabled');
            }
        });
    }

});

/*
 *  活动购票登陆
 * */
$(document).on('click','.js-login-sms-vip',function(){
    if($('#shop-submit-box').length>0){
        var t = $(this),
            username = $('#username').val(),
            country = $('.js-country').text(),
            captcha = $('.captcha').val();

        var myReg = /^(([0-9])+\d{5})$/;
        if (!myReg.test(username)) {
            messengerCenter('请输入正确的手机号');
            return false;
        }
        if (captcha.length != 6 || captcha == '') {
            messengerCenter('请输入正确的验证码');
            return false;
        }
        if(!t.hasClass('disabled')){
           t.addClass('disabled');

            $.ajax({
                type: 'post',
                url: '/user_action/loginSms',
                data: {
                    'username':username,
                    'country':country,
                    'captcha':captcha
                },
                dataType: 'json',
                async: true,
                success: function (data) {
                    if (data.success) {
                        var cookieTime = new Date();
                        cookieTime.setTime(cookieTime.getTime() + (60 * 10 * 1000));
                        var mKey = 'huxiu_sms_login_type_' + username;
                        $.cookie(mKey, data.data.type, { expires: cookieTime, path: '/' });
                        var post_data = {
                                hid:$('#hid').val(),
                                goods_id:$('#goods_id').val(),
                                goods_num:$('#goods_num').val(),
                                huxiu_hash_code: huxiu_hash_code,
                                name:$('#name').val(),
                                mobile:$('#mobile').val(),
                                country:$('#country').html(),
                                email:$('#email').val(),
                                profession:$('#profession').val(),
                                company:$('#company').val(),
                                position:$('#position').val(),
                                invoice_type:$('.js-invoice-radio').find('i').hasClass('disabled')? 0 : $('.icon-radio.active').attr('data-type'),
                                invoice:$('#invoice').val(),
                                address:$('#address').val(),
                                platform:'m'
                            };
                        $.ajax({
                            type: 'post',
                            url: '/shop_action/order',
                            data: post_data,
                            dataType: 'json',
                            async: true,
                            success: function (result) {
                                if(result.result == 1){
                                    //localStorage.removeItem('goods');
                                    window.location.href = result.data.url;
                                }else{
                                    messenger(result.msg,0);
                                }
                            }
                        });

                    } else {
                        messengerCenter(data.error.message);
                    }
                   t.removeClass('disabled');
                }
            });
       }
    }
});

if($('.js-pay-success').length > 0){
    localStorage.removeItem('goods');
}

if(!localStorage.getItem('nums_active')){
    $('.nums-nav-active,.nums').show();
}
$('body').on('click','.js-hide-num-active',function(){
    localStorage.setItem('nums_active',true);
});


/**
 * 关闭弹窗
 */
$(document).on('click','.btn-close-2',function(){
    var t = $(this);
    if($('#active-checkbox').prop('checked')){
        localStorage.setItem('active_vip_box',true);
    }
    $('.active-fixed-box').remove();
});

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

if(!localStorage.getItem('active_vip_box')){
    if(getUrlParam('in-vip') == '1'){
        $('.active-fixed-box').show();
    }
}





