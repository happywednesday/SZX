$(document).ready(function(){



  var url = "json/school.json";

    $.ajax({
       url:url,
       dataType:"text",
       success: function(data){
            var json = JSON.parse(data);

            listAttr(json);
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
