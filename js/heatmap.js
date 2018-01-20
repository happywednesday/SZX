// Baidu Map
$(document).ready(function(){
  // 地图初始化
var map = new BMap.Map("heatmap");
map.centerAndZoom(new BMap.Point(114.0427, 22.552701), 13);

map.addControl(new BMap.MapTypeControl({
mapTypes:[
        BMAP_NORMAL_MAP,
        BMAP_HYBRID_MAP
    ]}));
map.setMapStyle({style:'dark'});
map.setCurrentCity("深圳");
map.enableScrollWheelZoom(true);

// 模拟服务器回传数据
var url ="json/heat.json";

$.ajax({
   url:url,
   dataType:"text",
   type:"GET",
   success: function(data){
        var json = $.parseJSON(data).data;

        heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":40});

        map.addOverlay(heatmapOverlay);
        heatmapOverlay.setDataSet({data:json,max:30});
        heatmapOverlay.show();

   },
   error:function(data){
      alert('Error loading data');
   }

});
// 监听地图移动事件
map.addEventListener("moveend",function(){

  alert(map.getBounds().Fe+";"+map.getBounds().Ge);
 // mapExtentchange();
});
// 监听地图放大缩小事件
map.addEventListener("zoomend",function(){
    alert(map.getBounds().Fe+";"+map.getBounds().Ge);
// mapExtentchange();
});
// 根据地图显示范围再次向服务器请求统计数据数据
function mapExtentchange(){

   $.ajax({
      url:url,
      dataType:"text",
      type:"POST",
      data:{
        lt_lat:map.getBounds.Fe,
        lt_lng:map.getBounds.Le,
        rb_lat:map.getBounds.Ke,
        rb_lng:map.getBounds.Ge,
        user:'user'
      },
      success: function(data){
           var json = $.parseJSON(data).data;

           heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":40});

           map.addOverlay(heatmapOverlay);
           heatmapOverlay.setDataSet({data:json,max:30});
           heatmapOverlay.show();

      },
      error:function(data){
         alert('Error loading data');
      }

   });
}

});
