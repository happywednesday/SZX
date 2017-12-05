$(document).ready(function(){



  var url = "json/school.json";

    $.ajax({
       url:url,
       dataType:"text",
       success: function(data){
            var json = JSON.parse(data);

            listAttr(json);

            var jsondata = json.data.xqlist;
            var estatetplt = $.templates("#estatetemplate");
            var html = estatetplt.render(jsondata);
            $("#estatelist").html(html);
      }
    });

  function listAttr(info){

      $('#name').html(info.data.name);

      for (var i= 0 ;i<info.data.rate;i++){

        var star = $('<span>').addClass("fa fa-star");

        $('#rate').append(star);
      }

       $('#passrate').html(info.data.passrate);




}

});
