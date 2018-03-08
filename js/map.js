// Baidu Map
$(document).ready(function(){
  // 创建地图
  var map = new BMap.Map("resultmap");
  map.enableScrollWheelZoom(true);

  if(sessionStorage.formdata){
    // 根据查询数据获取片区小区数据
    $.ajax({
      url:"json/newdata.json",
      dataType:"text",
      type:"GET",
      data:JSON.parse(sessionStorage.formdata),
      success:function(data){
        pqdata = $.parseJSON(data);
        sessionStorage.pqdata=JSON.stringify(pqdata); // 保存数据
        map.addEventListener("zoomend", displayOverlayByZoom(map, pqdata));
        zoomMap(pqdata, true);  // 显示数据
        sessionStorage.removeItem("formdata");// 清空查询数据
        var listingCtrl = new ListingControl(pqdata.communities);
        map.addControl(listingCtrl);
      },
      error:function(err){
        alert('Error loading data');
      }
    });
  }else if(sessionStorage.pqdata){
    // 已有小区数据, 必须使用ajax异步获取数据，否则overlay不显示
    $.ajax({
      success:function(data){
        pqdata = $.parseJSON(sessionStorage.pqdata);
        // 显示数据
        map.addEventListener("zoomend", displayOverlayByZoom(map, pqdata));
        zoomMap(pqdata, false);
        var listingCtrl = new ListingControl(pqdata.communities);
        map.addControl(listingCtrl);
      },
      error:function(err){
        alert('Error loading data');
      }
    });
  }else{
    window.location.href="form.html" // 没有合法数据，跳转到查询页面
  }


  // 自定义地图列表跳转控件类
  function ListNavControl(){
    this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
    this.defaultOffset = new BMap.Size(10,10);
  }
  ListNavControl.prototype= new BMap.Control();
  ListNavControl.prototype.initialize = function(map){
    var div = $('<div>').html("列表模式").addClass("navtext");
    div.click(function(){
      sessionStorage.mapCenterZoom='{"lng":'+map.getCenter().lng+',"lat":'+map.getCenter().lat+',"zoom":'+map.getZoom()+'}';
      window.location.href = "pqestate.html";
    });
    map.getContainer().appendChild(div.get(0));
    return div.get(0);
  }
  // 自定义图例控件类
  function LegendControl(){
    this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
    this.defaultOffset = new BMap.Size(10,10);
  }
  LegendControl.prototype= new BMap.Control();
  LegendControl.prototype.initialize = function(map){
    var img=$('<img>').attr("src","image/legend.png")
                      .css("max-width","150px");
    var div = $('<div>').append(img);

    map.getContainer().appendChild(div.get(0));
    return div.get(0);
  }
 // 自定义地图列表控件类
  function ListingControl(data){
    this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
    this.defaultOffset = new BMap.Size(60,10);
    this.data= data;
  }
  ListingControl.prototype= new BMap.Control();
  ListingControl.prototype.initialize = function(map){
        var div = DomDropUpGen(this.data);
        map.getContainer().appendChild(div.get(0));
        return div.get(0);
  }
  // DOM生成函数
  function DomDropUpGen(data){
    var btn = $('<button>').addClass("btn btn-default dropdown-toggle navtext")
                           .attr("data-toggle","dropdown")
                           .attr("type","button")
                           .attr({"aria-expanded":"false","aria-haspopup":"true"});
    var divlist = $("<div>").addClass("dropdown-menu").css("min-width","180px")
                            .attr("aria-labelledby","dropdownMenuButton");
    for (i=0;i<data.length;i++){
       var weuidiv = $('<div>').addClass("weui-cell")
                               .css("font-size","12px")
                               .append($('<div>').addClass("weui-cell__bd").html(data[i].name))
                               .append($('<div>').addClass("weui-cell__ft").html(data[i].price+"/万")
                                                .css("color","red"));
        divlist.append(weuidiv);
    }
    var div = $('<div>').addClass("btn-group")
                        .append(btn)
                        .append(divlist);
    return div;
  }
  // 实例化地图跳转控件
  var ListNavCtrl = new ListNavControl();
  map.addControl(ListNavCtrl);
  var LegendCtrl = new LegendControl();
  map.addControl(LegendCtrl);

  // 初始化地图：设置地图中心和缩放级别
  // 该过程将触发地图的zoomend事件，从而根据缩放比例显示不同形状的Overlay
  function zoomMap(pqdata, calcCenterPt){
    if (calcCenterPt) {
    	var lngMin=1000, lngMax=-10, latMin=1000, latMax=-10;
      for (var i=0; i < pqdata.communities.length; ++i){
      	lngMin = (pqdata.communities[i].lng <= lngMin) ? pqdata.communities[i].lng : lngMin;
      	lngMax = (pqdata.communities[i].lng >= lngMax) ? pqdata.communities[i].lng : lngMax;
      	latMin = (pqdata.communities[i].lat <= latMin) ? pqdata.communities[i].lat : latMin;
      	latMax = (pqdata.communities[i].lat >= latMax) ? pqdata.communities[i].lat : latMax;
      }
      var centerpt = new BMap.Point((lngMin+lngMax)/2,(latMin+latMax)/2);
      map.centerAndZoom(centerpt, 16);
        sessionStorage.mapCenterZoom='{"lng":'+map.getCenter().lng+',"lat":'+map.getCenter().lat+',"zoom":'+map.getZoom()+'}';
    } else {
    	var mapInfo = JSON.parse(sessionStorage.mapCenterZoom);
    	var centerpt = new BMap.Point(mapInfo.lng, mapInfo.lat);
      map.centerAndZoom(centerpt, mapInfo.zoom);
    }
  }

  // 地图map的缩放响应，根据缩放比例显示不同形状的Overlay
  function displayOverlayByZoom(map, pqdata){
  	return function() {
      map.clearOverlays();

        for (var i=0; i < pqdata.communities.length;++i){
            var pt = new BMap.Point(parseFloat(pqdata.communities[i].lng), parseFloat(pqdata.communities[i].lat));
            var myOverlay = new RectangularOverlay(pt,pqdata.communities[i].id,pqdata.communities[i].name+" "+pqdata.communities[i].price +"万","Rec",pqdata.communities[i].match);
            map.addOverlay(myOverlay);
        }
    }
  }

  // 定义自定义Overlay覆盖物的构造函数
  function RectangularOverlay(point,id,text,type,match){
    this._point = point;
    this._text = text;
    this._id=id;
    this._type = type;
    this._dataset = match;
  }

  // 暂存Touch的位置信息
  var startPos, endPos;
  // 处理Touch相关事件
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
      	// 确保只有在用户真正点击（Touch位移小于10）的时候才跳转到下一页
        if (Math.abs(endPos.x-startPos.x)<10 && Math.abs(endPos.y-startPos.y)<10) {
          sessionStorage.mapCenterZoom='{"lng":'+map.getCenter().lng+',"lat":'+map.getCenter().lat+',"zoom":'+map.getZoom()+'}';
          window.location.href = hyperlink;
        }
      }
      else if (evt.type == 'click') {
      	// 处理桌面浏览器的click事件
        sessionStorage.mapCenterZoom='{"lng":'+map.getCenter().lng+',"lat":'+map.getCenter().lat+',"zoom":'+map.getZoom()+'}';
        window.location.href = hyperlink;
      }
    }
  }

  RectangularOverlay.prototype = new BMap.Overlay(); // 继承API的BMap.Overlay
  // 实现Overlay的初始化方法
  RectangularOverlay.prototype.initialize = function(targetmap){
    this._map = targetmap;
    var hyperlink = "";
    var span =$('<span>').html(this._text);
    var div = $('<div>').css({"position":"absolute",
                              "z-index":BMap.Overlay.getZIndex(this._point.lat),
                              "background-color":"#910029",
                              "opacity":0.8,
                              "border":"1px solid #BC3B3A",
                              "color":"white",
                              "padding":"2px",
                              "line-height":"18px",
                              "white-space":"nowrap",
                              "moz-user-select":"none",
                              "font-size":"15px",
                              "display":"flex",
                              "align-items":"center",
                              "justify-content":"center"
                            })
                          .append(span);

    if (this._type == "Cir"){
      div.css({"height":"100px","width":"100px","border-radius":"50%"});
      hyperlink = "pqestate.html";
    } else{
          if(this._dataset<8){
            div.css({"background-color":"#149A22","border":"none"});
          } else if (this._dataset>8&&this._dataset<9){
              div.css({"background-color":"#9D8410","border":"none"});
          }else{

          }
              div.css("height","25px");
              hyperlink = "estate.html?id=" + this._id;
    }

    // div的点击事件
      div.on('touchstart',handleDivEvent(hyperlink))
         .on('touchmove',handleDivEvent(hyperlink))
         .on('touchend',handleDivEvent(hyperlink))
         .on('click',handleDivEvent(hyperlink));

    this._div=div.get(0);
    this._map.getPanes().labelPane.appendChild(div.get(0));
    return this._div;
  }

  // 实现Overlay的绘制方法
  RectangularOverlay.prototype.draw = function(){
    // 根据地理坐标转换为像素坐标，并设置给容器
    var pixel = this._map.pointToOverlayPixel(this._point);
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
