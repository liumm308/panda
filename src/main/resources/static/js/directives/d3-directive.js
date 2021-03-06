angular.module("d3_resourcePoolUsed",[])
    .directive('d3Bars', ['d3Service','$location', function(d3Service,$location) {
    return {
        restrict: 'EA',
        /*replace: true,
         template:'<svg width="19%" height="100"></svg>',*/
        scope: {
            data:'=',
            heightdata:'='
        },
        link: function(scope, ele, attrs) {
            d3Service.d3.then(function(d3) {
                if(!scope.data){
                    return;
                }
                scope.$watch('data',function(a,b,c){
                    if(a){
                        scope.update(a.value);
                    }
                });
                /*var margin = parseInt(attrs.margin) || 20,
                 barHeight = parseInt(attrs.barHeight) || 20,
                 barPadding = parseInt(attrs.barPadding) || 5;
                 var svg = d3.select(ele[0])
                 .append('svg')
                 .style('width', '100%');*/
                var myDate = new Date();
                ele.attr("id", "c"+myDate.getTime());
                var config = liquidFillGaugeDefaultSettings(/*TextColor,color*/);
                config.circleThickness = 0.15;
                config.circleColor = scope.data.color!=undefined?scope.data.color:"red";//的颜色
                if($location.$$url!="/app/index"){
                    config.textColor = "#fff";//字体颜色
                }else{
                    config.textColor = "#fff"
                }
                config.waveTextColor = scope.data.color!=undefined?scope.data.color:"red";
                config.waveColor = scope.data.color!=undefined?scope.data.color:"red";//浮动颜色
                config.textVertPosition = 0.8;
                config.waveAnimateTime = 1000;
                config.waveHeight = 0.05;
                config.waveAnimate = true;
                config.waveRise = false;
                config.waveHeightScaling = false;
                config.waveOffset = 0.25;
                config.textSize = 0.75;
                config.waveCount = 3;
                loadLiquidFillGauge(ele.attr("id"), scope.data,config);
                function loadLiquidFillGauge(elementId, resourceData, config) {
                    //var value=Math.round(resourceData.value);
                    var value=resourceData.value;
                    if(config == null) config = liquidFillGaugeDefaultSettings();
                    var gauge = d3.select("#"+elementId);

                    var radius = Math.min(parseInt(gauge.style("width")), parseInt(scope.heightdata))/2;
                    var locationX = parseInt(gauge.style("width"))/2 - radius;
                    var locationY = parseInt(scope.heightdata)/2 - radius;
                    var fillPercent = Math.max(config.minValue, Math.min(config.maxValue,value))/config.maxValue;

                    var waveHeightScale;
                    if(config.waveHeightScaling){
                        waveHeightScale = d3.scale.linear()
                            .range([0,config.waveHeight,0])
                            .domain([0,50,100]);
                    } else {
                        waveHeightScale = d3.scale.linear()
                            .range([config.waveHeight,config.waveHeight])
                            .domain([0,100]);
                    }

                    var textPixels = (config.textSize*radius/2);

                    var textFinalValue = parseFloat(value).toFixed(2);
                    var textStartValue = config.valueCountUp?config.minValue:textFinalValue;
                    var percentText = config.displayPercent?"%":"";
                    var circleThickness = config.circleThickness * radius;
                    var circleFillGap = config.circleFillGap * radius;
                    var fillCircleMargin = circleThickness + circleFillGap;
                    var fillCircleRadius = radius - fillCircleMargin;
                    var waveHeight = fillCircleRadius*waveHeightScale(fillPercent*100);

                    var waveLength = fillCircleRadius*2/config.waveCount;
                    var waveClipCount = 1+config.waveCount;
                    var waveClipWidth = waveLength*waveClipCount;

                    // Rounding functions so that the correct number of decimal places is always displayed as the value counts up.
                    var textRounder = function(value){ return Math.round(value); };
                    if(parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))){
                        textRounder = function(value){ return parseFloat(value).toFixed(1); };
                    }
                    if(parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))){
                        textRounder = function(value){ return parseFloat(value).toFixed(2); };
                    }

                    // Data for building the clip wave area.
                    var data = [];
                    for(var i = 0; i <= 40*waveClipCount; i++){
                        data.push({x: i/(40*waveClipCount), y: (i/(40))});
                    }

                    // Scales for drawing the outer circle.
                    var gaugeCircleX = d3.scale.linear().range([0,2*Math.PI]).domain([0,1]);
                    var gaugeCircleY = d3.scale.linear().range([0,radius]).domain([0,radius]);

                    // Scales for controlling the size of the clipping path.
                    var waveScaleX = d3.scale.linear().range([0,waveClipWidth]).domain([0,1]);
                    var waveScaleY = d3.scale.linear().range([0,waveHeight]).domain([0,1]);

                    // Scales for controlling the position of the clipping path.
                    var waveRiseScale = d3.scale.linear()
                        // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
                        // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
                        // circle at 100%.
                        .range([(fillCircleMargin+fillCircleRadius*2+waveHeight),(fillCircleMargin-waveHeight)])
                        .domain([0,1]);
                    var waveAnimateScale = d3.scale.linear()
                        .range([0, waveClipWidth-fillCircleRadius*2]) // Push the clip area one full wave then snap back.
                        .domain([0,1]);

                    // Scale for controlling the position of the text within the gauge.
                    var textRiseScaleY = d3.scale.linear()
                        .range([fillCircleMargin+fillCircleRadius*2,(fillCircleMargin+textPixels*0.7)])
                        .domain([0,1]);

                    // Center the gauge within the parent SVG.
                    var gaugeGroup = gauge.append("g")
                        .attr('transform','translate('+locationX+','+locationY+')');

                    // Draw the outer circle.
                    var gaugeCircleArc = d3.svg.arc()
                        .startAngle(gaugeCircleX(0))
                        .endAngle(gaugeCircleX(1))
                        .outerRadius(gaugeCircleY(radius))
                        .innerRadius(gaugeCircleY(radius-circleThickness));
                    gaugeGroup.append("path")
                        .attr("d", gaugeCircleArc)
                        .style("fill", config.circleColor)
                        .attr('transform','translate('+radius+','+radius+')');

                    // Text where the wave does not overlap.
                    var text1 = gaugeGroup.append("text")
                        .text(textRounder(textStartValue) + percentText)
                        .attr("class", "liquidFillGaugeText")
                        .attr("text-anchor", "middle")
                        .attr("font-size",  "20px")
                        .style("fill", config.textColor)
                        .attr('transform','translate('+radius+','+textRiseScaleY(config.textVertPosition)+')');
                    // The clipping wave area.
                    var clipArea = d3.svg.area()
                        .x(function(d) { return waveScaleX(d.x); } )
                        .y0(function(d) { return waveScaleY(Math.sin(Math.PI*2*config.waveOffset*-1 + Math.PI*2*(1-config.waveCount) + d.y*2*Math.PI));} )
                        .y1(function(d) { return (fillCircleRadius*2 + waveHeight); } );
                    var waveGroup = gaugeGroup.append("defs")
                        .append("clipPath")
                        .attr("id", "clipWave" + elementId);
                    var wave = waveGroup.append("path")
                        .datum(data)
                        .attr("d", clipArea)
                        .attr("T", 0);

                    // The inner circle with the clipping wave attached.
                    var fillCircleGroup = gaugeGroup.append("g")
                        .attr("clip-path", "url(#clipWave" + elementId + ")");
                    fillCircleGroup.append("circle")
                        .attr("cx", radius)
                        .attr("cy", radius)
                        .attr("r", fillCircleRadius)
                        .style("fill", config.waveColor);

                    // Text where the wave does overlap.
                    var text2 = gaugeGroup.append("text")
                        .text(textRounder(textStartValue) + percentText)
                        .attr("class", "liquidFillGaugeText")
                        .attr("text-anchor", "middle")
                        .attr("font-size",  "20px")
                        .style("fill", config.textColor)
                        .attr('transform','translate('+radius+','+textRiseScaleY(config.textVertPosition)+')');

                    var text3=gaugeGroup.append("text")
                        .text(resourceData.name+"使用率")
                        .attr("margin-top", "10%")
                        .attr("class", "liquidFillGaugeText1")
                        .attr("text-anchor", "middle")
                        .attr("font-size",  "10px")
                        .style("fill", config.textColor)
                        .attr('transform','translate('+radius+','+textRiseScaleY(config.textVertPosition-0.4)+')');

                    // Make the value count up.
                    if(config.valueCountUp){
                        var textTween = function(){
                            var i = d3.interpolate(this.textContent, textFinalValue);
                            return function(t) { this.textContent = textRounder(i(t)) + percentText; }
                        };
                        text1.transition()
                            .duration(config.waveRiseTime)
                            .tween("text", textTween);
                        text2.transition()
                            .duration(config.waveRiseTime)
                            .tween("text", textTween);
                    }

                    // Make the wave rise. wave and waveGroup are separate so that horizontal and vertical movement can be controlled independently.
                    var waveGroupXPosition = fillCircleMargin+fillCircleRadius*2-waveClipWidth;

                    if(config.waveRise){
                        waveGroup.attr('transform','translate('+waveGroupXPosition+','+waveRiseScale(0)+')')
                            .transition()
                            .duration(config.waveRiseTime)
                            .attr('transform','translate('+waveGroupXPosition+','+waveRiseScale(fillPercent)+')')
                            .each("start", function(){ wave.attr('transform','translate(1,0)'); }); // This transform is necessary to get the clip wave positioned correctly when waveRise=true and waveAnimate=false. The wave will not position correctly without this, but it's not clear why this is actually necessary.
                    } else {
                        waveGroup.attr('transform','translate('+waveGroupXPosition+','+waveRiseScale(fillPercent)+')');
                    }

                    if(config.waveAnimate) animateWave();

                    function animateWave() {

                        wave.attr('transform','translate('+waveAnimateScale(wave.attr('T'))+',0)');
                        wave.transition()
                            .duration(config.waveAnimateTime * (1-wave.attr('T')))
                            .ease('linear')
                            .attr('transform','translate('+waveAnimateScale(1)+',0)')
                            .attr('T', 1)
                            .each('end', function(){
                                wave.attr('T', 0);
                                animateWave(config.waveAnimateTime);
                            });
                    }

                    scope.update = function(value){
                        var newFinalValue = parseFloat(value).toFixed(2);
                        var textRounderUpdater = function(value){ return Math.round(value); };
                        if(parseFloat(newFinalValue) != parseFloat(textRounderUpdater(newFinalValue))){
                            textRounderUpdater = function(value){ return parseFloat(value).toFixed(1); };
                        }
                        if(parseFloat(newFinalValue) != parseFloat(textRounderUpdater(newFinalValue))){
                            textRounderUpdater = function(value){ return parseFloat(value).toFixed(2); };
                        }

                        var textTween = function(){
                            var i = d3.interpolate(this.textContent, parseFloat(value).toFixed(2));
                            return function(t) { this.textContent = textRounderUpdater(i(t)) + percentText; }
                        };

                        text1.transition()
                            .duration(config.waveRiseTime)
                            .tween("text", textTween);
                        text2.transition()
                            .duration(config.waveRiseTime)
                            .tween("text", textTween);

                        var fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value))/config.maxValue;
                        var waveHeight = fillCircleRadius*waveHeightScale(fillPercent*100);
                        var waveRiseScale = d3.scale.linear()
                            // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
                            // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
                            // circle at 100%.
                            .range([(fillCircleMargin+fillCircleRadius*2+waveHeight),(fillCircleMargin-waveHeight)])
                            .domain([0,1]);
                        var newHeight = waveRiseScale(fillPercent);
                        var waveScaleX = d3.scale.linear().range([0,waveClipWidth]).domain([0,1]);
                        var waveScaleY = d3.scale.linear().range([0,waveHeight]).domain([0,1]);
                        var newClipArea;
                        if(config.waveHeightScaling){
                            newClipArea = d3.svg.area()
                                .x(function(d) { return waveScaleX(d.x); } )
                                .y0(function(d) { return waveScaleY(Math.sin(Math.PI*2*config.waveOffset*-1 + Math.PI*2*(1-config.waveCount) + d.y*2*Math.PI));} )
                                .y1(function(d) { return (fillCircleRadius*2 + waveHeight); } );
                        } else {
                            newClipArea = clipArea;
                        }

                        var newWavePosition = config.waveAnimate?waveAnimateScale(1):0;
                        wave.transition()
                            .duration(0)
                            .transition()
                            .duration(config.waveAnimate?(config.waveAnimateTime * (1-wave.attr('T'))):(config.waveRiseTime))
                            .ease('linear')
                            .attr('d', newClipArea)
                            .attr('transform','translate('+newWavePosition+',0)')
                            .attr('T','1')
                            .each("end", function(){
                                if(config.waveAnimate){
                                    wave.attr('transform','translate('+waveAnimateScale(0)+',0)');
                                    animateWave(config.waveAnimateTime);
                                }
                            });
                        waveGroup.transition()
                            .duration(config.waveRiseTime)
                            .attr('transform','translate('+waveGroupXPosition+','+newHeight+')')
                    }
                }
                function liquidFillGaugeDefaultSettings(){
                    return {
                        minValue: 0, // The gauge minimum value.
                        maxValue: 100, // The gauge maximum value.
                        circleThickness: 0.05, // The outer circle thickness as a percentage of it's radius.
                        circleFillGap: 0.05, // The size of the gap between the outer circle and wave circle as a percentage of the outer circles radius.
                        circleColor: "#178BCA", // The color of the outer circle.
                        waveHeight: 0.05, // The wave height as a percentage of the radius of the wave circle.
                        waveCount: 1, // The number of full waves per width of the wave circle.
                        waveRiseTime: 1000, // The amount of time in milliseconds for the wave to rise from 0 to it's final height.
                        waveAnimateTime: 18000, // The amount of time in milliseconds for a full wave to enter the wave circle.
                        waveRise: true, // Control if the wave should rise from 0 to it's full height, or start at it's full height.
                        waveHeightScaling: true, // Controls wave size scaling at low and high fill percentages. When true, wave height reaches it's maximum at 50% fill, and minimum at 0% and 100% fill. This helps to prevent the wave from making the wave circle from appear totally full or empty when near it's minimum or maximum fill.
                        waveAnimate: true, // Controls if the wave scrolls or is static.
                        waveColor: "#178BCA", // The color of the fill wave.
                        waveOffset: 0, // The amount to initially offset the wave. 0 = no offset. 1 = offset of one full wave.
                        textVertPosition: .5, // The height at which to display the percentage text withing the wave circle. 0 = bottom, 1 = top.
                        textSize: 1, // The relative height of the text to display in the wave circle. 1 = 50%
                        valueCountUp: true, // If true, the displayed value counts up from 0 to it's final value upon loading. If false, the final value is displayed.
                        displayPercent: true, // If true, a % symbol is displayed after the value.
                        textColor: "#045681", // The color of the value text when the wave does not overlap it.
                        waveTextColor: "#A4DBf8" // The color of the value text when the wave overlaps it.
                    };
                }

            });
        }};
}]);