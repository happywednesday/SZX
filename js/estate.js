$(document).ready(function(){

var dic = {
  "description":"片区简介",
  "overall":"总体评价",
  "planning":"区域规划",
  "metro":"轨道交通",
  "commercial":"商业配套",
  "living":"生活配套",
  "primary":"小学教育",
  "secondary":"初中教育",
  "landscape":"景观环境",
  "medical":"医疗配套"
};


var url = "json/estatedetails.json";

  $.ajax({
     url:url,
     dataType:"text",
     success: function(data){
          var json = JSON.parse(data);
          listAreaAttr(json);
    }
  });

  var url1 = "json/listing.json";

    $.ajax({
       url:url1,
       dataType:"text",
       success: function(data){
            var json = JSON.parse(data).data;


            var estatetplt = $.templates("#listingtemplate");
            var html = estatetplt.render(json);
            $("#listing").html(html);
      }
    });


  function listAreaAttr(info){

    for(var key in info.data){

      var div = $('<div>').addClass("weui-cell");
      $('#divbody').append(div);

      var hddiv = $('<div>').addClass("weui-cell__hd");
      div.append(hddiv);
      var labeldiv = $('<label>').addClass("weui-label");


     if (!(key == "name" || key == "description")) {

       labeldiv.html(dic[key]);
       labeldiv.css("width","100px");
       hddiv.append(labeldiv);


       var bddiv = $('<div>').addClass("weui-cell__bd chart");
       div.append(bddiv);

       var bardiv = $('<div>');
       bardiv.css('width',String(info.data[key]*10)+"%");
       bardiv.html(info.data[key]);
       bddiv.append(bardiv);

     } else {
       if (key =="description"){
         labeldiv.html(dic[key]);
         labeldiv.css("width","100px");
         hddiv.append(labeldiv);

         var bddiv = $('<div>').addClass("weui-cell__bd");
         div.append(bddiv);

         var bardiv = $('<div>').html(info.data[key]);
         bddiv.append(bardiv);
     }
    else {

     div.attr("style","font-size:18px;justify-content:center");
     div.html(info.data[key]);

   } }
 }
 }


});
