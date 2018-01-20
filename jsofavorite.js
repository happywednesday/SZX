$(document).ready(function(){

var id = getUrlParam("user");
// 利用html5 <template> view/favoritelist.html模版显示用户关注小区信息
var link = document.querySelector('link[rel="import"]');
var template = link.import.querySelector("template");
 $("#result").append(document.importNode(template.content,true));
 // GET向服务器请求用户关注小区信息
    $.ajax({
       url:requestData("user",id),
       dataType:"text",
       type:"GET",
       success: function(data){

            var json = JSON.parse(data).data;
            // 利用jsrender模版显示用户关注小区信息
            var estatetplt = $.templates("#estatetemplate");
            var html = estatetplt.render(json);
            $("#estatelist").html(html);

      },
      error: function(err) {
      $.toptip("操作失败",'error');
       }
    });

});