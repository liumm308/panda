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

            switch($scope.rpForm.bookTypeDisciplineId){
                case "21101A":
                    $scope.rpForm.bookTypeDiscipline = "哲学";
                    break;
                case "21102B":
                    $scope.rpForm.bookTypeDiscipline = "宗教";
                    break;
                case "21103C":
                    $scope.rpForm.bookTypeDiscipline = "伦理";
                    break;
                case "21104D":
                    $scope.rpForm.bookTypeDiscipline = "逻辑";
                    break;
                case "21105E":
                    $scope.rpForm.bookTypeDiscipline = "美学";
                    break;

                case "22101A":
                    $scope.rpForm.bookTypeDiscipline = "心理";
                    break;
                case "22102B":
                    $scope.rpForm.bookTypeDiscipline = "语言";
                    break;
                case "22103C":
                    $scope.rpForm.bookTypeDiscipline = "文学";
                    break;
                case "22104D":
                    $scope.rpForm.bookTypeDiscipline = "艺术";
                    break;
                case "22105E":
                    $scope.rpForm.bookTypeDiscipline = "政治";
                    break;

                case "23101A":
                    $scope.rpForm.bookTypeDiscipline = "经济";
                    break;
                case "23102B":
                    $scope.rpForm.bookTypeDiscipline = "军事";
                    break;
                case "23103C":
                    $scope.rpForm.bookTypeDiscipline = "法律";
                    break;
                case "23104D":
                    $scope.rpForm.bookTypeDiscipline = "教育";
                    break;
                case "23105E":
                    $scope.rpForm.bookTypeDiscipline = "体育";
                    break;

                case "24101A":
                    $scope.rpForm.bookTypeDiscipline = "传媒";
                    break;
                case "24102B":
                    $scope.rpForm.bookTypeDiscipline = "资讯";
                    break;
                case "24103C":
                    $scope.rpForm.bookTypeDiscipline = "管理";
                    break;
                case "24104D":
                    $scope.rpForm.bookTypeDiscipline = "商贸";
                    break;
                case "24105E":
                    $scope.rpForm.bookTypeDiscipline = "历史";
                    break;

                case "25101A":
                    $scope.rpForm.bookTypeDiscipline = "考古";
                    break;
                case "25102B":
                    $scope.rpForm.bookTypeDiscipline = "民族";
                    break;
                case "25103C":
                    $scope.rpForm.bookTypeDiscipline = "财金";
                    break;
                case "25104D":
                    $scope.rpForm.bookTypeDiscipline = "统计";
                    break;
                case "25105E":
                    $scope.rpForm.bookTypeDiscipline = "社会";
                    break;
                case "FFFFFF":
                    $scope.rpForm.bookTypeDiscipline = "其他";
                    break;
            }

            var params = {
                baseInfo:{
                    bookTypeId              :       $scope.rpForm.bookTypeId,
                    bookTypeName            :       $scope.rpForm.bookTypeName,
                    bookTypeDisciplineId    :       $scope.rpForm.bookTypeDisciplineId,
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