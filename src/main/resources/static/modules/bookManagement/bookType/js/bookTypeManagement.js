'use strict';


app.controller('bookTypeManagementCtrl', ['$rootScope','$scope', '$modal', '$log', '$http','i18nService','$timeout','$stateParams','service.RES','$state','ngDialog','ngTip',
    function ($rootScope,$scope, $modal, $log, $http, i18nService, $timeout, $stateParams, serviceRES,$state,ngDialog,ngTip) {
        // 国际化；
        i18nService.setCurrentLang("zh-cn");

        $scope.index = 0;
        $scope.dataArr = {
            list: [],
            multiSelect: false
        };

        $scope.gridOptions = [{
            field: "bookTypeName",
            displayName: "类型名称"
        },{
            field: "bookTypeDiscipline",
            displayName: "学科属性"
        },{
            field: "bookTypeLocation",
            displayName: "是否国内"
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
                method: "queryBookType"
            };
            $.post('./bookManagement', {"jsonStr": JSON.stringify(params)})
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
            $scope.bookTypeName = "";
        };

        //条件查询
        $scope.queryForConditions = function (newPage, pageSize) {
            console.log('条件查询');
            var params = {
                baseInfo: {
                    bookTypeName: $scope.bookTypeName,
                    pageNum     : newPage == undefined ? "1" : newPage,
                    pageSize    : pageSize == undefined ? "10" : pageSize
                },
                method: "queryBookType"
            };
            $.post('./bookManagement', {"jsonStr": JSON.stringify(params)})
                .then(function (response) {
                    if (response.code == 200) {
                        $scope.dataArr.list = response.retObj.list;
                        $scope.dataArr.total = response.retObj.total;
                        $scope.dataArr.pageNum = response.retObj.pageNum;
                        $scope.dataArr.pageSize = response.retObj.pageSize;
                    } else {
                        window.wxc.xcConfirm("图书类型查询错误！", window.wxc.xcConfirm.typeEnum.success);
                        $scope.dataArr.list = [];
                        $scope.dataArr.total = response.retObj.total;
                        $scope.dataArr.pageNum = response.retObj.pageNum;
                        $scope.dataArr.pageSize = response.retObj.pageSize;
                    }
                    $scope.$apply();
                });
        };


        //创建图书类型
        $scope.createBookType = function () {
            var modalInstance = $modal.open({
                backdrop: false,
                templateUrl: 'createBookType',
                controller: 'createBookTypeCtrl',
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

        //修改图书类型
        $scope.updateBookType = function () {
            var modalInstance = $modal.open({
                backdrop: false,
                templateUrl: 'updateBookType',
                controller: 'updateBookTypeCtrl',
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

        //删除图书类型
        $scope.deleteBookType = function () {
            var modalInstance = $modal.open({
                backdrop: false,
                templateUrl: 'deleteBookType',
                controller: 'deleteBookTypeCtrl',
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
