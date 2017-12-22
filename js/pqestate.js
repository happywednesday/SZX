$(document).ready(function(){


var id = getUrlParam("id");

var link = document.querySelector('link[rel="import"]');
var template = link.import.querySelector("template");
 $("#result").append(document.importNode(template.content,true));

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
      },
      error: function(err) {
      $.toptip("操作失败",'error');
       }
    });



});
