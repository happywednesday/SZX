$(document).ready(function(){
var idx = JSON.parse(decodeURI(getUrlParam("id")));
var pqname=JSON.parse(decodeURI(getUrlParam("pq")));

// var id = getUrlParam("id");


// 根据片区ID 利用GET向服务器请求小区列表信息
    // $.ajax({
    //    url:requestData("pqestate",id), //service.js中函数模拟服务器url，需根据实际服务器进行替换
    //    dataType:"text",
    //    type:"GET",
    //    success: function(data){
            $("#pqname").html(pqname+"片区");

            // 利用jsrender和显示模版批量显示挂牌房源

            var estatetplt = $.templates("#estatetemplate");
            var html = estatetplt.render(idx);
            $("#estatelist").html(html);
            $("#xqcount").html("共有"+idx.length+"小区");
    //   },
    //   error: function(err) {
    //   $.toptip("操作失败",'error');
    //    }
    // });



});
