angular.module('ui.popover', [])  
.directive('popover', function () {  
    return {  
        restrict: 'A',  
        scope: {  
            popoverShow: '=',  
            popoverOptions: '@',
            content:'='
            
        },  
        link: function (scope, element) {
            element.popover(JSON.parse(scope.popoverOptions || '{ "placement": "right", "trigger": "manual" }'));
            scope.$watch('popoverShow', function (show) {
                if (show) { 
                    element.popover('show');
                } else { 
                    element.popover('hide');  
                }
            });  
        },
    };  
}); 