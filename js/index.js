/**
 * Created by Administrator on 2016/5/4.
 */
$(function(){
    $(".load").remove();
    function centerPersent(sonS,farS){
        alert((1-$(sonS).height()/$(farS).height())/2*100);
        alert((1-$(sonS).width()/$(farS).width())/2*100);
    }

    // 导航栏展开 与 回缩
    (function navList(){
        var nav= $(".nav");
        var navBar = $(".navigation-bar");
        var wave = $(".wave");
        nav.mouseover(function(){
           console.log("runing");
           navBar.width(82);
           wave.css({animationPlayState:"paused",width:0,height:0});
        });
        nav.mouseout(function(){
           navBar.width(0);
           wave.css({animationPlayState:"running",width:40,height:40});
        })
    })();
    //导航栏 内部字体图标与文字说明切换
    (function navBar(){
        var navFa= $("span.navfir");
        var navNext = $("span.navnext");
        var navA  = $("a.link-a");
        var conteC = $(".conte-container");
        var navAWid = navA.width();
        var faWid   = navFa.width();
        var len    = conteC.length;
        var Meve =function(i,eve){
            function callbackF(e){
                if(e.type=="mouseover"){
                    //$(this).width(0);
                    navFa.eq(i).width(0);
                    navNext.eq(i).width(navAWid);
                }
                else if(e.type=="mouseout"){
                    navFa.eq(i).width(faWid);
                    navNext.eq(i).width(0);
                    //$(this).width(0);
                    //console.log(navFa.length);
                }
            }
            return callbackF;
        };
        for(var i=0;i<len;i++){
        //    navFa.eq(i).mouseover(Meve(i,"over"));
        //    navNext.eq(i).mouseout(Meve(i,"out"));
            conteC.eq(i).mouseover(Meve(i,"over"));
            conteC.eq(i).mouseout(Meve(i,"out"));
        }
    })();
    //分布layer-1 中的展示模块
    (function layout1(){
        var openFlag = true;
        var closeFlag = false;
        var box = $(".show-box");
        var cenBox = $(".center-box");
        var boxC = box.length;
        var conB = $(".show-container");
        var conH = conB.height();
        var conW = conB.width();
        var boxH = cenBox.height();
        var boxW = cenBox.width();
        var loopC = Math.sqrt(boxC);
        //var bPosiX = 0;
        //var bPosiY = 0;
        var ind=0;
        for(var i=0;i<390;i+=130){
            for(var j=0;j<630;j+=210){
                box.eq(ind).css({background:"url(images/b3.png) "+-j+"px "+-i+"px no-repeat"});
                ind +=1;
            }
        }

        ///计算两个整数的百分比值
        box.first().click(function(){
            var intvW = (1-3*(boxW/conW))/4*100;// 计算行向 展示模块的间距
            var intvH = (1-3*(boxH/conH))/4*100;// 计算列向 展示模块的间距 每次点击都需要更新
            if(openFlag==true){
                openFlag =flag;
                console.log(boxH);
                var positionL =intvW;
                var positionT =intvH;
                var index=0;
                var flag=false;
                for (var i = 0; i <loopC ; i++) {
                    for(var j=0;j<loopC;j++){
                        if(flag==false){
                            box.eq(index).css({
                                left:intvW+"%",
                                top:intvH+"%"
                                //background:"url(images/b3.png) "+bPosiX+"% "+bPosiY+"% no-repeat  "//背景图片使用%时 是图片x% %y  与背景区域 x% %y 重合
                            });
                            intvW = intvW+(boxW/conW*100+positionL);
                            setTimeout((function(index,intvW,intvH){
                                return function(){
                                    box.eq(index).css({width:210,opacity:1});
                                     if(index==8){
                                        closeFlag=true;
                                    }
                                }
                            })(index,intvW,intvH),300*index);
                        }else{
                            intvW = intvW-(boxW/conW*100+positionL);
                            box.eq(index).css({
                                left:intvW+"%",
                                top:intvH+"%"
                                //background:"url(images/b2.jpg) "+bPosiX+"% "+bPosiY+"% no-repeat "
                            });
                            setTimeout((function(index){
                                //test(); 执行到return语句时才会使用function关键字创建test函数
                                return function test(){
                                    box.eq(index).css({width:210,opacity:1});
                                }
                            })(index),300*index);
                        }
                        index++;
                    }
                    flag = !flag;
                    console.log(intvH);
                    intvH = intvH+(boxH/conH*100+positionT);
                }
            }else{
                if(closeFlag==false){
                    return;
                }
                closeFlag=false;
                for(var i=boxC-1;i>0;i--){
                    setTimeout((function(i){
                        return function(){
                            box.eq(i).css({opacity:0});// 使元素消失
                        }
                    })(i),300*(8-i));
                    setTimeout((function(i){
                        return function(){
                            box.eq(i).css({top:0,left:0,width:0});//使元素回到开始的状态
                            if(i==1){
                                openFlag=true;
                            }
                        }
                    })(i),400*(8-i));
                }
            }
        });
    })();
     //鼠标移入展示模块效果
    (function(){
        var sBox = $(".show-box");
        var boxContent = $(".show-box-content");
        var w = sBox.width();
        var h = sBox.height();
        var boxCont = sBox.length;
        var animTime = 300;
        for(var i= 0;i<boxCont;i++){
            sBox.eq(i).bind("mouseenter mouseleave",
                (function(i){
                return function(e) {
                var x = (e.pageX - this.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
                var y = (e.pageY - this.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
                var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
                var eventType = e.type;
                var dirName = new Array('top','right','bottom','left');
                 if(e.type == 'mouseenter'){
                     boxContent.css({transition:"none"});
                       if(dirName[direction]=="top"){
                        boxContent.eq(i).css({
                            top:0,
                            left:0,
                            right:0,
                            bottom:"100%",
                            //transition:"bottom 0.5s linear,top 0.5s linear,left 0.5s linear,right 0.5s linear"
                        });
                        setTimeout(function(){
                            boxContent.eq(i).animate({
                                bottom:0
                            },animTime);
                        },10);
                    }else if(dirName[direction]=="right"){
                        boxContent.eq(i).css({
                            top:0,
                            left:"100%",
                            right:0,
                            bottom:0,
                            //transition:"bottom 0.5s linear,top 0.5s linear,left 0.5s linear,right 0.5s linear"
                        });
                        setTimeout(function(){
                            boxContent.eq(i).animate({
                                left:0
                            },animTime);
                        },10);
                    }else if(dirName[direction]=="bottom"){
                           boxContent.eq(i).css({
                               top:"100%",
                               left:0,
                               right:0,
                               bottom:0,
                               //transition:"bottom 0.5s linear,top 0.5s linear,left 0.5s linear,right 0.5s linear"
                           });
                           setTimeout(function(){
                               boxContent.eq(i).animate({
                                   top:0
                               },animTime);
                           },10);
                       }else{
                           boxContent.eq(i).css({
                               top:0,
                               left:0,
                               right:"100%",
                               bottom:0,
                               //transition:"bottom 0.5s linear,top 0.5s linear,left 0.5s linear,right 0.5s linear"
                           });
                           setTimeout(function(){
                               boxContent.eq(i).animate({
                                   right:0
                               },animTime);
                           },10);
                       }
                }else{
                    if(dirName[direction]=="top"){
                        boxContent.eq(i).animate({
                            bottom:"100%"
                        },animTime);
                    }else if(dirName[direction]=="right"){
                        boxContent.eq(i).animate({
                            left:"100%"
                        },animTime);
                    }else if(dirName[direction]=="bottom"){
                        boxContent.eq(i).animate({
                            top:"100%"
                        },animTime);
                    }else{
                        boxContent.eq(i).animate({
                            right:"100%"
                        },animTime);
                    }
                }
            };
            })(i)
            );
        }
    })();
    //第二层特效

    //绘制关闭图标
    (function(){
        var cav = document.getElementById("close-l2");
        //var c=$("#close-l2");
        //console.log(cav);
        var cxt = cav.getContext("2d");
        //var cxt=c.getContext("2d");
        cxt.moveTo(0,0);
        cxt.lineTo(25,25);
        cxt.moveTo(25,0);
        cxt.lineTo(0,25);
        cxt.strokeStyle="#FFFFFF";
        cxt.stroke();
        //console.log(cxt);
    })();
    (function(){
        var sBox = $(".show-box");
        var lay2 = $(".layer-2");
        var close = $("#close-l2");
        //var boxCont = sBox.length;
        var imgBox = $(".images");
        var textBox = $(".text");
        var textBuff = new Array(5);
        var effectBuff = new Array("burst","overTurn","warping","cube","pageTurning");
             textBuff[0]="万物凋敝，岁月老去。眼中少了泪花，多了留念，倚秦楼，看风雪，苍茫一片，恰似你肌肤";
        var layEffect = function(imgBox,textBox,text,effect){
            var changText = function(){
                textBox.text(text);
                textBox.animate({opacity:1});
            };
            textBox.on("click",function(){
                textBox.animate({opacity:0},100);
            });
            specialE(imgBox,textBox,effect,"1.png",4,changText);
        };
        for(var i= 0;i<5;i++){
            sBox.eq(i+1).on("click",(function(i){
                return function(){
                    //解绑其他 效果函数
                    imgBox.css({background:"url(images/1.png)"});
                    for(var j=0;j<5;j++){
                        specialE(imgBox,textBox,effectBuff[j],null,null,null,true);
                    }
                    lay2.css({zIndex:2,visibility:"visible"});
                    layEffect(imgBox,textBox,textBuff[i],effectBuff[i]);
                }
            })(i));
        }
        sBox.eq(8).on("click",function(){
            var sele ;
            for(var i=0;i<9;i++){
                 sele= ".num"+i;
                freeFall(sele,"bottom",0.20,15);
            }
        });
        close.on("click",function(){
            lay2.css({zIndex:0,visibility:"hidden"});
        });
    })();
    //console.log(centerPersent(".images",".layer-2"));
});
