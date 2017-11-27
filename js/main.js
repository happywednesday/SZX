$(function(){
  // Form popup for user input
  $("#budget").select({
  title: "预算",
  items: [
    {
      title:"200万以内",
      value:1,
    },
    {
      title:"200万--400万",
      value:2,
    },
    {
      title:"400万--600万",
      value:3,
    },
    {
      title:"600万--800万",
      value:4,
    },
    {
      title:"800万以上",
      value:5,
    },
    {
      title:"自定义",
      value:6,
    }],
    onChange: function(d) {

      if (d.values == "6") {
        $.prompt({
          title:"请输入预算",
          text:"你理想的预算是多少呢？",
          input:"100--200万",
          empty: false,
          onOK: function(input){
            d.titles=input;
            console.log(this,d.titles);
          }
        });

        return true;
      }
      return true;

  },
});
$("#size").select({
  title: "面积",
  items: [
    {
      title: "50以内",
      value: 1,
    },
    {
      title: "50--90",
      value: 2,
    },
    {
      title: "90--140",
      value: 3,
    },
    {
      title: "140--200",
      value: 4,
    },
    {
      title: "200以上",
      value: 5,
    },
    {
      title: "自定义",
      value: 6,
    }],

    onChange: function(d) {

      if (d.values == "6") {
        $.prompt({
          title:"请输入面积",
          text:"你理想的房子是多大呢？",
          input:"50--80",
          empty: false,
          onOK: function(input){
            d.titles=input;

          }
        });

        return true;
      }
      return true;

  },

});

var districtConfig = {
  title: "区域",
  multi: true,
  items: [
    {
      title: "不限",
      value: 0,
      description: ""
    },
    {
      title: "罗湖区",
      value: 1,
      description: ""
    },
    {
      title: "福田区",
      value: 2,
      description: ""
    },
    {
      title: "南山区",
      value: 3,
      description: ""
    },
    {
      title: "盐田区",
      value: 4,
      description: ""
    },
    {
      title: "龙华区",
      value: 5,
      description: ""
    },
    {
      title: "龙岗区",
      value: 6,
      description: ""
    },
    {
      title: "宝安区",
      value: 7,
      description: ""
    } ],

    onChange: function(d) {
      var found = d.values.includes("0");
      if (found) {
        $("#district").select("update",
          {multi:false});
          
      }
}
};
$("#district").select(districtConfig);

$("#neighbor").select({
  title: "配套",
  multi: true,
  items: [
    {
      title: "地铁",
      value: 1,
      description: ""
    },
    {
      title: "大型购物中心",
      value: 2,
      description: ""
    },
    {
      title: "大型超市",
      value: 3,
      description: ""
    },
    {
      title: "百货商场",
      value: 4,
      description: ""
    },
    {
      title: "公园",
      value: 5,
      description: ""
    }],
});
$("#feature").select({
  title: "房子",
  multi: true,
  items: [
    {
      title: "有内部花园",
      value: 1,
      description: ""
    },
    {
      title: "高楼层",
      value: 2,
      description: ""
    },
    {
      title: "采光好",
      value: 3,
      description: ""
    },
    {
      title: "有电梯",
      value: 4,
      description: ""
    }],
});

// Baidu Map
var map = new BMap.Map("resultmap");
map.centerAndZoom(new BMap.Point(114.0427, 22.552701), 16);

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
  maxZoom:18,
  trackMarkers:true
});

 var markersConfig = [
 {minZoom:1, maxZoom:16,scale:"estatearea"},
 {minZoom:17, maxZoom:19,scale:"estate"}
 ];

 for (var i in markersConfig){
   var t = markersConfig[i];
   var mks = getMarks(t.scale);
   mgr.addMarkers(mks,t.minZoom,t.maxZoom);
 }

mgr.showMarkers();

// generate estate marker pt based on data from server, fake coordniates for testing purpose
 function getMarks(target){
   var markers = [];
 	 var pt = null;
 	 var i = 0;
   if (target == "estate") {

 	 for (; i < estate.estatecount; i++) {

 	   pt = new BMap.Point(estate.estatedetails[i][0], estate.estatedetails[i][1]);

 	   markers.push(new BMap.Marker(pt));

 	}} else {

    for (; i < estate.areacount; i++) {

  	   pt = new BMap.Point(estate.areadetails[i][0], estate.areadetails[i][1]);

  	   markers.push(new BMap.Marker(pt));
  }

 }
 return markers;
}





});
