//排序
var xm = {age : 100};
var dm = {age : 10};
var lm = {age : 1};
var arr = [xm,dm,lm];
 //每次传入两个值 
arr.sort(function(a,b){
   //a-b为正b和a调换 a-b为负a和b调换 为零不变
    return a.age - b.age;
});
//对象属性拼接
var test = {
    test1 : {name:"小明"},
    test2 : {name:"小东"},
    test3 : {name:"小花"},
    test4 : {name:"小胖"},
    tests : function(num){
        //重点看这
        return this['test'+num];
    }
}

//深度克隆
function deepClone(origin, target){
    var target = target || {},
        toStr = Object.prototype.toString,
        arrStr = "[object Array]";
    for(var prop in origin){
        if(origin.hasOwnProperty(prop)){
            if(origin[prop] !== "null" && typeof(origin[prop]) == "object"){
                if(toStr.call(origin[prop]) == arrStr){
                    target[prop] = [];
                }else{
                    target[prop] = {};
                }
                //对象 数组继续
                deepClone(origin[prop],target[prop]);
            }else{
                target[prop] = origin[prop];
            }
        }       
    }
    return target;
}

//圣杯模式
function inherit(Target, Origin){
    //中间层
    function F() {};
    F.prototype = Origin.prototype;
    Target.prototype = new F();
    Target.prototype.constuctor = Target;
    //真正继承自谁
    Target.prototype.uber = Origin.prototype;
}
//事件源对象获取兼容IE
wrapper.onclick = function (e){
    var event = e || window.event;
    var target = event.target || event.srcElement;
    console.log(target);
}
// addEvent 兼容IE绑定事件 ele元素 type类型 fun方法
function addEvent(ele,type,fun){
    if(ele.addEventListener){
        ele.addEventListener(type,fun,false);
        //判断是不是IE
    }else if(ele.attachEvent){
        ele.attachEvent("on"+type,function(){
            //IE attachEvent 默认指向window
            fun.call(ele);
        });
    }else{
        ele["on"+type] = fun;
    }
}

//判断数据类型
function type(target){
    var ret = typeof(target);
    var template = {
        "[object Array]":"array",
        "[object Object]":"object",
        "[object Number]":"number - object",
        "[object Boolean]":"boolean - object",
        "[object String]":"string - object"
    }
    if(target === null){
        return "null";
    }
    if(ret == "object"){
        var str = Object.prototype.toString.call(target);
        return  template[str];
    }else{
        return ret;
    }
}

// 阻止默认时间兼容IE
function cancelHandler(ele){
    if(ele.preventDefault){
        ele.preventDefault();
    }else{
        //IE方法
        ele.returnValue = false;
    }
}

//解除冒泡兼容IE
function stopBubble(event){
    if(event.stopPropagation){
        event.stopPropagation();
    }else{
        event.cancelBubble = true;
    }
}

//获取一个DIV的绝对坐标的功能函数,即使是非绝对定位,一样能获取到
function getElCoordinate(dom) {
    var t = dom.offsetTop;
    var l = dom.offsetLeft;
    dom=dom.offsetParent;
    while (dom) {
      t += dom.offsetTop;
      l += dom.offsetLeft;
      dom=dom.offsetParent;
    }; return {
      top: t,
      left: l
    };
  }
  //兼容各种浏览器的,获取鼠标真实位置
  function mousePosition(ev){
      if(!ev) ev=window.event;
      if(ev.pageX || ev.pageY){
          return {x:ev.pageX, y:ev.pageY};
      }
      return {
          x:ev.clientX + document.documentElement.scrollLeft - document.body.clientLeft,
          y:ev.clientY + document.documentElement.scrollTop  - document.body.clientTop
      };
  }
  //给DATE类添加一个格式化输出字串的方法
  Date.prototype.format = function(format)   
  {   
     var o = {   
        "M+" : this.getMonth()+1, //month  
        "d+" : this.getDate(),    //day  
        "h+" : this.getHours(),   //hour  
        "m+" : this.getMinutes(), //minute  
        "s+" : this.getSeconds(), //second  ‘
        //quarter  
        "q+" : Math.floor((this.getMonth()+3)/3), 
        "S" : this.getMilliseconds() //millisecond  
     }   
     if(/(y+)/.test(format)) format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));   
      for(var k in o)if(new RegExp("("+ k +")").test(format))   
        format = format.replace(RegExp.$1,   
          RegExp.$1.length==1 ? o[k] :    
            ("00"+ o[k]).substr((""+ o[k]).length));   
      return format;   
  }
  //JS]根据格式字符串分析日期（MM与自动匹配两位的09和一位的9）
  //alert(getDateFromFormat(sDate,sFormat));
  function getDateFromFormat(dateString,formatString){
      var regDate = /\d+/g;
      var regFormat = /[YyMmdHhSs]+/g;
      var dateMatches = dateString.match(regDate);
      var formatmatches = formatString.match(regFormat);
      var date = new Date();
      for(var i=0;i<dateMatches.length;i++){
          switch(formatmatches[i].substring(0,1)){
              case 'Y':
              case 'y':
                  date.setFullYear(parseInt(dateMatches[i]));break;
              case 'M':
                  date.setMonth(parseInt(dateMatches[i])-1);break;
              case 'd':
                  date.setDate(parseInt(dateMatches[i]));break;
              case 'H':
              case 'h':
                  date.setHours(parseInt(dateMatches[i]));break;
              case 'm':
                  date.setMinutes(parseInt(dateMatches[i]));break;
              case 's':
                  date.setSeconds(parseInt(dateMatches[i]));break;
          }
      }
      return date;
  }
  //货币分析成浮点数
  //alert(parseCurrency("￥1,900,000.12"));
  function parseCurrency(currentString){
      var regParser = /[\d\.]+/g;
      var matches = currentString.match(regParser);
      var result = '';
      var dot = false;
      for(var i=0;i<matches.length;i++){
          var temp = matches[i];
          if(temp =='.'){
              if(dot) continue;
          }
          result += temp;
      }
      return parseFloat(result);
  }
  
  //将#XXXXXX颜色格式转换为RGB格式，并附加上透明度
  function brgba(hex, opacity) {
      if( ! /#?\d+/g.test(hex) ) return hex; //如果是“red”格式的颜色值，则不转换。//正则错误，参考后面的PS内容
      var h = hex.charAt(0) == "#" ? hex.substring(1) : hex,
          r = parseInt(h.substring(0,2),16),
          g = parseInt(h.substring(2,4),16),
          b = parseInt(h.substring(4,6),16),
          a = opacity;
      return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }