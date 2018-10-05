angular.module('skyform-button',[])
    .directive('autoButton', function ($timeout, $interval,$compile) {
        return {
            restrict: 'AE',
            replace: true,
            template: '<div class="col-sm-12 m-t-xs m-b-xs no-padder " id="button"></div>',
            scope: {
                row:'='
            },
            link: function ($scope, element, attrs) {
                //遍历按钮
                $scope.buttonList=JSON.parse(localStorage.getItem('currentButton'));
                //串联事件
                var buttonInfo='<button ng-repeat="item in buttonList" class="operate-btn on" ' +
                        'ng-click="click(item.href)" ng-disabled="row==null&&item.href!=addData" style="cursor: pointer">' +
                        '<i class="{{item.outIcon}}"></i><span>{{item.name}}</span></button>';
                var ele=$compile(buttonInfo)($scope);
                $scope.addData="addData";
                angular.element('#button').append(ele);
                //点击事件
                $scope.click=function(key){
                    $scope.$parent.$eval(key+"()");
                };
            }
        };
    });