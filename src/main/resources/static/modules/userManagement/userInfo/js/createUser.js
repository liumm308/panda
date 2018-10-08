'use strict';
/*
* created by LiuMingming
*
* */
//新增

app.controller('createUserCtrl', ['$scope', '$log','$modal','$http','$modalInstance',
    function ($scope, $log,$modal, $http,$modalInstance) {

        $scope.rpForm={};

        $scope.createUser = function () {
            var params = {
                baseInfo:{
                    userName :           $scope.rpForm.userName,
                    userPassword :       $scope.rpForm.userPassword,
                    userCompany:         $scope.rpForm.userCompany,
                    type :               $scope.rpForm.userType
                },
                method:"createUser"
            };
            console.log(params);
            $.post('./userManagement',{"jsonStr":JSON.stringify(params)})
                .then(function(response){
                    if(response.code == 200){
                        window.wxc.xcConfirm("新建用户成功！", window.wxc.xcConfirm.typeEnum.success);
                        $modalInstance.close();
                    }else{
                        window.wxc.xcConfirm("新建用户失败！", window.wxc.xcConfirm.typeEnum.error);
                        $modalInstance.close();
                    }
                })

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);