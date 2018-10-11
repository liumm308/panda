'use strict';
/*
* created by LiuMingming 2018/10/11
*
* */
//删除读者

app.controller('deleteBookCtrl', ['$scope', '$log','$modal','$http','$modalInstance','params',
    function ($scope, $log,$modal, $http,$modalInstance,params) {

        $scope.rpForm={
            id:               params.id
        };

        $scope.deleteBook = function () {
            var params = {
                baseInfo:{
                    id :    $scope.rpForm.id
                },
                method:"deleteBook"
            };
            console.log(params);
            $.post('./bookManagement',{"jsonStr":JSON.stringify(params)})
                .then(function(response){
                    if(response.code == 200){
                        window.wxc.xcConfirm("删除图书成功！", window.wxc.xcConfirm.typeEnum.success);
                        $modalInstance.close();
                    }else{
                        window.wxc.xcConfirm("删除图书失败！", window.wxc.xcConfirm.typeEnum.error);
                        $modalInstance.close();
                    }
                })

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);