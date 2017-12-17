$(document).ready(function(){


var id = getUrlParam("id");


    $.ajax({
       url:requestData("pqestate",id),
       dataType:"text",
       success: function(data){
            $("#pqname").html(JSON.parse(data).data.pqname);
            var json = JSON.parse(data).data.xq;

            var estatetplt = $.templates("#estatetemplate");
            var html = estatetplt.render(json);
            $("#estatelist").html(html);

            $("#xqcount").html("共有"+json.length+"小区");
      }
    });



});
