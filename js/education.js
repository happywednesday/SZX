$(document).ready(function(){

$("#searchbtn").click(function(e){

  $("#result").empty();

  var url = "json/education.json";

    $.ajax({
       url:url,
       dataType:"text",
       success: function(data){
            var json = JSON.parse(data);

            listAreaAttr(json);
      }
    });

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

        // var margin = {top: 5, right: 40, bottom: 20, left: 120},
        // width = 960 - margin.left - margin.right,
        // height = 50 - margin.top - margin.bottom;
        //
        // var chart = d3.bullet()
        // .width(width)
        // .height(height);
        //
        // d3.json("bullets.json", function(error, data) {
        // if (error) throw error;

      }


}}


});
});
