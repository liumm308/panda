'use strict';
/*
* created by LiuMingming 2018/10/09
*
* */
//新增读者类型

app.controller('createReaderTypeCtrl', ['$scope', '$log','$modal','$http','$modalInstance',
    function ($scope, $log,$modal, $http,$modalInstance) {

        $scope.rpForm={};

        $scope.createReaderType = function () {
            var params = {
                baseInfo:{
                    typeName         :       $scope.rpForm.typeName,
                    maxBorrowNum     :       $scope.rpForm.maxBorrowNum,
                    maxBorrowLimit   :       $scope.rpForm.maxBorrowLimit
                },
                method:"createReaderType"
            };
            console.log(params);
            $.post('./readerManagement',{"jsonStr":JSON.stringify(params)})
                .then(function(response){
                    if(response.code == 200){
                        window.wxc.xcConfirm("新建读者类型成功！", window.wxc.xcConfirm.typeEnum.success);
                        $modalInstance.close();
                    }else{
                        window.wxc.xcConfirm("新建读者类型失败！", window.wxc.xcConfirm.typeEnum.error);
                        $modalInstance.close();
                    }
                })

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);