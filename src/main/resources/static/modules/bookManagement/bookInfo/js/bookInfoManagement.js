'use strict';
/*
* Created by liumm308 2018/10/10
*
* */

app.controller('bookInfoManagementCtrl', ['$rootScope','$scope', '$modal', '$log', '$http','i18nService','$timeout','$stateParams','service.RES','$state','ngDialog','ngTip',
    function ($rootScope,$scope, $modal, $log, $http, i18nService, $timeout, $stateParams, serviceRES,$state,ngDialog,ngTip) {
        // 国际化；
        i18nService.setCurrentLang("zh-cn");

        $scope.index = 0;
        $scope.dataArr = {
            list: [],
            multiSelect: false
        };

        $scope.gridOptions = [{
            field: "isbn",
            displayName: "图书ISBN编号"
        }, {
            field: "bookName",
            displayName: "图书名称"
        }, {
            field: "bookTypeDiscipline",
            displayName: "图书类型"
        }, {
            field: "author",
            displayName: "作者"
        }, {
            field: "publish",
            displayName: "初版社"
        },{
            field: "publishDate",
            displayName: "初版日期"
        },{
            field: "publishNum",
            displayName: "初版次数"
        },{
            field: "unitPrice",
            displayName: "单价"
        },{
            field: "upTime",
            displayName: "上架时间",
            cellTemplate: '<div class="ui-grid-cell-contents ng-binding ng-scope"' + ' title="{{row.entity.createTime}}">{{row.entity.upTime |date:"yyyy-MM-dd HH:mm:ss"}}</div>'
        }, {
            field: "downTime",
            displayName: "下架时间",
            cellTemplate: '<div class="ui-grid-cell-contents ng-binding ng-scope"' + ' title="{{row.entity.updateTime}}">{{row.entity.downTime |date:"yyyy-MM-dd HH:mm:ss"}}</div>'
        }];

        $scope.callFn = function (item, flag, e) {
            $scope.rowItem = item;
        };

        $scope.pageFn = function (newPage, pageSize) {
            $scope.query(newPage, pageSize);
        };

        $scope.bookName = "";

        $scope.query = function (newPage, pageSize) {
            var params = {
                baseInfo: {
                    pageNum: newPage == undefined ? "1" : newPage,
                    pageSize: pageSize == undefined ? "10" : pageSize
                },
                method: "queryBook"
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

        /*查询可选的图书类型*/
        var getBookTypes = function () {
            var params = {
                baseInfo: {
                    "pageSize": "0",
                    "pageNum": "0"
                },
                method: "queryBookTypeByName"
            };
            $.post('./bookManagement', {"jsonStr": JSON.stringify(params)})
                .then(function (result) {
                    if (result.code == 200 && result.retObj.list != 0) {
                        $scope.bookTypes = result.retObj.list;
                    }

                });
        };

        getBookTypes();

        $scope.rpForm = {
            bookType: {
                bookTypeName: "",
                bookTypeId: ""
            }
        };


        //条件查询
        $scope.queryForConditions = function (newPage, pageSize) {
            console.log('条件查询');
            var params = {
                baseInfo: {
                    bookName   :   $scope.bookName,
                    typeId     :   $scope.rpForm.bookType == undefined?null:$scope.rpForm.bookType.bookTypeId,
                    pageNum:    newPage == undefined ? "1" : newPage,
                    pageSize:   pageSize == undefined ? "10" : pageSize
                },
                method: "queryBook"
            };
            $.post('./bookManagement', {"jsonStr": JSON.stringify(params)})
                .then(function (response) {
                    if (response.code == 200) {
                        $scope.dataArr.list = response.retObj.list;
                        $scope.dataArr.total = response.retObj.total;
                        $scope.dataArr.pageNum = response.retObj.pageNum;
                        $scope.dataArr.pageSize = response.retObj.pageSize;
                    } else {
                        window.wxc.xcConfirm("图书查询错误！", window.wxc.xcConfirm.typeEnum.success);
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
            $scope.bookName = "";
            $scope.rpForm = {
                bookType: {
                    bookTypeName: "",
                    bookTypeId: ""
                }
            };
        };


        //录入图书
        $scope.insertBook = function () {
            var modalInstance = $modal.open({
                backdrop: false,
                templateUrl: 'insertBook',
                controller: 'insertBookCtrl',
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
        $scope.deleteBook = function () {
            var modalInstance = $modal.open({
                backdrop: false,
                templateUrl: 'deleteBook',
                controller: 'deleteBookCtrl',
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
