$(document).ready(function(){

$("#searchbtn").on('click',function(e){

  // 根据名称 利用GET向服务器请求小区列表
   $.ajax({
      url:requestData("xq",$("#search").val()),
      dataType:"text",
      success: function(data){

           var json = JSON.parse(data).data;
           // 利用jsrender模版显示小区列表信息
           var estatetplt = $.templates("#estatetemplate");
           var html = estatetplt.render(json);
           $("#estatelist").html(html);
           // 数据加载效果
           $.showLoading();
           setTimeout(function(){
             $.hideLoading();
           },1000);
     },
     error: function(err) {
       $.toptip("无搜索结果",'error');
      }
    });

});



});
