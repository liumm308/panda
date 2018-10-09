'use strict';
/*
* created by LiuMingming 2018/10/09
*
* */
//删除读者

app.controller('deleteReaderCtrl', ['$scope', '$log','$modal','$http','$modalInstance','params',
    function ($scope, $log,$modal, $http,$modalInstance,params) {

        $scope.rpForm={
            id:               params.id
        };

        $scope.deleteReader = function () {
            var params = {
                baseInfo:{
                    id :    $scope.rpForm.id
                },
                method:"deleteReader"
            };
            console.log(params);
            $.post('./readerManagement',{"jsonStr":JSON.stringify(params)})
                .then(function(response){
                    if(response.code == 200){
                        window.wxc.xcConfirm("删除读者成功！", window.wxc.xcConfirm.typeEnum.success);
                        $modalInstance.close();
                    }else{
                        window.wxc.xcConfirm("删除读者失败！", window.wxc.xcConfirm.typeEnum.error);
                        $modalInstance.close();
                    }
                })

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);