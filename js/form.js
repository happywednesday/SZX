$(document).ready(function(){
  // Select Config
  var budgetConfig = {
    title: "预算",
    items: [
      {
        title:"200万以内",
        value:1,
      },
      {
        title:"200万-400万",
        value:2,
      },
      {
        title:"400万-600万",
        value:3,
      },
      {
        title:"600万-800万",
        value:4,
      },
      {
        title:"800万以上",
        value:5,
      },
      {
        title:"自定义",
        value:6,
      }],
      onChange: function(d) {

        if (d.values == "6") {
          $.prompt({
            title:"请输入预算",
            text:"你理想的预算是多少呢？",
            input:"100-200万",
            empty: false,
            onOK: function(input){
              d.titles=input;

            }
          });

          return true;
        }
        return true;
  }
};

var sizeConfig ={
  title: "面积",
  items: [
    {
      title: "50以内",
      value: 1,
    },
    {
      title: "50-90",
      value: 2,
    },
    {
      title: "90-140",
      value: 3,
    },
    {
      title: "140-200",
      value: 4,
    },
    {
      title: "200以上",
      value: 5,
    },
    {
      title: "自定义",
      value: 6,
    }],

    onChange: function(d) {

      if (d.values == "6") {
        $.prompt({
          title:"请输入面积",
          text:"你理想的房子是多大呢？",
          input:"50-80",
          empty: false,
          onOK: function(input){
            d.titles=input;

          }
        });

        return true;
      }
      return true;
}
};

var districtConfig = {
  title: "区域",
  multi: true,
  items: [
    {
      title: "不限",
      value: 0,
      description: ""
    },
    {
      title: "罗湖区",
      value: 1,
      description: ""
    },
    {
      title: "福田区",
      value: 2,
      description: ""
    },
    {
      title: "南山区",
      value: 3,
      description: ""
    },
    {
      title: "盐田区",
      value: 4,
      description: ""
    },
    {
      title: "龙华区",
      value: 5,
      description: ""
    },
    {
      title: "龙岗区",
      value: 6,
      description: ""
    },
    {
      title: "宝安区",
      value: 7,
      description: ""
    } ],

    onChange: function(d) {
      var found = d.values.includes("0");
      if (found) {
        $("#district").select("update",
          {multi:false});

      }
}
};

var neighborConfig = {
  title: "配套",
  multi: true,
  items: [
    {
      title: "附近有地铁",
      value: 1,
      description: ""
    },
    {
      title: "附近有大型购物中心",
      value: 2,
      description: ""
    },
    {
      title: "附近有大型超市",
      value: 3,
      description: ""
    },
    {
      title: "附近有百货商场",
      value: 4,
      description: ""
    },
    {
      title: "附近有公园",
      value: 5,
      description: ""
    },
    {
      title: "位于优质小学学区",
      value: 6,
      description: ""
    },
    {
      title: "位于优质中学学区",
      value: 7,
      description: ""
    },
    {
      title: "景观好",
      value: 8,
      description: ""
    }
  ],

  onOpen: function(d) {
     var div = $('<div>').html("注：附近是指房产800米范围内，即成人正常步行10分钟内");
     div.css({"color":"grey","font-size":"12px","text-align":"right","padding":"0px 10px"});
      $(".weui-picker-modal").append(div);

}

};

var featureConfig = {
  title: "房子",
  multi: true,
  items: [
    {
      title: "有内部花园",
      value: 1,
      description: ""
    },
    {
      title: "高楼层",
      value: 2,
      description: ""
    },

    {
      title: "有电梯",
      value: 3,
      description: ""
    }]
};

//implement Select
$("#budget").select(budgetConfig);
$("#size").select(sizeConfig);
$("#district").select(districtConfig);
$("#neighbor").select(neighborConfig);
$("#feature").select(featureConfig);


});
