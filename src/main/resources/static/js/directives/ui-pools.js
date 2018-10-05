'use strict';
/**
 * Created by sophia.wang on 16/12/29.
 */
angular.module("ui-pools", [])
    .directive('uiPoolsDirective', ['service.RES', '$rootScope', function (serviceRes, $rootScope) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                currentPool: '=',
                jtopoPools:'='
            },
            template:
                '<div class="breadcrumb resource-list">' +
                    '<h4 class="page-title">资源池列表</h4>' +
                    '<div style="margin-top: 2px;">' +
                        '<button ng-repeat="x in btn_pool" ng-click="changePool(x)" ng-bind="x.dateCenterName" ng-class="{\'operate-btn on pool\':x.id === currentPool.id, \'operate-btn\':x.id != currentPool.id}"></button>' +
                    '</div>' +
                '</div>',
            link: function($scope) {
                $scope.currentPool = undefined;

                function initPools(){
                    /*serviceRes.pool_query({}).then(function(result){
                        if(result.code==0){*/
                            $scope.btn_pool =angular.copy($rootScope.poolAllList);// result.data;
                            if($rootScope.pool) {
                                $scope.currentPool = $rootScope.pool;
                            } else {
                                $scope.currentPool = $scope.btn_pool[0];//result.data[0];
                            }
                  /*      }
                    });*/
                }
                	
                initPools();

                $scope.$watch('jtopoPools',function(a,b,c){
                	if(a){
                		$scope.currentPool=a;
                        $rootScope.pool = a;
                	}
                });

                $scope.changePool = function(pool){
                    $scope.currentPool = pool;
                    $rootScope.pool = pool;
                };
            }
        }
    }])
    .directive('uiTenantDirective', ['ngDialog','service.RES', '$rootScope', function (ngDialog,serviceRes,$rootScope){
        return {
            restrict : 'AE',
            replace  : true,
            scope: {
                tenant: '=',
                user  :'='
            },
            template : '<div>' +
                '<div class="form-group">' +
                '   <label class="col-md-2 col-sm-2 control-label">归属部门</label>' +
                '   <div class="col-md-8 col-sm-8  no-padder-sm">' +
                '       <input type="text" class="form-control" placeholder="请选择部门" ng-model="tenant.customerName" readonly style="width: 80%; padding: 5px 12px;">' +
                '       <button class="operate-btn on" ng-click="selectTenant()"><i class="fa fa-search"></i></button>'+
                '   </div>' +
                '   <span class="no-null">*</span>' +
                '</div>' +
                '<div class="form-group">' +
                '   <label class="col-md-2 col-sm-2 control-label">用户</label>' +
                '   <div class="col-md-8 col-sm-8  no-padder-sm">' +
                '       <input type="text" class="form-control" placeholder="请选择用户" ng-model="user.userName" readonly style="width: 80%; padding: 5px 12px;">' +
                '       <button class="operate-btn on" ng-click="selectUser()" ng-disabled="!tenant.customerId"><i class="fa fa-search"></i></button>'+
                '   </div>' +
                '   <span class="no-null">*</span>' +
                '</div>' +
            '</div>',
            link     : function($scope, elem, attrs){
                $scope.user = {};
                $scope.tenant = {};
                var selectedCompany = null;

                //查询部门
                $scope.selectTenant = function(){
                    ngDialog.open({
                        template:'<div class="modal-header"><h4 class="modal-title">选择部门</h4>' +
                        '</div><div class=" model-body model-body-second"style="height:200px;overflow-y: auto;overflow-x:hidden;white-space:nowrap;">' +
                        '<div id="ztree" class="ztree" style="overflow:auto;margin:0;_margin-top:10px;padding:10px 0 0 10px;overflow-y: auto;overflow-x:hidden;white-space:nowrap;">' +
                        '</div></div>' +
                        '<div class="modal-footer pad">' +
                        '<button  ng-click="ok()" class="btn">确定</button>' +
                        '<button  ng-click="cancel()" class="btn">取消</button>' +
                        '</div>',
                        plain: true,
                        className:'ngdialog-theme-default',
                        scope:$scope,
                        controller:function($scope) {
                            var setting = {
                                data: {simpleData: {enable: true, idKey: "id", pIdKey: "parentId", rootPId: ''}},
                                callback: {
                                    onClick: function (event, treeId, treeNode) {
                                        $scope.accountId = treeNode.id;
                                        var params = {
                                            deptId: treeNode.id
                                        };
                                        serviceRes.listDep(params).then(function (result) {
                                            if (result.code == 0) {
                                                selectedCompany = result.retObj;
                                            }
                                        });
                                    }
                                }
                            };
                            $scope.ok = function(){
                                $scope.$parent.tenant = selectedCompany;
                                $scope.$parent.user = {};
                                $scope.closeThisDialog();
                            };
                            $scope.cancel = function(){
                                $scope.closeThisDialog();
                            };
                            $scope.refreshTree=function() {
                                var params={
                                    userId: $rootScope.userInfo.userId
                                };
                                serviceRes.listTree(params).then(function(data){
                                    $.fn.zTree.init($("#ztree"), setting, data).expandAll(true);
                                });
                            };
                            $scope.refreshTree();
                        }
                    });
                };

                //查询用户
                $scope.selectUser = function() {
                    ngDialog.open({
                        template:'modules/business/business_info/user2.html',
                        className:'ngdialog-theme-default',
                        scope:$scope,
                        controller:function($scope){
                            $scope.colArr = [{field:'userId', displayName:'用户id'},{field:'userName', displayName:'用户名'}];
                            $scope.dataArr=[];
                            $scope.paginationCurrentPage = 1, $scope.paginationPageSize = 10, $scope.totalElements = 0;
                            $scope.searchUser = function(newPage, pageSize){
                                var params = {
                                    'customerId': $scope.$parent.tenant.customerId ? $scope.$parent.tenant.customerId : 0,
                                    'userName'  : $scope.queryName,
                                    'pageNo'    : newPage ? newPage : 1,
                                    'pageSize'  : pageSize ? pageSize : 10
                                };
                                serviceRes.listCus(params).then(function(result){
                                    if(result.message=='success'){
                                        $scope.dataArr = result.result.userList;
                                        $scope.totalElements = result.totalCount;
                                    }
                                });
                            };
                            //the list of attrs
                            $scope.searchUser($scope.paginationCurrentPage, $scope.paginationPageSize);

                            // callback function
                            $scope.callFn = function(item){
                                $scope.selectedItem = item;
                            };

                            $scope.confirm = function(){
                                $scope.$parent.user = $scope.selectedItem;
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
    .directive('uiPoolsDirectiveForNet', ['service.RES', '$rootScope', function (serviceRes, $rootScope) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                currentPool: '=',
                jtopoPools:'='
            },
            template:
            '<div class="breadcrumb resource-list">' +
            '<h4 class="page-title">资源池列表</h4>' +
            '<div style="margin-top: 2px;">' +
            '<button ng-repeat="x in btn_pool" ng-click="changePool(x)" ng-bind="x.dateCenterName" ng-class="{\'operate-btn on pool\':x.id === currentPool.id, \'operate-btn\':x.id != currentPool.id}"></button>' +
            '<a class="pull-right back" ui-sref="app.network_access">'+
            '<i class="fa fa-reply-all" aria-hidden="true" ></i>返回实例列表</a>' +
            '</div>' +
            '</div>',
            link: function($scope) {
                $scope.currentPool = undefined;

                function initPools(){
                    serviceRes.pool_query({}).then(function(result){
                        if(result.code==0){
                            $scope.btn_pool = result.data;
                            if($rootScope.pool) {
                                $scope.currentPool = $rootScope.pool;
                            } else {
                                $scope.currentPool = result.data[0];
                            }
                        }
                    });
                }

                initPools();

                $scope.$watch('jtopoPools',function(a,b,c){
                    if(a){
                        $scope.currentPool=a;
                        $rootScope.pool = a;
                    }
                });

                $scope.changePool = function(pool){
                    $scope.currentPool = pool;
                    $rootScope.pool = pool;
                };
            }
        }
    }]);