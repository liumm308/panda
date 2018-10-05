'use strict';

/* Controllers */
// signin controller
app.controller('LogoutController', ['$rootScope', '$scope', '$http', '$state', function ($rootScope, $scope, $http, $state) {
    $scope.logout = function () {

        $.post('./cloudLogoutMethod')
            .then(function (result) {
                window.location.href = result.logoutUrl;
            });
    };

}]);