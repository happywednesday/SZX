$(document).ready(function(){

var dataset = [
  {"budget": ["200万以内","200至400","400至600","600至800","800至1000","大于1000"]},
  {"size" :["小于50","50至70","70至90","90至140","140至160","大于160"]},
  {"region":["罗湖","福田","南山","盐田","龙华","龙岗","宝安","坪山","大鹏新区","光明新区"]},
  {"facility":["地铁","大超市","购物中心","百货商场","公园","小学好","中学好","景观好"]},
  {"feature":["花园小区","有电梯","高楼层","中间楼层","低楼层","朝向好"]}
]

var facArray=["subw","supm","shpm","deps","park","prims","junhs","view"];
var feaArray=["garden","elev","floor","floor","floor","orien"];

$(dataset).each(function(data){

  var item = Object.values(dataset[data])[0];

  var targetNode = $("#"+Object.keys(dataset[data])[0]);

 if(jQuery.inArray(Object.keys(dataset[data])[0],["budget","size","region"])!==-1){
   for(i=0;i<item.length;i++){
     var a = $('<a>').addClass("weui-btn weui-btn_mini weui-btn_default").attr("value",0).html(item[i]).css("margin","5px 0px 0px 5px").attr("id",i);
     targetNode.append(a);
   }
}else if(Object.keys(dataset[data])[0]=="facility"){
   for(i=0;i<item.length;i++){
  var a = $('<a>').addClass("weui-btn weui-btn_mini weui-btn_default").attr("value",0).html(item[i]).css("margin","5px 0px 0px 5px").attr("id",facArray[i]);
  targetNode.append(a);
}

}else{
  for(i=0;i<item.length;i++){
 var a = $('<a>').addClass("weui-btn weui-btn_mini weui-btn_default").attr("value",0).html(item[i]).css("margin","5px 0px 0px 5px").attr("id",feaArray[i]).attr("index",i);
 targetNode.append(a);
}


}


});



$(".weui-btn_mini").click(function(){
  if((jQuery.inArray($(this).parent().attr("id"),["budget","size","region"])!==-1)||($(this).attr("id")=="floor")){
   $(this).siblings().each(function(){
     unchangecss(this);
   });
 }
  ($(this).attr('value')==0)?changecss(this):unchangecss(this)
  function changecss(target){

  $(target).css({"background-color":"white","color":"red","border-color":"red","border-style":"solid","border-width":"1px"});
  $(target).attr("value",1);
 }
 function unchangecss(target){
   $(target).removeAttr('style');
   $(target).css("margin","5px 0px 0px 5px");
   $(target).attr("value",0);
 }
});


$("#submit").click(function(){
   var subdata = {
      budget:0,
      size:0,
      region:0,
      subw:0,
      supm:0,
      shpm:0,
      deps:0,
      park:0,
      prims:0,
      junhs:0,
      view:0,
      garden:0,
      elev:0,
      floor:0,
      orien:0,
      user:0
   };

   $(".weui-btn_mini").each(function(index){

       if(jQuery.inArray($(this).parent().attr("id"),["budget","size","region"])!==-1){
          if($(this).attr("value")==1) {
            subdata[$(this).parent().attr("id")]=$(this).attr("id");
          }
       }else{

         if(($(this).attr("value")==1)&&($(this).attr("id")=="floor")) {
           subdata[$(this).attr("id")]=$(this).attr("index");
         }else if($(this).attr("value")==1){
           subdata[$(this).attr("id")]=$(this).attr("value");
         }

        }

   });

      // var data = JSON.parse(response);

       window.location.href="map.html?Para="+encodeURI(encodeURI(JSON.stringify(subdata)));


  console.log(subdata);

});

});
