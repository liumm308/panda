var echart = angular.module('angular.echart',[]);
echart.directive('compileHtml', function ($compile) {
	  return {
	    restrict: 'A',
	    replace: true,
	    link: function (scope, ele, attrs) {
	      scope.$watch(function () {return scope.$eval(attrs.ngBindHtml);},
	          function(html) {
	            ele.html(html);
	            $compile(ele.contents())(scope);
	          });
	    }
	  };
	});
echart.directive('echartLine', function () {
    return {
        scope: {
            id: "@",
            width: "=",
            height: "=",
            xaxis: "=",
            yaxis: "="
        },
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        link: function($scope, element, attrs, controller) {
            var legend = [];
            var items  = [];
            for(var i = 0; i < $scope.yaxis.length;i++) {
                legend.push($scope.yaxis[i].name);
                items.push($scope.yaxis[i].data);
            }
            var xaxis = $scope.xaxis[0].data;
            
            var chartContainer = document.getElementById($scope.id);
            //用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
           var resizeContainer = function () {
        	  chartContainer.style.width = $scope.width+'px';
        	  chartContainer.style.height = $scope.height+'px';
           }
           resizeContainer();
           var myChart = echarts.init(chartContainer);
            var option = {
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    textStyle:{
                        color:'#fff'
                    },
                    data: legend
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis : [
                    {
                        type : 'category',
                        axisLabel:{
                            show:true,
                            textStyle:{
                                color:'#fff'
                            }
                        },
                        boundaryGap : false,
                        data : xaxis
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel:{
                            show:true,
                            textStyle:{
                                color:'#fff'
                            }
                        },
                        max: 500,
                    }
                ],
                series:function(){
                    var serie=[];
                    for( var i=0; i < legend.length;i++){
                        var item={
                            name: legend[i],
                            type:'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data: items[i]
                        }
                        serie.push(item);
                    };
                    return serie;
                }()
            };
            myChart.setOption(option);
            window.onresize = function () {
                //重置容器高宽
                resizeContainer();
                myChart.resize();
            };
        }
    };
});
echart.directive('echartMeasure', function () {
    return {
        scope: {
            id: "@",
            width: "=",
            height: "=",
            xaxis: "=",
            yaxis: "="
        },
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        link: function($scope, element, attrs, controller) {
			var itemName = $scope.yaxis[0].name;
			var itemData = $scope.yaxis[0].data.length;
			var chartContainer = document.getElementById($scope.id);
            //用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
           var resizeContainer = function () {
        	  chartContainer.style.width = $scope.width+'px';
        	  chartContainer.style.height = $scope.height+'px';
           }
           resizeContainer();
           var myChart = echarts.init(chartContainer);
            var option = {
                tooltip : {
                    formatter: "{a} <br/>{b} : {c}%"
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                series: [
                    {
                        type: 'gauge',
                        name: itemName,
                        detail: {formatter: itemData},
                        data: [{value: itemData, name: '数量'}]
                    }
                ]
            };
            myChart.setOption(option);
            window.onresize = function () {
                //重置容器高宽
                resizeContainer();
                myChart.resize();
            };
        }
    };
});
echart.directive('echartPie', function () {
    return {
        scope: {
            id: "@",
            width: "=",
            height: "=",
            xaxis: "=",
            yaxis: "="
        },
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        link: function($scope, element, attrs, controller) {
        	var item = $scope.xaxis;
    		var legend = $scope.yaxis;
    		//1个维度1个数值
    		/*if(xAxis.length == 1) {
    			legend = xAxis[0].data;
    			for(var i = 0; i < xAxis[0].data.length; i++) {
    				var obj = {
    					name:xAxis[0].data[i],
    					value:yAxis[0].data[i]
    				}
    				item.push(obj);
    			}
    		} else if(xAxis.length == 0 && yAxis.length > 0) {//0个维度多个数值
    			for(var i = 0; i < yAxis.length; i++) {
    				legend.push(yAxis[i].name);
    				var obj = {
    					name:yAxis[i].name,
    					value:yAxis[i].data.length
    				}
    				item.push(obj);
    			}
    		}*/
    		
    		var chartContainer = document.getElementById($scope.id);
            //用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
           var resizeContainer = function () {
        	  chartContainer.style.width = $scope.width+'px';
        	  chartContainer.style.height = $scope.height+'px';
           }
           resizeContainer();
           var myChart = echarts.init(chartContainer);
           
            var option = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{b} : {c} <br/> {a} : {d}%"
                },
                legend: {
                    textStyle: {
                        color: '#fff'
                    },
                    data: legend
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                series : [
                    {
                        name:'占比',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data: item,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            myChart.setOption(option);
            window.onresize = function () {
                //重置容器高宽
                resizeContainer();
                myChart.resize();
            };
        }
    };
});
echart.directive('echartFunnel', function () {
    return {
        scope: {
            id: "@",
            width: "=",
            height: "=",
            xaxis: "=",
            yaxis: "="
        },
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        link: function($scope, element, attrs, controller) {
        	var item = $scope.xaxis;
    		var legend = $scope.yaxis;
    		/*var legend = [];
    		var item = [];*/
    		//1个维度1个数值
    		/*if(xAxis.length == 1) {
    			legend = xAxis[0].data;
    			for(var i = 0; i < xAxis[0].data.length; i++) {
    				var obj = {
    					name:xAxis[0].data[i],
    					value:yAxis[0].data[i]
    				}
    				item.push(obj);
    			}
    		} else if(xAxis.length == 0 && yAxis.length > 0) {//0个维度多个数值
    			for(var i = 0; i < yAxis.length; i++) {
    				legend.push(yAxis[i].name);
    				var obj = {
    					name:yAxis[i].name,
    					value:yAxis[i].data.length
    				}
    				item.push(obj);
    			}
    		}*/
    		var chartContainer = document.getElementById($scope.id);
            //用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
           var resizeContainer = function () {
        	  chartContainer.style.width = $scope.width+'px';
        	  chartContainer.style.height = $scope.height+'px';
           }
           resizeContainer();
           var myChart = echarts.init(chartContainer);
           
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c}"
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                legend: {
                    textStyle:{
                        color:'#fff'
                    },
                    data: legend
                },
                calculable: true,
                series: [
                    {
                        name: '金字塔',
                        type: 'funnel',
                        width: '30%',
                        height: '35%',
                        left: '5%',
                        top: '15%',
                        sort: 'ascending',
                        data: item
                    },
                    {
                        name: '漏斗图',
                        type: 'funnel',
                        width: '30%',
                        height: '35%',
                        left: '5%',
                        top: '50%',
                        data: item
                    },
                    {
                        name: '漏斗图',
                        type:'funnel',
                        width: '30%',
                        height: '35%',
                        left: '50%',
                        top: '15%',
                        label: {
                            normal: {
                                position: 'left'
                            }
                        },
                        data: item
                    },
                    {
                        name: '金字塔',
                        type:'funnel',
                        width: '30%',
                        height: '35%',
                        left: '50%',
                        top: '50%',
                        sort: 'ascending',
                        label: {
                            normal: {
                                position: 'left'
                            }
                        },
                        data: item
                    }
                ]
            };
            myChart.setOption(option);
            window.onresize = function () {
                //重置容器高宽
                resizeContainer();
                myChart.resize();
            };
        }
    };
});