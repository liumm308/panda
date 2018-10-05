var state = angular.module('ui-state', []);
state.directive('uiState', function(i18nService,$timeout,$compile){
    return {
        restrict: 'AE',
        scope:{
            state:'=',
            type:'@'
        },
        replace:true,
        template:'<span class="state" ><i class="text-xs mr-6"></i><span  translate="{{type}}.state.{{state}}"></span></span>',
        link: function(scope, elem, attrs){
            $compile(elem.contents())(scope);
            var i =  elem.find("i");
            i.attr("class","text-xs mr-6");
            if(scope.state){
                if(scope.state == 'running' || scope.state == 'using' || scope.state == '2') {
                    i.addClass("fa fa-circle green_i");
                } else if(scope.state == 'deleted' || scope.state == "5") {
                    i.addClass("glyphicon glyphicon-remove gray_i");
                } else if(scope.state == 'closed' || scope.state == "4") {
                    i.addClass("fa fa-stop red_i");
                } else if(scope.state.indexOf('error') > -1) {
                    i.addClass("glyphicon glyphicon-remove-sign red_i");
                } else if(scope.state.indexOf('ing') > -1 || scope.state == "copy" || scope.state == "1" || scope.state == "3") {
                    i.addClass("fa fa-spinner fa-spin blue_i");
                }
            }else{
                i.addClass("fa fa-heart-o");
                i.css("color","#fff");
            }
        }
    }
});