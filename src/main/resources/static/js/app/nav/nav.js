app.controller('navCtrl',['$scope','$rootScope','CacheService','$http',function($scope,$rootScope,CacheService,$http){


    //获取登录用户信息
    $.post('./getUserInfo')
        .then(function (result) {
            //CacheService.set('userName','Gherardo');
            //CacheService.setObject('loginInfo',result);
            CacheService.setObject('loginInfo',result);
            $rootScope.loginName = result.name;
    });

    //查询userId 
    var queryFlowData = {
        baseInfo:{
            station: "110001"
        },
        method: "userMenu"
    };
    $.post('./cloud3aMethod', {"jsonStr": JSON.stringify(queryFlowData)})
        .then(function (result) {
            if (result.code == "200") {
                console.log(result.menuList);
                $scope.menuList = result.menuList;
                $scope.$apply();
            } else {
                $scope.menuList = [];
            }
    });

}]);