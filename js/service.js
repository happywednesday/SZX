// 获取参数
function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg); //匹配目标参数
      if (r != null) return unescape(r[2]); return null; //返回参数值
    }

// 模拟服务器返回json数据
function requestData(module,id){
     switch (module) {
       case "pqestate":
         return "json/pqestate"+id+".json";

       case "estate":
        return "json/ED"+id+".json";

       case "facility":
        return "json/EF"+id+".json";

        case "user":
         return "json/user"+id+".json";

         case "xq":
           return "json/xq"+id+".json";

       default:

     }

}
// 根据指标种类返回图标
function returnicon(type){
  switch (type) {
    case "metro":
      return "fa fa-subway";

    case "medical":
     return "fa fa-h-square";

    case "primary":
     return "fa fa-graduation-cap";

     case "commercial":
      return "fa fa-shopping-cart";

    default:

  }

}

function checkAgent(){
  var userAgent = navigator.userAgent;

  if (userAgent.match(/MicroMessenger/i)!='MicroMessenger'){
    alert('请使用微信浏览器');
    var opened = window.open('about:blank','_self');
    opened.opener=null;
    opened.close();
  }
}
