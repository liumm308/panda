'use strict';


app.controller('readerTypeManagementCtrl', ['$rootScope','$scope', '$modal', '$log', '$http','i18nService','$timeout','$stateParams','service.RES','$state','ngDialog','ngTip',
    function ($rootScope,$scope, $modal, $log, $http, i18nService, $timeout, $stateParams, serviceRES,$state,ngDialog,ngTip) {
        // 国际化；
        i18nService.setCurrentLang("zh-cn");

        $scope.index = 0;
        $scope.dataArr = {
            list: [],
            multiSelect: false
        };

        $scope.gridOptions = [{
            field: "typeName",
            displayName: "类型名称"
        },{
            field: "maxBorrowNum",
            displayName: "最大借书数量"
        },{
            field: "maxBorrowLimit",
            displayName: "最长借书天数"
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
                method: "queryReaderType"
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
            $scope.typeName = "";
        };

        //条件查询
        $scope.queryForConditions = function (newPage, pageSize) {
            console.log('条件查询');
            var params = {
                baseInfo: {
                    typeName: $scope.typeName,
                    pageNum:    newPage == undefined ? "1" : newPage,
                    pageSize:   pageSize == undefined ? "10" : pageSize
                },
                method: "queryReaderType"
            };
            $.post('./readerManagement', {"jsonStr": JSON.stringify(params)})
                .then(function (response) {
                    if (response.code == 200) {
                        $scope.dataArr.list = response.retObj.list;
                        $scope.dataArr.total = response.retObj.total;
                        $scope.dataArr.pageNum = response.retObj.pageNum;
                        $scope.dataArr.pageSize = response.retObj.pageSize;
                    } else {
                        window.wxc.xcConfirm("读者类型查询错误！", window.wxc.xcConfirm.typeEnum.success);
                        $scope.dataArr.list = [];
                        $scope.dataArr.total = response.retObj.total;
                        $scope.dataArr.pageNum = response.retObj.pageNum;
                        $scope.dataArr.pageSize = response.retObj.pageSize;
                    }
                    $scope.$apply();
                });
        };


        //创建读者类型
        $scope.createReaderType = function () {
            var modalInstance = $modal.open({
                backdrop: false,
                templateUrl: 'createReaderType',
                controller: 'createReaderTypeCtrl',
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

        //修改读者类型
        $scope.updateReaderType = function () {
            var modalInstance = $modal.open({
                backdrop: false,
                templateUrl: 'updateReaderType',
                controller: 'updateReaderTypeCtrl',
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

        //删除读者类型
        $scope.deleteReaderType = function () {
            var modalInstance = $modal.open({
                backdrop: false,
                templateUrl: 'deleteReaderType',
                controller: 'deleteReaderTypeCtrl',
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
