// Baidu Map
$(document).ready(function(){

var map = new BMap.Map("resultmap");

map.addControl(new BMap.MapTypeControl({
mapTypes:[
        BMAP_NORMAL_MAP,
        BMAP_HYBRID_MAP
    ]}));
map.setCurrentCity("深圳");
map.enableScrollWheelZoom(true);

      $.ajax({
         url:"json/newdata.json",
         dataType:"text",
         type:"GET",
         data:JSON.parse(localStorage.formdata),
         success: function(data){
              var json = $.parseJSON(data);
              var centerpt = new BMap.Point(0,0);
              for (var i=0; i < json.district.length;++i){
                var pt = new BMap.Point(parseFloat(json.district[i].lng), parseFloat(json.district[i].lat));
                centerpt.lng+=pt.lng;
                centerpt.lat+=pt.lat;
                var myOverlay = new RectangularOverlay(pt,json.district[i].name,json.district[i].name+" "+json.district[i].xq_count +"个小区","Cir",json.district[i].communities);
                map.addOverlay(myOverlay);
               }
               centerpt.lng/=json.district.length;
               centerpt.lat/=json.district.length;
               map.centerAndZoom(centerpt, 15);

              map.addEventListener("zoomend", function() {
                 this.clearOverlays();

               if (this.getZoom() <15){

              for (var i=0; i < json.district.length;++i){
                pt = new BMap.Point(parseFloat(json.district[i].lng), parseFloat(json.district[i].lat));
                var myOverlay = new RectangularOverlay(pt,json.district[i].name,json.district[i].name+" "+json.district[i].xq_count +"个小区","Cir",json.district[i].communities);
                map.addOverlay(myOverlay);
           }

         } else{
           for (var i=0; i < json.district.length;++i){
             for(var j=0;j<json.district[i].communities.length;++j){

             pt = new BMap.Point(parseFloat(json.district[i].communities[j].lng), parseFloat(json.district[i].communities[j].lat));
             var myOverlay = new RectangularOverlay(pt,json.district[i].communities[j].id,json.district[i].communities[j].name+" "+json.district[i].communities[j].price +"万","Rec",json.district[i].communities[j].match);
             map.addOverlay(myOverlay);
                }
             }
           }
         });
         },
         error:function(data){
            alert('Error loading data');
         }

      });

function RectangularOverlay(point,id,text,type,dataset){
      this._point = point;
      this._text = text;
      this._id=id;
      this._type = type;
      this._dataset = dataset;
      }

var startPos, endPos;

function handleDivEvent(hyperlink) {
  return function(evt) {
    if (evt.type == 'touchstart') {
      var touch = evt.targetTouches[0];
      startPos = {x:touch.pageX,y:touch.pageY};
      endPos = {x:touch.pageX,y:touch.pageY};
    }
    else if (evt.type == 'touchmove') {
      var touch = evt.targetTouches[0];
      endPos = {x:touch.pageX,y:touch.pageY};
    }
    else if (evt.type == 'touchend') {
      //alert(String(endPos.x-startPos.x)+";"+String(endPos.y-startPos.y));
      if (Math.abs(endPos.x-startPos.x)<10 && Math.abs(endPos.y-startPos.y)<10) {
        window.location.href = hyperlink;
      }
    }
  }
}

RectangularOverlay.prototype = new BMap.Overlay();
RectangularOverlay.prototype.initialize = function(targetmap){
  this._map = targetmap;
  var hyperlink = "";
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

      var pq=this._id;
      var xqlist=JSON.stringify(this._dataset);

      div.addEventListener('touchstart',handleDivEvent(hyperlink));
      div.addEventListener('touchmove',handleDivEvent(hyperlink));
      div.addEventListener('touchend',handleDivEvent(hyperlink));

      div.onclick = function(e){
          localStorage.pq=pq;
          localStorage.xqlist=xqlist;
          window.location.href = "pqestate.html";
          localStorage.previousCenter = map.getCenter();
        }

    } else{
      if(this._dataset<8){
        div.style.backgroundColor = "#149A22";
        div.style.border="none";
      } else if (this._dataset>8&&this._dataset<9){
          div.style.backgroundColor = "#9D8410";
          div.style.border="none";
      }else{}
      div.style.height = "25px";
      hyperlink = "estate.html?id=" + this._id;

      div.addEventListener('touchstart',handleDivEvent(hyperlink));
      div.addEventListener('touchmove',handleDivEvent(hyperlink));
      div.addEventListener('touchend',handleDivEvent(hyperlink));

      div.onclick = function(e){
          window.location.href = hyperlink;
        }
    }

      var span = this._span = document.createElement("span");
      div.appendChild(span);
      span.appendChild(document.createTextNode(this._text));
      var that = this;

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
