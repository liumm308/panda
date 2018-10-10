'use strict';
/*
* created by LiuMingming 2018/10/10
*
* */
//修改读者

app.controller('updateBookTypeCtrl', ['$scope', '$log','$modal','$http','$modalInstance','params',
    function ($scope, $log,$modal, $http,$modalInstance,params) {

        $scope.rpForm={
            id                   :       params.id,
            bookTypeName         :       params.bookTypeName
        };

        $scope.updateBookType = function () {
            var params = {
                baseInfo:{
                    id               :       $scope.rpForm.id,
                    bookTypeName     :       $scope.rpForm.bookTypeName
                },
                method:"updateBookType"
            };
            console.log(params);
            $.post('./bookManagement',{"jsonStr":JSON.stringify(params)})
                .then(function(response){
                    if(response.code == 200){
                        window.wxc.xcConfirm("修改图书类型成功！", window.wxc.xcConfirm.typeEnum.success);
                        $modalInstance.close();
                    }else{
                        window.wxc.xcConfirm("修改图书类型失败！", window.wxc.xcConfirm.typeEnum.error);
                        $modalInstance.close();
                    }
                })

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);