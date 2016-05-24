/**
 * Created by bh on 2016/1/29.
 */
require.config({
    "baseUrl":WeiK.REQUEST_ROOT+"/common"
});
require([
    "lib/jquery"
],function(){
    var ajax_true={
        getAuthCodeForUpdatePWD:WeiK.REQUEST_ROOT+'/user/getAuthCodeForUpdatePWD',
        updatePasswdByMobile:WeiK.REQUEST_ROOT+'/user/updatePasswdByMobile'
    }
    //去除空格；
    var null_reg = /[ \s\x20\f\r\n]+/g;
    //验证电话；
    function checkPhone(){
        var phoneObj =$("#mobile").val().replace(null_reg,"");
        var tips=$("#mobile").siblings('.login_tips');
        var reg = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/;
        if(phoneObj==""){
            tips.addClass("tips_wrong").text("请输入手机号!");
            return false;
        }else{
            if(reg.test(phoneObj)){
                tips.removeClass("tips_wrong").text("");
            }else{
                tips.addClass("tips_wrong").text("请输入正确的手机号!");
                return false;
            }
        }
    }
    $("#mobile").blur(function(){
        checkPhone();
    });

    //获取验证码；
    var authCode=1111;
    function getCode(){
        var m = $("#mobile").val().replace(null_reg,"");
        var tips=$("#code").siblings('.login_tips');
        $.ajax({
            url:ajax_true.getAuthCodeForUpdatePWD,
            dataType:'json',
            method:'post',
            data:{
                mobile: m
            },
            success: function (data) {
                if(data.status!=0){
                    tips.addClass("tips_wrong").text(data.message);
                    return false;
                }else{
                    authCode = data.obj;
                }
            }
        });
    }
    //验证"验证码"
    function checkCode(){
        var getCode=$("#code").val().replace(null_reg,"");
        var tips=$("#code").siblings('.login_tips');
        if(getCode==""){
            tips.addClass("tips_wrong").text("请输入验证码!");
            return false;
        }else{
            if(getCode!=authCode){
                tips.addClass("tips_wrong").text("验证码输入错误!");
                return false;
            }else{
                tips.removeClass("tips_wrong").text("");
                return true;
            }
        }
    }

    var isgeting = false;
    var getCodeTimer = null;
    $(".get_code").click(function(){
        var validPhone = checkPhone();
        if(!isgeting&&!(validPhone==false)){
            getCode();
            isgeting = true;
            var i=30;
            $(".get_code").text("倒计时 "+i);
            getCodeTimer=setInterval(function(){
                i--;
                if(i<=0){
                    clearGetCodeTimer();
                }else{
                    $(".get_code").text("倒计时 "+i);
                }
            },1000);
        }
    });
    function clearGetCodeTimer(){
        if(getCodeTimer!=null){
            clearInterval(getCodeTimer);
            isgeting = false;
            $(".get_code").text("获取验证码");
            getCodeTimer = null;
        }
    }
    $("#code").blur(function(){
        checkCode();
    });

    $(".reset_submit").click(function(){
        $(".ipt1").blur();
        var tips=$(".ipt1").siblings('.login_tips');
        if(!tips.hasClass("tips_wrong")){
            var mobile=$("#mobile").val().replace(null_reg,"");
            $(".re_body").css({display:"none"});
            $(".reset_pwdBox").css({display:"block"});
        }
    });

    //    重置密码：
    //验证密码；
    function checkPwd(){
        var pwdObj =$("#password").val().replace(null_reg,"");
        var tips=$("#password").siblings('.login_tips');
        var reg=/[\w\W]{6,16}/;
        if(pwdObj==""){
            tips.addClass("tips_wrong").text("请输入密码!");
            return false;
        }else{
            if(reg.test(pwdObj)){
                tips.removeClass("tips_wrong").text("");
                return true;
            }else{
                tips.addClass("tips_wrong").text("请输入6—16位密码");
                return false;
            }
        }
    }
    $("#password").blur(function(){
        checkPwd();
    });
    //确认密码；
    $("#re_password").blur(function(){
        var pwdObj =$("#password").val().replace(null_reg,"");
        var re_pwdObj =$("#re_password").val().replace(null_reg,"");
        var tips=$("#re_password").siblings('.login_tips');
        if(re_pwdObj==""){
            tips.addClass("tips_wrong").text("请再次输入密码!");
            return false;
        }else{
            if(pwdObj==re_pwdObj){
                tips.removeClass("tips_wrong").text("");
                return true;
            }else{
                tips.addClass("tips_wrong").text("两次密码输入不一致!");
                return false;
            }
        }
    });

    $(".resetPwd_btn").click(function(){
        $(".ipt2").blur();
        var tips=$(".ipt2").siblings('.login_tips');
        if(!tips.hasClass("tips_wrong")){
            var mobile=$("#mobile").val().replace(null_reg,"");
            var pwd=$("#password").val().replace(null_reg,"");
            var authCode=$("#code").val().replace(null_reg,"");
            $.ajax({
                method:"post",
                dataType:"json",
                url:ajax_true.updatePasswdByMobile,
                data:{
                    mobile:mobile,
                    newPassword:pwd,
                    authCode:authCode
                },
                success:function(result){
                    if(result.status==0){
                        $(".red_msg").animate({height:"100%"});
                        $(".red_msg_title").text("恭喜您修改密码成功!").animate({opacity:1},500,function(){
                            setTimeout(function(){
                                $(".red_msg").animate({height:0});
                                $(".red_msg_title").animate({opacity:0},function(){
                                    $(".red_msg_title").text("");
                                    window.location.href="index.html";
                                });
                            },800);
                        });
                    }else{
                        $(".red_msg").animate({height:"100%"});
                        $(".red_msg_title").text("很遗憾，修改密码失败！").animate({opacity:1},500,function(){
                            setTimeout(function(){
                                $(".red_msg").animate({height:0});
                                $(".red_msg_title").animate({opacity:0},function(){
                                    $(".red_msg_title").text("");
                                });
                            },800);
                        });
                    }
                }
            })
        }
    })

});