$(document).ready(function(){

 var id =getUrlParam("id");


    $.ajax({
       url:requestData("school",id),
       dataType:"text",
       success: function(data){
            var json = JSON.parse(data);

            listAttr(json);

            var jsondata = json.data.xqlist;
            var estatetplt = $.templates("#estatetemplate");
            var html = estatetplt.render(jsondata);
            $("#estatelist").html(html);
      }
    });

  function listAttr(info){

      $('#name').html(info.data.name);

      for (var i= 0 ;i<info.data.rate;i++){
        var star = $('<span>').addClass("fa fa-star");
        $('#rate').append(star);
      }
      passrate(info.data.enro_rate);

    //   var svg = $('<svg>').css({"width":"150px","height":"10px"}).html("hello");
    //   $('#rate').append(svg);
    //   var data = {"range":5,"measure":info.data.rate};
    //   var width = 150, height = 10;
    //   var chart = d3.bullet()
    //       .width(width)
    //       .height(height);
    //
    // var svg = d3.select("body").selectAll("svg")
    // .data(data)
    // .enter().append("svg")
    // .attr("class", "bullet")
    // .attr("width", width )
    // .attr("height", height)
    // .append("g")
    // // .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    // .call(chart);
}

function passrate(data){

  for(var i=0;i<data.length;i++){

    var labeldiv = $('<label>').addClass("weui-label").html(data[i].year + "(" + data[i].type +")").css('font-size','10px');
    $('#enrorate').append(labeldiv);

    var bddiv = $('<div>').addClass("weui-cell__bd chart");
      $('#enrorate').append(bddiv);

    var bardiv = $('<div>');
    bardiv.css('width',data[i].rate);
    bardiv.html(data[i].rate);
    bddiv.append(bardiv);


  }

}

});
