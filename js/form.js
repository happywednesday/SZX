$(document).ready(function(){

const dataset = [
  {"budget": ["200万以内","200至400","400至600","600至800","800至1000","大于1000"]},
  {"size" :["小于50","50至90","90至140","140至200","200以上"]},
  {"region":["罗湖","福田","南山","盐田","龙华","龙岗","宝安","坪山","大鹏新区","光明新区"]},
  {"facility":["地铁","大超市","购物中心","百货商场","公园","小学好","中学好","景观好"]},
  {"feature":["花园小区","有电梯","高楼层","中间楼层","低楼层","朝向好"]}
]

const facArray=["subw","supm","shpm","deps","park","prims","junhs","view"];
const feaArray=["garden","elev","floor","floor","floor","orien"];

$(dataset).each(function(data){

  var item = Object.values(dataset[data])[0];

  var targetNode = $("#"+Object.keys(dataset[data])[0]);

 if(jQuery.inArray(Object.keys(dataset[data])[0],["budget","size","region"])!==-1){
   for(i=0;i<item.length;i++){
     var a = $('<a>').addClass("btn btn-outline-secondary btn-sm")
                     .attr({
                       "value":0,
                       "id":i
                      })
                     .html(item[i])
                     .css("margin","5px 0px 0px 5px")
                     .css("font-size",12);
     targetNode.append(a);
   }
 }else if(Object.keys(dataset[data])[0]=="facility"){
   for(i=0;i<item.length;i++){
      var a = $('<a>').addClass("btn btn-outline-secondary btn-sm")
                  .attr({
                    "value":0,
                    "id":facArray[i]
                  })
                  .html(item[i])
                  .css("margin","5px 0px 0px 5px")
                  .css("font-size",12);
        targetNode.append(a);
    }
 }else{
  for(i=0;i<item.length;i++){
    var a = $('<a>').addClass("btn btn-outline-secondary btn-sm")
                   .attr({
                     "value":0,
                     "id":feaArray[i],
                     "index":i
                   })
                   .html(item[i])
                   .css("margin","5px 0px 0px 5px")
                   .css("font-size",12);
        targetNode.append(a);
    }
 }
});



$(".btn-sm").click(function(){
  if((jQuery.inArray($(this).parent().attr("id"),["budget","size","region"])!==-1)){
   $(this).siblings().each(function(){
     unselect(this);
   });
  }
  if($(this).attr("id")=="floor"){
   $(this).siblings().each(function(){
     if($(this).attr("id")=="floor"){
       unselect(this);
     }
   });
  }
  ($(this).attr('value')==0)?select(this):unselect(this);

  function select(target){
   $(target).addClass("active");
   $(target).attr("value",1);
  }
  function unselect(target){
   $(target).removeClass('active');
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

   $(".btn-sm").each(function(index){

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

   // $.get("map.html", {Para:JSON.stringify(subdata)}, function(){
   // } );

      // var data = JSON.parse(response);

       window.location.href="map.html?Para="+encodeURI(encodeURI(JSON.stringify(subdata)));


  console.log(subdata);

});

});
