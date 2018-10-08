'use strict';

app.filter("userTypeFilter", function () {
    return function (input) {
        if (input == "1") {
            return input.replace("1",'超级用户');
        } else if(input == "2"){
            return input.replace("2",'部门用户');
        } else if(input == "3"){
            return input.replace("3",'普通用户');
        }
    }
});


app.controller('userInfoManagementCtrl', ['$rootScope','$scope', '$modal', '$log', '$http','i18nService','$timeout','$stateParams','service.RES','$state','ngDialog','ngTip',
    function ($rootScope,$scope, $modal, $log, $http, i18nService, $timeout, $stateParams, serviceRES,$state,ngDialog,ngTip) {
        // 国际化；
        i18nService.setCurrentLang("zh-cn");

        $scope.index = 0;
        $scope.dataArr = {
            list: [],
            multiSelect: false
        };

        $scope.gridOptions = [{
            field: "userName",
            displayName: "用户名称"
        }, {
            field: "type",
            displayName: "用户类型",
            cellTemplate: '<div class="ui-grid-cell-contents ng-binding ng-scope">{{row.entity.type|userTypeFilter}}</div>'
        }, {
            field: "userPassword",
            displayName: "用户密码"
        }, {
            field: "userCompany",
            displayName: "部门"
        }, {
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
            query(newPage, pageSize);
        };

        $scope.userName = "";

        var query = function (newPage, pageSize) {
            var params = {
                baseInfo: {
                    pageNum: newPage == undefined ? "1" : newPage,
                    pageSize: pageSize == undefined ? "10" : pageSize
                },
                method: "queryUser"
            };
            $.post('./userManagement', {"jsonStr": JSON.stringify(params)})
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
        query();

        /*重置搜索条件*/
        $scope.reset = function () {
            $scope.userName = "";
        };

        //条件查询
        $scope.queryForConditions = function (newPage, pageSize) {
            console.log('条件查询');
            var params = {
                baseInfo: {
                    userName: $scope.userName,
                    pageNum: newPage == undefined ? "1" : newPage,
                    pageSize: pageSize == undefined ? "10" : pageSize
                },
                method: "queryUser"
            };
            $.post('./userManagement', {"jsonStr": JSON.stringify(params)})
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
        $scope.createUser = function () {
            var modalInstance = $modal.open({
                backdrop: false,
                templateUrl: 'createUser',
                controller: 'createUserCtrl',
                resolve: {
                    params: function () {
                        return $scope.rowItem;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                query();
            }, function (){
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        //修改用户
        $scope.updateUser = function () {
            var modalInstance = $modal.open({
                backdrop: false,
                templateUrl: 'updateUser',
                controller: 'updateUserCtrl',
                resolve: {
                    params: function () {
                        return $scope.rowItem;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                query();
            }, function (){
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        //删除用户
        $scope.deleteUser = function () {
            var modalInstance = $modal.open({
                backdrop: false,
                templateUrl: 'deleteUser',
                controller: 'deleteUserCtrl',
                resolve: {
                    params: function () {
                        return $scope.rowItem;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                query();
            }, function (){
                $log.info('Modal dismissed at: ' + new Date());
            });
        };



    }
]);
