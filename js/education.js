$(document).ready(function(){

$("#searchbtn").on('click',function(e){
  loadData();

});

function loadData(){
  $("#result").empty();

 var selMode =  $("input[name='school']:checked").val();
 if (selMode == "1") {
   var link = document.querySelector('link[rel="import"]');
   var template = link.import.querySelector("template");
    $("#result").append(document.importNode(template.content,true));


    $.ajax({
       url:requestData("pqestate",$("#search").val()),
       dataType:"text",
       success: function(data){

            var json = JSON.parse(data).data.xq;

            var estatetplt = $.templates("#estatetemplate");
            var html = estatetplt.render(json);
            $("#estatelist").html(html);

            $.showLoading();
            setTimeout(function(){
              $.hideLoading();
            },1000);
      },
      error: function(err) {
        $.toptip("无搜索结果",'error');
       }
     });

 } else if (selMode =="2"){

  var url = "json/education.json";
    $.ajax({
       url:url,
       dataType:"text",
       success: function(data){
            var json = JSON.parse(data);
            listAreaAttr(json);
      }
    });}
}
  function listAreaAttr(info){
    for(var key in info.data){
      var alink = $('<a>').attr("href","school.html?id="+info.data[key].id);
      alink.css("color","black");
      $('#result').append(alink);

      var div = $('<div>').addClass("weui-cell");
      alink.append(div);


      var hddiv = $('<div>').addClass("weui-cell__hd");
      div.append(hddiv);

      var labeldiv = $('<label>').addClass("weui-label");
      labeldiv.html(info.data[key].name);

      hddiv.append(labeldiv);

      for (var i= 0 ;i<info.data[key].rate;i++){
        var star = $('<span>').addClass("fa fa-star");
        hddiv.append(star);
      }
    }
  }

});
