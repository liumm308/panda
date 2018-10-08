'use strict';
/*
* created by LiuMingming 2018/10/08
*
* */
//删除用户

app.controller('deleteUserCtrl', ['$scope', '$log','$modal','$http','$modalInstance','params',
    function ($scope, $log,$modal, $http,$modalInstance,params) {

        $scope.rpForm={
            id:               params.id
        };

        $scope.deleteUser = function () {
            var params = {
                baseInfo:{
                    id:                  $scope.rpForm.id
                },
                method:"deleteUser"
            };
            console.log(params);
            $.post('./userManagement',{"jsonStr":JSON.stringify(params)})
                .then(function(response){
                    if(response.code == 200){
                        window.wxc.xcConfirm("删除用户成功！", window.wxc.xcConfirm.typeEnum.success);
                        $modalInstance.close();
                    }else{
                        window.wxc.xcConfirm("删除用户失败！", window.wxc.xcConfirm.typeEnum.error);
                        $modalInstance.close();
                    }
                })

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);