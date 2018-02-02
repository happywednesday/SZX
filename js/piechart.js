function piechart(displaydata){
	var dom = document.getElementById("piechart");
	var myChart = echarts.init(dom);
	var app = {};
	option = null;
	option = {
	    title : {
	        text: '总体评价',
	        subtext: '8.6',
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{b} : {c}"
	    },
	    // legend: {
	    //     x : 'center',
	    //     y : 'bottom',
	    //     data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
	    // },
	    toolbox: {
	        show : true,
	        feature : {
	            mark : {show: true},
	            magicType : {
	                show: true,
	                type: ['pie', 'funnel']
	            },

	        }
	    },
	    calculable : true,
	    series :[
	        {
	            name:'',
	            type:'pie',
	            radius : [30, 110],
	            center : ['50%', '50%'],
	            roseType : 'area',
	            data:displaydata
	        }
	    ]
	};

	if (option && typeof option === "object") {
	    myChart.setOption(option, true);
	}
}
