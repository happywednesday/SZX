$(document).ready(function(){
    var idx = JSON.parse(sessionStorage.pqdata);

    // 利用jsrender和显示模版批量显示挂牌房源

    var estatetplt = $.templates("#estatetemplate");
    var html = estatetplt.render(idx.communities);
    $("#estatelist").html(html);
    $("#xqcount").html("共有"+idx.communities.length+"小区");

    $(".navtext").click(function(){
      window.location.href = "map.html";
    });

});
