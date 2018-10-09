'use strict';
/*
* created by LiuMingming 2018/10/09
*
* */
//新增读者

app.controller('createReaderCtrl', ['$scope', '$log','$modal','$http','$modalInstance',
    function ($scope, $log,$modal, $http,$modalInstance) {

        $scope.rpForm={};

        /*查询可选的读者类型*/
        var getReaderTypes = function () {
            var params = {
                baseInfo: {
                    "pageSize": "0",
                    "pageNum": "0"
                },
                method: "queryReaderType"
            };
            $.post('./readerManagement', {"jsonStr": JSON.stringify(params)})
                .then(function (result) {
                    if (result.code == 200 && result.retObj.list != 0) {
                        $scope.readerTypes = result.retObj.list;
                    }

                });
        };

        getReaderTypes();

        $scope.rpForm = {
            readerType: {
                typeName: "",
                id: ""
            }
        };


        $scope.createReader = function () {
            var params = {
                baseInfo:{
                    readerName  :       $scope.rpForm.readerName,
                    readerType  :       $scope.rpForm.readerType.id,
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