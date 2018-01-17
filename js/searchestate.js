$(document).ready(function(){

$("#searchbtn").on('click',function(e){
  loadData();

});

function loadData(){
  $("#result").empty();

   var link = document.querySelector('link[rel="import"]');
   var template = link.import.querySelector("template");
    $("#result").append(document.importNode(template.content,true));


    $.ajax({
       url:requestData("pqestate",$("#search").val()),
       dataType:"text",
       success: function(data){

            var json = JSON.parse(data).data.xq;

            var estatetplt = $.templates("#estatetemplate");
            var html = estatetplt.render(json);
            $("#estatelist").html(html);

            $.showLoading();
            setTimeout(function(){
              $.hideLoading();
            },1000);
      },
      error: function(err) {
        $.toptip("无搜索结果",'error');
       }
     });
}
 
});
