/**
 * Created by Administrator on 2016/4/27.
 */
var fx  = {
    buffer : function(obj, cur, target, fnDo, fnEnd, fs){
        if(!fs)fs=6;
        var now={};
        var x=0;
        var v=0;

        if(!obj.__last_timer)obj.__last_timer=0;
        // 获取时间
        var t=new Date().getTime();
        if(t-obj.__last_timer>20)
        {
            fnMove();
            obj.__last_timer=t;
        }
        clearInterval(obj.timer);
        obj.timer=setInterval(fnMove, 20);
        function fnMove(){
            v=Math.ceil((100-x)/fs);
            x+=v;
            for(var i in cur)
            {
                now[i]=(target[i]-cur[i])*x/100+cur[i];
            }
            if(fnDo)fnDo.call(obj, now);

            if(Math.abs(v)<1 && Math.abs(100-x)<1)
            {
                clearInterval(obj.timer);
                if(fnEnd)fnEnd.call(obj, target);
            }
//			clearInterval(obj.timer);
//			obj.timer=setInterval(fnMove,10);
        }
    },

    flex : function(obj, cur, target, fnDo, fnEnd, fs, ms){
        var MAX_SPEED=16;

        if(!fs)fs=6;
        if(!ms)ms=0.75;
        var now={};
        var x=0;	//0-100

        if(!obj.__flex_v)obj.__flex_v=0;

        if(!obj.__last_timer)obj.__last_timer=0;
        var t=new Date().getTime();
        if(t-obj.__last_timer>20)
        {
            fnMove();
            obj.__last_timer=t;
        }

        clearInterval(obj.timer);
        obj.timer=setInterval(fnMove, 20);

        function fnMove(){
            obj.__flex_v+=(100-x)/fs;
            obj.__flex_v*=ms;

            if(Math.abs(obj.__flex_v)>MAX_SPEED)obj.__flex_v=obj.__flex_v>0?MAX_SPEED:-MAX_SPEED;

            x+=obj.__flex_v;

            for(var i in cur)
            {
                now[i]=(target[i]-cur[i])*x/100+cur[i];
            }


            if(fnDo)fnDo.call(obj, now);

            if((Math.abs(obj.__flex_v) <1) && (Math.abs(100-x)<1))
            {
                clearInterval(obj.timer);
                if(fnEnd)fnEnd.call(obj, target);
                obj.__flex_v=0;
            }
        }
    },

    linear : function (obj, cur, target, fnDo, fnEnd, fs){
        if(!fs)fs=50;
        var now={};
        var x=0;
        var v=0;

        if(!obj.__last_timer)obj.__last_timer=0;
        var t=new Date().getTime();
        if(t-obj.__last_timer>20)
        {
            fnMove();
            obj.__last_timer=t;
        }

        clearInterval(obj.timer);
        obj.timer=setInterval(fnMove, 20);

        v=100/fs;
        function fnMove(){
            x+=v;

            for(var i in cur)
            {
                now[i]=(target[i]-cur[i])*x/100+cur[i];
            }

            if(fnDo)fnDo.call(obj, now);

            if(Math.abs(100-x)<1)
            {
                clearInterval(obj.timer);
                if(fnEnd)fnEnd.call(obj, target);
            }
        }
    },

    stop:function (obj){
        clearInterval(obj.timer);
    },

    move3 : function(obj, json, fnEnd, fTime, sType){
        var addEnd=fx.addEnd;

        fTime||(fTime=1);
        sType||(sType='ease');

        setTimeout(function (){
            Utils.setStyle3(obj, 'transition', sprintf('%1s all %2', fTime, sType));
            addEnd(obj, function (){
                Utils.setStyle3(obj, 'transition', 'none');
                if(fnEnd)fnEnd.apply(obj, arguments);
            }, json);

            setTimeout(function (){
                if(typeof json=='function')
                    json.call(obj);
                else
                    Utils.setStyle(obj, json);
            }, 0);
        }, 0);

    }
};

//监听css3运动终止
(function (){
    var aListener=[];	//{obj, fn, arg}
    if(!Modernizr.csstransitions)return;
    if(window.navigator.userAgent.toLowerCase().search('webkit')!=-1)
    {
        document.addEventListener('webkitTransitionEnd', endListrner, false);
    }
    else
    {
        document.addEventListener('transitionend', endListrner, false);
    }

    function endListrner(ev)
    {
        var oEvObj=ev.srcElement||ev.target;
        //alert(aListener.length);
        for(var i=0;i<aListener.length;i++)
        {
            if(oEvObj==aListener[i].obj)
            {
                aListener[i].fn.call(aListener[i].obj, aListener[i].arg);
                aListener.remove(aListener[i--]);
            }
        }
    }

    fx.addEnd=function (obj, fn, arg)
    {
        if(!obj || !fn)return;
        aListener.push({obj: obj, fn: fn, arg: arg});
    }
})();
// 特效接口函数
//selector 选择器
// spEffect     要使用的特效  "burst" "overTurn" "warping" "cube" "pageTurning"
// firstImg       images文件夹中要使用的图片的第一个图片标号
function specialE(selector,eveSelector,spEffect,firstImg,imgNum,funCallBack,unb){
    var now=parseInt(firstImg)-1;
    if(firstImg){
        var imgType = firstImg.substr(-4,4);
    }else{
        console.log("form error!");
    }
    var ready=true;
    var sele = $(eveSelector);
    var spe =spEffect;
    var oDiv = $(selector);
    var W=oDiv.width();
    var H=oDiv.height();
    var imgN= imgNum;
    var next =function(){
        return (now+1)%imgN;
    };
    if(unb!=true){
    //爆炸
        if(spe=="burst"){
            var burst = function(){
                if(!ready)return;
                ready=false;
                var R=4;
                var C=7;
                var cw=W/2;
                var ch=H/2;
                oDiv.innerHTML='';
                oDiv.css("background",'url(images/'+(next()+1)+imgType+') center no-repeat');
                var aData=[];

                var wait=R*C;

                for(var i=0;i<R;i++){
                    //console.log("delay");
                    for(var j=0;j<C;j++)
                    {
                        aData[i]={left: W*j/C, top: H*i/R};
                        var oNewDiv=$('<div>');
                        oNewDiv.css({
                            position: 'absolute',
                            width:Math.ceil(W/C)+'px',
                            height: Math.ceil(H/R)+'px',
                            background: 'url(images/'+(now+1)+imgType+') '+-aData[i].left+'px '+-aData[i].top+'px no-repeat', // -aData[i].left  -aData[i].top 使背景图片 向元素增加的相反方向偏移
                            left: aData[i].left+'px',
                            top: aData[i].top+'px'
    //					border:"1px solid red"
                        });

                        oDiv.append(oNewDiv);
                        //猜想每个页面浏览器使用一个线程处理 该线程负责解析html，css，和执行js脚本  正因为是单线程执行 所以当 js中出现一个很大的空循环时 页面出现假死现象 执行完脚本再去渲染页面。
                        var l=((aData[i].left+W/(2*C))-cw)*Utils.rnd(1,3)+cw-W/(2*C); //计算元素目的位置
                        var t=((aData[i].top+H/(2*R))-ch)*Utils.rnd(2,3)+ch-H/(2*R);
    //				var t=(aData[i].top)*Utils.rnd(2,3)+ch-H/(2*R);
                        setTimeout((function (oNewDiv,l,t){
                            return function ()
                            {
                                fx.buffer(
                                    oNewDiv,
                                    {	left: oNewDiv.offsetLeft,
                                        top: oNewDiv.offsetTop	,
                                        opacity: 100,
                                        x:0,
                                        y:0,
                                        z:0,
                                        scale:1,
                                        a:0
                                    },
                                    {	left: l,
                                        top: t,
                                        opacity: 1,
                                        x:Utils.rnd(-180, 180),
                                        y:Utils.rnd(-180, 180),
                                        z:Utils.rnd(-180, 180),
                                        scale:Utils.rnd(1.5, 3),
                                        a:1
                                    },
                                    function (now){
                                        this.style.left=now.left+'px';
                                        this.style.top=now.top+'px';
                                        this.style.opacity=now.opacity/100;
                                        Utils.setStyle3(oNewDiv, 'transform', 'perspective(500px) rotateX('+now.x+'deg) rotateY('+now.y+'deg) rotateZ('+now.z+'deg) scale('+now.scale+')');
                                    }, function (){
                                        setTimeout(function (){
                                            oNewDiv.remove();
                                        }, 1);
                                        if(--wait==0)
                                        {
                                            ready=true;
                                            //oDiv.children().remove();
                                            now=next();
                                            if(funCallBack){
                                                funCallBack();
                                            }
                                        }

                                    }, 10
                                );
                            };
                        })(oNewDiv[0],l,t), Utils.rnd(0,200));
                    }
                }
            };
            //sele.unbind("click",burst);
            sele.on("click",burst);
        }
    //翻转
        if(spe=="overTurn"){
            var overTurn = function(){
                if(!ready)return;
                ready=false;

                var R=3;
                var C=6;

                var wait=R*C;

                var dw=Math.ceil(W/C);
                var dh=Math.ceil(H/R);

                oDiv.css("background","none");
                //oDiv.children().remove();
                oDiv.innerHTML='';

                for(var i=0;i<C;i++)
                {
                    for(var j=0;j<R;j++)
                    {
                        var oNewDiv=document.createElement('div');
                        var t=Math.ceil(H*j/R);
                        var l=Math.ceil(W*i/C);

                        Utils.setStyle(oNewDiv, {
                            position: 'absolute', background: 'url(images/'+(now+1)+imgType+') '+-l+'px '+-t+'px no-repeat',
                            left: l+'px', top: t+'px', width: dw+'px', height: dh+'px'
                        });

                        (function (oNewDiv, l, t){
                            oNewDiv.ch=false;

                            setTimeout(function (){
                                fx.linear(oNewDiv, {y:0}, {y:180}, function (now){
                                    if(now.y>90 && !oNewDiv.ch)
                                    {
                                        oNewDiv.ch=true;
                                        oNewDiv.style.background='url(images/'+(next()+1)+imgType+') '+-l+'px '+-t+'px no-repeat';
                                    }

                                    if(now.y>90)
                                    {
                                        Utils.setStyle3(oNewDiv, 'transform', 'perspective(500px) rotateY('+now.y+'deg) scale(-1,1)');
                                    }
                                    else
                                    {
                                        Utils.setStyle3(oNewDiv, 'transform', 'perspective(500px) rotateY('+now.y+'deg)');
                                    }
                                }, function (){
                                    if((--wait)==0)
                                    {
                                        ready=true;
                                        oDiv.children().remove();
                                        oDiv.css("background",'url(images/'+(next()+1)+imgType+') center no-repeat');
                                        now=next();
                                        if(funCallBack){
                                            funCallBack();
                                        }
                                    }
                                }, 22);
                            }, (i+j)*200);
                        })(oNewDiv, l, t);

                        oDiv.append(oNewDiv);
                    }
                }


            };
            //sele.unbind("click",overTurn);
            sele.on("click",overTurn);
        }

    //扭曲
        if(spe=="warping"){
            var warping = function(){
                if(!ready)return;
                ready=false;
                var C=7;

                var wait=C;

                var dw=Math.ceil(W/C);

                oDiv.css("background",'none');
                //oDiv.children().remove();
                oDiv.innerHTML='';

                for(var i=0;i<C;i++)
                {
                    var oNewDiv=document.createElement('div');

                    Utils.setStyle(oNewDiv, {
                        width: dw+'px', height: '100%', position: 'absolute', left: W*i/C+'px', top: 0
                    });
                    Utils.setStyle3(oNewDiv, 'transformStyle', 'preserve-3d');
                    Utils.setStyle3(oNewDiv, 'transform', 'perspective(1000px) rotateX(0deg)');
                    //setStyle3(oNewDiv, 'transition', '0.5s all linear');

                    (function (oNewDiv,i){
                        //oNewDiv.style.zIndex=C/2-Math.abs(i-C/2);

                        setTimeout(function (){
                            fx.buffer(oNewDiv, {a:0, x:0}, {a:100, x:-90}, function (now){
                                Utils.setStyle3(oNewDiv, 'transform', 'perspective(1000px) rotateY('+((3*(i-C/2))*(50-Math.abs(now.a-50))/50)+'deg) rotateX('+now.x+'deg)');
                            }, function (){
                                if(--wait==0)
                                {
                                    ready=true;
                                    oDiv.children().remove();
                                    oDiv.css("background",'url(images/'+(next()+1)+imgType+') center no-repeat');
                                    now=next();
                                    if(funCallBack){
                                        funCallBack();
                                    }
                                }
                            }, 8);
                            //Utils.setStyle3(oNewDiv, 'transform', 'perspective(1000px) rotateY('+3*(i-C/2)+'deg) rotateX(-45deg)');
                        }, (i+1)*130);
                    })(oNewDiv,i);

                    oNewDiv.innerHTML='<div></div><div></div><div></div><div></div>';

                    var oNext=oNewDiv.getElementsByTagName('div')[0];
                    var oNow=oNewDiv.getElementsByTagName('div')[1];
                    var oBack=oNewDiv.getElementsByTagName('div')[2];
                    var oBack2=oNewDiv.getElementsByTagName('div')[3];

                    Utils.setStyle([oNext, oNow, oBack, oBack2], {width: '100%', height: '100%', position: 'absolute', left: 0, top: 0});
                    Utils.setStyle(oNext, {
                        background: 'url(images/'+(next()+1)+imgType+') '+-W*i/C+'px 0px no-repeat'
                    });
                    //Utils.setStyle3(oNext, 'transform', 'scale3d(0.836,0.836,0.836) rotateX(90deg) translateZ('+H/2+'px)');// 猜想这里盒子的坐标系不是一个客观的坐标系 是会随着旋转而改变的 如果向x轴方向旋转90度这此时的z轴就指向上方（不旋转情况下z轴指向用户）
                    Utils.setStyle3(oNext, 'transform', 'scale3d(0.836,0.836,0.836) rotateX(90deg) translateZ('+H/2+'px)');

                    Utils.setStyle(oNow, {
                        background: 'url(images/'+(now+1)+imgType+') '+-W*i/C+'px 0px no-repeat'
                    });
                    Utils.setStyle3(oNow, 'transform', 'scale3d(0.834,0.834,0.834) rotateX(0deg) translateZ('+H/2+'px)');

                    Utils.setStyle(oBack, {
                        background: '#666'
                    });
                    Utils.setStyle3(oBack, 'transform', 'scale3d(0.834,0.834,0.834) rotateX(0deg) translateZ(-'+H/2+'px)');

                    Utils.setStyle(oBack2, {
                        background: '#666'
                    });
                    Utils.setStyle3(oBack2, 'transform', 'scale3d(0.834,0.834,0.834) rotateX(90deg) translateZ(-'+H/2+'px)');

                    oDiv.append(oNewDiv);
                }
            };
            sele.on("click",warping);
        }

    //立方体
        if(spe=="cube"){
            var cube = function(){
                if(!ready)return;
                ready=false;

                oDiv.innerHTML='';
                //oDiv.style.background='none';
                oDiv.css("background","none");
                oDiv.css("transformStyle","preserve-3d");
                //Utils.setStyle3(oDiv, 'transformStyle', 'preserve-3d');
                //Utils.setStyle3(oDiv, 'transform', 'perspective(1000px) rotateY(0deg)');
                oDiv.css("transform","prespective(1000px) rotateY(0deg)");
                var oNow=document.createElement('div');
                var oNext=document.createElement('div');

                Utils.setStyle([oNow, oNext], {
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    left: 0,
                    top: 0
                });

                Utils.setStyle3(oNow, 'transform', 'scale3d(0.741,0.741,0.741) rotate3d(0,1,0,0deg) translate3d(0,0,'+W/2+'px)');
                Utils.setStyle3(oNext, 'transform', 'scale3d(0.741,0.741,0.741) rotate3d(0,1,0,90deg) translate3d(0,0,'+W/2+'px)');

                oDiv.append(oNext);
                oDiv.append(oNow);

                oNow.style.background='url(images/'+(now+1)+imgType+') center no-repeat';
                oNext.style.background='url(images/'+(next()+1)+imgType+') center no-repeat';
                //return;
                setTimeout(function (){
                    //setStyle3(oDiv, 'transition', '1s all ease-in-out');
                    fx.flex(oDiv, {y:0}, {y:-90}, function (now){
                        //Utils.setStyle3(oDiv, 'transform', 'perspective(1000px) rotateY('+now.y+'deg)');
                        oDiv.css("transform",'perspective(1000px) rotateY('+now.y+'deg)');
                    }, function (){
                        //Utils.setStyle3(oDiv, 'transition', 'none');
                        //Utils.setStyle3(oDiv, 'transformStyle', 'flat');
                        //Utils.setStyle3(oDiv, 'transform', 'none');
                        oDiv.css({transition:"none",transformStyle:"flat",transform:"none"});
                        oDiv.children().remove();
                        oDiv.css("background",'url(images/'+(next()+1)+imgType+') center no-repeat');
                        now=next();
                        ready=true;
                        if(funCallBack){
                            funCallBack();
                        }
                    }, 10, 0.6);
                },0);

            };
            sele.on("click",cube);
        }

    //    翻页
        if(spe=="pageTurning"){
            var pageTurning = function(){

                if(!ready)return;
                ready=false;

                oDiv.innerHTML='';
                oDiv.css("background","url(images/"+(next()+1)+imgType+") center no-repeat");// 点击发生时切换到第二张图片
                oDiv.children().remove();

                var oDivPage=document.createElement('div');
                Utils.setStyle(oDivPage, {
                    position: 'absolute', background: 'url(images/'+(now+1)+imgType+') right no-repeat', zIndex: 3,
                    left: '50%', top: 0, width: '50%', height: '100%', overflow: 'hidden'
                });
                Utils.setStyle3(oDivPage, 'transform', 'perspective(1000px) rotateY(0deg)');
                Utils.setStyle3(oDivPage, 'transformOrigin', 'left');
                oDiv.append(oDivPage);

                var oDivOld=document.createElement('div');

                Utils.setStyle(oDivOld, {
                    position: 'absolute', left: 0, top: 0, width: '50%', height: '100%', zIndex:2,
                    background: 'url(images/'+(now+1)+imgType+') left no-repeat'
                });

                oDiv.append(oDivOld);
                var oDivShadow=document.createElement('div');

                Utils.setStyle(oDivShadow, {
                    position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', zIndex:2,
                    background: 'rgba(0,0,0,1)'
                });

                oDiv.append(oDivShadow);

                oDivPage.ch=false;
                fx.buffer(oDivPage, {y:0, opacity: 1}, {y:-180, opacity: 0}, function (now){
                    if(now.y<-90 && !oDivPage.ch)
                    {
                        oDivPage.ch=true;
                        //oDivPage.innerHTML='<img />';
                        oDivPage.innerHTML='<div>';

                        //var oImg=oDivPage.getElementsByTagName('img')[0];
                        var oImg=oDivPage.getElementsByTagName('div')[0];

                        //oImg.src='images//'+(next()+1)+imgType+'';
                        Utils.setStyle3(oImg, 'transform', 'scaleX(-1)');

                        Utils.setStyle(oImg, {
                            right: 0, top: 0, width: '200%', height: '100%',position: 'absolute',background:"url(images//"+(next()+1)+imgType+") no-repeat"
                        });
                    }

                    if(now.y<-90)
                    {
                        Utils.setStyle3(oDivPage, 'transform', 'perspective(1000px) scale(-1,1) rotateY('+(180-now.y)+'deg)');// 盒子是透明的盒子 盒子翻转里面的图像也会翻转 所以哟将它矫正
                    }
                    else
                    {
                        Utils.setStyle3(oDivPage, 'transform', 'perspective(1000px) rotateY('+now.y+'deg)');
                    }
                    oDivShadow.style.background='rgba(0,0,0,'+now.opacity+')';
                }, function (){
                    oDiv.children().remove();
                    oDiv.css("background","url(images/"+(next()+1)+imgType+") center no-repeat");//
                    now=next();
                    ready=true;
                    if(funCallBack){
                        funCallBack();
                    }
                }, 14);

            };
            //sele.unbind("click",pageTurning);
            sele.on("click",pageTurning);
        }
    //var specialEffect = this;
    }else{
        if(spEffect=="burst"){
            sele.unbind("click",burst);
        }else if(spEffect=="overTurn"){
            sele.unbind("click",overTurn);
        }else if(spEffect=="warping"){
            sele.unbind("click",cube);
        }else{
            sele.unbind("click",pageTurning);
        }
    }
}

// 自由落体
// direction 四个值 top right bottom left
//resistanceV 模拟阻力速度
//timeR 时间增长率 越大时间过得越快
function freeFall(selector,direction,timeR,resistancV) {
    var end_time;//记录第一次结束自由落地时所花的时间。
    var changed_v=resistancV;//设置反弹的反速度，不能模拟阻力（所以直接采用反弹后，降低初始上升速度达到阻力效果。）
    var obj;
    if(selector.charAt(0)=="."){
        obj =document.getElementsByClassName(selector.substring(1))[0];
    }else if(selector.charAt(0)=="#"){
        obj = document.getElementById(selector.substring(1));
    }else{
        obj = document.getElementsByTagName(selector)[0];
    }
    var tRatio = timeR;
    var dir = direction;
    var parentO = obj.offsetParent;
    var left = obj.offsetLeft;
    var top  = obj.offsetTop;
    var start;
    if(dir=="bottom"){
        start = parentO.offsetHeight- obj.offsetHeight -top;
    }else if(dir=="right"){
        start = parentO.offsetWidth-obj.offsetWidth-left;
    }else if(dir=="left"){
        start =left;
    }else{
        start = top;
    }
    var end = 0;
    var distance = start - end;
    var g=9.8;//重力加速度
    var backi=null;
    var time =0.01;
    var si =null;
    si =   setInterval(function(){
        var h = 0.5 * g * time * time ;//根据重力公式：下落高度->h=1/2*gt^2
        var h1 = start -h;
        if(h1<0){
            h1=0;
        }
        if(h>distance){
            h=distance;
        }
        if(dir=="bottom"){
            obj.style["top"] =top+h+"px";
        }else if(dir=="right"){
            obj.style["left"] = left+h+"px";
        }else{
            obj.style[dir] = h1+"px";
        }
        //console.log("draw "+bool.style.bottom);
        time += tRatio;//时间累加。
        if (h >= distance){//下落高度大于 设置的距离时 停止下落
            end_time = time;//把最后一次自由落地的时间赋值，用于反弹初速度计算。
            clearInterval(si);
            time = 0.01;
            top = obj.offsetTop;
            left = obj.offsetLeft;
            backi =  setInterval(function(){
                var temp=g * end_time - changed_v;//反弹初速度，利用公式v初=gt，
                // 然后减去模拟阻力而减少的速度=反弹的初速度了。
                var v = temp>0?temp:0;//计算的v可能为负值
                var h=v * time - g * time * time / 2.0;//公式：s=v初t-gt^2/2 抛物线
                if(h<0){
                    h=0;
                }
                if(dir=="bottom"){
                    obj.style["top"] =top-h+"px";
                }else if(dir=="right"){
                    obj.style["left"] = left-h+"px";
                }else{
                    obj.style[dir] = h+"px";
                }
                time += tRatio;//模拟时间变化。
                if(h<=end)
                {
                    changed_v+=8;//再次初始化阻力的速度。减少反弹初速度。
                    time = 0.01;
                }
                if(v==0){
                    console.log("drawback done");
                    clearInterval(backi);
                    return false;
                }
                console.log("drawback end");
            },15);//进入反弹函数
        }
    },15);
}

var Utils = {
    setStyle :function(obj,json){
        //console.log(arguments.length);

        if(obj.length)
        {
            for(var i=0;i<obj.length;i++) Utils.setStyle(obj[i], json);
            //console.log(obj.length);
        }
        else
        {
            if(arguments.length==2)
                for(var i in json) {
                    //console.log(i);
                    obj.style[i] = json[i];
                }

            else
                obj.style[arguments[1]]=arguments[2];
        }
    },
    setStyle3 : function(obj, name, value){
        obj.style['Webkit'+name.charAt(0).toUpperCase()+name.substring(1)]=value;
        obj.style['Moz'+name.charAt(0).toUpperCase()+name.substring(1)]=value;
        obj.style['ms'+name.charAt(0).toUpperCase()+name.substring(1)]=value;
        obj.style['O'+name.charAt(0).toUpperCase()+name.substring(1)]=value;
        obj.style[name]=value;
    },
    rnd  : function(n,m){
        var tmpe = Math.random()*(m-n) + n;
        //console.log(Math.random());
        //console.log(tmpe);
        return tmpe;
    }


}

