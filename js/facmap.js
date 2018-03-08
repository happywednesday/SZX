// Baidu Map
$(document).ready(function(){
  // 提取数据
  var data =$.parseJSON(sessionStorage.facility);
  var home=$.parseJSON(sessionStorage.home);

  // 创建地图
  var map = new BMap.Map("resultmap");
  var centerpt = new BMap.Point(data[0].lng, data[0].lat);
  map.addControl(new BMap.MapTypeControl({
  mapTypes:[
          BMAP_NORMAL_MAP,
          BMAP_HYBRID_MAP
      ]}));
  map.setCurrentCity("深圳");
  map.enableScrollWheelZoom(true);
  map.centerAndZoom(centerpt,16);

  // 暂存Touch的位置信息
  var startPos, endPos;
  // 处理Touch相关事件
  function handleDivEvent(div,text) {
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
      	// 确保只有在用户真正点击（Touch位移小于10）的时候才跳转到下一页
        if (Math.abs(endPos.x-startPos.x)<10 && Math.abs(endPos.y-startPos.y)<10) {

        }
      }
      else if (evt.type == 'click') {
      	// 处理桌面浏览器的click事件
      }
    }
  }

  function CustomOverlay(point,text,type,color){
    this._point=point;
    this._text=text;
    this._type=type;
    this._color=color;
  }
  CustomOverlay.prototype = new BMap.Overlay();
  CustomOverlay.prototype.initialize = function(map){
    this._map = map;

    var icon = $('<i>').css("color",this._color)
                       .addClass(returnicon(this._type));
    var span=$('<span>').append(icon);
    var div = $('<div>').append(span)
                        .css("position","absolute")
                        .css("z-index",BMap.Overlay.getZIndex(this._point.lat));
    this._map.getPanes().labelPane.appendChild(div.get(0));
    this._div = div.get(0);
    div.on('touchstart',handleDivEvent(this._div,this._text));
    div.on('touchmove',handleDivEvent(this._div,this._text));
    div.on('touchend',handleDivEvent(this._div,this._text));
    div.on('click',handleDivEvent(this._div,this._text));

    return div.get(0);
  }
  CustomOverlay.prototype.draw = function(){
    // var map = this._map;
    var pixel = this._map.pointToOverlayPixel(this._point);
    this._div.style.left=pixel.x+"px";
    this._div.style.top=pixel.y+"px";
  }

  for (i=0;i<data.length;i++){
    var pt = new BMap.Point(data[i].lng,data[i].lat);
    var facOverlay = new CustomOverlay(pt,data[i].name,data[i].idx2,"#EA1F1B");
    map.addOverlay(facOverlay);
  }

  var pt = new BMap.Point(home.lng,home.lat);
  var homeOverlay = new CustomOverlay(pt,"","home","blue");
  map.addOverlay(homeOverlay);


});
