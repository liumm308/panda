'use strict';
/*
* created by LiuMingming 2018/10/08
*
* */
//修改用户

app.controller('updateUserCtrl', ['$scope', '$log','$modal','$http','$modalInstance','params',
    function ($scope, $log,$modal, $http,$modalInstance,params) {

        $scope.rpForm={
            id:               params.id,
            userName:         params.userName,
            userPassword:     params.userPassword
        };

        $scope.updateUser = function () {
            var params = {
                baseInfo:{
                    id:                  $scope.rpForm.id,
                    userName :           $scope.rpForm.userName,
                    userPassword :       $scope.rpForm.userPassword
                },
                method:"modifyUser"
            };
            console.log(params);
            $.post('./userManagement',{"jsonStr":JSON.stringify(params)})
                .then(function(response){
                    if(response.code == 200){
                        window.wxc.xcConfirm("修改用户成功！", window.wxc.xcConfirm.typeEnum.success);
                        $modalInstance.close();
                    }else{
                        window.wxc.xcConfirm("修改用户失败！", window.wxc.xcConfirm.typeEnum.error);
                        $modalInstance.close();
                    }
                })

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);