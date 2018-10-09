'use strict';
/*
* created by LiuMingming 2018/10/09
*
* */
//修改读者

app.controller('updateReaderCtrl', ['$scope', '$log','$modal','$http','$modalInstance','params',
    function ($scope, $log,$modal, $http,$modalInstance,params) {

        $scope.rpForm={
            id:              params.id,
            readerName:      params.readerName,
            readerPhone:     params.readerPhone,
            descriptive:     params.descriptive
        };

        $scope.updateReader = function () {
            var params = {
                baseInfo:{
                    id:                  $scope.rpForm.id,
                    readerName :         $scope.rpForm.readerName,
                    readerPhone:         $scope.rpForm.readerPhone,
                    descriptive:         $scope.rpForm.descriptive
                },
                method:"modifyReader"
            };
            console.log(params);
            $.post('./readerManagement',{"jsonStr":JSON.stringify(params)})
                .then(function(response){
                    if(response.code == 200){
                        window.wxc.xcConfirm("修改读者成功！", window.wxc.xcConfirm.typeEnum.success);
                        $modalInstance.close();
                    }else{
                        window.wxc.xcConfirm("修改读者失败！", window.wxc.xcConfirm.typeEnum.error);
                        $modalInstance.close();
                    }
                })

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);