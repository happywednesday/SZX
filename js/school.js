$(document).ready(function(){

 var id =getUrlParam("id");

    $.ajax({
       url:requestData("school",id),
       dataType:"text",
       success: function(data){
            var json = JSON.parse(data);

            listAttr(json);

            var link = document.querySelector('link[rel="import"]');
            var template = link.import.querySelector("template");
             $("#result").append(document.importNode(template.content,true));

            var jsondata = json.data.xqlist;
            var estatetplt = $.templates("#estatetemplate");
            var html = estatetplt.render(jsondata);
            $("#estatelist").html(html);
      },
      error: function(err) {
         $.toptip("操作失败",'error');
       }
    });

  function listAttr(info){

      $('#name').html(info.data.name);

      for (var i= 0 ;i<info.data.rate;i++){
        var star = $('<span>').addClass("fa fa-star");
        $('#rate').append(star);
      }
      //passrate(info.data.enro_rate);

    }

// function passrate(data){
//
//   for(var i=0;i<data.length;i++){
//
//     var labeldiv = $('<label>').addClass("weui-label").html(data[i].year + "(" + data[i].type +")").css('font-size','10px');
//     $('#enrorate').append(labeldiv);
//
//     var bddiv = $('<div>').addClass("weui-cell__bd chart");
//       $('#enrorate').append(bddiv);
//
//     var bardiv = $('<div>');
//     bardiv.css('width',data[i].rate);
//     bardiv.html(data[i].rate);
//     bddiv.append(bardiv);
//
//
//   }
//
// }

function mobileViewUpdate(){
  var viewportWidth = $(window).width();
  
  $("#stat").attr("class",viewportWidth>600?"weui-flex__item":"placeholder");
}
$(window).load(mobileViewUpdate);
$(window).resize(mobileViewUpdate);

});
