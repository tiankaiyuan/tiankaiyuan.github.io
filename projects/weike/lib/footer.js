
require.config({
    "baseUrl":WeiK.REQUEST_ROOT+"/common"
});
define([
    "lib/jquery"
],function(){
    var ajax_true={
        messageAdd:WeiK.REQUEST_ROOT+'/index/mes/add'
    }
    //    底部留言；
    var old_val;
    $(".message").focus(function(){
        old_val=$(this).val();
        if(old_val=="称呼"||old_val=="联系方式"||old_val=="说点什么吧?"||old_val=="请输入正确的姓名!"||old_val=="请输入手机号!"||old_val=="请输入正确的手机号!"){
            $(this).val("").css({color:"#000"});
        }else{
            $(this).css({color:"#000"});
        }
    });

    //去除空格；
    var null_reg = /[ \s\x20\f\r\n]+/g;
//    验证称呼；
    function checkName(){
        var nameObj =$("#userName").val().replace(null_reg,"");
        var reg = /[a-zA-Z]{1,20}|[\u4e00-\u9fa5]{1,10}/;
        if(nameObj==""||nameObj==null||nameObj=="称呼"||nameObj=="请输入正确的姓名!"){
            $("#userName").addClass("message_wrong").val("请输入正确的姓名!");
            return false;
        }else{
            if(reg.test(nameObj)){
                $("#userName").removeClass("message_wrong");
            }else{
                $("#userName").addClass("message_wrong").val("请输入正确的姓名!");
                return false;
            }
        }
    }
    $("#userName").blur(function(){
        checkName();
    });
//    验证手机号；
    function checkPhone(){
        var phoneObj =$("#phone").val().replace(null_reg,"");
        var reg = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/;
        if(phoneObj==""||phoneObj==""==null){
            $("#phone").addClass("message_wrong").val("请输入手机号!");
            return false;
        }else{
            if(reg.test(phoneObj)){
                $("#phone").removeClass("message_wrong");
            }else{
                $("#phone").addClass("message_wrong").val("请输入正确的手机号!");
                return false;
            }
        }
    }
    $("#phone").blur(function(){
        checkPhone();
    });

    $("#message").blur(function(){
        var message_val=$(this).val();
        if(message_val==null||message_val==""||message_val=="说点什么吧?"){
            $("#message").addClass("message_wrong").val("说点什么吧?");
        }else{
            $("#message").removeClass("message_wrong");
        }
    });

    $("#submit").click(function(){
        $(".message").blur();
        if(!$(".message").hasClass("message_wrong")){
            var userName=$("#userName").val();
            var phone=$("#phone").val();
            var message=$("#message").val();
            $.ajax({
                url:ajax_true.messageAdd,
                method:"post",
                dataType:"json",
                data:{
                    username:userName,
                    telephone:phone,
                    content:message
                },
                success:function(result){
                    if(result.status==0){
                        $("#userName").val(userName);
                        $("#phone").val(phone);
                        $("#message").val("说点什么吧?").css({color:"#999"});
                        $(".footer_right_message").css({display:"none"});
                        $(".footer_right_img_box").css({display:"block"}).animate({opacity:1},800,function(){
                            $(".footer_right_continue").click(function(){
                                $(".footer_right_img_box").animate({opacity:0},800,function(){
                                    $(".footer_right_img_box").css({display:"none"});
                                    $(".footer_right_message").css({display:"block"});
                                });
                            })
                        });
                    }else{
                        $(".red_msg").animate({height:"100%"},600);
                        $(".red_msg_title").html('<ul><li>很遗憾，留言失败！</li></ul>').animate({opacity:1,height:"180px"},800,function(){
                            setTimeout(function(){
                                $(".red_msg").animate({height:0});
                                $(".red_msg_title").animate({opacity:0,height:"180px"},function(){
                                    $(".red_msg_title").html("");
                                });
                            },600);
                        });
                    }
                }
            });
        }
    });

    //    返回顶部；
    var scrollTop_flag=true;
    $(window).scroll(function(){
        var scrollTop=$(document).scrollTop();
        if(scrollTop_flag){
            if(scrollTop>1200){
                $(".backTop").css({display:"block"}).animate({opacity:1});
                scrollTop_flag=false;
            }
        }else{
            if(scrollTop<=1200){
                $(".backTop").animate({opacity:0},function(){
                    $(".backTop").css({display:"none"});
                });
                scrollTop_flag=true;
            }
        }
    });
    $(".backTop").click(function(){
        $("body,html").animate({ scrollTop:0});
    });
});