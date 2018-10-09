'use strict';


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
            displayName: "读者类型"
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


        //条件查询
        $scope.queryForConditions = function (newPage, pageSize) {
            console.log('条件查询');
            var params = {
                baseInfo: {
                    readerName: $scope.readerName,
                    readerType: $scope.rpForm.readerType == undefined?null:$scope.rpForm.readerType.id,
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
                        window.wxc.xcConfirm("读者查询错误！", window.wxc.xcConfirm.typeEnum.success);
                        $scope.dataArr.list = [];
                        $scope.dataArr.total = response.retObj.total;
                        $scope.dataArr.pageNum = response.retObj.pageNum;
                        $scope.dataArr.pageSize = response.retObj.pageSize;
                    }
                    $scope.$apply();
                });
        };



        /*重置搜索条件*/
        $scope.reset = function () {
            $scope.readerName = "";
            $scope.readerSex = "";
            $scope.rpForm = {
                readerType: {
                    typeName: "",
                    id: ""
                }
            };
        };


        //创建读者
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

        //修改读者
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

        //删除读者
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
