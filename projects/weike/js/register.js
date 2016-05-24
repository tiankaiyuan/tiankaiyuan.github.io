require.config({
    "baseUrl":WeiK.REQUEST_ROOT+"/common"
});
require([
    "lib/jquery"
],function(){
    var ajax_true={
        checkName:WeiK.REQUEST_ROOT+'/user/checkName',
        getAuthCode:WeiK.REQUEST_ROOT+'/user/getAuthCode',
        reg:WeiK.REQUEST_ROOT+'/user/reg'
    }
    //去除空格；
    var null_reg = /[ \s\x20\f\r\n]+/g;
    //验证用户名：
    function checkName(){
        var userNameObj =$("#userName").val().replace(null_reg,"");
        var tips=$("#userName").siblings('.tips');
        if(userNameObj==""){
            tips.addClass("tips_wrong").text("请输入用户名!");
            return false;
        }else{
            tips.removeClass("tips_wrong").text("");
        }
    }
    $("#userName").blur(function(){
        checkName();
    });
    //验证学校；
    function checkOrg(){
        var orgVal=$("#org").val().replace(null_reg,"");
        var tips=$("#org").siblings('.tips');
        if(orgVal==""){
            tips.addClass("tips_wrong").text("请输入学校名!");
            return false;
        }else{
            tips.removeClass("tips_wrong").text("");
        }
    }
    $("#org").blur(function(){
        checkOrg();
    });
    //验证职务；
    function checkJob(){
        var jobVal=$("#jobTitle").val().replace(null_reg,"");
        var tips=$("#jobTitle").siblings('.tips');
        if(jobVal==""){
            tips.addClass("tips_wrong").text("请输入职务名!");
            return false;
        }else{
            tips.removeClass("tips_wrong").text("");
        }
    }
    $("#jobTitle").blur(function(){
        checkJob();
    });
    //验证地区；
    function checkAddress(){
        var s1=$("#s1").val(),
            s2=$("#s2").val(),
            s3=$("#s3").val(),
            tips=$(".address").siblings('.tips');
        if(s1=="省份"){
            tips.addClass("tips_wrong").text("请选择省!");
            return false;
        }else if(s2=="地级市"){
            tips.addClass("tips_wrong").text("请选择市!");
            return false;
        }else if(s3=="市、县级市、县"){
            tips.addClass("tips_wrong").text("请选择县!");
            return false;
        }else{
            tips.removeClass("tips_wrong").text("");
        }
    }
    $(".address #s1").blur(function(){
        checkAddress();
    });
    $(".address #s2").blur(function(){
        checkAddress();
    });
    $(".address #s3").blur(function(){
        checkAddress();
    });
    //验证电话；
    function checkPhone(){
        var phoneObj =$("#mobile").val().replace(null_reg,"");
        var tips=$("#mobile").siblings('.tips');
        var reg = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/;
        if(phoneObj==""){
            tips.addClass("tips_wrong").text("请输入手机号!");
            return false;
        }else{
            if(reg.test(phoneObj)){
                $.ajax({
                    method:"post",
                    url:ajax_true.checkName,
                    data:{loginName:phoneObj},
                    dataType:"html",
                    success:function(data){
                        if(data=="true"){
                            tips.removeClass("tips_wrong").text("");
                            return true;
                        }else{
                            tips.addClass("tips_wrong").text("该用户已经注册，请直接登录");
                            return false;
                        }
                    }
                });
            }else{
                tips.addClass("tips_wrong").text("请输入正确的手机号!");
                return false;
            }
        }
    }
    $("#mobile").blur(function(){
        checkPhone();
    });
    //验证密码；
    function checkPwd(){
        var pwdObj =$("#password").val().replace(null_reg,"");
        var tips=$("#password").siblings('.tips');
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
        var tips=$("#re_password").siblings('.tips');
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
    //获取验证码；
    var authCode=1111;
    function getCode(){
        var m = $("#mobile").val().replace(null_reg,"");
        var tips=$("#code").siblings('.tips');
        $.ajax({
            url:ajax_true.getAuthCode,
            dataType:'json',
            method:'get',
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
        var tips=$("#code").siblings('.tips');
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
    //提交；
    $(".submit").click(function(){
        $(".ipt").blur();
        $('.address .select').blur();
        var tips=$(".ipt").siblings('.tips');
        if(!tips.hasClass("tips_wrong")){
            var userName=$("#userName").val().replace(null_reg,""),
                org=$("#org").val().replace(null_reg,""),
                jobTitle=$("#jobTitle").val().replace(null_reg,""),
                province=$("#s1").val().replace(null_reg,""),
                city=$("#s2").val().replace(null_reg,""),
                area=$("#s3").val().replace(null_reg,""),
                mobile=$("#mobile").val().replace(null_reg,""),
                pwd=$("#password").val().replace(null_reg,""),
                authCode=$("#code").val().replace(null_reg,"");
            $.ajax({
                method:"post",
                dataType:"json",
                url:ajax_true.reg,
                data:{
                    realName:userName,
                    org:org,
                    jobTitle:jobTitle,
                    province:province,
                    city:city,
                    area:area,
                    mobile:mobile,
                    password:pwd,
                    authCode:authCode
                },
                success:function(result){
                    if(result.status==0){
                        $(".red_msg").animate({height:"100%"});
                        $(".red_msg_title").text("恭喜您注册成功!").animate({opacity:1},500,function(){
                            setTimeout(function(){
                                $(".red_msg").animate({height:0});
                                $(".red_msg_title").animate({opacity:0},function(){
                                    $(".red_msg_title").text("");
                                    window.location.href="../teacher/teacher_index.html";
                                });
                            },800);
                        });
                    }else{
                        $(".red_msg").animate({height:"100%"});
                        $(".red_msg_title").text("很遗憾，注册失败！").animate({opacity:1},500,function(){
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
    });

});