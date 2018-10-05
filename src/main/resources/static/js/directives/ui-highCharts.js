'use strict';
/**
 * Created by sophia.wang on 17/1/6.
 */
angular.module("ui-highCharts", [])
    .directive('uiHchartsPie', function() {
        return {
            scope   : {
                id          : "@",
                title       : '=',
                series      : '=',
                callFn      : '=',
                options3d   : '='
            },
            restrict: 'AE',
            replace : true,
            template: '<div></div>',
            link    : function(scope, elem, attrs){
                if(!scope.options3d) {
                    scope.options3d = {}
                }

                scope.$watch('series',function(newValue, oldValue){
                    if(newValue){
                        var chart = $('#'+scope.id).highcharts({
                            chart: {
                                type: 'pie',
                                options3d: scope.options3d
                            },
                            title: {
                                text: scope.title
                            },
                            tooltip: {
                                pointFormat: '<b>{point.percentage:.1f}%</b>'
                            },
                            plotOptions: {
                                pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    depth: 35,
                                    dataLabels: {
                                        enabled: true,
                                        format: '{point.name}'
                                    },
                                    showInLegend: true
                                }
                            },
                            legend: {
                                layout: 'vertical',
                                align: 'left',
                                verticalAlign: 'middle'
                            },
                            series: [{
                                type    : 'pie',
                                data    : scope.series,
                                events  : {
                                    click: function(e) {
                                        scope.callFn(e.point);
                                    }
                                }
                            }],
                            credits: {
                                enabled:false // 禁用版权信息
                            }
                        });
                    }
                }, true);
            }
        }
    })
    .directive('uiHchartsColumn', function () {
        return {
            scope   : {
                id: "@",
                title: '=',
                series: '=',
                callFn: '='
            },
            restrict: 'AE',
            replace : true,
            template: '<div></div>',
            link    : function(scope, elem, attrs){

            }
        }
});