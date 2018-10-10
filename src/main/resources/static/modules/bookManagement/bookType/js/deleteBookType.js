'use strict';
/*
* created by LiuMingming 2018/10/10
*
* */
//删除读者类型

app.controller('deleteBookTypeCtrl', ['$scope', '$log','$modal','$http','$modalInstance','params',
    function ($scope, $log,$modal, $http,$modalInstance,params) {

        $scope.rpForm={
            id:               params.id
        };

        $scope.deleteBookType = function () {
            var params = {
                baseInfo:{
                    id :    $scope.rpForm.id
                },
                method:"deleteBookType"
            };
            console.log(params);
            $.post('./bookManagement',{"jsonStr":JSON.stringify(params)})
                .then(function(response){
                    if(response.code == 200){
                        window.wxc.xcConfirm("删除图书类型成功！", window.wxc.xcConfirm.typeEnum.success);
                        $modalInstance.close();
                    }else{
                        window.wxc.xcConfirm("删除图书类型失败！", window.wxc.xcConfirm.typeEnum.error);
                        $modalInstance.close();
                    }
                })

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);