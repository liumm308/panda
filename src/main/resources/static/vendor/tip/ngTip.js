'use strict';
/**
 * ngTip - simple tip service
 * http://github.com/savokiss/ngTip
 */
angular.module('ngTip', [])
    .directive('ngTip', ngTipDirective)
    .provider('ngTip', ngTipProvider);

ngTipDirective.$inject = ['ngTip'];
function ngTipDirective(ngTip) {
    return {
        restrict: 'EA',
        template: '<div class="alert alert-{{ngTip.type || \'info\'}} ngTip wow lightSpeedIn animated" style="visibility:visible; animation-duration:2s;animation-name:lightSpeedIn;transition: all 2s linear;" data-wow-duration="2s" ng-show="ngTip.msg">' +
        '<button type="button" class="close"  ng-click="hideAlert()"></button>{{ngTip.msg}}</div>',

        link: function (scope, element, attrs) {
            scope.ngTip = ngTip;
            scope.hideAlert = function () {
                ngTip.msg = null;
                ngTip.type = null;
            };
        }
    };
}

function ngTipProvider() {
    var self = this;

    self.timeout = 3500;
    self.setDefaultTimeout = function(defaultTimeout){
        self.timeout = defaultTimeout;
    };

    self.$get = ['$timeout',function($timeout){
        var cancelTimeout = null;

        return {
            msg: null,
            type: null,
            tip: tip,
            clear: clear
        };

        /**
         * set msg
         * default last 3s
         * @param msg
         * @param type
         */
        function tip(msg,type) {
            var This = this;
            $timeout(function(){
                var that = This;
                This.msg = msg;
                This.type = type;

                if(cancelTimeout){
                    $timeout.cancel(cancelTimeout);
                }
                cancelTimeout = $timeout(function () {
                    that.clear();
                }, self.timeout);
            },1000);
        }

        /**
         * clear msg
         */
        function clear() {
            this.msg = null;
            this.type = null;
        }
    }];

}


