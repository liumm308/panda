'use strict';
/*
* created by LiuMingming 2018/10/09
*
* */
//修改读者

app.controller('updateReaderTypeCtrl', ['$scope', '$log','$modal','$http','$modalInstance','params',
    function ($scope, $log,$modal, $http,$modalInstance,params) {

        $scope.rpForm={
            id               :       params.id,
            typeName         :       params.typeName,
            maxBorrowNum     :       params.maxBorrowNum,
            maxBorrowLimit   :       params.maxBorrowLimit
        };

        $scope.updateReaderType = function () {
            var params = {
                baseInfo:{
                    id               :       $scope.rpForm.id,
                    typeName         :       $scope.rpForm.typeName,
                    maxBorrowNum     :       $scope.rpForm.maxBorrowNum,
                    maxBorrowLimit   :       $scope.rpForm.maxBorrowLimit
                },
                method:"updateReaderType"
            };
            console.log(params);
            $.post('./readerManagement',{"jsonStr":JSON.stringify(params)})
                .then(function(response){
                    if(response.code == 200){
                        window.wxc.xcConfirm("修改读者类型成功！", window.wxc.xcConfirm.typeEnum.success);
                        $modalInstance.close();
                    }else{
                        window.wxc.xcConfirm("修改读者类型失败！", window.wxc.xcConfirm.typeEnum.error);
                        $modalInstance.close();
                    }
                })

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);