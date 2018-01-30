$(document).ready(function(){
// window.addEventListener('WebComponentsReady',function(){
var id = getUrlParam("id");

// 根据片区ID 利用GET向服务器请求小区列表信息
    $.ajax({
       url:requestData("pqestate",id), //service.js中函数模拟服务器url，需根据实际服务器进行替换
       dataType:"text",
       type:"GET",
       success: function(data){
            $("#pqname").html(JSON.parse(data).data.pqname);
            var json = JSON.parse(data).data.xq;
            // 利用jsrender和显示模版批量显示挂牌房源

            var estatetplt = $.templates("#estatetemplate");
            var html = estatetplt.render(json);
            $("#estatelist").html(html);
            $("#xqcount").html("共有"+json.length+"小区");
      },
      error: function(err) {
      $.toptip("操作失败",'error');
       }
    });



});
