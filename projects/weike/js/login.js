require.config({
    "baseUrl":WeiK.REQUEST_ROOT+"/common"
});
require([
    "lib/jquery"
],function(){
    var ajax_true={
        userLogin:WeiK.REQUEST_ROOT+'/user/login'
    }
    //去除空格；
    var null_reg = /[ \s\x20\f\r\n]+/g;
    //验证手机号；
    function checkUser() {
        var ueseObj = $("#user").val().replace(null_reg, "");
        var tips = $("#user").siblings('.login_tips');
        if (ueseObj == "") {
            tips.addClass("tips_wrong").text("请输入用户名!");
            return false;
        }else{
            tips.removeClass("tips_wrong").text("");
            return true;
        }
    }
    $("#user").blur(function(){
        checkUser();
    });
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

    //提交；
    $(".submit").click(function(){
        $(".ipt").blur();
        var tips=$(".ipt").siblings('.login_tips');
        if(!tips.hasClass("tips_wrong")){
            var username=$("#user").val().replace(null_reg,"");
            var pwd=$("#password").val().replace(null_reg,"");
            $.ajax({
                method:"post",
                dataType:"json",
                url:ajax_true.userLogin,
                data:{
                    username:username,
                    password:pwd
                },
                success:function(result){
                    if(result.status==0){
                        //   跳转；
                        $(".submit_tips").css({display:"block"}).text("正在跳转，请耐心等待!");
                        window.location.href="index.html";
                    }else{
                        $(".submit_tips").css({display:"block"}).addClass("tips_wrong").text(result.msg);
                    }
                }
            })
        }
    });
});