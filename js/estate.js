$(document).ready(function(){
// 字典
const dic = {
  "overall":"总体评价",
  "planning":"区域规划",
  "transport":"交通配套",
  "commercial":"商业配套",
  "living":"生活配套",
  "primary":"小学教育",
  "secondary":"初中教育",
  "landscape":"景观环境",
  "medical":"医疗配套"
};

const dic1={
  "metro":"地铁",
  "bus":"巴士",
  "hospital":"医院",
  "primary":"小学"
}

// 解读传入参数（小区id）
var id = getUrlParam("id");
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
          $("#estatename").html(json.basic_info.name);
          sessionStorage.home = '{"lng":'+json.basic_info.lng+',"lat":'+json.basic_info.lat+'}';
          // 利用jquery显示一级评价指标柱状图
          listAreaAttr(json.evaluation_info);
         // 将服务器回传数据变换到bubblechart所需的格式
         // var data=[], data1=[];
         // for(var key in json.evaluation_info) {
         //    data.push({name:dic[key],value:json.evaluation_info[key]});
         //    data1.push({text:dic[key],count:json.evaluation_info[key]});
         // }
          // 初始化bubble chart
         // bubbleChartInit(data1);

        //  加载echart
         // piechart(data);
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
          //  生成二级指标主状图
           idx2barGen(json.data);
          //  生成指标图标
           facilitygen(json.data);
           // 初始化地图并显示小区和配套位置
           checkidx1info();
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

  function checkidx1info(){
    var childnode =$('#barlist').children();
    for (i=0;i<childnode.length;i++){
       if($($(childnode[i]).children()[1]).html()){
         var span = $('<span>').addClass("weui-badge weui-badge_dot").css("margin-left","2px");
         $($($($(childnode[i]).children()[0]).children()[0]).children()[0]).append(span);
       }
    }
  }
  //提取二级指标评价信息
   function JsonComparison(data){
      var obj=[];
      var idx = data[0];
      obj.push(data[0]);
      for (i=1;i<data.length;i++){
          if(data[i].idx2!=idx.idx2){
            obj.push(data[i]);
            idx=data[i];
          }
       }
       return obj;
     }
  // 二级评价指标柱状图
 function idx2barGen(data){
     var info=JsonComparison(data);
     for(i=0;i<info.length;i++){
        var icon=$("<i>").addClass("fa fa-map-marker")
                      .css({"color":"#FA5858","padding":"2px 2px 2px 2px"});
        var labeldiv = $('<label>').addClass("weui-label")
                                   .attr("value",info[i].idx1)
                                   .html(dic1[info[i].idx2])
                                   .css("width","100px")
                                   .append(icon);
         var hddiv = $('<div>').addClass("weui-cell__hd")
                               .append(labeldiv)
                               .click(function(e){
                                     var obj=[];
                                     for (i=0;i<data.length;i++){
                                       if(data[i].idx1==$(e.target).attr("value")){
                                         obj.push(data[i]);
                                       }
                                      }
                                     sessionStorage.facility=JSON.stringify(obj);
                                     window.location.href="facmap.html";
                                 });
         var bardiv = $('<div>').css('width',String(info[i].idx2_grade*10)+"%")
                                .html(info[i].idx2_grade);
         var bddiv = $('<div>').addClass("weui-cell__bd idx2chart")
                               .append(bardiv);
         var div = $('<div>').addClass("weui-cell")
                             .css("height","15px")
                             .append(hddiv)
                             .append(bddiv);
         var boxdiv = $('<div>').attr("id",info[i].idx2)
                                .append(div);
         $('#'+info[i].idx1).append(boxdiv);
      }
 }
   // jquery生成配套信息
    function facilitygen(data){
      for(i=0;i<data.length;i++){
         var facicon = returnicon(data[i].idx2);
         var facilityicon = $('<span>').attr("class","facicon").css('width','200')
                            .append($('<span>').append($('<i>').attr("class",facicon).css('color',"#4da6ff")))
                            .append($('<span>').html(" | "))
                            .append($('<span>').html(data[i].name+data[i].distance))
                            .append($('<span>').html(" | "))
                            .append($('<span>').append($('<i>').attr("class","fa fa-bicycle").css('color',"#4da6ff")))
                            .append($('<span>').attr("class","badge badge-pill badge-success").html(data[i].time_ride))
                            .append($('<span>').html(" | "))
                            .append($('<span>').append($('<i>').attr("class","fa fa-blind").css('color',"#4da6ff")))
                            .append($('<span>').attr("class","badge badge-pill badge-warning").html(data[i].time_walk))
                            .append('<br>');
          $("#"+data[i].idx2).append(facilityicon);
         }
    }
  // jquery生成一级指标柱状图函数
  function listAreaAttr(info){
    for(var key in info){
      var labeldiv = $('<label>').addClass("weui-label")
                                 .html(dic[key])
                                 .css("width","100px");
      var hddiv = $('<div>').addClass("weui-cell__hd")
                            .append(labeldiv);
      var bardiv = $('<div>').css('width',String(info[key]*10)+"%")
                             .html(info[key]);
      var bddiv = $('<div>').addClass("weui-cell__bd chart")
                            .append(bardiv);
      var div = $('<div>').addClass("weui-cell")
                          .css("height","15px")
                          .attr({"data-toggle":"collapse","data-target":"#"+key,"aria-expanded":"false","aria-controls":key})
                          .append(hddiv)
                          .append(bddiv);
       // 引入bootstrap collapse效果
      var colldiv =$('<div>').addClass("collapse")
                             .attr("id",key)
                             .css({"font-size":"10px","text-align":"center"});
      var boxdiv = $('<div>').append(div)
                             .append(colldiv);
      $('#barlist').append(boxdiv);
       }
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
