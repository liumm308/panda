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

            switch($scope.rpForm.bookTypeId){
                case "11101":
                    $scope.rpForm.bookTypeName = "科技类";
                    break;
                case "11102":
                    $scope.rpForm.bookTypeName = "文学类";
                    break;
                case "11103":
                    $scope.rpForm.bookTypeName = "教育类";
                    break;
                case "11104":
                    $scope.rpForm.bookTypeName = "生活类";
                    break;
                case "11105":
                    $scope.rpForm.bookTypeName = "工作类";
            }

            var params = {
                baseInfo:{
                    bookTypeId              :       $scope.rpForm.bookTypeId,
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