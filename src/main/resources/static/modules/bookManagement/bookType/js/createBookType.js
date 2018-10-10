'use strict';
/*
* created by LiuMingming 2018/10/10
*
* */
//新增读者类型

app.controller('createBookTypeCtrl', ['$scope', '$log','$modal','$http','$modalInstance',
    function ($scope, $log,$modal, $http,$modalInstance) {

        $scope.rpForm={};

        $scope.createBookType = function () {
            var params = {
                baseInfo:{
                    bookTypeName            :       $scope.rpForm.bookTypeName,
                    bookTypeDiscipline      :       $scope.rpForm.bookTypeDiscipline,
                    bookTypeLocation        :       $scope.rpForm.bookTypeLocation
                },
                method:"createBookType"
            };
            console.log(params);
            $.post('./bookManagement',{"jsonStr":JSON.stringify(params)})
                .then(function(response){
                    if(response.code == 200){
                        window.wxc.xcConfirm("新建图书类型成功！", window.wxc.xcConfirm.typeEnum.success);
                        $modalInstance.close();
                    }else{
                        window.wxc.xcConfirm("新建图书类型失败！", window.wxc.xcConfirm.typeEnum.error);
                        $modalInstance.close();
                    }
                })

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);