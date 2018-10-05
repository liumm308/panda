'use strict';

app.controller('DridCtrl', ['$scope', '$modal', '$log', 'i18nService', function ($scope, $modal, $log, i18nService) {
    // 国际化；
    i18nService.setCurrentLang("zh-cn");

    $scope.gridOptions = {
        columnDefs: [{
            field: 'name',
            displayName: '名字',
            width: '10%',
            enableColumnMenu: false,// 是否显示列头部菜单按钮
            enableHiding: false,
            suppressRemoveSort: true,
            enableCellEdit: false // 是否可编辑
        },
            {
                field: "age",
                displayName: '年龄'
            },
            {
                field: "birthday",
                displayName: '生日'
            },
            {
                field: "salary",
                displayName: '薪水'
            }
        ],

        enableSorting: true, //是否排序
        useExternalSorting: false, //是否使用自定义排序规则
        enableGridMenu: true, //是否显示grid 菜单
        showGridFooter: true, //是否显示grid footer
        enableHorizontalScrollbar: 1, //grid水平滚动条是否显示, 0-不显示  1-显示
        enableVerticalScrollbar: 0, //grid垂直滚动条是否显示, 0-不显示  1-显示

        //-------- 分页属性 ----------------
        enablePagination: true, //是否分页，默认为true
        enablePaginationControls: true, //使用默认的底部分页
        paginationPageSizes: [10, 15, 20], //每页显示个数可选项
        paginationCurrentPage: 1, //当前页码
        paginationPageSize: 10, //每页显示个数
        //paginationTemplate:"<div></div>", //自定义底部分页代码
        totalItems: 0, // 总数量
        useExternalPagination: true,//是否使用分页按钮


        //----------- 选中 ----------------------
        enableFooterTotalSelected: true, // 是否显示选中的总数，默认为true, 如果显示，showGridFooter 必须为true
        enableFullRowSelection: true, //是否点击行任意位置后选中,默认为false,当为true时，checkbox可以显示但是不可选中
        enableRowHeaderSelection: true, //是否显示选中checkbox框 ,默认为true
        enableRowSelection: true, // 行选择是否可用，默认为true;
        enableSelectAll: true, // 选择所有checkbox是否可用，默认为true;
        enableSelectionBatchEvent: true, //默认true
        isRowSelectable: function (row) { //GridRow
            if (row.entity.age > 45) {
                //row.grid.api.selection.selectRow(row.entity); // 选中行
            }
        },
        modifierKeysToMultiSelect: true,//默认false,为true时只能 按ctrl或shift键进行多选, multiSelect 必须为true;
        multiSelect: true,// 是否可以选择多个,默认为true;
        noUnselect: false,//默认false,选中后是否可以取消选中
        selectionRowHeaderWidth: 30,//默认30 ，设置选择列的宽度；

        //---------------api---------------------
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            //分页按钮事件
            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                if (getPage) {
                    getPage(newPage, pageSize);
                }
            });
            //行选中事件
            $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row, event) {
                if (row) {
                    $scope.testRow = row.entity;
                }
            });
        }
    };

    var getPage = function (curPage, pageSize) {
        var firstRow = (curPage - 1) * pageSize;
        $scope.gridOptions.totalItems = mydefalutData.length;
        $scope.gridOptions.data = mydefalutData.slice(firstRow, firstRow + pageSize);
        //或者像下面这种写法
        //$scope.myData = mydefalutData.slice(firstRow, firstRow + pageSize);
    };

    var mydefalutData = [{id: 1, name: "Moroni", age: 50, birthday: "Oct 28, 1970", salary: "60,000"},
        {id: 2, name: "Tiancum", age: 43, birthday: "Feb 12, 1985", salary: "70,000"},
        {id: 3, name: "Jacob", age: 27, birthday: "Aug 23, 1983", salary: "50,000"},
        {id: 4, name: "Nephi", age: 29, birthday: "May 31, 2010", salary: "40,000"},
        {id: 5, name: "Enos", age: 34, birthday: "Aug 3, 2008", salary: "30,000"},
        {id: 6, name: "Moroni", age: 50, birthday: "Oct 28, 1970", salary: "60,000"},
        {id: 7, name: "Tiancum", age: 43, birthday: "Feb 12, 1985", salary: "70,000"}
    ];

    getPage(1, $scope.gridOptions.paginationPageSize);

    $scope.params = {grid: {}, fun: {}};
    $scope.addData = function (size) {
        $scope.params.grid = {state: "enabled"};
        $scope.params.fun = {name: "添加"};
        var modalInstance = $modal.open({
            backdrop: false,
            templateUrl: 'grid_add',
            controller: 'auCtrl',
            resolve: {
                params: function () {
                    return $scope.params;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            mydefalutData.push(selectedItem);
            getPage(1, $scope.gridOptions.paginationPageSize);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    //执行删除
    $scope.delData = function (size) {
        var modalInstance = $modal.open({
            backdrop: false,
            templateUrl: 'grid_delete',
            controller: 'delCtrl',
            size: size,
            resolve: {
                testRow: function () {
                    return $scope.testRow;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            //$scope.selected = selectedItem;
            removeByValue(mydefalutData, selectedItem);
            getPage(1, $scope.gridOptions.paginationPageSize);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.updateData = function (size) {
        if (!$scope.testRow) {
            window.wxc.xcConfirm("请选择要修改的数据！", window.wxc.xcConfirm.typeEnum.error);
            return;
        }
        $scope.params.fun = {name:"修改"};
        $scope.params.grid = $scope.testRow;
        var modalInstance = $modal.open({
            backdrop: false,
            templateUrl: 'resourcePool_update.html',
            controller: 'rpAddCtrl',
            size: size,
            resolve : {
                params: function () {
                    return $scope.params;
                }
            }
        });
    };

    function removeByValue(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i]['id'] === val['id']) {
                arr.splice(i, 1);
                break;
            }
        }
    }

}]);

//新增修改
app.controller('auCtrl', ['$scope', '$modalInstance', '$timeout', 'params', function ($scope, $modalInstance, $timeout, params) {
    $scope.fun = params.fun;
    $scope.grid = params.grid;
    $scope.ok = function (isValid) {
        if (!isValid) return;
        $modalInstance.close($scope.grid);
        $scope.addResult($scope.fun.name + "成功！", true);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.addResult = function (msg, flag) {
        $scope.cancel();
        $timeout(function () {
            if (flag) {
                window.wxc.xcConfirm(msg, window.wxc.xcConfirm.typeEnum.success);
            } else {
                window.wxc.xcConfirm(msg, window.wxc.xcConfirm.typeEnum.error);
            }
        }, 1000);
    }
}]);

//删除
app.controller('delCtrl', ['$scope', '$modalInstance', 'testRow', function ($scope, $modalInstance, testRow) {
    $scope.ok = function () {
        if (!testRow) {
            $("#msgInfo").text("未选择删除的资源！");
            return;
        }
        $modalInstance.close(testRow);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
