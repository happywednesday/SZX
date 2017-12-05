// Baidu Map
$(document).ready(function(){
var map = new BMap.Map("resultmap");
map.centerAndZoom(new BMap.Point(114.0427, 22.552701), 15);

map.addControl(new BMap.MapTypeControl({
mapTypes:[
        BMAP_NORMAL_MAP,
        BMAP_HYBRID_MAP
    ]}));
map.setCurrentCity("深圳");
map.enableScrollWheelZoom(true);

// display different marker according to the zoom level
var padding = 200;
var mgr = new BMapLib.MarkerManager(map,{
  borderPadding: padding,
  maxZoom:19,
  trackMarkers:true
});

  var type = "Cir";
  var url = "json/pianqu.json";
  var unit = "个小区";



    map.addEventListener("zoomend", function() {
       if (this.getZoom() > 15){
         type = "Rec";
         url = "json/data.json";
         unit = "万";
       } else{
         type = "Cir";
         url = "json/pianqu.json";
         unit = "个小区";
       }

       this.clearOverlays();
       getMarks(url,type,unit);

    });

  getMarks(url,type,unit);

 function getMarks(url,type,unit){

 	 var pt = null;
 	 var i = 0;


      $.ajax({
         url:url,
         dataType:"text",
         success: function(data){

              var json = $.parseJSON(data);

              for (; i < json.data.length;++i){
                pt = new BMap.Point(parseFloat(json.data[i].lng), parseFloat(json.data[i].lat));

                var myOverlay = new RectangularOverlay(pt,json.data[i].name +"  "+ json.data[i].price +unit,type);

                map.addOverlay(myOverlay);

           }
         },
         error:function(data){
            alert('Error loading data');
         }


      });


}

function RectangularOverlay(point, text,type){
      this._point = point;
      this._text = text;
      this._type = type;

    }
RectangularOverlay.prototype = new BMap.Overlay();
RectangularOverlay.prototype.initialize = function(targetmap){
  this._map = targetmap;
  var div = this._div = document.createElement("div");
      div.style.position = "absolute";
      div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
      div.style.backgroundColor = "#910029";
      div.style.opacity = 0.8;
      div.style.border = "1px solid #BC3B3A";
      div.style.color = "white";
      div.style.padding = "2px";
      div.style.lineHeight = "18px";
      div.style.whiteSpace = "nowrap";
      div.style.MozUserSelect = "none";
      div.style.fontSize = "15px";
      div.style.display = "flex";
      div.style.alignItems = "center";
      div.style.justifyContent = "center";

     if (this._type == "Cir"){
      div.style.height = "100px";
      div.style.width = "100px";
      div.style.borderRadius = "50%";
    } else{
      div.style.height = "25px";
    }

      var span = this._span = document.createElement("span");
      div.appendChild(span);
      span.appendChild(document.createTextNode(this._text));
      var that = this;


      div.onclick = function(){
          window.location.href = "estate.html";
            }

      map.getPanes().labelPane.appendChild(div);
      return div;
}

RectangularOverlay.prototype.draw = function(){
  var map = this._map;
  var pixel = map.pointToOverlayPixel(this._point);
  if (this._type = "Rec"){
  this._div.style.left = pixel.x + "px";
  this._div.style.top = pixel.y -30 + "px";
} else {
  var style = window.getComputedStyle(this._div);
  var radius = parseInt(style.height, 10) / 2;
  this._div.style.left = (pixel.x - radius) + 'px';
  this._div.style.top = (pixel.y - radius) + 'px';
}
}


});
