var myModule = angular.module("skyform.expander",[]);
myModule.directive('expander',function(){
    return {
        restrict:'AE',
        replace:true,
        transclude:true,
        scope:{
        	title:'=expanderTitle'
        },
        template:'<div class="my-btn">'
        		+'<button style="position:absolute;top:10px;right:30px;" ng-show="showme" ng-click="toggle()">收起</button>'                
                +'<button style="position:absolute;top:10px;right:30px;" ng-hide="showme" ng-click="toggle()">展开</button>'
                +'<div  ng-show="showme" ng-transclude></div>'
                +'</div>',
        link:function(scope,element,attrs){
            scope.showme = true;
            scope.toggle = function(){//每次点击调用此方法都让scope.showme值反转1次
                scope.showme = !scope.showme;
            }
        }
    }
});