$(document).ready(function(){

// var id = getUrlParam("user");
var id=localStorage.user;

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


            for (var i= 0 ;i<json.length;i++){
                for(var j=0; j<json[i].grade;j++){

              var star = $('<span>').addClass("fa fa-star");
              $("#"+json[i].id).append(star);
              }
            }

      },
      error: function(err) {
      $.toptip("操作失败",'error');
       }
    });

});
