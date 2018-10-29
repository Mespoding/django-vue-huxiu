$(function(){
    "use strict";


    //$.alertModal({body:'eee',footer:'eee'});
    /**
     * 提示会员已过期
     */
    $(document).on('click','.js-vip-overdue',function(){
        var body = '<div class="alert-shade"></div>'
            +'<div class="alert-content">'
            +'<div class="alert-box">'
            +'<div class="title">'
            +'<i class="i-new-vip icon-new-warning"></i>&nbsp;您的会员已过期'
            +'</div>'
            +'<p class="content">'
            +'您的会员已过期.'
            +'</p>'
            +'</div>'
            +'<div class="modal-footer">'
            +'<a>暂不开通</a>'
            +'<a class="active" href="/vip/pay">再次开通</a>'
            +'</div>'
            +'</div>';
        $.alertModal({body:body});
    });

    /**
     *  购买虎嗅会员年数选择
     */
    $(document).on('click','.js-num-tag',function(){
        var t = $(this),num = t.attr('data-num'),price = parseInt(t.attr('data-price'));
        if(!t.hasClass('active')){
            $('.js-num li').removeClass('active');
            t.addClass('active');
            if($('.js-vip-invoice-type').hasClass('active')){
                price += 10;
            }
            $('.js-price').html(price);
        }
    });

    /**
     *  是否需要发票
     */
    $(document).on('click','.js-vip-invoice-type',function(){
        var t = $(this),first_li = $('.invoice-vip-box li:first-child'),price = parseInt($('.js-num li.active').attr('data-price'));

        if(t.hasClass('active')){
            $('.js-price').html(price);
            $('.invoice-vip-box li').hide();
            first_li.removeClass('active');
            first_li.show();
        }else{
            $('.js-price').html(price+10);
            $('.invoice-vip-box li').show();
            first_li.addClass('active');
        }
    });

    /**
     * 购买页下单
     */
    $(document).on('click','.js-place-order',function(){
        var t = $(this),
            invoice_type = $('.js-vip-invoice-type'),
            url = '/vip_action/order',
            post_data = {
                num : $('.js-num li.active').attr('data-num'),
                invoice_type:invoice_type.hasClass('active') ? 2 : 1,
                name:$('.invoice_name').val(),//收件人
                mobile:$('.mobile').val(),//手机号
                address:$('.address').val(),//地址
                invoice:$('.invoice').val(),//抬头
                pay_type: bw.isWX ? 'weixin' : 'alipay',
                position:''
            };
        var myreg = /^((1[0-9])+\d{9})$/;
        /**
         * 校验
         * @type {RegExp}
         */
        if(!!invoice_type.hasClass('active')){

            if(post_data.invoice == ''){
                messenger('发票抬头不能为空',0);
                return false;
            }else if(post_data.name == ''){
                messenger('收件人不能为空',0);
                return false;
            }else if(post_data.mobile==''){
                messenger('手机号不能为空',0);
                return false;
            }else if(!myreg.test(post_data.mobile)){
                messenger('手机号填写有误',0);
                return false;
            }else if(post_data.address == ''){
                messenger('邮寄地址不能为空',0);
                return false;
            }
        }


        if (!t.hasClass('disabled')) {
            t.html('提交中...');
            t.addClass('disabled');
            $.ajax({
                type: 'post',
                url: url,
                data: post_data,
                dataType: 'json',
                async: true,
                success: function (data) {
                    if (data.result == '1') {
                        window.location.href = data.url;
                    } else {
                        messenger(data.msg,0);
                    }
                    t.removeClass('disabled');
                    t.html('立即开通');
                }
            });
        }
    });


    /**
     * 研究报道查看更多
     */
    $(document).on('click','.js-more-vip-report',function(){
        var t = $(this),
            url = '/vip_action/reportList',
            post_data = {
                page: t.attr('data-cur_page'),
                report_type: t.attr('data-report_type')
            };
        if (!t.hasClass('disabled')) {
            t.addClass('disabled');
            $.ajax({
                type: 'post',
                url: url,
                data: post_data,
                dataType: 'json',
                async: true,
                success: function (data) {
                    if (data.result == '1') {

                        var p = parseInt(data.cur_page) + 1;
                        t.attr('data-cur_page',p);
                        $('.js-report-box').append(data.data);

                        if(data.cur_page >= data.total_page){
                            t.hide();
                        }
                    } else {
                        messenger(data.msg,0);
                    }
                    t.removeClass('disabled');
                }
            });
        }
    });

    /**
     * 抢鲜看文章获取更多
     */
    $(document).on('click','.js-more-vip-article',function(){
        var t = $(this),
            url = '/vip_action/articleList',
            post_data = {
                page: t.attr('data-cur_page')
            };
        if (!t.hasClass('disabled')) {
            t.addClass('disabled');
            $.ajax({
                type: 'post',
                url: url,
                data: post_data,
                dataType: 'json',
                async: true,
                success: function (data) {
                    if (data.result == '1') {

                        var p = parseInt(data.cur_page) + 1;
                        t.attr('data-cur_page',p);
                        $('.js-article-vip-box').append(data.data);

                        if(data.cur_page >= data.total_page){
                            t.hide();
                        }
                        $("img.lazy").lazyload({placeholder: "/static_2016/images/bg.png", effect: "fadeIn", threshold: 300});
                    } else {
                        messenger(data.msg,0);
                    }
                    t.removeClass('disabled');
                }
            });
        }
    });

    /**
     * 抢席位弹窗
     */
    $(document).on('click','.js-rob-seats',function(){
        var t = $(this),body = '';

        if(uid == 0){
            localStorage.setItem('callback_url',window.location.href);//指定登录后跳转页面
            window.location.href = '/user/login';
        }else{
            body = '<div class="alert-shade"></div>'
                +'<div class="alert-content">'
                +'<div class="alert-box">'
                +'<div class="title">'
                + '确认抢位吗？'
                +'</div>'
                +'<p class="content">'
                +'</p>'
                +'<p class="info">&nbsp;</p>'
                +'</div>'
                +'<div class="modal-footer">'
                +'<a class="js-single-box">放弃</a>'
                +'<a class="active js-submit-rob-seats" data-hid="'+ t.attr('data-hid') +'">确认</a>'
                +'</div>'
                +'</div>';

            $.alertModal({body:body});
        }
    });
    /**
     * 抢席位
     */
    $(document).on('click','.js-submit-rob-seats',function(){

        var t = $(this),body = '',
            url = '/vip_action/getTableSeat',
            post_data = {
                hid: t.attr('data-hid')
            };

        if (!t.hasClass('disabled')) {
            t.addClass('disabled');
            $.ajax({
                type: 'post',
                url: url,
                data: post_data,
                dataType: 'json',
                async: true,
                success: function (data) {
                    if (data.result == '1') {
                        var t2 = $('.js-rob-seats');
                        $('.alert-shade,.alert-content').remove();
                        var title = '';
                        if(data.data.title != '抢位成功' ){
                            title = '<i class="i-new-vip icon-new-warning"></i>&nbsp;'+ data.data.title ;
                        }else{
                            title = '<i class="i-new-vip icon-new-success"></i>&nbsp;'+ data.data.title ;
                            t2.html('抢位成功');
                            t2.parents('.btn-buy').addClass('btn-accomplish');
                            t2.removeClass('js-rob-seats');
                        }

                        body = '<div class="alert-shade"></div>'
                            +'<div class="alert-content">'
                            +'<div class="alert-box">'
                            +'<div class="title">'
                            + title
                            +'</div>'
                            +'<p class="content">'
                            + data.data.msg
                            +'</p>'
                            +'<p class="info">'+ data.data.msg1 +'</p>'
                            +'</div>'
                            +'<div class="modal-footer">'
                            +'<a class="single js-single-box">朕知道啦</a>'
                            +'</div>'
                            +'</div>';

                        $.alertModal({body:body});

                    } else {
                        messenger(data.msg,0);
                    }
                    t.removeClass('disabled');
                }
            });
        }

    });

    /**
     * 关闭弹窗
     */
    $(document).on('click','.js-single-box',function(){
        $('.alert-shade,.alert-content').remove();
    });

    /*
    *   选择性别
    * */
    $(document).on('click','.js-choose-sex',function(){
        var t=$(this);
        $('.js-choose-sex').removeClass('active');
        t.addClass('active');
    });

    /*
    * 打开关注领域弹框
    * */
    $(document).on('click','.js-open-focus-box',function(){
        var t=$(this);
        var focusBox=$('.focus-wrap');
        focusBox.show();
        $("#open-vip-box").hide();
        $('footer').hide();
        $('.mod-sidebar').hide();
    });

    /*
    * 判断新添加领域是否存在
    * */
    var isSame=function(t){
        var aLiAll=$('.js-all-field li');
        var aLiSelect=$('.js-select-field li');
        var flag=false;
        t=t.toUpperCase().trim();
        $.each(aLiAll,function(index,li){
            var oLiText=$(li).text();
            if(t==oLiText){
                flag=true;
                return;
            }
        });
        $.each(aLiSelect,function(index,li){
            var oLiText=$(li).text();
            if(t==oLiText){
                flag=true;
                return;
            }
        });
        return flag;
    };

    /**
     * 返回当前选择多少领域
     */
    var getNowFocusNum = function(){
        var num = 0;
        num += $('.js-all-field li.active').length;
        num += $('.js-select-field li.active').length;
        return num;
    };


    /**
     * append 关注领域
     */
    var appendFocus = function(val){
        var li = '<li class="active">'
            +'<i class="icon-close-f vip-icon-wrap vip-icon-close js-close-focus"></i>'
            +val
            +'</li>';

        $('.js-select-field').append(li);
    };


    /**
     * 选择关注领域
     */
    $(document).on('click','.js-all-field li',function(){
        var t = $(this);
        if(t.hasClass('active')){
            t.removeClass('active');
        }else{
            if(getNowFocusNum() == 5){
                messenger('最多只能选择5个关注领域',0);
            }else{
                t.addClass('active');
            }
        }
    });


    /*
    *  删除关注领域
    **/
    $(document).on('click','.js-close-focus',function(){
        var t=$(this);
        t.parent('li').remove();
    });


    /**
     *
     * 添加关注领域
     */
    $(document).on('click','.js-add-focus',function(){
        var t = $(this),name = $('.focus-name');
        if(name.val() == ''){
            messenger('内容不能为空',0);
            return false;
        }
        if(getNowFocusNum() == 5){
            messenger('最多只能选择5个关注领域',0);
        }else if(isSame(name.val())){
            messenger('内容已存在',0);
        }else{
            if (!t.hasClass('disabled')) {
                t.addClass('disabled');
                appendFocus(name.val());
                name.val('');
                t.removeClass('disabled');
            }
        }
    });


    /**
     * 最终选择关注领域
     */
    $(document).on('click','.js-submit-focus',function(){
        var t=$(this);
        $('.focus-wrap').hide();
        $('#open-vip-box').show();
        $('footer').show();
        $('.mod-sidebar').show();
        var allField=$('.js-all-field li.active'),
            selectField=$('.js-select-field li.active'),
            focusBox=$('#focus');

        focusBox.empty();

        if(!t.hasClass('disabled')){
            t.addClass('disabled');
            $.each(allField,function(index,li){
                var oLiText=$(li).text();
                var oLiId=$(li).attr('data-focus_id');
                var span='<span data-focus_id="'+oLiId+'">'+oLiText+'</span>';
                focusBox.append(span);
            });
            $.each(selectField,function(index,li){
                var oLiText2=$(li).text();
                var span2='<span data-type="selected">'+oLiText2+'</span>';
                focusBox.append(span2);
            });
            t.removeClass('disabled');
        }
        if(focusBox.children('span').length==0){
            focusBox.append('<input class="font-28" placeholder="请选择关注领域">');
        }

    });


    /*
    * 首页打开国家区号选择页面
    * */
    $(document).on('click','.js-open-country',function(){
        $('footer').hide();
        $('.mod-sidebar').hide();
        //开通会员
        if($('#open-vip-box').length>0){
            $('#open-vip-box').hide();
            $('.area-box').show();
            $('.area-box').attr('data-type','open-vip-box');
        }
        //购票活动
        if($('#shop-submit-box').length>0) {
            $('#shop-submit-box').hide();
            $('.area-box').scrollTop();
            $('.area-box').show();
            $('.area-box').attr('data-type', 'shop-submit-box');
        }
        //报名活动
        if($('#active-apply-box').length>0){
            $('#active-apply-box').hide();
            $('.area-box').scrollTop();
            $('.area-box').show();
            $('.area-box').attr('data-type','active-apply-box');
        }
    });

    /*
    *  登陆页打开国家区号选择页面
    * */
    $(document).on('click', '.label-select-box', function () {
        $('.vip-login-wrap').hide();
        $('.area-box').show();
        $('.area-box').attr('data-type','vip-login-wrap');
    });

    /**
     *  关闭登陆页面
     * */
    $(document).on('click','.js-close-login-vip',function(){
        var t=$(this);
        $('footer').show();
        $('.mod-sidebar').show();
        //开通会员
        if($('#open-vip-box').length>0){
            var vip_login_country=$('.js-country');//登陆页面的国家区号
            var vip_country=$('#country').html();//开通会员首页的国家区号
            vip_login_country.html(vip_country);
            t.parents('.vip-login-wrap').hide();
            $('#open-vip-box').show();
        }
        //购票活动
        if($('#shop-submit-box').length>0) {
            var shop_login_country=$('.js-country');
            var shop_country=$('#country').html();//活动购票详情页的国家区号
            shop_login_country.html(shop_country);
            t.parents('.vip-login-wrap').hide();
            $('#shop-submit-box').show();
        }
        //报名活动
        if($('#active-apply-box').length>0){
            var apply_login_country=$('.js-country');
            var apply_country=$('#country').html();//活动购票详情页的国家区号
            apply_login_country.html(apply_country);
            t.parents('.vip-login-wrap').hide();
            $('#active-apply-box').show();
        }
    });

    /**
     * 获取JSON 国家区号
     */
    var getCountryCode = function(){
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

                $('.area-list').empty().append(html);
            },error:function(e){
                console.log(e)
            }
        });

    };
    if($('.area-list').length > 0){
        getCountryCode();
    }

    /**
     * 选择国家区号(关闭国家区号弹框)
     */

    $(document).on('click', '.js-area-list li', function () {
        var t = $(this);
        var code = t.attr('data-code');
        var text = t.text();
        var dataType=t.parents('.area-box').attr('data-type');

        $('.select-area span').text(text);
        $('.select-area').attr('data-code', code);
        $('.area-box').hide();


        //开通会员
        if(dataType=='open-vip-box'){
            $('.country-code').text(code);
            $('#'+dataType).show();
            $('footer').show();
            $('.mod-sidebar').show();
        }

        //购票活动
        if(dataType=='shop-submit-box'){
            $('.country-code').text(code);
            $('#'+dataType).show();
            $('footer').show();
            $('.mod-sidebar').show();
        }

        //活动报名
        if(dataType=='active-apply-box'){
            $('.country-code').text(code);
            $('#'+dataType).show();
            $('footer').show();
            $('.mod-sidebar').show();
        }

        if(dataType=='vip-login-wrap'){
            $('.'+dataType+' .country-code').text(code);
            $('.'+dataType).show();
        }

    });



    /*
     *  首页开通会员
     * */


    $(document).on('click','.js-open-vip',function(){
        var t = $(this);
        var url = '/vip_action/submitProfile',
            focus_id = [],
            focus_name = [],
            focusBox = $('#focus').children('span'),
            myReg = /^1[3|4|5|7|8]\d{9}$/,
            myReg2 = /^[1-9]\d{5,}$/;

        var countryNum=$('#country').html().replace('+','');


        $.each(focusBox,function(index,span){
            var dataId=$(span).attr('data-focus_id');
            var dataType=$(span).attr('data-type');
            var text=$(span).text();
            if(dataType=='selected'){
                focus_name.push(text);
            }else {
                focus_id.push(dataId);
            }
        });

        var data={
            country:$('#country').html(),
            mobile:$('#phone-num').val(),
            name:$('#user-name').val(),
            sex:$('.js-choose-sex.active').attr('data-value'),
            position:$('#position').val(),
            profession:$('#profession').val(),
            focus_id:focus_id,
            focus_name:focus_name
        };
        /**
         * 检验
         * */
        if($('#country').html()==''){
            messenger('国家代码不能为空',0);
            return false;
        }
        if($('#phone-num').val()==''){
            messenger('手机号不能为空',0);
            return false;
        }
        if(countryNum==86){
            if(!myReg.test($('#phone-num').val())){
                messenger('手机号填写有误',0);
                return false;
            }
        }else {
            if(!myReg2.test($('#phone-num').val())){
                messenger('手机号填写有误',0);
                return false;
            }
        }

        if($('#user-name').val()==''){
            messenger('姓名不能为空',0);
            return false;
        }
        if($('#position').val()==null){
            messenger('职位不能为空',0);
            return false;
        }

        if($('#profession').val()==null){
            messenger('所在行业不能为空',0);
            return false;
        }
        if($('#focus').children('span').length==0){
            messenger('关注领域不能为空',0);
            return false;
        }

        if(uid==0){
            var phoneNum=$('#phone-num').val();
            t.parents('#open-vip-box').hide();
            $('.vip-login-wrap').show();
            $('.vip-login-wrap').find('#username').val(phoneNum);
            $('footer').hide();
            $('.mod-sidebar').hide();
            return;
        }
        if(!t.hasClass('disabled')){
            t.hasClass('disabled');
            $.ajax({
                url:url,
                data:data,
                type:'post',
                dataType: 'json',
                async: true,
                success:function(data){
                    if(data.success==true) {
                        window.location.href='/vip/pay';
                    }else {
                        messenger(data.error.message,0);
                    }
                    t.removeClass('disabled');
                }

            });
        }
    });



    /*
    *  点击登陆
    * */
    $(document).on('click','.js-login-sms-vip',function(){

        if($('#open-vip-box').length>0){
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
                            var focus_id = [],
                                focus_name = [],
                                focusBox = $('#focus').children('span');
                            $.each(focusBox,function(index,span){
                                var dataId=$(span).attr('data-focus_id');
                                var dataType=$(span).attr('data-type');
                                var text=$(span).text();
                                if(dataType=='selected'){
                                    focus_name.push(text);
                                }else {
                                    focus_id.push(dataId);
                                }
                            });

                            var post_data={
                                country:$('#country').html(),
                                mobile:$('#phone-num').val(),
                                name:$('#user-name').val(),
                                sex:$('.js-choose-sex.active').attr('data-value'),
                                position:$('#position').val(),
                                profession:$('#profession').val(),
                                focus_id:focus_id,
                                focus_name:focus_name
                            };

                            $.ajax({
                                type: 'post',
                                url: '/vip_action/submitProfile',
                                data: post_data,
                                dataType: 'json',
                                async: true,
                                success: function (result) {
                                    if(result.success == true){
                                        window.location.href = '/vip/pay';
                                    }else{
                                        messenger(result.error.message,0);
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
});