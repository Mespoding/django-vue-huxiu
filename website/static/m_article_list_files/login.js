/**
 * 所有提示信息 提示层
 */
function messengerCenter(html, time) {
    var t = $('.modal-message');
    t.stop().show().empty().append('<span class="title">' + html + '</span>');
    /**
     * 1 标识不隐藏 ,其余任何
     */
    if (time != 1) {
        setTimeout(function () {
            t.stop().hide();
        }, 1000);
    }
}

/**
 * 获取JSON 国家区号
 */
var getCountryCode = function(){
    //<div class="area-order" id="area-order-A">A</div>;
    //<li class="select-area" data-code="+86"><span>中国(+86)</span><i class="icon-login i-l-choose"></i></li>
    $.ajax({
        type: 'post',
        url: '/user_action/countryList',
        dataType: 'json',
        async: true,
        success: function(data){

            // data.data[' '] 是默认值; key 就是 '空格';
            var html = '<li class="select-area" data-code="'+ data.data[' '][0].country +'"><span>'+ data.data[' '][0].name +'('+ data.data[' '][0].country +')</span><i class="icon-login i-l-choose"></i></li>';
            for(var key in data.data){
                if(key != ' '){ // 这个key 是空格 ,由后台返回的;
                    html += '<div class="area-order" id="area-order-'+ key +'">'+ key +'</div>';
                    $.each(data.data[key],function(index,c){
                        html += '<li data-code="'+ c.country +'">'+  c.name +'('+ c.country +')</li>';
                    })
                }
            }

            $('.area-ul').empty().append(html);
        },error:function(e){
            console.log(e)
        }
    });

};

if($('.area-ul').length > 0){
    getCountryCode();
}

/**
 * 删除特殊的提示框
 */
$(document).on('click','.btn-close-modal',function(){
    var t = $(this);
    $('.modal').remove();
});

var w = document.documentElement.clientWidth;
if (w > 640) {
    w = 640
}
document.documentElement.style.fontSize = 20 / 375 * w + 'px';
window.onresize = function () {
    document.documentElement.style.fontSize = 20 / 375 * w + 'px';
};
$(document).on('click', '.js-i-eye', function () {
    var t = $(this),
        pass = t.parents('.label-box').find('.password');
    if (pass.attr('type') == 'password') {
        pass.attr('type', 'text');
    } else {
        pass.attr('type', 'password');
    }
});

/**
 * 定位评论
 */
var goPositioning = function (element) {
    if (element.length == 0) {
        return false;
    }
    var offset = 100;
    var target = element.offset().top - offset;
    $('html, body').animate({
        scrollTop: target
    }, 300);
};

/**
 * 定位到国家区号
 */
$(document).on('click', '.control-box li', function () {
    var t = $(this);
    var element = $('#area-order-' + t.text());
    goPositioning(element);
});

/**
 * 选择国家区号;
 */
$(document).on('click', '.area-ul li', function () {
    var t = $(this);
    var code = t.attr('data-code');
    var text = t.text();
    $('.select-area span').text(text);
    $('.select-area').attr('data-code', code);
    $('.label-select-box span').text(code);
    $('.area-box').hide();
    $('.login-wrap').show();
});


/**
 * 登录部分
 * @ 判断用户名是手机号则显示区号选择
 */
$('.username').bind('input propertychange', function () {
    var t = $(this),
        username = t.val(),
        label_select_box = $('.label-select-box');
    var myreg = /^(([0-9])+\d{5})$/;
    if (myreg.test(username)) {
        t.parent('.label-box').addClass('col-xs');
        label_select_box.removeClass('hide');
    } else {
        t.parent('.label-box').removeClass('col-xs');
        label_select_box.addClass('hide');
    }
});


/**
 * 登录注册后的回调函数
 */
var loginCallback = function(data){
    if (data.success) {
        var callback_url = $.cookie('hx_m_callback_url');
        if(!!callback_url){
            window.location.href = callback_url;
        }else{
            window.location.href = '/';
        }
    } else {
        messengerCenter(data.error.message);
    }
};

/**
 *正式确定登录
 */
$(document).on('click', '.js-btn-login', function () {
    var t = $(this),
        username = $('.username').val(),
        password = $('.password').val(),
        country = $('.js-country').text();

    if($.trim(username).length == 0){
        messengerCenter('用户名不能为空');
        return false;
    }
    if($.trim(password).length == 0){
        messengerCenter('密码不能为空');
        return false;
    }

    if (!t.hasClass('disabled')) {
        $.ajax({
            type: 'post',
            url: '/user_action/login',
            data: {
                'username':username,
                'password':password,
                'country':country
            },
            dataType: 'json',
            beforeSend: function(){
                messengerCenter('<i class="icon-login i-l-loading"></i>登录中');
            },
            async: true,
            success: function (data) {
                /**
                 * 执行公共登录函数
                 */
                loginCallback(data);
                t.removeClass('disabled');
            }
        });

    }

});

/**
 * 打开国家区号选择页面
 */
$(document).on('click', '.label-select-box', function () {
    $('.area-box').show();
    $('.login-wrap').hide();
});

/**
 * 点击删除按钮,清除input的内容
 */
$(document).on('click', '.js-input-close', function () {
    var t = $(this),
        l_input = t.parents('.label-box').find('.l-input');
    l_input.val('');
    t.hide();

    /**
     * 如果是用户名,且为手机号用户名,则要把区号去掉.
     */
    if (l_input.hasClass('username')) {
        $('.label-select-box').addClass('hide');
        t.parents('.label-box').removeClass('col-xs');
    }
});


/**
 *  input输入显示隐藏删除按钮.
 */
$('.l-input').bind('input propertychange', function () {
    var t = $(this),
        i_close = t.parents('.label-box').find('.input-close');
    if (t.val().length > 0) {
        i_close.show();
    } else {
        i_close.hide();
    }
});


/**
 * 找回密码
 */
$(document).on('click', '.js-retrieve-psd-next', function () {
    var t = $(this),
        username = $('.username').val();
        if(username.length == 0){
            messengerCenter('请输入手机号/邮箱/用户名');
            return false;
        }

    if(!t.hasClass('disabled')){
        t.addClass('disabled');

        $.ajax({
            type: 'post',
            url: '/user_action/resetCaptcha',
            data: {
                "username":username
            },
            dataType: 'json',
            async: true,
            success: function (data) {
                if (data.success) {
                    //成功操作
                    $('.mobile-box,.edit-psd-box').removeClass('hide');
                    $('.mobile-gain-box').addClass('hide');
                } else {
                    messengerCenter(data.error.message);
                }
                t.removeClass('disabled');
            }
        });
    }
});

/**
 * 最终确认保存密码
 */
$(document).on('click','.js-reset-password',function(){

    var t = $(this),
        username = $('.username').val(),
        captcha = $('.captcha').val(),
        county = $('.js-country').text(),
        password = $('.password1').val(),
        password2 = $('.password2').val();
    if(password != password2){
        messengerCenter('请输入相同的密码');
        return false;
    }

    if(!t.hasClass('disabled')){
        t.addClass('disabled');

        $.ajax({
            type: 'post',
            url: '/user_action/resetPassword',
            data: {
                "username":username,
                "county":county,
                "captcha":captcha,
                "password":password
            },
            dataType: 'json',
            async: true,
            success: function (data) {
                if (data.success) {
                    messengerCenter(data.data.message);
                    window.location.href = '/';
                } else {
                    messengerCenter(data.error.message);
                }
                t.removeClass('disabled');
            }
        });
    }

});


/**
 * 显示关联虎嗅账号
 */
$(document).on('click','.js-open-related',function(){
    $('.three-user-box').addClass('hide');
    $('.three-user-related').removeClass('hide');

});

/**
 * 关联虎嗅账号
 */
$(document).on('click','.js-related',function(){
    var t = $(this);
    if(!t.hasClass('disabled')){
        t.addClass('disabled');

        $.ajax({
            type: 'post',
            url: '',
            data: {},
            dataType: 'json',
            async: true,
            success: function (data) {
                if (data.result == '1') {

                } else {

                }
                t.removeClass('disabled');
            }
        });
    }

});
/**
 * 获取验证码
 */
$(document).on('click','.js-get-code,.js-get-bind-code',function(){
    var t = $(this),
        username = $('#username').val(),
        country = $('.js-country').text();

    var myreg = /^(([0-9])+\d{5})$/;
    if (!myreg.test(username)) {
        messengerCenter('请输入正确的手机号');
        return false;
    }
    if(!t.hasClass('disabled')){
        t.addClass('disabled');
        var countdown = 59;
        function settime(val) {
            var flag = true;
            if (countdown == 0) {
                val.empty().html('获取验证码');
                countdown = 59;
                flag = false;
                t.removeClass('disabled');
            } else {
                val.empty().html('<span class="number">'+ countdown +'</span>s后重发');
                countdown--;
            }
            if(flag){
                setTimeout(function() {
                    settime(val)
                },1000)
            }
        }


        $.ajax({
            type: 'post',
            url: t.hasClass('js-get-code') ? '/user_action/loginCaptcha' :'/user_action/bindCaptcha',
            data: {
                'username':username,
                'country':country,
                'huxiu_hash_code':huxiu_hash_code
            },
            dataType: 'json',
            async: true,
            success: function (data) {
                if (data.success) {
                    settime(t);
                    messengerCenter('发送成功');
                } else {
                    messengerCenter(data.error.message);
                    t.removeClass('disabled');
                }
            }
        });

    }
});

/**
 * 短信快捷登录
 */
$(document).on('click','.js-login-sms,.js-Gsou-register',function(){
    var t = $(this),
        username = $('#username').val(),
        country = $('.js-country').text(),
        captcha = $('.captcha').val();

    var myreg = /^(([0-9])+\d{5})$/;
    if (!myreg.test(username)) {
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
                /**
                 * 执行公共登录函数
                 */
                loginCallback(data);
                t.removeClass('disabled');
            }
        });

    }

});


/**
 * 删除底部go-top
 */
if($('.login-wrap').length > 0){
    $('.mod-sidebar').remove();
}


/**
 * 显示关闭绑定页面
 */
$(document).on('click','.js-associated-huxiu',function(){

    var t = $(this),
        associated = $('.three-associated'),
        three = $('.three-login');

    if(associated.hasClass('hide')){
        associated.removeClass('hide');
        three.addClass('hide');
        $('.i-go-back').show();
    }else{
        associated.addClass('hide');
        three.removeClass('hide');
        $('.i-go-back').hide();
    }
});

/**
 * 账户名密码登录和 手机号验证码登录切换
 */
$(document).on('click','.js-mobile-bind-huxiu',function(){
    var t = $(this),
        username = $('#username');
    if(t.hasClass('active')){
        $('.bind-password-box,.js-mobile').addClass('hide');
        $('.bind-captcha-box,.js-username,.label-select-box').removeClass('hide');
        username.attr('placeholder','手机号');
        username.parent('.label-box').addClass('col-xs');
    }else{
        $('.bind-password-box,.js-mobile').removeClass('hide');
        $('.bind-captcha-box,.js-username,.label-select-box').addClass('hide');
        username.attr('placeholder','用户名');
        username.parent('.label-box').removeClass('col-xs');
    }
});

/**
 * 第三方直接登录虎嗅账号
 */
$(document).on('click','.js-user-register-oauth',function(){
    var t = $(this),
        url = '/user_action/registerOauth',
        data = {
            'username':$('.three-username').val(),
            'bid':$('#bid').val()
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
                if(data.success){
                    messengerCenter(data.data.message);
                    loginCallback(data);
                }else{
                    messengerCenter(data.error.message);
                }
                t.removeClass('disabled');
            }
        });

    }
});

/**
 * 绑定虎嗅账号
 */
$(document).on('click','.js-bind-huxiu',function(){
    var t = $(this),
        data = {
            'bid':$('#bid').val(),
            'username':$('#username').val(),
            'password':$('.password').val(),
            'country' : $('.js-country').text(),
            'captcha' : $('.captcha').val()
        };

    if(!t.hasClass('disabled')){
        t.addClass('disabled');
        $.ajax({
            type: 'post',
            url: '/user_action/bind',
            data:data,
            dataType: 'json',
            async: true,
            success: function(data){
                if(data.success){
                    messengerCenter(data.data.message);
                    loginCallback(data);
                }else{
                    messengerCenter(data.error.message);
                }
                t.removeClass('disabled');
            }
        });
    }
});


/**
 * 登录注册页面去掉footer
 */
if($('.login-wrap').length > 0){
    $('footer').hide();
    $('.htmlBox').css('background','#fff');
}else{
    $('footer').show();
}

