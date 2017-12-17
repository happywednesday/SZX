
function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg); //匹配目标参数
      if (r != null) return unescape(r[2]); return null; //返回参数值
    }


function requestData(module,id){
     switch (module) {
       case "pqestate":
         return "json/pqestate"+id+".json";

       case "estate":
        return "json/ED"+id+".json";

       case "school":
        return "json/school"+id+".json";

       default:

     }

}
