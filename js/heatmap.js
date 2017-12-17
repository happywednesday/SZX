// Baidu Map
$(document).ready(function(){
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


var url ="json/heat.json";

$.ajax({
   url:url,
   dataType:"text",
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









});
