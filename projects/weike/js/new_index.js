
require.config({
    "baseUrl":WeiK.REQUEST_ROOT+"/weike"
});
require([
    "lib/jquery",
    "lib/ejs_production",
    "lib/footer"
],function(){
    var ajax_true={
        currentUser:WeiK.REQUEST_ROOT+"/weike/json/currentUser"
    };
    function initPage(){
        $.ajax({
            url:ajax_true.currentUser,
            method:"post",
            dataType:"json",
            success:function(result){
                var headerHtml=new EJS({url:WeiK.REQUEST_ROOT+'/weike/ejs/header.ejs'}).render(result);
                $("#header_wrapper").append(headerHtml);
                if(result.status==0){
                    $("#login_regi").css({display:"none"});
                    $("#login_img").css({display:"block"});
                    $("#login_img img").attr({src:WeiK.REQUEST_ROOT+"/weike"+result.obj.headUrl});
                }else{
                    $("#login_regi").css({display:"block"});
                    $("#login_img").css({display:"none"});
                }
            }
        });
    }
    initPage();
    //    导航滑块的移动；
    function nav_float(ele,float){
        var lefts=ele.position().left;
        float.animate({left:lefts});
    }

    //    导航点击内容变换；
    function nav_content(index,ele){
        var eleTop=ele.eq(index).offset().top;
        $("body,html").animate({ scrollTop:eleTop});
    };
    var nav_list=$(".nav_list");
    var float=$(".float");
    var body_wrapper=$(".body_wrapper");
    nav_list.click(function(){
        var index=nav_list.index(this);
        nav_list.removeClass("nav_hover");
        $(this).addClass("nav_hover");
        nav_float($(this),float);
        nav_content(index,body_wrapper);
    });

    //banner图；
    var body_w=$("body").width();
    var banner_h=body_w/1400*690;
    $(".banner").height(banner_h);
    var banner_numBox=$(".banner_numBox li");
    var banner_list=$(".banner_list");
    banner_numBox.click(function(){
        var index=banner_numBox.index(this);
        banner_numBox.css({background:"none"});
        banner_numBox.eq(index).css({background:"#333"});

        banner_list.css({transition:"none",transform:"scale(0,0)",height:0});
        banner_list.eq(index).css({transition:"all 1s ease-out",transform:"scale(1,1)",height:"100%"});
    }).hover(function(){
        var index=banner_numBox.index(this);
        setNum=index;
        clearInterval(banner_set);
        banner_numBox.eq(index).click();
    },function(){
        banner_set=setInterval(set_fun,4000);
    });
    var setNum=0;
    function set_fun(){
        setNum++;
        if(setNum>4){
            setNum=0;
        }
        banner_numBox.eq(setNum).click();
    };
    var banner_set=setInterval(set_fun,4000);
//    页面从两端进入；
    var wrapper=$(".feature_wrapper_C");
    var windowH=$(window).height();
    var scrollTop=$(document).scrollTop();
    function top(){
        wrapper.each(function(){
            var top=$(this).offset().top;
            if(top-scrollTop<windowH){
                $(this).find(".floatL,.floatR").css({"transform":"translateX(0)"});
                $(this).siblings("h2").animate({opacity:1},800);
            }
        });
    }
    top();
    $(window).scroll(function(){
        scrollTop=$(document).scrollTop();
        top();
    });


//    点击联系购买；
    var clickPrice=$(".moreList_price a");
    clickPrice.click(function(){
        $(".red_msg").animate({height:"100%"},800);
        $(".red_msg_title").html('<ul><li class="footer_list1"><span>联系人:张万里</span>&nbsp;&nbsp;<span>18911390355</span></li></ul><div class="close"></div>').animate({opacity:1,height:"180px"},600,function(){
            $(".close").click(function(){
                $(".red_msg").animate({height:0});
                $(".red_msg_title").animate({opacity:0,height:"180px"},function(){
                    $(".red_msg_title").html("");
                });
            });
        });
    });

});