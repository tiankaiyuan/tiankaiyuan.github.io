/**
 * Created by bh on 2016/3/10.
 */
require.config({
    baseUrl:WeiK.REQUEST_ROOT+"/common"
});
define(["lib/ajax"],function($http){
    function $Tool(){}
    //信息提示框(不带操作)
    $Tool.prototype.tips=function(message,status){
        var tipHtml='<div id="tips" class='+status+'>'+message+'</div>'
        $('body').append(tipHtml);
        setTimeout(function(){
            $('#tips').remove();
        },1200);
    };
    //居中的提示框；
    $Tool.prototype.centerTips=function(message){
        var tipHtml='<div id="centerTips">'+message+'</div>'
        $('body').append(tipHtml);
    };
    //代操作的提示框：
    $Tool.prototype.operaTips=function(callback){
        var tipsBtn='<div id="tipBtn"><p>您确定要删除？</p><p><span class="tipBtn_ok">确定</span><span class="tipBtn_no">取消</span></p></div>'
        $('body').append(tipsBtn);
        var tipBtn_ok=$('.tipBtn_ok'),tipBtn_no=$('.tipBtn_no');
        tipBtn_ok.off('click').click(function(){
                callback();
                $('#tipBtn').remove();
            }
         );
        tipBtn_no.off('click').click(function(){
            $('#tipBtn').remove();
        });
    };
    //时间格式转换（分钟）；
    $Tool.prototype.timeTransform=function(minuteTime){
        var TransformTime='', hour='',minute='';
        hour=parseInt(minuteTime/60);
        minute=minuteTime%60;
        if(hour==0&&minute!=0){
            TransformTime=minute+'分钟';
        }else if(minute==0&&hour!=0){
            TransformTime=hour+'小时';
        }else if(hour!=0&&minute!=0){
            TransformTime=hour+'小时'+minute+'分钟';
        }
        return TransformTime;
    };
    //登录弹出框；
    $Tool.prototype.loginTips=function(url){
        var ajax_url=url;
        var loginHtml='<div class="logT_mask"><form><div class="logT_wrap"><label class="logT_label" for="logT_user">用户名</label><div class="logT_group"><input type="text" id="logT_user" class="logT_input" placeholder="请输入登录名"><p class="logT_tips"></p></div></div><div class="logT_wrap"><label class="logT_label" for="logT_pwd">密码</label><div class="logT_group"><input type="password" id="logT_pwd" class="logT_input"><p class="logT_tips"></p></div></div> <div class="logT_wrap"><div class="logT_group"><span id="logT_submit">登录</span></div></div></form></div>';
        $('body').append(loginHtml);
    //    表单验证开始：
        //去除空格；
        var null_reg = /[ \s\x20\f\r\n]+/g;
        //    验证昵称；
        var logT_user=$("#logT_user"),
            logT_pwd=$("#logT_pwd");
        var userVal='',
            pwdVal='';
        function checkUser(logT_user){
            userVal=logT_user.val().replace(null_reg,"");
            var logT_tips=logT_user.siblings(".logT_tips");
            if(userVal==""){
                logT_tips.addClass("tips_wrong").text("请输入登录名!");
                return false;
            }else{
                logT_tips.removeClass("tips_wrong").text("");
                return true;
            }
        }
        function checkPwd(logT_pwd){
            pwdVal=logT_pwd.val().replace(null_reg,"");
            var logT_tips=logT_pwd.siblings(".logT_tips");
            var reg=/[\w\W]{6,16}/;
            if(pwdVal==""){
                logT_tips.addClass("tips_wrong").text("请输入密码!");
                return false;
            }else{
                if(reg.test(pwdVal)){
                    logT_tips.removeClass("tips_wrong").text("");
                    return true;
                }else{
                    logT_tips.addClass("tips_wrong").text("请输入6—16位密码");
                    return false;
                }
            }
        }
        logT_user.blur(function(){
            checkUser($(this));
        });
        logT_pwd.blur(function(){
            checkPwd($(this));
        });
        //提交；
        $("#logT_submit").click(function(){
            $(".logT_input").blur();
            var logT_tips=$(".logT_input").siblings('.logT_tips');
            if(!logT_tips.hasClass("tips_wrong")){
                userVal=logT_user.val().replace(null_reg,"");
                pwdVal=logT_pwd.val().replace(null_reg,"");
                $http.userLogin(ajax_url,userVal,pwdVal,function(result){
                    if(result.status==0){
                        $(".logT_mask").remove();
                        window.location.reload();
                    }else{
                        logT_user.siblings('.logT_tips').addClass("tips_wrong").text(result.msg);
                    }
                },true);
            }
        });
    };
    var $tool=new $Tool();
    return $tool;
});