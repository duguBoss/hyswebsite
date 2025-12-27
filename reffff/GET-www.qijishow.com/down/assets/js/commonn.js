
function getCSS()
{
        datetoday = new Date();
        timenow=datetoday.getTime();
        datetoday.setTime(timenow);
        thehour = datetoday.getHours();
        if (thehour<7)
            display = "assets/css/night.css";
        else if (thehour<19)
            display = "assets/css/day.css";
        else
            display = "assets/css/night.css";
        
        var css = '<';
        css+='link rel="stylesheet" href='+display+' \/';
        css+='>';
        document.write(css);
}
//统计
document.write("<script>!function(p){\"use strict\";!function(t){var s=window,e=document,i=p,c=\"\".concat(\"https:\"===e.location.protocol?\"https://\":\"http://\",\"sdk.51.la/js-sdk-pro.min.js\"),n=e.createElement(\"script\"),r=e.getElementsByTagName(\"script\")[0];n.type=\"text/javascript\",n.setAttribute(\"charset\",\"UTF-8\"),n.async=!0,n.src=c,n.id=\"LA_COLLECT\",i.d=n;var o=function(){s.LA.ids.push(i)};s.LA?s.LA.ids&&o():(s.LA=p,s.LA.ids=[],o()),r.parentNode.insertBefore(n,r)}()}({id:\"3IediKCOJZGku5nj\",ck:\"3IediKCOJZGku5nj\",autoTrack:true});</script>")

$(function(){
    var rightNav = "";
    rightNav += "<ul class='ccRightNav'>";
    rightNav += "<li><a href='https://www.qijishow.com/' target='_blank'>奇迹秀</a></li>";
    rightNav += "<li><a href='https://www.qijishow.com/time.htm' target='_blank'>记录线</a></li>";
    rightNav += "<li><a href='https://www.qijishow.com/Colors/gradient.html' target='_blank'>色彩库</a></li>";
    rightNav += "<li><a href='https://www.qijishow.com/down/index.html' target='_blank'>工具箱</a></li>";
    rightNav += "<li><a href='https://www.qijishow.com/resource/fonts.html' target='_blank'>资源库</a></li>";
    rightNav += "<hr>";
    rightNav += "<li class='qrBtn'><a href='https://www.qijishow.com/Brand/Brand5/index.htm' target='_blank'>微信公众号</a></li>";
    rightNav += "<li class='qrBox'><img src='https://www.qijishow.com/img/ewm01.jpg' alt='微信二维码'/></li>";
    rightNav += "</ul>";
    $("body").append(rightNav);
    $(".ccRightNav").css({
        "width":"200px",
        "background":"#fff",
        "border-radius":"5px",
        "position":"fixed",
        "padding":"5px 0 0 0",
        "margin":"0",
        "z-index":"1200",
        "box-shadow":"0 2px 35px rgba(50,50,90,0.1)",
        "display":"none"
    });
    $(".ccRightNav li").css({
        "height":"40px",
        "line-height":"29px",
        "font-size":"12px",
        "list-style":"none",
        "padding":"5px 0px 5px",
        "margin":"0 0 4px 0",
        "text-decoration":"none"
    }).mouseover(function(){
        $(this).css("background","#2affda").find("a,small").css("color","#111111");
    }).mouseleave(function(){
        $(this).css("background","none").find("a").css("color","#111").find("small").css("color","#a6a6a6");
    });
    $(".ccRightNav li a").css({
        "display":"block",
        "padding":"0 25px",
        "margin":"0",
        "color":"#111",
        "text-decoration":"none",
        "font-size":"12px",
        "cursor":"pointer"
    });
    $(".ccRightNav li a small").css({
        "color":"#a6a6a6",
        "font-size":"13px",
        "float":"right"
    });
    $(".ccRightNav hr").css({
        "border":"none",
        "border-bottom":"1px solid #e9e9e9"
    });
    $(".ccRightNav li.qrBox").css({
        "width":$(".ccRightNav").height()-80+"px",
        "height":$(".ccRightNav").height()-80+"px",
        "max-width":"400px",
        "width":"285px",
        "max-height":"168px",
        "position":"absolute",
        "bottom":"0px",
        "border":"1px solid #e9e9e9",
		"padding":"0",
        "overflow":"hidden",
        "display":"none"
    });
    $(".ccRightNav li.qrBox img").css({
        "width":"100%",
        "height":"100%",
		"margin-left":"0",
        "opacity":"1",
    });
    $(".ccRightNav li.qrBtn").mouseover(function(){
        $(".ccRightNav li.qrBox").fadeIn(1);
    }).mouseleave(function(){
        $(".ccRightNav li.qrBox").fadeOut(1);
    });
    $("*").bind("contextmenu",function(e){
        var pointX = (e.pageX)-($(window).scrollLeft()),pointY = (e.pageY)-($(window).scrollTop());
        $(".ccRightNav").css({
            "display":"block"
        });
        if(pointX+600>=$(window).width()){
            $(".ccRightNav").css({
                "right":$(window).width()-pointX+"px",
                "left":"auto"
            });
			$(".ccRightNav li.qrBox").css({
				"right":"200px",
				"left":"auto"
			});
        }else{
            $(".ccRightNav").css({
                "left":pointX+"px",
                "right":"auto"
            });
			$(".ccRightNav li.qrBox").css({
				"left":"200px",
				"right":"auto"
			});
        }
        if($(window).height()-pointY<=$(".ccRightNav").height()){
            $(".ccRightNav").css({
                "bottom":$(window).height()-pointY+"px",
                "top":"auto"
            });
        }else{
            $(".ccRightNav").css({
                "top":pointY+"px",
                "bottom":"auto"
            });
        }
        return false;
    }).click(function(){
        $(".ccRightNav").css("display","none");
    })
});


/*!
(function() {
    var click_cnt = 0;
    jQuery(document).ready(function($) {
        $("html").click(function(e) {
            var n = 18;
            var $i;
            click_cnt++;
            if (click_cnt == 10) {
                $i = $("<b></b>").text("OωO");
            } else if (click_cnt == 20) {
                $i = $("<b></b>").text("(๑•́ ∀ •̀๑)");
            } else if (click_cnt == 30) {
                $i = $("<b></b>").text("(๑•́ ₃ •̀๑)");
            } else if (click_cnt == 40) {
                $i = $("<b></b>").text("(๑•̀_•́๑)");
            } else if (click_cnt == 50) {
                $i = $("<b></b>").text("（￣へ￣）");
            } else if (click_cnt == 60) {
                $i = $("<b></b>").text("(╯°口°)╯(┴—┴");
            } else if (click_cnt == 70) {
                $i = $("<b></b>").text("૮( ᵒ̌皿ᵒ̌ )ა");
            } else if (click_cnt == 80) {
                $i = $("<b></b>").text("╮(｡>口<｡)╭");
            } else if (click_cnt == 90) {
                $i = $("<b></b>").text("( ง ᵒ̌皿ᵒ̌)ง⁼³₌₃");
            } else if (click_cnt >= 100 && click_cnt <= 105) {
                $i = $("<b></b>").text("(ꐦ°᷄д°᷅)");
            } else {
                $i = $("<b></b>").text("❤");
                n = Math.round(Math.random() * 14 + 6)
            }
            var x = e.pageX,
                y = e.pageY;
            $i.css({
                "z-index": 9999,
                "top": y - 20,
                "left": x,
                "position": "absolute",
                "color": "#E94F06",
                "font-size": n,
                "-moz-user-select": "none",
                "-webkit-user-select": "none",
                "-ms-user-select": "none"
            });
            $("body").append($i);
            $i.animate({
                "top": y - 180,
                "opacity": 0
            }, 1500, function() {
                $i.remove();
            });
        });
    });
})();

 */ 

(function() {
    'use strict';

    const style = document.createElement("style");
document.head.appendChild(style);
style.innerHTML = `
.heartWrap {
    position: absolute;
    z-index:999;
}

.heart {
    position: absolute;
    background-color: #faa;
    animation: heartMove 1s linear infinite;
    animation-iteration-count: 1;
    animation-delay: var(--delay, 0);
    animation-fill-mode: forwards;
    transform-origin: center;
    opacity: 0;
    /* transition: all 1s linear; */
}

.heart:before,
.heart:after {
    position: absolute;
    content: "";
    left: 6px;
    top: 0;
    width: 6px;
    height: 10px;
    background: inherit;
    border-radius: 15px 15px 0 0;
    transform-origin: 0 100%;
    transform: rotate(-45deg);
}

.heart:after {
    left: 0;
    transform-origin: 100% 100%;
    transform: rotate(45deg);
}

.late0 {
    --lateX: -0px;
    --delay: 0.2s;
}

.late1 {
    --lateX: -10px;
    --delay: 0.1s;
}

.late2 {
    --lateX: -20px;
}

.late3 {
    --lateX: 10px;
    --delay: 0.3s;
}

.late4 {
    --lateX: 20px;
    --delay: 0.4s;
}

@keyframes heartMove {
    0% {
        transform: scale(0.5);
        opacity: 0.1;
    }

    150% {
        transform: translate(var(--lateX, 0px), -30px);
    }

    50% {
        transform: scale(1) translate(var(--lateX, 0px), -100px);
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
`;

// @name         鼠标点击出现桃心
// document.addEventListener('click', (e) => {
//     const vNode = document.createElement('div');
//     vNode.className = "heartWrap";
//     Array.from(new Array(5), (_, index) => {
//         const heart = document.createElement('div');
//         heart.className = `heart late${index}`;
//         heart.style.background = "#" + Math.random().toString(16).slice(-6);
//         // heart.style.top = -index * 2 + 'px';
//         vNode.appendChild(heart);
//     });
//     document.body.appendChild(vNode);
//     vNode.style.top = e.pageY - 20 + "px";
//     vNode.style.left = e.pageX - 10 + "px";
//     setTimeout(() => {
//         document.body.removeChild(vNode);
//     }, 2000)
// })

})();


// ==UserScript==
// @name         鼠标移动点击出现随机颜色表情符号
// @version      1.2
// @description  242个符号随机出现，双击切换移动鼠标出现痕迹表情符号
// @author       日狗少年
// @include      /^https?\:\/\/[^\s]*/
// @grant        GM_addStyle
// @require      https://images.qijishow.com/jquery.min1.7.js
// @run-at       document_start
// @grant        unsafeWindow
// @namespace    
// ==/UserScript==

(function() {
    var flag =false;
    var chars=['😀','😁','😂','😃','😄','😅','😆','😇','😈','😉','😊','😋','😌','😍','😎','😏','😐','😑','😒','😓','😔','😕','😖','😗','😘','😙','😚','😛','😜','😝','😞','😟','😠','😡','😢','😣','😤','😥','😦','😧','😨','😩','😪','😫','😬','😭','😮','😯','😰','😱','😲','😳','😴','😵','😶','😷'];
    jQuery(document).ready(function($) {
		$("html").mousemove(function(e) {
            if(flag){
                var color = "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
                var id=Math.ceil(Math.random()*62);
                var xr=Math.ceil(Math.random()*400)-200;
                var yr=Math.ceil(Math.random()*400)-200;
                var $i;
                $i = $("<b></b>").text(chars[id]);
                var n = Math.round(Math.random() * 10 + 16);
                var x = e.pageX,
                    y = e.pageY;
                $i.css({
                    "z-index": 9999,
                    "color":color,
                    "top": y,
                    "left": x,
                    "position": "absolute",
                    "font-size": n,
                    "-moz-user-select": "none",
                    "-webkit-user-select": "none",
                    "-ms-user-select": "none"
                });
                $("body").append($i);
                $i.animate({
                    "top": y + yr,
                    "left": x + xr,
                    "opacity": 0,
                }, 1000, function() {
                    $i.remove();
                });
            }
        });
        
        $("html").click(function(e) {
            if(!flag){
                var color = "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
                var id=Math.ceil(Math.random()*62);
                var xr=Math.ceil(Math.random()*400)-200;
                var yr=Math.ceil(Math.random()*400)-200;
                var $i;
                $i = $("<b></b>").text(chars[id]);
                var n = Math.round(Math.random() * 10 + 26);
                var x = e.pageX,
                    y = e.pageY;
                $i.css({
                    "z-index": 9999,
                    "color":color,
                    "top": y,
                    "left": x,
                    "position": "absolute",
                    "font-size": n,
                    "-moz-user-select": "none",
                    "-webkit-user-select": "none",
                    "-ms-user-select": "none"
                });
                $("body").append($i);
                $i.animate({
                    "top": y + yr,
                    "left": x + xr,
                    "opacity": 0,
                }, 1000, function() {
                    $i.remove();
                });
            }
        });

	});
})();

/*! 鼠标滚动
function scrollPlus()
{
    //###Customization: |可自定义的东西：

    //go directly to top/down page | 回到顶部按钮
    var goTopButton = 1;

    //Show the scrolling indicator box or not, "1" to show. | 1－显示提示条，其他－不显示。
    var scrollShowIndicator = 1;

    //Set the width of scroll-sensitive zone, "100" as full width, "10" as one tenth.
    // | “滚动触发区”宽度，区间：[0-100]，100为屏宽，0为禁用，10为十分之一屏宽。
    var VScrollonWidth = 2;

    //Set the background of the indicator bar. | 提示条的背景，可以为“rgba()”带透明色式或“#xxxxxx”实颜色式或其他。
    var IndicBarBG = "#afafaf";

    //Set the height of "thickness" of the indicator bar. | 提示条的粗细度，单位为像素。
    var IndicBarH = 7;

    //Write here the width of the scrollbar (set in display properties) for highest accuracy.
    // | 在下面填写滚动条的宽度（也就是系统“显示属性”中的数字），这样能实现最高精确度。
    var ScrollbarWidth = 6;

    //Set a trigger for activation, 1-none, 2-Ctrl key, 3-middle 100px range.
    // | 在下面设置激活条件，1－无，2－按住 Ctrl 键，3－鼠标在页面中间100像素高度范围内。
    var activateCond = 1;

    //###Customization ends. 请不要更改下面代码。
    var scrollStartSWTM = -1;

    var factor;
    var b = 0;
    var VScrollOn = 0;

    document.addEventListener('mousemove', function (event)
    {
        if (document.body.contentEditable == "true")
        {
            return;
        }

        var dheightMax = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        var cwidthMax = Math.max(document.body.clientWidth, document.documentElement.clientWidth) - ScrollbarWidth;
        var cwinHeight = window.innerHeight;
        var scrollboxHeight = window.innerHeight - 2 * ScrollbarWidth;

        if (dheightMax > cwinHeight)
        {
            if (event.clientX > cwidthMax)
            {
                switch (activateCond)
                {
                    case 1:
                        VScrollOn = 1;
                        break;
                    case 2:
                        if (event.ctrlKey)
                            VScrollOn = 1;
                        break;
                    case 3:
                        if (event.clientY > cwinHeight / 2 - 50 && event.clientY < cwinHeight / 2 + 50)
                            VScrollOn = 1;
                        break;
                }
            }

            if (event.clientX < ((1 - VScrollonWidth / 100) * cwidthMax)) VScrollOn = 0;
        }

        if (VScrollOn)
        {
            if (scrollShowIndicator == 1) make_boxes();

            if (scrollStartSWTM != -1)
            {
                factor = (event.ctrlKey) ? dheightMax / scrollboxHeight / 2 : dheightMax / scrollboxHeight;
                if (b)
                {
                    b.style.top = (event.clientY - IndicBarH / 2) + 'px';
                }

                var delta = factor * (event.clientY - scrollStartSWTM);
                document.body.scrollTop += delta;
                document.documentElement.scrollTop += delta;
                if (event.clientY + 20 > cwinHeight)
                {
                    document.body.scrollTop += (factor * 10);
                    document.documentElement.scrollTop += (factor * 10);
                }
                if (event.clientY > 0 && event.clientY < 20)
                {
                    document.body.scrollTop -= (factor * 10);
                    document.documentElement.scrollTop -= (factor * 10);
                }
            }
            scrollStartSWTM = event.clientY;
        }
        else
        {
            scrollStartSWTM = -1;
            if (b) setTimeout(function () { b.style.top = -200 + 'px'; }, 200);
        }
    }, false);

    document.addEventListener('click', function () { VScrollOn = 0; }, false);

    function make_boxes()
    {
        if (!b)
        {
            b = document.createElement("div");
            b.setAttribute("id", "IndicatorBox");
            b.setAttribute("style", "width:44px;background:url(https://www.qijishow.com/down/assets/images/snav_icon.png) 14px 10px no-repeat rgb(175, 175, 175);min-height:36px;text-align:center;border-top-left-radius: 100px;padding: 6px 8px 0px 17px;border-bottom-left-radius: 100px;position: fixed; top: -40px; right: 0;overflow: hidden; z-index: 102400;font-family:Arial !important;cursor:n-resize;cursor:ns-resize;");
            document.body.appendChild(b);
            b.addEventListener('click', function () { VScrollOn = 0; }, false);
            return true;
        }
    }

    function addToTop()
    {
        var a = document.createElement('a');
        a.id = 'scrollUpIco';
        a.addEventListener('click', function(){ window.scrollTo(0, document.body.scrollLeft); }, false);
        document.body.appendChild(a);

        GM_addStyle("\
            #scrollUpIco {\
                position: fixed;\
                z-index: 2147483647;\
                width: 50px;\
                height: 50px;\
                border-radius: 25px;\
                bottom: 20px;\
                right: 25px;\
                line-height: 50px;\
                text-align: center;\
                font-weight: bold;\
                background-color: rgba(0, 0, 0, 0.3);\
                color: #fff;\
                text-decoration: none;\
                -moz-user-select:none;\
                -webkit-user-select:none;\
                cursor:default;\
            }\
            #scrollUpIco:hover {\
                background-color: rgba(0, 0, 0, 0.75);\
                color: #fff !important;\
            }"
        );
    }

    if (goTopButton) addToTop();
}

if (!(window !== window.top || window.document.title === "")) {
    setTimeout(scrollPlus, 100);
}

 */ 
/*!
 * classie v1.0.0
 * class helper functions
 * from bonzo https://github.com/ded/bonzo
 * MIT license
 *     
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */    

    window.onload = init();

    function init() {
        window.addEventListener('scroll', function(e){
            var distanceY = window.pageYOffset || document.documentElement.scrollTop,
                shrinkOn = 300,
                header = document.querySelector("header");
            if (distanceY > shrinkOn) {
                classie.add(header,"smaller");
            } else {
                if (classie.has(header,"smaller")) {
                    classie.remove(header,"smaller");
                }
            }
        });
    }
    window.onload = init();


/*jshint browser: true, strict: true, undef: true, unused: true */

/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );


/*自动变黑白开始
var date = new Date();
var year = date .getFullYear();
var month = date .getMonth()+1;
var day = date.getDate();
// if(month=='12' && day=='1')
{
$("html").css({
"filter":"progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)",
"-webkit-filter":"grayscale(100%)"
});
}
自动变黑白结束*/


