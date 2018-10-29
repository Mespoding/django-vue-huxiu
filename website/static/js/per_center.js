define("per_center", function (require, exports) {
    function showBoxContent(a, b, c) {
        var d = '<div id="' + a + '" class="modal fade" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-body modal-body-alert"><div class="modal-alert-title">' + b + '</div> <i class="icon icon-alert-close" data-dismiss="modal"></i>' + c + "</div></div></div></div>";
        $("#" + a).length > 0 && $("#" + a).remove(), $("body").append(d), $("#" + a).modal()
    }

    function showBoxGuide(a) {
        $("html, body").animate({scrollTop: 259}, 300);
        var b = '<div id="' + a + '" class="modal fade" role="dialog"><div class="container"><div class="guide-warp-modal"><i data-dismiss="modal" class="icon  icon-guide-close"></i><div class="guide-title">由于业务调整，文集频道取消。<br>您文集中的相关文章已移至"我的收藏"中。<br>点击"我的收藏"可以继续浏览和编辑哦。</div><i data-dismiss="modal" class="icon icon-know-that"></i></div></div>';
        $("#" + a).length > 0 && $("#" + a).remove(), $("body").append(b), $("#" + a).modal(), localStorage.setItem("guide_flag", !0)
    }

    function getDayOption() {
        var a, b = parseInt(document.getElementById("b_y_show").innerHTML), c = parseInt(document.getElementById("b_m_show").innerHTML);
        a = 1 == c || 3 == c || 5 == c || 7 == c || 8 == c || 10 == c || 12 == c ? 31 : 4 == c || 6 == c || 9 == c || 11 == c ? 30 : b % 4 == 0 && b % 100 != 0 || b % 400 == 0 ? 29 : 28;
        var d = document.getElementById("b_d");
        d.innerHTML = '<li><span class="trangle trangle-top"></span></li>', d.length = 0;
        for (var e = 1; a >= e; e++) {
            var f = document.createElement("li");
            f.innerHTML = e, f.setAttribute("class", "menu-item js-menu-item"), d.appendChild(f)
        }
    }

    function dpDown(a) {
        $(".under-ul").css({display: "none"});
        var b = $(".js-edit-user-" + a).parent(".js-edit-user-info");
        b.hasClass("disabled") ? (b.parents(".acnt-item-box").find(".under-ul").slideUp(), b.removeClass("disabled"), b.find(".btn-dropdown-show").html("修改"), b.find(".icon").removeClass("icon-del").addClass("icon-add")) : (b.parents(".acnt-item-box").find(".under-ul").slideDown(), b.addClass("disabled"), b.find(".btn-dropdown-show").html("收起"), b.find(".icon").removeClass("icon-add").addClass("icon-del"))
    }

    function delayOpen() {
        var a = $("." + t_this);
        return delayTime > 1 ? (delayTime--, a.html(delayTime + "秒后重新发送..."), flag ? (setTimeout(function () {
            delayOpen()
        }, 1e3), void a.addClass("disabled")) : !1) : (a.removeClass("disabled"), a.html("免费获取"), t_this = "", !1)
    }

    function imgJcrop(a) {
        $("#showQrimg").empty(), $(".showQr-img").html("<img src='" + a.pic + "' id='element_id'/>"), $("#src").val(a.name), $("#element_id").Jcrop({
            aspectRatio: 1,
            allowSelect: !0,
            allowResize: !0,
            setSelect: [0, 0, 100, 100],
            boxWidth: 170,
            boxHeight: 170,
            onSelect: updateCoords
        })
    }

    function updateCoords(a) {
        $("#x").val(a.x), $("#y").val(a.y), $("#w").val(a.w), $("#h").val(a.h)
    }

    require("jquery.migrate.1.1.1"), require("jcrop/jquery.jcrop.min"), require("jquery.form"), require("jcrop/jquery.jcrop.css");
    var modal_build;
    require.async("modal_build", function (a) {
        modal_build = a
    });

    var goScrollTop = function (a) {
        var b = 170;
        if ($("#" + a).length > 0) {
            var c = $("#" + a).offset().top - b;
            $("html, body").animate({scrollTop: c}, 500)
        }
    };

    if ("true" != localStorage.getItem("guide_flag") && $(".per_center").length > 0, $(".per_center_body").length > 0 && $("body").css({"background-color": "#f0f4fb"}),

            // 查看更多
            $("body").on("click", ".js-sea-more-info", function () {
                var a = $(this);
                a.hasClass("active") ? ($(".more-user-info-box").slideUp(), $(".more-user-info-qr").slideUp(), $(this).html('更多<span class="caret"></span>')) : ($(".more-user-info-box").slideDown(), $(".more-user-info-qr").slideDown(), $(this).html('收起<span class="caret"></span>')), a.toggleClass("active")
            }),

            // 打开修改签名框
            $("body").on("click", ".js-edit-one", function () {
                var a = $(this);
                a.parents(".user-one").find(".show-span").toggleClass("hide"),
                    a.parents(".user-one").find(".hide-edit").toggleClass("hide")
            }),

            // 修改签名
            $("body").on("click", ".js-save-one", function () {
                var a = $(this), b = "/user/usersetting/", c = {
                    is_ajax: "1",
                    huxiu_hash_code: huxiu_hash_code,
                    yijuhua: $("#yijuhua").val()
                };
                a.hasClass("disabled") || (a.addClass("disabled"), $.ajax({
                    type: "post",
                    url: b,
                    data: c,
                    dataType: "json",
                    async: !0,
                    success: function (a) {
                        1 == a.result && (modal_build.showMessagePrompt(a.msg, "success"), location.reload())
                    },
                    error: function (a) {
                        console.log(a)
                    }
                }))
            }),

            $("body").on("mouseover", ".message-box ul li", function () {
                var a = $(this);
                a.find(".message-delete").removeClass("hide"), a.find(".message-inner-delete").removeClass("hide")
            }),

            $("body").on("mouseout", ".message-box ul li", function () {
                var a = $(this);
                a.find(".message-delete").addClass("hide"), a.find(".message-inner-delete").addClass("hide")
            }),

            $("body").on("mouseover", ".message-box .mod-art", function () {
                var a = $(this);
                a.find(".message-delete").removeClass("hide")
            }),

            $("body").on("mouseout", ".message-box .mod-art", function () {
                var a = $(this);
                a.find(".message-delete").addClass("hide")
            }),

        $(".js-dropdown-menu").length > 0 && $("body").on("click", ".js-menu-item", function () {
            $(this).parents(".js-dropdown-menu").find(".js-dropdown-show").html($(this).html()), $(this).parents(".js-dropdown-menu").find(".js-dropdown-show").attr("value", $(this).attr("value"))
        }),

        $(".js-form-group-birth").length > 0) {
        var year = document.getElementById("b_y");
        year.length = 0;
        for (var oDate = new Date, oCurrentYear = oDate.getFullYear(), i = oCurrentYear; i >= oCurrentYear - 100; i--) {
            var oLi = document.createElement("li");
            oLi.innerHTML = i, oLi.setAttribute("class", "menu-item js-menu-item"), year.appendChild(oLi)
        }
        var month = document.getElementById("b_m");
        month.length = 0;
        for (var i = 1; 12 >= i; i++) {
            var oLi = document.createElement("li");
            oLi.innerHTML = i, oLi.setAttribute("class", "menu-item js-menu-item"), month.appendChild(oLi)
        }
        getDayOption(), $(".js-dropdown-caret").click(function () {
            getDayOption()
        })
    }

    if ($("#avatar_uploader").length > 0) {
        var url = document.URL, id = url.substring(url.indexOf("#"));
        if ("#mdf_email" == id || "#mdf_mobile" == id || "#mdf_pw" == id || "#mdf_head" == id) {
            var u = id.replace("#mdf_", "");
            dpDown(u)
        }

        // 设置更改头像的相关参数
        swfobject.addDomLoadEvent(function () {
            var a = new fullAvatarEditor("avatar_uploader", 340, 750, {
                    id: "swf",
                    upload_url: "/user_action/change_avatar/?is_ajax=1&huxiu_hash_code=" + huxiu_hash_code,
                    src_upload: 2,
                    tab_visible: !1,
                    browse_box_width: 204,
                    browse_box_height: 204,
                    browse_button: "请上传您的头像",
                    checkbox_visible: !1,
                    avatar_sizes: "200*200|150*150|40*40",
                    avatar_sizes_desc: "200*200像素|150*150像素|40*40像素",
                    avatar_tools_visible: !1,
                    browse_box_align: "left"
                },
                function (a) {
                    console.log(a);
                    switch (a.code) {
                        case 1:  // 选择的图片不正确
                            $("#upload").addClass("disabled");
                            break;
                        case 2:  // 选择的图片正确，可以开始上传
                            $("#upload").removeClass("disabled");
                            break;
                        case 3:
                            0 == a.type || 1 == a.type;
                            break;
                        case 5:  // 服务器做出响应
                            1 == a.type && (a.content.sourceUrl,
                                // $(".js-head-img").attr("src", a.content.avatarUrls.join("\n").split("\n")[1] + "?random=" + parseInt(1e3 * Math.random())),
                                setTimeout(function () {
                                    location.reload()
                                }, 500))
                    }
                });

            $("#upload").click(function () {
                $(this).hasClass("disabled") ? alert("您还未选择图片！") : a.call("upload")
            })
        })
    }


    $("body").on("click", ".js-edit-user-info", function () {
        $(".under-ul").css({display: "none"}), $(".under-control").css({display: ""}), $(".btn-dropdown-show").html("修改");
        var a = $(this);
        a.hasClass("disabled") ? (a.parents(".acnt-item-box").find(".under-ul").slideUp(), a.removeClass("disabled"), a.find(".btn-dropdown-show").html("修改"), a.find(".icon").removeClass("icon-del").addClass("icon-add")) : (a.parents(".acnt-item-box").find(".under-ul").slideDown(), a.addClass("disabled"), a.find(".btn-dropdown-show").html("收起"), a.find(".icon").removeClass("icon-add").addClass("icon-del"))
    }),

        // 修改邮箱
        $("body").on("click", ".js-mdf-email", function () {
            var a = $(this), b = "/user_action/updateEmail/", c = {
                is_ajax: "1",
                huxiu_hash_code: huxiu_hash_code,
                password: $("#mdf_password").val(),
                username: $("#email").val(),
                captcha: $("#captcha_email").val()
            };
            a.hasClass("disabled") || (a.addClass("disabled"), $.ajax({
                type: "post",
                url: b,
                data: c,
                dataType: "json",
                async: !0,
                success: function (b) {
                    1 == b.success ? (modal_build.showMessagePrompt(b.data.message, "success"), location.reload()) : modal_build.showMessagePrompt(b.error.message, "error"), a.removeClass("disabled")
                },
                error: function (a) {
                    console.log(a)
                }
            }))
        });
    var delayTime = 0, flag = !0, t_this = "", embed_mobile_captcha;
    $("#new-mobile-gt-guide").length > 0 && setTimeout(function () {
        modal_build.loadScript("https://api.geetest.com/get.php", function () {
            embed_mobile_captcha = new window.Geetest({
                gt: "a5a3b6cdb1b821dd0e3033efa7ebc2e9",
                product: ""
            }).appendTo("#new-mobile-gt-guide")
        })
    }, 100),

        // 发送短信验证码
        $("body").on("click", ".js-btn-captcha-phone", function () {
            var a = $(this),
                b = "/user_action/mobileCaptcha/",
                c = {
                    is_ajax: "1",
                    huxiu_hash_code: huxiu_hash_code,
                    password: $("#mobile-password").val(),
                    username: $("#new-mobile").val(),
                },
                d = /^((1[0-9])+\d{9})$/;

            return d.test($("#new-mobile").val()) ?
                void(a.hasClass("disabled") || (a.addClass("disabled"),
                    $.ajax({
                        type: "post",
                        url: b,
                        data: c,
                        dataType: "json",
                        async: !0,
                        success: function (b) {
                            b.success ? (delayTime = 60, t_this = "js-btn-captcha-phone", delayOpen(),
                                modal_build.showMessagePrompt(b.data.message, "success")) :
                                (modal_build.showMessagePrompt(b.error.message, "error")), a.removeClass("disabled")
                        },
                        error: function (a) {
                            console.log(a)
                        }
                    }))) : (modal_build.showMessagePrompt("请输入正确的手机号", "error"), !1)
        }),

        // 更改手机号
        $("body").on("click", ".js-save-mobile", function () {
            var a = $(this), b = "/user_action/updateMobile/", c = {
                is_ajax: "1",
                huxiu_hash_code: huxiu_hash_code,
                password: $("#mobile-password").val(),
                username: $("#new-mobile").val(),
                captcha: $("#captcha").val(),
            };
            a.hasClass("disabled") || (a.addClass("disabled"), $.ajax({
                type: "post",
                url: b,
                data: c,
                dataType: "json",
                async: !0,
                success: function (b) {
                    b.success ? (a.removeClass("disabled"), modal_build.showMessagePrompt(b.data.message, "success"), a.parents(".acnt-item-box").find(".acnt-item-icon").addClass("icon-round-ok").removeClass("icon-round-warning"), a.parents(".acnt-item-box").find(".under-control").html($("#new-mobile").val()), dpDown("mobile"), $("#new-mobile").val(""), location.reload()) : modal_build.showMessagePrompt(b.error.message, "error"), a.removeClass("disabled")
                },
                error: function (a) {
                    console.log(a)
                }
            }))
        }),
        // find password by email
        $("body").on("click", ".js-btn-captcha-email", function () {
            var a = $(this),
                b = "/user_action/emailCaptcha/",
                c = {
                    is_ajax: "1",
                    huxiu_hash_code: huxiu_hash_code,
                    password: $("#mdf_password").val(),
                    username: $("#email").val()
                },
                d = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
            return "" == $("#email").val() ? (modal_build.showMessagePrompt("邮箱不能为空", "error"), !1) : d.test($("#email").val()) ? "" == $("#mdf_password").val() ? (modal_build.showMessagePrompt("密码不能为空", "error"), !1) : void(a.hasClass("disabled") || (a.addClass("disabled"),
                $.ajax({
                    type: "post",
                    url: b,
                    data: c,
                    dataType: "json",
                    async: !0,
                    success: function (b) {
                        a.removeClass("disabled"), 1 == b.success ? (delayTime = 60, t_this = "js-btn-captcha-email", delayOpen(), modal_build.showMessagePrompt(b.data.message, "success")) : (modal_build.showMessagePrompt(b.error.message, "error"), embed_mobile_captcha.refresh())
                    },
                    error: function (a) {
                        console.log(a)
                    }
                }))) : (modal_build.showMessagePrompt("邮箱格式不正确", "error"), !1)
        }),

        $("body").on("click", ".js-mdf-mobile", function () {
            var a = $(this), b = "/user/change_email", c = {
                is_ajax: "1",
                huxiu_hash_code: huxiu_hash_code,
                password: $("#mdf_password").val(),
                email: $("#email").val()
            };
            a.hasClass("disabled") || (a.addClass("disabled"), $.ajax({
                type: "post",
                url: b,
                data: c,
                dataType: "json",
                async: !0,
                success: function (b) {
                    1 == b.result && (a.removeClass("disabled"), modal_build.showMessagePrompt(b.msg, "success"), dpDown("email"), $("#email").val(""), $("#mdf_password").val(""))
                },
                error: function (a) {
                    console.log(a)
                }
            }))
        }), $("body").on("click", ".js-reset-pw", function () {
        var a = $(this), b = "/user_action/updatePassword/", c = {
            is_ajax: "1",
            huxiu_hash_code: huxiu_hash_code,
            old_password: $("#oldpassword").val(),
            password: $("#password1").val(),
            password2: $("#password2").val()
        };
        return c.password != c.password2 ? (modal_build.showMessagePrompt("两次密码不同", "error"), !1) : void $.ajax({
            type: "post",
            url: b,
            data: c,
            dataType: "json",
            async: !0,
            success: function (b) {
                b.success ? (modal_build.showMessagePrompt(b.data.message, "success"), dpDown("pw"), window.location.href = "/") : modal_build.showMessagePrompt(b.error.message, "error"), a.removeClass("disabled")
            },
            error: function (a) {
                console.log(a)
            }
        })
    }), $("body").on("click", ".js-reset-username", function () {
        var a = $(this), b = "/user_action/updateUsername/", c = {
            is_ajax: "1",
            huxiu_hash_code: huxiu_hash_code,
            username: $("#username").val()
        };
        a.hasClass("disabled") || (a.addClass("disabled"), $.ajax({
            type: "post",
            url: b,
            data: c,
            dataType: "json",
            async: !0,
            success: function (b) {
                b.success ? (modal_build.showMessagePrompt(b.data.message, "success"), dpDown("name"), location.reload()) : modal_build.showMessagePrompt(b.error.message, "error"), a.removeClass("disabled")
            },
            error: function (a) {
                console.log(a)
            }
        }))
    }), $("body").on("change", "#qrfileupload", function (a) {
        var b = a.target.files[0];
        if (b) {
            var c = new FileReader;
            c.onload = function () {
                var a = {pic: c.result};
                imgJcrop(a)
            }, c.readAsDataURL(b)
        }
    }), $("body").on("click", ".js-upload-wx-qr", function () {
        var a = "upload-wx-img", b = "上传二维码", c = '<div id="img_upload" class="upload-border"><div class="showQr-img" id="showQrimg" style="position: absolute"><img src="/static/img/usercard_no_erweima.jpg"></div><div class="prompt">图片格式必须为：bmp,jpg,jpeg,png格式的图片;不可大于2M<div class="img-btn-upload"><label class="jcrop-btn" for="qrfileupload"><span class="Qr-upload-btn"></span><input id="qrfileupload" accept="image/*" type="file" name="mypic" class="hide" img_width="280" img_height="156"><input type="hidden" id="src" name="src" /><input type="hidden" id="x" name="x" value="0"/><input type="hidden" id="y" name="y" value="0"/><input type="hidden" id="w" name="w" value="130"/><input type="hidden" id="h" name="h" value="130"/></label></div></div><button type="button" class="btn btn-gray btn-qr-gray js-upload_Qr" data-dismiss="modal">上传</button></div>';
        showBoxContent(a, b, c);
        var d = {huxiu_hash_code: huxiu_hash_code, uid: uid, type: "wx"};
        $.ajax({
            type: "post", url: "/user/qrcode_exist", data: d, dataType: "json", async: !0, success: function (a) {
                1 == a.result && imgJcrop(a)
            }
        })
    }), $("body").on("click", ".zfb-wx-title ul li", function () {
        var a = $(this);
        $(".zfb-wx-title ul li").removeClass("active"), a.addClass("active"), "tab-zhifubao" == a.attr("data-tab") ? ($(".zfb-warp").removeClass("hide"), $(".wx-warp").addClass("hide")) : ($(".zfb-warp").addClass("hide"), $(".wx-warp").removeClass("hide"))
    }), $("body").on("click", ".js-edit-tab", function () {
        $(".js-input-zfb").removeClass("hide"), $(".js-input-zfb").focus(), $(".js-control-zfb").addClass("hide")
    }), $("body").on("click", ".js-zfb-confirm", function () {
        var a = $(this), b = "/user/update_zfb", c = "";
        c = "true" == a.attr("data-type") ? {
            huxiu_hash_code: huxiu_hash_code,
            uid: uid,
            id: $("#zhifubao-id").val(),
            zhifubao: $("#zhifubao").val(),
            flag: a.attr("value")
        } : {
            huxiu_hash_code: huxiu_hash_code,
            uid: uid,
            id: $("#zhifubao-id").val(),
            zhifubao: $("#zhifubao").val(),
            flag: $("#zfb-flag").val()
        }, a.addClass("disabled"), $.ajax({
            type: "post",
            url: b,
            data: c,
            dataType: "json",
            async: !0,
            success: function (b) {
                "1" == b.result ? (modal_build.showMessagePrompt(b.msg, "success"), window.location.reload()) : modal_build.showMessagePrompt(b.msg, "error"), a.removeClass("disabled")
            }
        })
    }), $("body").on("click", ".js-upload_Qr", function () {
        var a = new Image, b = "", c = "";
        a.src = $("#element_id").attr("src"), a.onload = function () {
            b = a.width, c = a.height;
            var d = "/user/change_QRcode_server", e = {
                is_ajax: "1",
                huxiu_hash_code: huxiu_hash_code,
                src: $("#element_id").attr("src").indexOf("huxiu.com") > 0 ? $("#element_id").attr("src") : "",
                x: $("#x").val(),
                y: $("#y").val(),
                w: $("#w").val(),
                h: $("#h").val(),
                width: b,
                height: c,
                qr_type: "wx"
            };
            $("#Qr_code_upload").length > 0 || $("#qrfileupload").wrap('<form id="Qr_code_upload" action="' + d + '" method="post" enctype="multipart/form-data"></form>'), $("#Qr_code_upload").ajaxSubmit({
                dataType: "json",
                data: e,
                success: function (a) {
                    if (1 == a.result) {
                        $("#Qr-img-Success").attr("src", a.qr_url);
                        var b = "qr-modal-prompt", c = "<div>" + a.msg + "</div>";
                        $("#img_upload").remove(), showBoxContent(b, "", c), $(".modal-title").html("提示"), $("#img_upload").remove(), $(".Qr-modal").css({display: "none"})
                    } else modal_build.showMessagePrompt(a.msg, "error")
                },
                error: function (a) {
                    console.log(a)
                }
            })
        }
    }), $("body").on("click", ".js-ds-qr", function () {
        var a = $(this).attr("value");
        $.ajax({
            type: "post",
            url: "/user/qrcode_hidden",
            data: {uid: uid, huxiu_hash_code: huxiu_hash_code, hidden: a},
            dataType: "json",
            async: !0,
            success: function (a) {
                1 == a.result ? modal_build.showMessagePrompt(a.msg, "success") : modal_build.showMessagePrompt(a.msg, "error")
            },
            error: function (a) {
            }
        })
    }), $("body").on("click", ".js-btn-ctrbt", function () {
        var a = $(this);
        $.ajax({
            type: "post",
            url: "/setuser/draft2contribute",
            data: {is_ajax: "1", did: a.attr("did"), huxiu_hash_code: huxiu_hash_code},
            dataType: "json",
            async: !0,
            success: function (a) {
                1 == a.result ? (modal_build.showMessagePrompt(a.msg, "success"), location.reload()) : modal_build.showMessagePrompt(a.msg, "error")
            },
            error: function (a) {
            }
        })
    }), $("body").on("click", ".js-sc-zan", function () {
        var a = $(this), b = "/member/favorite_category_agree", c = {
            huxiu_hash_code: huxiu_hash_code,
            cid: a.attr("data-cid"),
            uid: a.attr("data-uid")
        };
        $.ajax({
            type: "post", url: b, data: c, dataType: "json", async: !0, success: function (b) {
                1 == b.result ? (modal_build.showMessagePrompt(b.msg, "success"), $.myDetection.gaDetection("点赞,个人中心-收藏夹,收藏夹点赞"), a.find("span").html(parseInt(a.find("span").html()) + 1), a.find("i").addClass("active")) : modal_build.showMessagePrompt(b.msg, "error")
            }
        })
    }), $("body").on("click", ".js-edit-sc-title", function () {
        var a = $(this).parents(".collect-box").find(".collect-title").text(), b = $(this).parents(".collect-box").attr("data-cid"), c = '<div class="edit-title-box"><div class="form-warp"> <label class="control-label-sc">收藏夹名称：</label><input class="control-input" id="name" value="' + a + '" placeholder="收藏夹名称"></div><div class="form-warp current-warp"></div><div class="btn-group"><div class="btn btn-determine js-edit-sc-title-modal" data-cid="' + b + '">确定</div><div class="btn btn-cancel" data-dismiss="modal">取消</div></div></div>';
        showBoxContent("edit-sc-title", "", c)
    }),

        // 给收藏夹改名
        $("body").on("click", ".js-edit-sc-title-modal", function () {
            var a = $(this), b = "/member/update_favorite_category/", c = {
                huxiu_hash_code: huxiu_hash_code,
                name: $("#name").val(),
                cid: a.attr("data-cid")
            };
            $.ajax({
                type: "post", url: b, data: c, dataType: "json", async: !0, success: function (a) {
                    1 == a.result ? (modal_build.showMessagePrompt(a.msg, "success"), location.reload()) : modal_build.showMessagePrompt(a.msg, "error")
                }
            })
        }), $("body").on("click", ".js-delete-sc", function () {
        var a = $(this).parents(".collect-box").attr("data-cid"), b = '<div class="edit-title-box"><div class="f3">确认要删除吗？</div><div class="form-warp current-warp"></div><div class="btn-group"><div class="btn btn-determine js-del-sc-modal" data-cid="' + a + '">确定</div><div class="btn btn-cancel" data-dismiss="modal">取消</div></div></div>';
        showBoxContent("del-sc", "", b)
    }),
        // 删除收藏夹
        $("body").on("click", ".js-del-sc-modal", function () {
            var a = $(this), b = "/member/delete_favorite_category/", c = {
                huxiu_hash_code: huxiu_hash_code,
                cid: a.attr("data-cid")
            };
            $.ajax({
                type: "post", url: b, data: c, dataType: "json", async: !0, success: function (a) {
                    1 == a.result ? (modal_build.showMessagePrompt(a.msg, "success"), location.reload()) : modal_build.showMessagePrompt(a.msg, "error")
                }
            })
        }), $("body").on("click", ".js-delete-article", function () {
        var a = $(this).attr("data-cid"), b = $(this).attr("data-aid"), c = '<div class="edit-title-box"><div class="f3">确认要删除吗？</div><div class="form-warp current-warp"></div><div class="btn-group"><div class="btn btn-determine js-del-article-modal" data-aid="' + b + '" data-cid="' + a + '">确定</div><div class="btn btn-cancel" data-dismiss="modal">取消</div></div></div>';
        showBoxContent("del-article", "", c)
    }),

        // 删除收藏
        $("body").on("click", ".js-del-article-modal", function () {
            var a = $(this), b = "/member/delete_favorite/", c = {
                huxiu_hash_code: huxiu_hash_code,
                cid: a.attr("data-cid"),
                aid: a.attr("data-aid")
            };
            $.ajax({
                type: "post", url: b, data: c, dataType: "json", async: !0, success: function (a) {
                    1 == a.result ? (modal_build.showMessagePrompt(a.msg, "success"), location.reload()) : modal_build.showMessagePrompt(a.msg, "error")
                }
            })
        }),

        // 修改资料
        $("body").on("click", ".js-user-section-save", function () {
            var a = ($(this), "/user/usersetting/"), b = {
                is_ajax: "1",
                huxiu_hash_code: huxiu_hash_code,
                name: $("#name").val(),
                sex: $("#sex").find(".active").find("input").val(),
                birthyear: $("#b_y_show").text(),
                birthmonth: $("#b_m_show").text(),
                birthday: $("#b_d_show").text(),
                company: $("#company").val(),
                yijuhua: $("#yijuhua").val(),
                position: $("#position").val(),
                address: $("#address").val(),
                weibo: $("#weibo").val(),
                weixin: $("#weixin").val(),
                wx_public: $("#wx_public").val()
            }, c = $(".js-dropdown-show");
            $.each(c, function (a, d) {
                if (void 0 != c.eq(a).attr("data-pmt")) {
                    var e = c.eq(a).attr("value"), // 0是所有人可见；1是仅云酒可见
                        f = "pmt[" + c.eq(a).attr("data-pmt") + "]";
                    b[f] = e
                }
            }), $.ajax({
                type: "post", url: a, data: b, dataType: "json", async: !0, success: function (a) {
                    1 == a.result ? (modal_build.showMessagePrompt(a.msg, "success"), location.reload()) : modal_build.showMessagePrompt(a.msg, "error")
                }
            })
        }),

    $("#Filedata").length > 0 && (require("ajaxfileupload"), $("body").on("change", "#Filedata", function (a) {
        return $.ajaxFileUpload({
            data: {is_ajax: "1", huxiu_hash_code: huxiu_hash_code, uploadtype: "public_erweima"},
            url: "/setuser/userUpload",
            secureuri: !1,
            fileElementId: "Filedata",
            dataType: "json",
            success: function (a) {
                "1" == a.result ? ($("#img_show").attr("src", a.server_pic), modal_build.showMessagePrompt(a.msg, "success")) : modal_build.showMessagePrompt(a.msg, "error")
            }
        }), !1
    })), $("body").on("click", ".js-author-add-tag", function () {
        var a = ($(this), "/user/get_tag_data"), b = {is_ajax: 1, huxiu_hash_code: huxiu_hash_code};
        $.ajax({
            type: "post", url: a, data: b, dataType: "json", async: !0, success: function (a) {
                if (1 == a.result) {
                    var b = "", c = "";
                    $.each(a.usertag, function (a, c) {
                        b += '<li data-tagid="' + c.tagid + '">' + c.tagname + '<i class="icon icon-tag-cancel js-icon-tag-cancel"></i></li>'
                    }), $.each(a.all_tags, function (a, b) {
                        c += 1 == b.status ? '<li class="selected" data-tagid="' + b.tagid + '">' + b.tagname + "</li>" : '<li data-tagid="' + b.tagid + '">' + b.tagname + "</li>"
                    });
                    var d = '<div class="author-content-tag"><div class="selected-title selected-tag">已设置<span>（<em>' + a.usertag.length + '</em>）</span>个标签:</div><ul class="selected-ul" id="user-tags">' + b + '</ul><div class="selected-title no-selected-tag">还可以选择<span>（<em>' + parseInt(8 - a.usertag.length) + '</em>）</span>个标签&nbsp;&nbsp;&nbsp;<a href="javascript:" class="js-tag-change">换一换</a></div><ul class="selected-optional" id="all-tags">' + c + '</ul><div class="selected-title no-selected-tag">添加新标签</div><div class="" style="margin-bottom: 30px"><input class="form-control" id="tagname" style="width: 280px;float: left;margin-right: 35px;"><button class="btn btn-default js-btn-add-tag">添加新标签</button></div><div class="modal-footer"><div class="clearfix text-right rep-moder-btm"><button class="btn btn-blue" style="width: 80px;" class="close" data-dismiss="modal">确定</button></div></div></div>';
                    showBoxContent("cy-tag", "添加相关标签", d)
                } else modal_build.showMessagePrompt(a.msg, "error")
            }
        })
    }), $("body").on("click", ".js-tag-change", function () {
        var a = ($(this), "/user/get_tag_data"), b = {is_ajax: 1, huxiu_hash_code: huxiu_hash_code};
        $.ajax({
            type: "post", url: a, data: b, dataType: "json", async: !0, success: function (a) {
                if (1 == a.result) {
                    var b = "";
                    $.each(a.all_tags, function (a, c) {
                        b += 1 == c.status ? '<li class="selected" data-tagid="' + c.tagid + '">' + c.tagname + "</li>" : '<li data-tagid="' + c.tagid + '">' + c.tagname + "</li>"
                    }), $("#all-tags").empty(), $("#all-tags").append(b)
                } else modal_build.showMessagePrompt(a.msg, "error")
            }
        })
    }), $("body").on("click", ".js-icon-tag-cancel", function () {
        var a = $(this), b = "/user/del_user_tag", c = {
            is_ajax: 1,
            huxiu_hash_code: huxiu_hash_code,
            tagid: a.parent("li").attr("data-tagid")
        };
        $.ajax({
            type: "post", url: b, data: c, dataType: "json", async: !0, success: function (b) {
                1 == b.result ? ($("#tag" + a.parent("li").attr("data-tagid")).remove(), a.parent("li").remove(), $(".selected-tag").find("span").find("em").html($("#user-tags").find("li").length), $(".no-selected-tag").find("span").find("em").html(parseInt(8 - $("#user-tags").find("li").length))) : modal_build.showMessagePrompt(b.msg, "error")
            }
        })
    }), $("body").on("click", "#all-tags li", function () {
        var a = $(this), b = "/user/add_user_tagid", c = {
            is_ajax: 1,
            huxiu_hash_code: huxiu_hash_code,
            tagid: a.attr("data-tagid")
        };
        $.ajax({
            type: "post", url: b, data: c, dataType: "json", async: !0, success: function (b) {
                if (1 == b.result) {
                    a.addClass("selected");
                    var c = '<li data-tagid="' + a.attr("data-tagid") + '">' + a.html() + '<i class="icon icon-tag-cancel js-icon-tag-cancel"></i></li>';
                    $("#user-tags").append(c), $(".selected-tag").find("span").find("em").html($("#user-tags").find("li").length), $(".no-selected-tag").find("span").find("em").html(parseInt(8 - $("#user-tags").find("li").length));
                    var d = '<li id="tag' + a.attr("data-tagid") + '" tagid="' + a.attr("data-tagid") + '">' + a.html() + "</li>";
                    $(".author-tag-box ul").append(d)
                } else modal_build.showMessagePrompt(b.msg, "error")
            }
        })
    }), $("body").on("click", ".js-btn-add-tag", function () {
        var a = $(this), b = "/user/add_user_tag", c = {
            is_ajax: 1,
            huxiu_hash_code: huxiu_hash_code,
            tagname: $("#tagname").val()
        };
        $.ajax({
            type: "post", url: b, data: c, dataType: "json", async: !0, success: function (b) {
                if (1 == b.result) {
                    a.addClass("selected");
                    var c = '<li data-tagid="' + b.tagid + '">' + b.tagname + '<i class="icon icon-tag-cancel js-icon-tag-cancel"></i></li>';
                    $("#user-tags").append(c), $(".selected-tag").find("span").find("em").html($("#user-tags").find("li").length), $(".no-selected-tag").find("span").find("em").html(parseInt(8 - $("#user-tags").find("li").length))
                } else modal_build.showMessagePrompt(b.msg, "error")
            }
        })
    });

    var btn;
    // 删除前询问下
    $(".js-pc-del-user").length > 0 && $(".js-pc-del-user").click(function () {
        btn = $(this);
        var a = '<div class="edit-title-box"><div class="f3">确认要删除吗？</div><div class="form-warp current-warp"></div><div class="btn-group"><div class="btn btn-determine js-pc-del_center">确定</div><div class="btn btn-cancel" data-dismiss="modal">取消</div></div></div>';
        showBoxContent("del_article_top", "", a)
    }),

        // 确认删除
        $("body").on("click", ".js-pc-del_center", function () {
            $("#del_article_top").remove();
            var oParent = btn.parents("li"),
                url = "/article/deldata/?is_ajax=1&huxiu_hash_code=" + huxiu_hash_code, param = {};
            param.actype = oParent.attr("type"), // article
                param.aid = oParent.attr("aid"),  // 下面这些id只有一个
                param.pid = oParent.attr("pid"),
                param.cid = oParent.attr("cid"),
                param.haid = oParent.attr("haid"),
                param.favid = oParent.attr("favid"),
                param.uid = oParent.attr("uid"),
                param.tag_id = oParent.attr("tagid"),
                param.plid = oParent.attr("plid"),
                param.pmid = oParent.attr("pmid"),
                param.did = oParent.attr("did"),
            void 0 != oParent.attr("did") && (url = "/article/del_draft/?is_ajax=1&huxiu_hash_code=" + huxiu_hash_code),
                $.post(url, param, function (data) {
                    // var data = eval("(" + data + ")");
                    // console.log(data);
                    1 == data.result ? (modal_build.showMessagePrompt(data.msg, "success"), oParent.remove()) : modal_build.showMessagePrompt(data.msg, "error"), window.location.reload()
                })
        }),

        // 解除账号绑定
        $("body").on("click", ".js-accnt-del", function () {
            var a = $(this), b = "/user/deleter_auth_bind", c = {
                is_ajax: "1",
                huxiu_hash_code: huxiu_hash_code,
                bid: a.attr("bid")
            };
            $.ajax({
                type: "post", url: b, data: c, dataType: "json", async: !0, success: function (a) {
                    1 == a.result ? (modal_build.showMessagePrompt(a.msg, "success"), location.reload()) : modal_build.showMessagePrompt(a.msg, "error")
                }
            })
        }), $("body").on("click", ".js-btn-message-modal", function () {
        var a = $(this).attr("uid"), b = $(this).attr("name"), c = '<div class="edit-title-box"><div class="message-name">发给：' + b + '</div><div class="message-text">内容：<textarea class="form-control" id="message-text-modal"></textarea></div><div class="form-warp current-warp"></div><div class="btn-group"><div class="btn btn-determine js-btn-message" data-uid="' + a + '">确定</div><div class="btn btn-cancel" data-dismiss="modal">取消</div></div></div>';
        showBoxContent("message", "发送私信", c)
    }),

        // 发送私信
        $("body").on("click", ".js-btn-message", function () {
            var a = $(this), b = "/member/send_private_msg/", c = {
                is_ajax: "1",
                huxiu_hash_code: huxiu_hash_code,
                touid: a.attr("data-uid"),
                message: $("#message-text-modal").val()
            };
            "" == $("#message-text-modal").val() && modal_build.showMessagePrompt("内容不能为空", "error"), $.ajax({
                type: "post",
                url: b,
                data: c,
                dataType: "json",
                async: !0,
                success: function (a) {
                    console.log(a);
                    1 == a.result ? (modal_build.showMessagePrompt(a.msg, "success"),
                        // $.myDetection.htmDetection("个人中心-发私信,点击,发送私信"),
                        location.reload()) : modal_build.showMessagePrompt(a.msg, "error")
                }
            })
        }), $("body").on("click", ".js-btn-accnt-blacklist", function () {
        var a = $(this), b = "/setuser/add_backuser", c = {
            is_ajax: "1",
            huxiu_hash_code: huxiu_hash_code,
            uid: a.attr("data-uid")
        };
        $.ajax({
            type: "post", url: b, data: c, dataType: "json", async: !0, success: function (a) {
                1 == a.result ? (modal_build.showMessagePrompt(a.msg, "success"), location.reload()) : modal_build.showMessagePrompt(a.msg, "error")
            }
        })
    }), $("body").on("click", ".js-sub-author-btn", function () {
        if (0 == uid)return void $(".login-link-box .js-login").trigger("click");
        var a = $(this), b = "/setuser/subauthor", c = {
            is_ajax: "1",
            random: parseInt(1e5 * Math.random()),
            huxiu_hash_code: huxiu_hash_code,
            subuid: a.attr("subuid"),
            subtype: a.attr("subtype")
        };
        a.hasClass("disabled") || (a.addClass("disabled"), $.ajax({
            type: "post",
            url: b,
            data: c,
            dataType: "json",
            async: !0,
            success: function (b) {
                1 == b.result ? (modal_build.showMessagePrompt(b.msg, "success"), "sub" == a.attr("subtype") ? a.attr({subtype: "delsub"}).html("取消订阅") : a.attr({subtype: "sub"}).html("订阅")) : modal_build.showMessagePrompt(b.msg, "error"), a.removeClass("disabled")
            }
        }))
    }), $("body").on("click", ".js-accnt-frozen", function () {
        var a = $(this), b = "/setuser/stop_user", c = {
            is_ajax: 1,
            huxiu_hash_code: huxiu_hash_code,
            uid: a.attr("uid"),
            type: a.attr("type")
        };
        a.hasClass("disabled") || (a.addClass("disabled"), $.ajax({
            type: "post",
            url: b,
            data: c,
            dataType: "json",
            async: !0,
            success: function (b) {
                1 == b.result ? (modal_build.showMessagePrompt(b.msg, "success"), "stopuser" == a.attr("type") ? (a.attr("type", "startuser"), a.html("取消封停")) : (a.attr("type", "stopuser"), a.html("账号封停"))) : modal_build.showMessagePrompt(b.msg, "error"), a.removeClass("disabled")
            }
        }))
    }), $("body").on("click", ".js-all-delete", function () {
        var a = $(this), b = '<div class="edit-title-box"><div class="f3">确认要删除吗？</div><div class="form-warp current-warp"></div><div class="btn-group"><div class="btn btn-determine all-delete-comments" uid="' + a.attr("uid") + '">确定</div><div class="btn btn-cancel" data-dismiss="modal">取消</div></div></div>';
        showBoxContent("del_all", "", b)
    }), $("body").on("click", ".all-delete-comments", function () {
        var a = $(this), b = "/tool/del_all_comments", c = {huxiu_hash_code: huxiu_hash_code, uid: a.attr("uid")};
        $.ajax({
            type: "post", url: b, data: c, dataType: "json", async: !0, success: function (a) {
                1 == a.result ? modal_build.showMessagePrompt(a.msg, "success") : modal_build.showMessagePrompt(a.msg, "error"), location.reload()
            }
        })
    }), $("body").on("click", ".js-apply-fm", function () {
        var a = "fm_author", b = '<div style="font-size: 16px;margin-top: 20px;line-height: 28px;"> 2015云酒冬季F&M节将于11月22日（周日全天）在北京国家会议中心举办，欢迎云酒作者报名参会。</div><div style="font-size: 16px;line-height: 18px; margin-top: 5px;">了解活动详情，请点击：<a style="color: #428bca" target="_blank" href="/zhuanti/hx2015winterfm">2015云酒冬季F&M节专题</a></div><br/><div class="form-group"><label>手机号</label><input id="mobile" name="mobile" placeholder="手机号" class="form-control" value="' + $(this).attr("data-mobile") + '"></div><div class="form-group" style="margin-bottom: 30px;"><label>邮箱</label><input id="email" name="email" placeholder="邮箱" class="form-control" value="' + $(this).attr("data-email") + '"></div><div class="edit-title-box"><div class="btn-group"><div class="btn btn-determine js-fm-author">确定</div><div class="btn btn-cancel" data-dismiss="modal">取消</div></div></div>';
        showBoxContent(a, "申请FM节作者票", b)
    }), $("body").on("click", ".js-apply-active", function () {
        var a = "fm_author", b = '<div style="font-size: 16px;margin-top: 20px;line-height: 28px;"><a style="color: #428bca" href="http://www.huxiu.com/article/141478.html" target="_blank">上道沙龙活动是什么？</a></div><br><div class="form-group"><label>手机号</label><input id="mobile" name="mobile" placeholder="手机号" class="form-control" value="' + $(this).attr("data-mobile") + '"></div><div class="form-group" style="margin-bottom: 30px;"><label>邮箱</label><input id="email" name="email" placeholder="邮箱" class="form-control" value="' + $(this).attr("data-email") + '"></div><div class="edit-title-box"><div class="btn-group"><div class="btn btn-determine js-active-author">确定</div><div class="btn btn-cancel" data-dismiss="modal">取消</div></div></div>';
        showBoxContent(a, "申请云酒“上道”第九期活动门票", b)
    }), $("body").on("click", ".js-fm-author", function () {
        $("#fm_author").find("#mobile").attr("value") ? $("#fm_author").find("#email").attr("value") ? $.ajax({
            type: "post", url: "/shop_action/submit_sd_author_order",
            data: {
                mobile: $("#fm_author").find("#mobile").attr("value"),
                email: $("#fm_author").find("#email").attr("value")
            }, dataType: "json", async: !0, success: function (a) {
                "1" == a.result ? (modal_build.showMessagePrompt(a.msg, "success"), $("#fm_author").modal("hide")) : modal_build.showMessagePrompt(a.msg, "error")
            }
        }) : modal_build.showMessagePrompt("邮箱不能为空哦", "error") : modal_build.showMessagePrompt("手机号不能为空哦", "error")
    }), $("body").on("click", ".js-active-author", function () {
        $("#fm_author").find("#mobile").attr("value") ? $("#fm_author").find("#email").attr("value") ? $.ajax({
            type: "post",
            url: "/shop_action/submit_sd_author_order",
            data: {
                mobile: $("#fm_author").find("#mobile").attr("value"),
                email: $("#fm_author").find("#email").attr("value")
            },
            dataType: "json",
            async: !0,
            success: function (a) {
                "1" == a.result ? (modal_build.showMessagePrompt(a.msg, "success"), $("#fm_author").modal("hide")) : modal_build.showMessagePrompt(a.msg, "error")
            }
        }) : modal_build.showMessagePrompt("邮箱不能为空哦", "error") : modal_build.showMessagePrompt("手机号不能为空哦", "error")
    });
    var getCyHtml = function (a, b, c) {
        var d = $("#product-li");
        d.hasClass("disabled") || (d.addClass("disabled"), $.ajax({
            type: "post",
            url: "/action/get_cy_list/",
            data: {uid: $("#product-li").attr("data-uid"), cy_type: a, page: b},
            dataType: "json",
            async: !0,
            success: function (a) {
                d.removeClass("disabled"), c(a, b)
            }
        }))
    }, cyResponse = function (a, b) {
        1 == a.result && (a.total_page <= b ? $(".js-get-product-more-list").addClass("hide") : ($(".js-get-product-more-list").removeClass("hide"), $(".js-get-product-more-list").attr("data-cur_page", b)), 1 == b ? $(".product-html-box .message-box ul").empty().append(a.data) : $(".product-html-box .message-box ul").append(a.data))
    };
    $("body").on("click", ".cy-nav-box li", function () {
        var a = $(this);
        $(".cy-nav-box li").removeClass("active"), a.addClass("active"), $("#product-li").attr("data-cy_type", a.attr("data-cy_type")), getCyHtml(a.attr("data-cy_type"), 1, cyResponse)
    }), $("body").on("click", ".js-get-product-more-list", function () {
        var a = $(this);
        getCyHtml($("#product-li").attr("data-cy_type"), parseInt(a.attr("data-cur_page")) + 1, cyResponse)
    });
    var initProduct = function () {
        $(".cy-nav-box li").removeClass("active"), $.each($(".cy-nav-box li"), function () {
            var a = $(this);
            return a.attr("data-cy_type") == $("#product-li").attr("data-cy_type") ? (a.addClass("active"), $("#product-li").attr("data-cy_type", a.attr("data-cy_type")), !1) : void 0
        }), getCyHtml($("#product-li").attr("data-cy_type"), 1, cyResponse)
    };
    $("#product-li").hasClass("active") && initProduct(), $("body").on("click", ".about-us-video li", function () {
        var a = $(this), b = a.attr("data-uid"), c = a.attr("data-tpid"), d = '<div style="margin-top: 30px"><embed wmode="window" flashvars="vid=' + b + "&amp;tpid=" + c + '&amp;autoplay=1" src="https://imgcache.qq.com/tencentvideo_v1/player/TencentPlayer.swf?max_age=86400&amp;v=20140714" quality="high" name="tenvideo_flash_player_1456997992511" bgcolor="#000000" width="100%" height="425px" align="middle" allowscriptaccess="always" allowfullscreen="true" type="application/x-shockwave-flash" pluginspage="http://get.adobe.com/cn/flashplayer/"></div>';
        showBoxContent("emptyModal", "视频", d)
    }), $("body").on("click", ".js-member-delete-topic", function () {
        var a = $(this), b = "/topic/delete_favorite/", c = {
            huxiu_hash_code: huxiu_hash_code,
            is_ajax: 1,
            topic_id: a.attr("data-topic-id")
        };
        confirm("确定要删除吗?") && $.ajax({
            type: "post",
            url: b,
            data: c,
            dataType: "json",
            async: !0,
            success: function (b) {
                1 == b.result ? (a.parents(".message-box").remove(), modal_build.showMessagePrompt(b.msg, "success")) : modal_build.showMessagePrompt(b.msg, "error")
            },
            error: function (a) {
            }
        })
    }), window.location.href.indexOf("#menu") > 0 && goScrollTop("user_menu");
    var getCountryCode = function () {
        $.ajax({
            type: "post", url: "/user_action/countryList/", dataType: "html", async: !0, success: function (a) {
                // var b = "";
                // for (var c in a.data)" " != c && $.each(a.data[c], function (a, c) {
                //     b += '<li data-code="' + c.country + '"><span class="name">' + c.name + '</span><span class="code">' + c.country + "</span></li>"
                // });
                $(".country-ul").empty().append(a)
            }, error: function (a) {
                "use strict";
                console.log(a)
            }
        })
    };

    // 修改密码
    $(".country-box").length > 0 && getCountryCode(),
        $(document).on("click", ".js-set-password", function () {
            var a = $(this), b = $("#password3").val(), c = $("#password4").val(), d = {password: b};
            return b != c ? (modal_build.showMessagePrompt("请输入相同的密码", "error"), !1) : void(a.hasClass("disabled") || (a.addClass("disabled"),
                $.ajax({
                    type: "post",
                    url: "/user_action/setPassword/",
                    data: d,
                    dataType: "json",
                    async: !0,
                    success: function (b) {
                        b.success ? (modal_build.showMessagePrompt(b.data.message), window.location.href = "/") : modal_build.showMessagePrompt(b.error.message, "error"), a.removeClass("disabled")
                    }
                })))
        })
});