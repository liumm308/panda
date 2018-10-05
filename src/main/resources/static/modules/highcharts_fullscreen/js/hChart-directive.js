angular.module('app.hChart-directive', [])
    .directive('hChartPie', function(){
        return {
            restrict: 'EA',
            replace: true,
            template: '<div id="hChart-pie" style="height: 100%;"></div>',
            link: function(scope, elem, attrs){
                var chart = $('#hChart-pie').highcharts({
                	 chart: {
                         type: 'pie',
                         options3d: {
                             enabled: true,
                             alpha: 45,
                             beta: 0
                         }
                     },
                    title: {
                        text: 'Contents of Highsoft\'s weekly fruit delivery'
                    },
                    subtitle: {
                        text: '3D donut in Highcharts'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            depth: 35,
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}'
                            }
                        }
                    },
                    series: [{
                        name: 'Delivered amount',
                        data: [
                            ['Bananas', 8],
                            ['Kiwi', 3],
                            ['Mixed nuts', 1],
                            ['Oranges', 6],
                            ['Apples', 8],
                            ['Pears', 4],
                            ['Clementines', 4],
                            ['Reddish (bag)', 1],
                            ['Grapes (bunch)', 1]
                        ]
                    }]
                });
            }
        }
    })
    .directive('hChartColumn', function(){
        return {
            restrict: 'EA',
            replace: true,
            template: '<div id="hChart-column" style="height: 100%;"></div>',
            link: function(scope, elem, attrs){
                var chart = $('#hChart-column').highcharts({
                    chart: {
                        type: 'column',
                        options3d: {
                            enabled: true,
                            alpha: 15,
                            beta: 15,
                            viewDistance: 25,
                            depth: 40
                        }
                    },

                    title: {
                        text: 'Total fruit consumption, grouped by gender'
                    },

                    xAxis: {
                        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
                    },

                    yAxis: {
                        allowDecimals: false,
                        min: 0,
                        title: {
                            text: 'Number of fruits'
                        }
                    },

                    tooltip: {
                        headerFormat: '<b>{point.key}</b><br>',
                        pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
                    },

                    plotOptions: {
                        column: {
                            stacking: 'normal',
                            depth: 40
                        }
                    },

                    series: [{
                        name: 'John',
                        data: [5, 3, 4, 7, 2],
                        stack: 'male'
                    }, {
                        name: 'Joe',
                        data: [3, 4, 4, 2, 5],
                        stack: 'male'
                    }, {
                        name: 'Jane',
                        data: [2, 5, 6, 2, 1],
                        stack: 'female'
                    }, {
                        name: 'Janet',
                        data: [3, 0, 4, 4, 3],
                        stack: 'female'
                    }]
                });
            }
        }
    })
    .directive('hChartLine', function(){
        return {
            restrict: 'EA',
            replace: true,
            template: '<div id="hChart-Line" style="height: 100%;"></div>',
            link: function(scope, elem, attrs){
                var chart = $('#hChart-Line').highcharts({
                    title: {
                        text: 'Combination chart'
                    },
                    xAxis: {
                        categories: ['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']
                    },
                    labels: {
                        items: [{
                            html: 'Total fruit consumption',
                            style: {
                                left: '50px',
                                top: '18px',
                                color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                            }
                        }]
                    },
                    series: [{
                        type: 'column',
                        name: 'Jane',
                        data: [3, 2, 1, 3, 4]
                    }, {
                        type: 'column',
                        name: 'John',
                        data: [2, 3, 5, 7, 6]
                    }, {
                        type: 'column',
                        name: 'Joe',
                        data: [4, 3, 3, 9, 0]
                    }, {
                        type: 'spline',
                        name: 'Average',
                        data: [3, 2.67, 3, 6.33, 3.33],
                        marker: {
                            lineWidth: 2,
                            lineColor: Highcharts.getOptions().colors[3],
                            fillColor: 'white'
                        }
                    }, {
                        type: 'pie',
                        name: 'Total consumption',
                        data: [{
                            name: 'Jane',
                            y: 13,
                            color: Highcharts.getOptions().colors[0] // Jane's color
                        }, {
                            name: 'John',
                            y: 23,
                            color: Highcharts.getOptions().colors[1] // John's color
                        }, {
                            name: 'Joe',
                            y: 19,
                            color: Highcharts.getOptions().colors[2] // Joe's color
                        }],
                        center: [100, 80],
                        size: 100,
                        showInLegend: false,
                        dataLabels: {
                            enabled: false
                        }
                    }]
                });
            }
        }
    })

$(document).ready(function(){
    updateChartSize();
    $(window).resize(updateChartSize);
    $(document).resize(updateChartSize);
});

function updateChartSize() {
    var pagewidth = $("#mario-video").width();
    var pageheight = $("#mario-video").height()-30;
    $("#hChart-pie").height(pageheight);
    $("#hChart-pie").width(pagewidth);
    $("#hChart-column").height(pageheight);
    $("#hChart-column").width(pagewidth);
    $("#hChart-Line").height(pageheight);
    $("#hChart-Line").width(pagewidth);
}