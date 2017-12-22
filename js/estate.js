$(document).ready(function(){

var dic = {
  "description":"小区简介",
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

 var link = document.querySelector('link[rel="import"]');
 var template = link.import.querySelector("template");
  $("#info").append(document.importNode(template.content,true));

var id = getUrlParam("id");

  $.ajax({
     url:requestData("estate",id),
     dataType:"text",
     success: function(data){
          var json = JSON.parse(data);

          var attrtplt = $.templates("#attrtemplate");
          var html = attrtplt.render(json.attr);
          $("#attrlist").html(html);

          listAreaAttr(json.data);
          Mapinit();
          },
    error: function(err) {
         $.toptip("未找到所需信息",'error');
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
            $("#listingcount").html("共有"+json.length+"套");

      }
    });


  function listAreaAttr(info){

    for(var key in info){
      var boxdiv = $('<div>');
      var div = $('<div>').addClass("weui-cell");
      $('#barlist').append(boxdiv);
      boxdiv.append(div);


      var hddiv = $('<div>').addClass("weui-cell__hd");
      div.append(hddiv);
      var labeldiv = $('<label>').addClass("weui-label");


     if (!(key == "name")) {

       labeldiv.html(dic[key]);
       labeldiv.css("width","100px");
       hddiv.append(labeldiv);


       var bddiv = $('<div>').addClass("weui-cell__bd chart");
       div.append(bddiv);

       var bardiv = $('<div>');
       bardiv.css('width',String(info[key]*10)+"%");
       bardiv.html(info[key]);
       bddiv.append(bardiv);

       var colldiv =$('<div>').addClass("collapse").attr("id",key).html(key).css({"font-size":"12px","text-align":"center"});
       boxdiv.append(colldiv);
       div.attr({"data-toggle":"collapse","data-target":"#"+key,"aria-expanded":"false","aria-controls":key});

     } else {
     $('#estatename').html(info[key]);
   }
 }
 }

 function Mapinit(){
   var map = new BMap.Map("xqmap");
   map.centerAndZoom(new BMap.Point(114.0427, 22.552701), 15);

   map.addControl(new BMap.MapTypeControl({
   mapTypes:[
           BMAP_NORMAL_MAP
       ]}));
   map.setCurrentCity("深圳");
   map.enableScrollWheelZoom(true);
 }










});
