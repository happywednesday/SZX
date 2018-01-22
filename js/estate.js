$(document).ready(function(){
// 字典
var dic = {
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
// 利用html5 <template> view/xqinfo.html模版显示小区基本信息
 var link = document.querySelector('link[rel="import"]');
 var template = link.import.querySelector("template");
  $("#info").append(document.importNode(template.content,true));
// 解读传入参数（小区id）
var id = getUrlParam("id");
var points=[];
// 根据小区id 利用GET向服务器请求小区基本描述信息和评价指标
  $.ajax({
     url:requestData("estate",id),
     dataType:"text",
     type:"GET",
     success: function(data){
          var json = JSON.parse(data);
         // 利用jsrender模版显示小区基本信息和并利用jquery制作柱状图显示评价指标
          var attrtplt = $.templates("#attrtemplate");
          var html = attrtplt.render(json.basic_info);
          $("#attrlist").html(html);
          // 显示小区名称
          $('#estatename').html(json.basic_info.name);
          // 利用jquery显示评价指标柱状图

          listAreaAttr(json.evaluation_info);
          // 小区坐标和配套设施坐标批量显示，并未做显示图标区分
          points.push(new BMap.Point(json.basic_info.lng,json.basic_info.lat));

         // 将服务器回传数据变换到bubblechart所需的格式
         var data=[];
         for(var key in json.evaluation_info) {
         data.push({text:dic[key],count:json.evaluation_info[key]});
       }
          // 将评价指标数据传给子窗口
          $('#childFrame').attr('src','view/bubblechart.html?idx='+encodeURI(encodeURI(JSON.stringify(data))));

          },
    error: function(err) {
         $.toptip("未找到所需信息",'error');
     }
  });
  // 根据小区id利用GET向服务器请求小区配套信息并在collapse中显示
  $.ajax({
     url:requestData("facility",id), //service.js中函数模拟服务器url，需根据实际服务器进行替换
     dataType:"text",
     success: function(data){
          var json = JSON.parse(data);
           // 利用jquery根据显示模版批量显示配套信息
           facilitygen(json.data);
           // 初始化地图并显示小区和配套位置
           Mapinit(points);

          },
    error: function(err) {
         $.toptip("未找到所需信息",'error');
     }
  });


  // GET向服务器请求小区挂牌信息并利用jsrender和显示模版批量显示挂牌房源
  var url1 = "json/listing.json";

    $.ajax({
       url:url1,  //模拟服务器返回的挂牌房源信息
       dataType:"text",
       success: function(data){
            var json = JSON.parse(data).data;
           // 利用jsrender和显示模版批量显示挂牌房源
            var estatetplt = $.templates("#listingtemplate");
            var html = estatetplt.render(json);
            $("#listing").html(html);
            $("#listingcount").html("共有"+json.length+"套");
      }
    });

   // jquery生成配套信息
    function facilitygen(data){
      for(i=0;i<data.length;i++){
         var facicon = returnicon(data[i].type);
         var facilityicon = $('<span>').attr("class","facicon").css('width','200')
                            .append($('<span>').append($('<i>').attr("class",facicon).css('color',"#4da6ff")))
                            .append($('<span>').html(" | "))
                            .append($('<span>').html("距离"+data[i].name+data[i].distance))
                            .append($('<span>').html(" | "))
                            .append($('<span>').append($('<i>').attr("class","fa fa-bicycle").css('color',"#4da6ff")))
                            .append($('<span>').attr("class","badge badge-pill badge-success").html(data[i].time_ride))
                            .append($('<span>').html(" | "))
                            .append($('<span>').append($('<i>').attr("class","fa fa-blind").css('color',"#4da6ff")))
                            .append($('<span>').attr("class","badge badge-pill badge-warning").html(data[i].time_walk))
                            .append('<br>');
          $("#"+data[i].type).append(facilityicon);
          points.push(new BMap.Point(data[i].lng,data[i].lat));
         }
    }
  // jquery生成柱状图函数
  function listAreaAttr(info){

    for(var key in info){
      var boxdiv = $('<div>');
      var div = $('<div>').addClass("weui-cell");
      $('#barlist').append(boxdiv);
      boxdiv.append(div);

      var hddiv = $('<div>').addClass("weui-cell__hd");
      div.append(hddiv);
      var labeldiv = $('<label>').addClass("weui-label");


       labeldiv.html(dic[key]);
       labeldiv.css("width","100px");
       hddiv.append(labeldiv);


       var bddiv = $('<div>').addClass("weui-cell__bd chart");
       div.append(bddiv);

       var bardiv = $('<div>');
       bardiv.css('width',String(info[key]*10)+"%");
       bardiv.html(info[key]);
       bddiv.append(bardiv);
       // 引入bootstrap collapse效果
       var colldiv =$('<div>').addClass("collapse").attr("id",key).css({"font-size":"10px","text-align":"center"});
       boxdiv.append(colldiv);
       div.attr({"data-toggle":"collapse","data-target":"#"+key,"aria-expanded":"false","aria-controls":key});

 }
 }

 function Mapinit(points){
   var map = new BMap.Map("xqmap");
   map.centerAndZoom(points[0], 15);

   map.addControl(new BMap.MapTypeControl({
   mapTypes:[
           BMAP_NORMAL_MAP
       ]}));
   map.setCurrentCity("深圳");
   map.enableScrollWheelZoom(true);

   var options = {
             size: BMAP_POINT_SIZE_SMALL,
             shape: BMAP_POINT_SHAPE_CIRCLE,
             color: '#d340c3'
         }
  var pointCollection = new BMap.PointCollection(points, options);

  //  var marker = new BMap.Marker(new BMap.Point(lng,lat));

   map.addOverlay(pointCollection);
 }
// 判断小区是否被关注
$("#addtolist").click(function(){
  ($("#addtolist").attr("value"))==1?tagged():untagged();
});
// 关注小区并向服务器PUT用户ID
function tagged(){
  var hosturl="http://sohu.com";
  var serviceurl="/api/v1/follow/:user";
  var paraurl="?xqid="+id+"&user=";
   console.log(hosturl+serviceurl+paraurl);

   $.ajax({
      url:"",
      Type:"PUT",
      timeout:5000,
      dataType:'text',
      success: function(status,msg){
           // $.toast("成功关注",1000);
           $.notification({
             text:"已添加到您的关注",
             time:2000
           });
           $("#addtolist").html("已关注").attr("class","weui-btn weui-btn_mini weui-btn_primary").attr("value","2");

       },
     error: function(status,msg) {
          $.toptip("未找到所需信息",'error');
      }
   });
}
// 取消关注
function untagged(){
  $.notification({
    text:"已取消关注",
    time:1000
  });
  $("#addtolist").html("+关注").attr("class","weui-btn weui-btn_mini weui-btn_warn").attr("value","1");
}






});
