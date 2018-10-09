'use strict';
/*
* created by LiuMingming 2018/10/09
*
* */
//新增读者

app.controller('createReaderCtrl', ['$scope', '$log','$modal','$http','$modalInstance',
    function ($scope, $log,$modal, $http,$modalInstance) {

        $scope.rpForm={};

        $scope.createReader = function () {
            var params = {
                baseInfo:{
                    readerName  :       $scope.rpForm.readerName,
                    readerType  :       $scope.rpForm.readerType,
                    readerSex   :       $scope.rpForm.readerSex,
                    readerAge   :       $scope.rpForm.readerAge,
                    readerPhone :       $scope.rpForm.readerPhone,
                    descriptive :       $scope.rpForm.descriptive
                },
                method:"createReader"
            };
            console.log(params);
            $.post('./readerManagement',{"jsonStr":JSON.stringify(params)})
                .then(function(response){
                    if(response.code == 200){
                        window.wxc.xcConfirm("新建读者成功！", window.wxc.xcConfirm.typeEnum.success);
                        $modalInstance.close();
                    }else{
                        window.wxc.xcConfirm("新建读者失败！", window.wxc.xcConfirm.typeEnum.error);
                        $modalInstance.close();
                    }
                })

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);