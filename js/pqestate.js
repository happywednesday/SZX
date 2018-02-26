$(document).ready(function(){
    var idx = JSON.parse(sessionStorage.xqlist);
    var pqname=sessionStorage.pq;

    $("#pqname").html(pqname+"片区");

    // 利用jsrender和显示模版批量显示挂牌房源

    var estatetplt = $.templates("#estatetemplate");
    var html = estatetplt.render(idx);
    $("#estatelist").html(html);
    $("#xqcount").html("共有"+idx.length+"小区");

});
