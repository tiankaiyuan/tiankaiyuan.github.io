/**
 * Created by Administrator on 2016/4/2.
 */
$(document).ready(function(){
    console.log("running");
    var box = $(".center-box");
    var newWin = $(".winContainer");
    var nbox = box.nextAll();
    var flagOver = 0;
    var overOne = 1;
//  展示 隐藏模块
    box.mouseover(function(){
        var positionL =0;
        var positionT =0;
        var nextbox = box;
        var cheight = $(".show-container").height();
        //cheight=parseInt(cheight);
        var cwidth  = $(".show-container").width();
       // cwidth = parseInt(cwidth);
        if(flagOver||(!overOne))
        {
            return false;
        }
        overOne = 0;
        console.log("mouseover running");
        for(positionT=0;positionT<cheight;positionT+=200) {
            console.log(positionT);
            for(positionL =0;positionL<cwidth;positionL+=400) {
                //if(positionT==200&&positionL==400)
                //{
                //    continue;
                //}
                nextbox = nextbox.next();
                nextbox.delay(500).animate({
                    left: positionL,
                    top: positionT,
                    borderRadius: "6.2%",
                    width: "210px",
                    height: "130px",
                    padding: "16px"
                    //margin: "50px"
                }, 1000
                  //  step: function (now, fx) {
                   //     $(".show-box").css("transform", "translate(0,0)");
                    //}
                ,function(){
                    $(this).css("box-shadow","10px 10px 5px #888888");
                    if(flagOver) {
                        return;
                    }
                    flagOver = 1;
                    overOne = 1;
                 });
            }
        }
        console.log("end");
    });
    // 将展示的隐藏模块隐藏
    var intervalFlag =null;
    var clickOne = 1;
    //var timeClear =null;
    box.click(function () {
            console.log("click running");
            //dbOverFlag = 0;
            var positionL = 0;
            var positionT = "200";
            clearTimeout(intervalFlag);
            intervalFlag = setTimeout(function(){
                if((!flagOver)||(!clickOne))
                {
                    return;
                }
                clickOne =0;

                // 解决多次触发 over 和 click 只清除一次shadow 问题
                //clearTimeout(timeClear);
                //timeClear  = setTimeout(function(){
                //    console.log("clear shadow");
                //    for(var z=0;z<nbox.length;z++){
                //        nbox.eq(z).css("box-shadow","none");
                //    }
                //},2000);

                for(var z=0;z<nbox.length;z++)
                {
                    console.log(nbox.eq(z).css("box-shadow"));
                    //if(nbox.eq(z).css("box-shadow")=="none")
                    //{
                        //setTimeout() 只执行 code 一次。如果要多次调用，请使用 setInterval() 或者让 code 自身再次调用 setTimeout()。break;
                    //}
                    //else{
                        nbox.eq(z).css("box-shadow","none");
                    //}
                }
                for (var j = 0; j < 3; j++) {
                    // console.log(nbox[j]);
                    nbox.eq(j).animate({
                        left: positionL,
                        top: positionT,
                        //borderRadius: "0",
                        //width: "300px",
                        //height: "100px",
                        //margin: "50px",
                    }, {
                        duration: 1000,
                    });
                    //console.log("j=" + j);
                    for (var i = j + 5; i < 8; i += 5) {
                        //console.log("running forL");
                        //nbox = nbox.next();
                        nbox.eq(i).animate({
                            left: positionL,
                            top: positionT,
                            //borderRadius: "0",
                            //width: "300px",
                            //height: "100px",
                            //margin: "50px",

                        }, {
                            duration: 1000,
                            // step: function (now, fx) {
                            //   $(".show-box").css("transform", "translate(0,0)");
                            //}
                        });
                        //console.log(positionL);
                    }
                    positionL += 400;
                }
                $(".show-box").delay(1100).animate({
                    height: 100,
                    width: 100,
                    left: "550",
                    top: "250",
                    borderRadius: "50%",
                    margin: 0
                },
                   1000
                    //step: function (now, fx) {
                    //    $(".show-box").css("transform", "translate(-50%,-50%)");
                    //}
                ,function(){
                  if(!flagOver){
                      return;
                  }
                   clickOne  = 1;
                   flagOver = 0;
                });
                console.log("end");
            },250);
            //      var cheight = $(".show-container").height();
            //cheight=parseInt(cheight);
            //     var cwidth  = $(".show-container").width();
            // cwidth = parseInt(cwidth);
            //
        });
    //单击显示文本 双击关闭
    !function(){
        var length = nbox.length;
        //console.log("buf length ="+textBuf.length);
        for(var i=0;i<length;i++){
          nbox.eq(i).click(function(){
            newWin.css("z-index","200");
            newWin.slideDown("slow");
            newWin.find("span").text($(this).text());
            return false;
        });
      }
      newWin.dblclick(function(){
            newWin.slideUp("slow");
            console.log("dblclick");
            return false;
        });
    }();
    var dbFlag = 0;
    box.dblclick(function(){
        clearTimeout(intervalFlag);
        if(!dbFlag){
            dbFlag = 1;
            box.css({backgroundImage:"url(image/w.jpg)",backgroundSize: "auto 100%",
            backgroundPosition:"bottom",
            backgroundRepeat:"no-repeat"
        }).text("");
            box.animate({
                top:200,
                left:500,
                width:"200px",
                height:"200px"
            },"swing");
            return false;
        }
        dbFlag = 0;
        box.animate({
            top:250,
            left:550,
            width:"100px",
            height:"100px"
        },"swing");
        box.css("backgroundImage","url(image/150.jpg)").text("田凯远");
        return false;

    });

});