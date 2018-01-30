$(document).ready(function(){

var dataset = [
  {"budget": ["200万以内","200至400","400至600","600至800","800至1000","大于1000"]},
  {"size" :["小于50","50至70","70至90","90至140","140至160","大于160"]},
  {"region":["罗湖","福田","南山","盐田","龙华","龙岗","宝安","坪山","大鹏新区","光明新区"]},
  {"facility":["地铁","大超市","购物中心","百货商场","公园","优质小学","优质中学","景观好"]},
  {"feature":["有电梯","高楼层","有内部花园"]}
]

$(dataset).each(function(data){
  var item = Object.values(dataset[data])[0];
  var targetNode = $("#"+Object.keys(dataset[data])[0]);
  for(i=0;i<item.length;i++){
  var a = $('<a>').addClass("weui-btn weui-btn_mini weui-btn_default").attr("value",0).html(item[i]).css("margin","5px 0px 0px 5px");
  targetNode.append(a);
}
});



$(".weui-btn_mini").click(function(){

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


});
