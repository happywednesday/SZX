$(document).ready(function(){



  var url = "json/estatelist.json";

    $.ajax({
       url:url,
       dataType:"text",
       success: function(data){
            var json = JSON.parse(data).data;

            var estatetplt = $.templates("#estatetemplate");
            var html = estatetplt.render(json);
            $("#estatelist").html(html);
      }
    });



});
