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

      var div = $('<div>').addClass("weui-cell");
      $('#result').append(div);

      var hddiv = $('<div>').addClass("weui-cell__hd");
      div.append(hddiv);

      var labeldiv = $('<label>').addClass("weui-label");
      labeldiv.html(info.data[key].name);

      hddiv.append(labeldiv);

      for (var i= 0 ;i<info.data[key].rate;i++){
        var star = $('<span>').addClass("fa fa-star");
        hddiv.append(star);
      }


}}
});
});
