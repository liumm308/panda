'use strict';

app.filter("readerTypeFilter", function () {
    return function (input) {
        if (input == "1") {
            return input.replace("1",'大师级读者');
        } else if(input == "2"){
            return input.replace("2",'学者级读者');
        } else if(input == "3"){
            return input.replace("3",'高级读者');
        } else if(input == "4"){
            return input.replace("4",'中级读者');
        } else if(input == "5"){
            return input.replace("5",'初级读者');
        }
    }
});


app.controller('readerInfoManagementCtrl', ['$rootScope','$scope', '$modal', '$log', '$http','i18nService','$timeout','$stateParams','service.RES','$state','ngDialog','ngTip',
    function ($rootScope,$scope, $modal, $log, $http, i18nService, $timeout, $stateParams, serviceRES,$state,ngDialog,ngTip) {
        // 国际化；
        i18nService.setCurrentLang("zh-cn");

        $scope.index = 0;
        $scope.dataArr = {
            list: [],
            multiSelect: false
        };

        $scope.gridOptions = [{
            field: "readerName",
            displayName: "读者名称"
        }, {
            field: "readerType",
            displayName: "读者类型",
            cellTemplate: '<div class="ui-grid-cell-contents ng-binding ng-scope">{{row.entity.readerType|readerTypeFilter}}</div>'
        }, {
            field: "readerAge",
            displayName: "年龄"
        }, {
            field: "readerSex",
            displayName: "性别"
        }, {
            field: "readerPhone",
            displayName: "电话"
        },{
            field: "descriptive",
            displayName: "备注"
        },{
            field: "createTime",
            displayName: "创建时间",
            cellTemplate: '<div class="ui-grid-cell-contents ng-binding ng-scope"' + ' title="{{row.entity.createTime}}">{{row.entity.createTime |date:"yyyy-MM-dd HH:mm:ss"}}</div>'
        }, {
            field: "updateTime",
            displayName: "更新时间",
            cellTemplate: '<div class="ui-grid-cell-contents ng-binding ng-scope"' + ' title="{{row.entity.updateTime}}">{{row.entity.updateTime |date:"yyyy-MM-dd HH:mm:ss"}}</div>'
        }];

        $scope.callFn = function (item, flag, e) {
            $scope.rowItem = item;
        };

        $scope.pageFn = function (newPage, pageSize) {
            $scope.query(newPage, pageSize);
        };

        $scope.userName = "";

        $scope.query = function (newPage, pageSize) {
            var params = {
                baseInfo: {
                    pageNum: newPage == undefined ? "1" : newPage,
                    pageSize: pageSize == undefined ? "10" : pageSize
                },
                method: "queryReader"
            };
            $.post('./readerManagement', {"jsonStr": JSON.stringify(params)})
                .then(function (response) {
                    if (response.code == 200) {
                        $scope.dataArr.list = response.retObj.list;
                        $scope.dataArr.total = response.retObj.total;
                        $scope.dataArr.pageNum = response.retObj.pageNum;
                        $scope.dataArr.pageSize = response.retObj.pageSize;
                    } else {
                        $scope.dataArr.list = [];
                        $scope.dataArr.total = result.retObj.total;
                        $scope.dataArr.pageNum = response.retObj.pageNum;
                        $scope.dataArr.pageSize = result.retObj.pageSize;
                    }
                    $scope.$apply();
                });
        };
        $scope.query();

        /*重置搜索条件*/
        $scope.reset = function () {
            $scope.readerName = "";
            $scope.readerType = "";
            $scope.readerSex = "";

        };

        //条件查询
        $scope.queryForConditions = function (newPage, pageSize) {
            console.log('条件查询');
            var params = {
                baseInfo: {
                    readerName: $scope.readerName,
                    readerType: $scope.readerType == undefined?null:$scope.readerType,
                    readerSex:  $scope.readerSex == undefined?null:$scope.readerSex,
                    pageNum:    newPage == undefined ? "1" : newPage,
                    pageSize:   pageSize == undefined ? "10" : pageSize
                },
                method: "queryReader"
            };
            $.post('./readerManagement', {"jsonStr": JSON.stringify(params)})
                .then(function (response) {
                    if (response.code == 200) {
                        $scope.dataArr.list = response.retObj.list;
                        $scope.dataArr.total = response.retObj.total;
                        $scope.dataArr.pageNum = response.retObj.pageNum;
                        $scope.dataArr.pageSize = response.retObj.pageSize;
                    } else {
                        window.wxc.xcConfirm("用户查询错误！", window.wxc.xcConfirm.typeEnum.success);
                        $scope.dataArr.list = [];
                        $scope.dataArr.total = response.retObj.total;
                        $scope.dataArr.pageNum = response.retObj.pageNum;
                        $scope.dataArr.pageSize = response.retObj.pageSize;
                    }
                    $scope.$apply();
                });
        };


        //创建用户
        $scope.createReader = function () {
            var modalInstance = $modal.open({
                backdrop: false,
                templateUrl: 'createReader',
                controller: 'createReaderCtrl',
                resolve: {
                    params: function () {
                        return $scope.rowItem;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                $scope.query();
            }, function (){
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        //修改用户
        $scope.updateReader = function () {
            var modalInstance = $modal.open({
                backdrop: false,
                templateUrl: 'updateReader',
                controller: 'updateReaderCtrl',
                resolve: {
                    params: function () {
                        return $scope.rowItem;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                $scope.query();
            }, function (){
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        //删除用户
        $scope.deleteReader = function () {
            var modalInstance = $modal.open({
                backdrop: false,
                templateUrl: 'deleteReader',
                controller: 'deleteReaderCtrl',
                resolve: {
                    params: function () {
                        return $scope.rowItem;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                $scope.query();
            }, function (){
                $log.info('Modal dismissed at: ' + new Date());
            });
        };



    }
]);
