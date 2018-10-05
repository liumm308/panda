angular.module("ui-pool", [])
    .directive('poolDirective', ['service.RES','$rootScope', function (serviceRes,$rootScope) {
        return {
            restrict: 'AE',
            replace: false,
            scope: {
                code: "="
            },
            template:
            '<div class="zyc" style="height:20%">' +
                '<div class="zyc-left">资源池</div>' +
                '<div class="zyc-right" style="position: relative">' +
                    '<ul>' +
                        '<li ng-repeat="item in poolList">' +
                            '<span>{{$index+(size-1)*4+1}}</span>' +
                            '<a ng-click="selectDate($event,item,$index)">{{item.dateCenterName}}' +
                                '<img  ng-show="$index!=count"src="../../oss/img/zyc-icon.png" /><img ng-show="$index==count" src="../../oss/img/select_pool.png" />'+
                            '</a>'+
                        '</li>' +
                    '</ul>' +
                    '<span style="cursor:pointer;position: absolute;color: #fff;font-size: 30px;right: 15px;" ng-click="lastPage()"><i class="fa fa-angle-up" aria-hidden="true"></i></span>' +
                    '<span style="cursor:pointer;position:absolute;font-size: 30px;position: absolute;bottom: 0;color: #fff;right: 15px;" ng-click="nextPage()"><i class="fa fa-angle-down" aria-hidden="true"></i></span>' +
                '</div>' +
                '</div>' +
            '</div>',
            link:function($scope){
                $scope.size=1;
                $scope.pageSize=4;
                $scope.allcount=0;
                //查询资源池
                if($rootScope.poolAllList[0].code==''){
                    $rootScope.poolAllList.splice(0,1);
                }
                $scope.initPool=function(){
                    var params={"page":$scope.size,"pageSize":$scope.pageSize}
                    /*serviceRes.resourcePoolList1(params).then(
                        function(result){
                            $scope.poolList = angular.copy($rootScope.poolAllList);//result;
                            $scope.allcount = $rootScope.poolAllList.length;//result.totalPages;
                            $scope.selectDate(null,$rootScope.poolAllList[0],0);
                        }
                    );*/
                    var startIndex=($scope.size-1)*$scope.pageSize;
                    var endIndex=$scope.size*$scope.pageSize;
                    $scope.poolList = angular.copy($rootScope.poolAllList);
                    $scope.poolList=$scope.poolList.splice(startIndex,endIndex);
                    $scope.allcount = $rootScope.poolAllList.length;
                    $scope.selectDate(null,$scope.poolList[0],0);
                }
                $scope.lastPage=function(){
                    if($scope.size==1){
                        return;
                    }
                    $scope.size--;
                    $scope.initPool();
                };
                $scope.nextPage=function(){
                    if($scope.size==$scope.allcount){
                        return;
                    }
                    $scope.size++;
                    $scope.initPool();
                }
                $scope.selectDate=function($event,item,$index){
                    $scope.count=$index;
                    $scope.code=item.code;
                };
                $scope.initPool();
            }
        }
    }])
    .directive('subPoolDirective', ['service.RES', function (serviceRes) {
        return {
            restrict: 'AE',
            replace: false,
            scope: {
                code: "="
            },
            template:
            '<div class="sub-zyc" style="height:10%">' +
            '<div class="sub-zyc-left">资源池</div>' +
                    '<div class="sub-zyc-right" style="position: relative">' +
                        '<ul>' +
                            '<li ng-repeat="item in poolList.content">' +
                                '<span>{{$index+(size-1)*4+1}}</span>' +
                                '<a ng-click="selectDate($event,item,$index)">{{item.dateCenterName}}' +
                                    '<img  ng-show="$index!=count"src="../../oss/img/zyc-icon-2.png" /><img ng-show="$index==count" src="../../oss/img/select_pool.png" />'+
                                '</a>'+
                            '</li>' +
                        '</ul>' +
                        '<span style="cursor:pointer;position: absolute;color: #333333;font-size: 30px;right: 15px;" ng-click="lastPage()"><i class="fa fa-angle-up" aria-hidden="true"></i></span>' +
                        '<span style="cursor:pointer;font-size: 30px;position: absolute;bottom: 0;color: #333333;right: 15px;" ng-click="nextPage()"><i class="fa fa-angle-down" aria-hidden="true"></i></span>' +
                    '</div>' +
                '</div>' +
            '</div>',
            link:function($scope){
                $scope.size=1;
                $scope.pageSize=4;
                $scope.allcount=0;
                //查询资源池
                $scope.initPool=function(){
                    var params={"page":$scope.size,"pageSize":$scope.pageSize}
                    serviceRes.resourcePoolList1(params).then(
                        function(result){
                            $scope.poolList = result;
                            $scope.allcount = result.totalPages;
                            $scope.selectDate(null,result.content[0],0);
                        }
                    );
                }
                $scope.lastPage=function(){
                    if($scope.size==1){
                        return;
                    }
                    $scope.size--;
                    $scope.initPool();
                };
                $scope.nextPage=function(){
                    if($scope.size==$scope.allcount){
                        return;
                    }
                    $scope.size++;
                    $scope.initPool();
                }
                $scope.selectDate=function($event,item,$index){
                    $scope.count=$index;
                    $scope.code=item.code;
                };
                $scope.initPool();
            }
        }
    }])
    .directive('whenScrolled', ['service.RES',function(serviceRes) {
        return function(scope, elm, attr) {
            var raw = elm[0];
            elm.bind('scroll', function() {
                if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                    scope.$apply(attr.whenScrolled);
                }
            });
        };
    }])
    .directive('cusDirective', ['ngDialog','service.RES', '$rootScope', function (ngDialog,serviceRes,$rootScope) {
        return {
            restrict: 'AE',
            replace: true,
            template:'<div style="display: inline">' +
           /* '<div class="form-group common-group">'+
            '<label for="name" class="label-name">可用域</label>'+
            '<select class="form-control ng-pristine ng-untouched ng-valid"  ng-model="zone" ng-options=" b.availableZoneName for b in zoneList">' +
            '<option value="">全部</option>'+
            '</select>'+
            '</div>' +*/
            '<div class="form-group common-group">'+
            '<label for="name" class="label-name label-name-management">归属部门</label>' +
            '<input ng-model="customerId" class="input-small" type="hidden" >' +
            '<input ng-model="customerName" class="input-small" type="hidden" >' +
            '<input ng-model="accountId" class="input-small" type="hidden" >' +
            '<input ng-model="accountName" ng-click="selectCus()" class="form-control ng-pristine ng-untouched ng-valid"  style="width: 58%;"  readonly="readonly" type="text"  data-msg-required=""  >' +
            '<a class="operate-btn on" ng-click="selectCus()"><i class="glyphicon glyphicon-search"></i><span class="btn-name"></span></a>'+
            '</div>' +
            '<div class="form-group common-group" ng-if="hideusername!=true">' +
            '<label for="name" class="label-name label-name-management">用户</label>' +
            '<input  ng-model="loginName" ng-hide="true" class="form-control ng-pristine ng-untouched ng-valid"  style="width: 52%;"  readonly="readonly" type="text"  data-msg-required="" />'+
            '<input  ng-model="userd" ng-hide="true" class="form-control ng-pristine ng-untouched ng-valid"  style="width: 52%;"  readonly="readonly" type="text"  data-msg-required="" />'+
            '<input  ng-model="userName" ng-click="selectCustomer()" class="form-control ng-pristine ng-untouched ng-valid"  style="width: 58%;"  readonly="readonly" type="text"  data-msg-required="" />'+
            '<a class="operate-btn on" ng-click="selectCustomer()">'+
            '<i class="glyphicon glyphicon-search"></i>'+
            '<span class="btn-name"></span>'+
            '</a>' +
            '</div></div>',
            link:function($scope) {
                $rootScope.customerId=null;
                $rootScope.customerName=null;
                $rootScope.accountId=null;
                $rootScope.accountName=null;

                $rootScope.userName=null;
                $rootScope.loginName=null;
                $rootScope.userId=null;

                $scope.$watch('accountId', function(newVaule, oldValue, scope){
                    if(newVaule){
                        $scope.userName=null;
                        $scope.loginName=null;
                        $scope.userId=null;
                        $rootScope.userName=null;
                        $rootScope.loginName=null;
                        $rootScope.userId=null;
                    }
                });
                $scope.selectCus=function(){
                    ngDialog.open({
                        template:'<div class="modal-header"><h4 class="modal-title">选择部门</h4>' +
                        '</div><div class=" model-body model-body-second"style="height:200px;OVERFLOW-Y: auto; OVERFLOW-X:hidden;white-space:nowrap;">' +
                        '<div id="ztree" class="ztree" style="overflow:auto;margin:0;_margin-top:10px;padding:10px 0 0 10px;OVERFLOW-Y: auto; OVERFLOW-X:hidden;white-space:nowrap;">' +
                        '</div></div>' +
                        '<div class="modal-footer pad">' +
                        '<button  ng-click="ok()" class="btn">确定</button>' +
                        '<button  ng-click="cancel()" class="btn">取消</button>' +
                        '</div>',
                        plain: true,
                        className:'ngdialog-theme-default',
                        scope:$scope,
                        controller:function($scope){
                            var setting = {
                                data: {simpleData: {enable: true, idKey: "id", pIdKey: "parentId", rootPId: ''}},
                                callback: {
                                    onClick: function (event, treeId, treeNode) {
                                        $scope.accountId=treeNode.id;
                                        var params={
                                            deptId:treeNode.id
                                        };
                                        serviceRes.listDep(params).then(function(result){
                                            if(result.code==0){
                                                $scope.customerId=result.retObj.customerId;
                                                $scope.customerName=result.retObj.customerName;
                                                $rootScope.customerId=result.retObj.customerId;
                                                $rootScope.customerName=result.retObj.customerName;
                                            }
                                        });
                                        $scope.accountName=treeNode.name;
                                        $rootScope.accountName=treeNode.name;
                                    }
                                }
                            };
                            $scope.ok = function(){
                                $scope.$parent.customerId=$scope.customerId;
                                $scope.$parent.customerName=$scope.customerName;
                                $scope.$parent.accountId=$scope.accountId;
                                $scope.$parent.accountName=$scope.accountName;

                                $rootScope.customerId=$scope.customerId;
                                $rootScope.customerName=$scope.customerName;
                                $rootScope.accountId=$scope.accountId;
                                $rootScope.accountName=$scope.accountName;
                                $scope.closeThisDialog();
                            };
                            $scope.cancel = function(){
                                $scope.closeThisDialog();
                            };
                            $scope.refreshTree=function() {
                                var params={
                                    userId:$rootScope.userInfo.userId
                                    //userId:JSON.parse($rootScope.userInfo).userId //userInfo string转成obj   by duweiwei
                                }
                                serviceRes.listTree(params).then(function(data){
                                    $.fn.zTree.init($("#ztree"), setting, data).expandAll(true);
                                });
                            };
                            $scope.refreshTree();
                        }
                    });
                };
                $scope.selectCustomer=function(){
                    ngDialog.open({
                        template:'modules/business/business_info/user.html',
                        className:'ngdialog-theme-default',
                        scope:$scope,
                        controller:function($scope){
                            $scope.searchCustomer = function(newPage){
                                if(newPage==undefined){
                                    $scope.customerOptions.paginationCurrentPage=1;
                                }
                                var param={
                                    pageNo:newPage!=undefined?newPage:1,
                                    customerId:$scope.$parent.customerId!=undefined?$scope.$parent.customerId:0,
                                    userName:$scope.customName,
                                    pageSize:10
                                };
                                serviceRes.listCus(param).then(function(result){
                                    getCustomerPage(param.pageNo,result.result.totalCount,result.result.userList);
                                });
                            };
                            $scope.customerOptions = {
                                columnDefs: [{field:'userId', displayName:'用户id'},{field:'userName', displayName:'用户名'}],
                                enableCellEdit: false, // 是否可编辑
                                enableSorting: true, //是否排序
                                useExternalSorting: false, //是否使用自定义排序规则
                                enableGridMenu: true, //是否显示grid 菜单
                                showGridFooter: false, //是否显示grid footer
                                enableHorizontalScrollbar: 0, //grid水平滚动条是否显示, 0-不显示  1-显示
                                enableVerticalScrollbar: 0, //grid垂直滚动条是否显示, 0-不显示  1-显示
                                //-------- 分页属性 ----------------
                                enablePagination: true, //是否分页，默认为true
                                enablePaginationControls: true, //使用默认的底部分页
                                paginationPageSizes: [10], //每页显示个数可选项
                                paginationCurrentPage: 1, //当前页码
                                paginationPageSize: 10, //每页显示个数
                                //paginationTemplate:"<div></div>", //自定义底部分页代码
                                totalItems: 0, // 总数量
                                useExternalPagination: true,//是否使用分页按钮
                                //----------- 选中 ----------------------
                                enableFooterTotalSelected: false, // 是否显示选中的总数，默认为true, 如果显示，showGridFooter 必须为true
                                enableFullRowSelection: true, //是否点击行任意位置后选中,默认为false,当为true时，checkbox可以显示但是不可选中
                                enableRowHeaderSelection: true, //是否显示选中checkbox框 ,默认为true
                                enableRowSelection: true, // 行选择是否可用，默认为true;
                                enableSelectAll: false, // 选择所有checkbox是否可用，默认为true;
                                enableSelectionBatchEvent: true, //默认true
                                isRowSelectable: function (row) { //GridRow
                                    $scope.index+=1;
                                    if($scope.index==1){
                                        row.grid.api.selection.selectRow(row.entity); // 选中行
                                    }
                                },
                                modifierKeysToMultiSelect: true,//默认false,为true时只能 按ctrl或shift键进行多选, multiSelect 必须为true;
                                multiSelect: true,// 是否可以选择多个,默认为true;
                                noUnselect: true,//默认false,选中后是否可以取消选中
                                selectionRowHeaderWidth: 30,//默认30 ，设置选择列的宽度；
                                onRegisterApi: function (gridApi) {
                                    $scope.gridApi = gridApi;
                                    //分页按钮事件
                                    gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                                        if (getCustomerPage) {
                                            $scope.searchCustomer(newPage);
                                        }
                                    });
                                    $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row, event) {
                                        if (row) {
                                            $scope.customerRow = row.entity;
                                        }
                                    });
                                }
                            };
                            var getCustomerPage = function (curPage,totalSize,customerlists) {
                                $scope.customerOptions.totalItems = totalSize;
                                $scope.customerOptions.data = customerlists;
                            };
                            $scope.searchCustomer();
                            $scope.confirm = function(){
                                if( $scope.customerRow){
                                    $scope.$parent.userName = $scope.customerRow.userName;
                                    $scope.$parent.userId = $scope.customerRow.userId;
                                    $scope.$parent.loginName = $scope.customerRow.customerName;

                                    $rootScope.userName = $scope.customerRow.userName;
                                    $rootScope.userId = $scope.customerRow.userId;
                                    $rootScope.loginName = $scope.customerRow.customerName;
                                }
                                $scope.closeThisDialog();
                            };
                            $scope.cancel = function(){
                                $scope.closeThisDialog();
                            };
                        }
                    });
                }
            }
        }
    }])
    .directive('cusModelDirective', ['ngDialog','service.RES', '$rootScope', function (ngDialog,serviceRes,$rootScope) {
        return {
            restrict: 'AE',
            replace: true,
            template:'<div style="display: inline;">' +
                /* '<div class="form-group common-group">'+
                 '<label for="name" class="label-name">可用域</label>'+
                 '<select class="form-control ng-pristine ng-untouched ng-valid"  ng-model="zone" ng-options=" b.availableZoneName for b in zoneList">' +
                 '<option value="">全部</option>'+
                 '</select>'+
                 '</div>' +*/
            '<div class="form-group common-group">'+
            '<label for="name" class="label-name">归属部门</label>' +
            '<input ng-model="customerId" class="input-small" type="hidden" >' +
            '<input ng-model="customerName" class="input-small" type="hidden" >' +
            '<input ng-model="accountId" class="input-small" type="hidden" >' +
            '<input ng-model="accountName" ng-click="selectCus()" class="form-control ng-pristine ng-untouched ng-valid"  style="width: 52%;"  readonly="readonly" type="text"  data-msg-required=""  >' +
            '<a class="operate-btn on" ng-click="selectCus()"><i class="glyphicon glyphicon-search"></i><span class="btn-name"></span></a>'+
            '<span class="no-null">*</span>' +
            '</div>' +
            '<div class="form-group common-group" ng-if="hideusername!=true">' +
            '<label for="name" class="label-name">用户</label>' +
            '<input  ng-model="loginName" ng-hide="true" class="form-control ng-pristine ng-untouched ng-valid"  style="width: 52%;"  readonly="readonly" type="text"  data-msg-required="" />'+
            '<input  ng-model="userd" ng-hide="true" class="form-control ng-pristine ng-untouched ng-valid"  style="width: 52%;"  readonly="readonly" type="text"  data-msg-required="" />'+
            '<input  ng-model="userName" ng-click="selectCustomer()" ng-disabled="!accountName" class="form-control ng-pristine ng-untouched ng-valid"  style="width: 52%;"  readonly="readonly" type="text"  data-msg-required="" />'+
            '<a class="operate-btn on" ng-click="selectCustomer()" ng-disabled="!accountName">'+
            '<i class="glyphicon glyphicon-search"></i>'+
            '<span class="btn-name"></span>'+
            '</a>' +
            '<span class="no-null">*</span>' +
            '</div></div>',
            link:function($scope) {
                $rootScope.customerId=null;
                $rootScope.customerName=null;
                $rootScope.accountId=null;
                $rootScope.accountName=null;

                $rootScope.userName=null;
                $rootScope.loginName=null;
                $rootScope.userId=null;

                $scope.$watch('accountId', function(newVaule, oldValue, scope){
                    if(newVaule){
                        $scope.userName=null;
                        $scope.loginName=null;
                        $scope.userId=null;
                        $rootScope.userName=null;
                        $rootScope.loginName=null;
                        $rootScope.userId=null;
                    }
                });
                $scope.selectCus=function(){
                    ngDialog.open({
                        template:'<div class="modal-header"><h4 class="modal-title">选择部门</h4>' +
                        '</div><div class=" model-body model-body-second"style="height:200px;OVERFLOW-Y: auto; OVERFLOW-X:hidden;white-space:nowrap;">' +
                        '<div id="ztree" class="ztree" style="overflow:auto;margin:0;_margin-top:10px;padding:10px 0 0 10px;OVERFLOW-Y: auto; OVERFLOW-X:hidden;white-space:nowrap;">' +
                        '</div></div>' +
                        '<div class="modal-footer pad">' +
                        '<button  ng-click="ok()" class="btn">确定</button>' +
                        '<button  ng-click="cancel()" class="btn">取消</button>' +
                        '</div>',
                        plain: true,
                        className:'ngdialog-theme-default',
                        scope:$scope,
                        controller:function($scope){
                            var setting = {
                                data: {simpleData: {enable: true, idKey: "id", pIdKey: "parentId", rootPId: ''}},
                                callback: {
                                    onClick: function (event, treeId, treeNode) {
                                        $scope.accountId=treeNode.id;
                                        var params={
                                            deptId:treeNode.id
                                        };
                                        serviceRes.listDep(params).then(function(result){
                                            if(result.code==0){
                                                $scope.customerId=result.retObj.customerId;
                                                $scope.customerName=result.retObj.customerName;
                                                $rootScope.customerId=result.retObj.customerId;
                                                $rootScope.customerName=result.retObj.customerName;
                                            }
                                        });
                                        $scope.accountName=treeNode.name;
                                        $rootScope.accountName=treeNode.name;
                                    }
                                }
                            };
                            $scope.ok = function(){
                                $scope.$parent.customerId=$scope.customerId;
                                $scope.$parent.customerName=$scope.customerName;
                                $scope.$parent.accountId=$scope.accountId;
                                $scope.$parent.accountName=$scope.accountName;

                                $rootScope.customerId=$scope.customerId;
                                $rootScope.customerName=$scope.customerName;
                                $rootScope.accountId=$scope.accountId;
                                $rootScope.accountName=$scope.accountName;
                                $scope.closeThisDialog();
                            };
                            $scope.cancel = function(){
                                $scope.closeThisDialog();
                            };
                            $scope.refreshTree=function() {
                                var params={
                                    userId:$rootScope.userInfo.userId
                                }
                                serviceRes.listTree(params).then(function(data){
                                    $.fn.zTree.init($("#ztree"), setting, data).expandAll(true);
                                });
                            };
                            $scope.refreshTree();
                        }
                    });
                };
                $scope.selectCustomer=function(){
                    ngDialog.open({
                        template:'modules/business/business_info/user.html',
                        className:'ngdialog-theme-default',
                        scope:$scope,
                        controller:function($scope){
                            $scope.searchCustomer = function(newPage){
                                if(newPage==undefined){
                                    $scope.customerOptions.paginationCurrentPage=1;
                                }
                                var param={
                                    pageNo:newPage!=undefined?newPage:1,
                                    customerId:$scope.$parent.customerId!=undefined?$scope.$parent.customerId:0,
                                    userName:$scope.customName,
                                    pageSize:10
                                };
                                serviceRes.listCus(param).then(function(result){
                                    getCustomerPage(param.pageNo,result.result.totalCount,result.result.userList);
                                });
                            };
                            $scope.customerOptions = {
                                columnDefs: [{field:'userId', displayName:'用户id'},{field:'userName', displayName:'用户名'}],
                                enableCellEdit: false, // 是否可编辑
                                enableSorting: true, //是否排序
                                useExternalSorting: false, //是否使用自定义排序规则
                                enableGridMenu: true, //是否显示grid 菜单
                                showGridFooter: false, //是否显示grid footer
                                enableHorizontalScrollbar: 0, //grid水平滚动条是否显示, 0-不显示  1-显示
                                enableVerticalScrollbar: 0, //grid垂直滚动条是否显示, 0-不显示  1-显示
                                //-------- 分页属性 ----------------
                                enablePagination: true, //是否分页，默认为true
                                enablePaginationControls: true, //使用默认的底部分页
                                paginationPageSizes: [10], //每页显示个数可选项
                                paginationCurrentPage: 1, //当前页码
                                paginationPageSize: 10, //每页显示个数
                                //paginationTemplate:"<div></div>", //自定义底部分页代码
                                totalItems: 0, // 总数量
                                useExternalPagination: true,//是否使用分页按钮
                                //----------- 选中 ----------------------
                                enableFooterTotalSelected: false, // 是否显示选中的总数，默认为true, 如果显示，showGridFooter 必须为true
                                enableFullRowSelection: true, //是否点击行任意位置后选中,默认为false,当为true时，checkbox可以显示但是不可选中
                                enableRowHeaderSelection: true, //是否显示选中checkbox框 ,默认为true
                                enableRowSelection: true, // 行选择是否可用，默认为true;
                                enableSelectAll: false, // 选择所有checkbox是否可用，默认为true;
                                enableSelectionBatchEvent: true, //默认true
                                isRowSelectable: function (row) { //GridRow
                                    $scope.index+=1;
                                    if($scope.index==1){
                                        row.grid.api.selection.selectRow(row.entity); // 选中行
                                    }
                                },
                                modifierKeysToMultiSelect: true,//默认false,为true时只能 按ctrl或shift键进行多选, multiSelect 必须为true;
                                multiSelect: true,// 是否可以选择多个,默认为true;
                                noUnselect: true,//默认false,选中后是否可以取消选中
                                selectionRowHeaderWidth: 30,//默认30 ，设置选择列的宽度；
                                onRegisterApi: function (gridApi) {
                                    $scope.gridApi = gridApi;
                                    //分页按钮事件
                                    gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                                        if (getCustomerPage) {
                                            $scope.searchCustomer(newPage);
                                        }
                                    });
                                    $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row, event) {
                                        if (row) {
                                            $scope.customerRow = row.entity;
                                        }
                                    });
                                }
                            };
                            var getCustomerPage = function (curPage,totalSize,customerlists) {
                                $scope.customerOptions.totalItems = totalSize;
                                $scope.customerOptions.data = customerlists;
                            };
                            $scope.searchCustomer();
                            $scope.confirm = function(){
                                if( $scope.customerRow){
                                    $scope.$parent.userName = $scope.customerRow.userName;
                                    $scope.$parent.userId = $scope.customerRow.userId;
                                    $scope.$parent.loginName = $scope.customerRow.customerName;

                                    $rootScope.userName = $scope.customerRow.userName;
                                    $rootScope.userId = $scope.customerRow.userId;
                                    $rootScope.loginName = $scope.customerRow.customerName;
                                }
                                $scope.closeThisDialog();
                            };
                            $scope.cancel = function(){
                                $scope.closeThisDialog();
                            };
                        }
                    });
                }
            }
        }
    }]);
