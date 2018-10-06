'use strict';

app.controller('userInfoManagementCtrl', ['$rootScope','$scope','ngDialog','i18nService','ngTip','CacheService','$timeout','$state','$http','$stateParams','service.RES',
    function($rootScope,$scope,ngDialog,i18nService,ngTip,CacheService,$timeout,$state,$http,$stateParams,serviceRES) {
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
            field: "userType",

            displayName: "用户类型"
        }, {
            field: "password",

            displayName: "用户密码"
        }, {
            field: "company",

            displayName: "部门"
        }, {
            field: "department",

            displayName: "单位"
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
            $timeout(function () {
                var searchBtnList = document.getElementsByClassName('search-operate-btn')[0].getElementsByTagName('button');
                for(var i=0;i<searchBtnList.length;i++){
                    searchBtnList[i].removeAttribute("disabled");
                    if(item.status == "1" ){    //流程状态 status 1:起草 2：审批中 3：结束
                        if(searchBtnList[i].innerText.trim() == '查看审批详情' ||searchBtnList[i].innerText.trim() == '查看流程'||searchBtnList[i].innerText.trim() == '变更'
                            ||searchBtnList[i].innerText.trim() == '发送邮件&短信'||searchBtnList[i].innerText.trim() == '验收'){
                            searchBtnList[i].setAttribute("disabled","disabled");
                        }
                    }else if(item.status == "2") {
                        if (searchBtnList[i].innerText.trim() == '发布' || searchBtnList[i].innerText.trim() == '修改' || searchBtnList[i].innerText.trim() == '变更') {
                            searchBtnList[i].setAttribute("disabled", "disabled");
                        }
                    }else if(item.status =="3")
                        if(searchBtnList[i].innerText.trim() == '修改' ||searchBtnList[i].innerText.trim() == '发送邮件&短信'||searchBtnList[i].innerText.trim() == '发布'||searchBtnList[i].innerText.trim() == '验收'){
                            searchBtnList[i].setAttribute("disabled","disabled");
                        }
                }
            },1000);

        };

        $scope.pageFn = function (newPage, pageSize) {
            $scope.query(newPage, pageSize);
        };

        $scope.orderName = "";

        $scope.query = function (pageNum, pageSize) {
            var params = {
                baseInfo: {
                    "pageSize": pageSize ? pageSize : 10,
                    "pageNum": pageNum ? pageNum : 1,
                    "orderName": $scope.orderName
                },
                method: "resourceOrderQuery"
            };
            $.post('./cloudPmMethod', {"jsonStr": JSON.stringify(params)})
                .then(function (result) {
                    if (result.code == "200") {
                        $scope.dataArr.list = result.retObj.list;
                        $scope.dataArr.total = result.retObj.total;
                        $scope.dataArr.pageNum = parseInt(params.baseInfo.pageNum);
                        $scope.dataArr.pageSize = 10;
                    } else {
                        $scope.dataArr.list = [];
                        $scope.dataArr.pageNum = 1;
                        $scope.dataArr.total = 0;
                        $scope.dataArr.pageSize = 10;
                    }
                    $scope.$apply();
                });
        };

        $scope.query(1, 10);

        /*重置搜索条件*/
        $scope.reset = function () {
            $scope.orderName = "";
        };

        /*  资源申请  by hanwj   2018-6-25 */
        $scope.apply = function () {
            if (1 == 1) { //开启答题系统
                ngDialog.open({
                    template: 'modules/resourceManagement/testSystem.html',
                    className: 'ngdialog-theme-default',
                    width: 600,
                    scope: $scope,
                    controller: function ($scope) {
                        $scope.isError = false;
                        //获取题库数据 by duweiwei
                        var queryTest = function () {
                            var params = {
                                method: "queryRandomExamination"
                            };
                            $.post('./cloudOssTestMethod', {"jsonStr": JSON.stringify(params)})
                                .then(function (result) {
                                    if (result.code == 200) {
                                        $timeout(function () {
                                            $scope.testList = result.retObj;
                                            console.log(result.retObj);
                                            $scope.$apply();
                                        },500);
                                    }
                                });

                        };
                        queryTest();

                        $scope.confirm = function () {
                            var testResult = [];
                            var itemValue = {};

                            var testTotal = document.getElementsByClassName("test-answer");
                            var nameTotal = document.getElementsByClassName("test-name");
                            for (var i = 0; i < testTotal.length; i++) {
                                var optionTotal = testTotal[i].getElementsByTagName("input");
                                for (var m = 0; m < optionTotal.length; m++) {
                                    if (optionTotal[m].checked) {
                                        itemValue.answer = optionTotal[m].value;
                                        $scope.testList.forEach(function (arr, index, val) {
                                            if (index == i) {
                                                itemValue.examinationId = $scope.testList[index].examinationId;
                                            }
                                        });
                                        testResult.push(angular.copy(itemValue));
                                        break;
                                    }
                                }

                            };
                            console.log(testResult);
                            if(testResult.length<3){
                                serviceRES.showMessage("请答完所有题目！","confirm");
                                return
                            }else{
                                var params = {
                                    baseInfo: {
                                        list: testResult
                                    },
                                    method: "checkExamination"
                                };
                                $.post('./cloudOssTestMethod', {"jsonStr": JSON.stringify(params)})
                                    .then(function (result) {
                                        if (result.code == 200) {
                                            $scope.closeThisDialog();
                                            toApplyNew();

                                        } else if (result.code == -1) {
                                            $scope.isError = true;
                                            $scope.errorInfo = result.retObj;
                                            $scope.$apply();
                                            serviceRES.showMessage("回答错误请重新选择", "confirm");

                                        }

                                    });
                            }
                        };
                        $scope.cancel = function () {
                            $scope.closeThisDialog();
                        };
                    }
                });

            } else {
                //toApply();
                toApplyNew();
            }
        };

        var toApplyNew =function(){
            $state.go("app.resourceApply");
        }

        /* 资源实例配置内容修改   by hanwj   2018-6-25 */
        $scope.modify = function () {
            if (!$scope.rowItem) {
                window.wxc.xcConfirm("请选择一条数据！", window.wxc.xcConfirm.typeEnum.error);
                return;
            }
            if ($scope.rowItem.status != '1') {
                window.wxc.xcConfirm("该订单数据已发布不可修改！", window.wxc.xcConfirm.typeEnum.error);
                return;
            }

            $state.go("app.resourceModify",{params: JSON.stringify($scope.rowItem)});
        };

        /* 资源申请内容变更   by hanwj  2018-6-25 */
        $scope.change = function () {
            if (!$scope.rowItem) {
                window.wxc.xcConfirm("请选择一条数据！", window.wxc.xcConfirm.typeEnum.error);
                return;
            }
            if($scope.rowItem.status != '3') {
                window.wxc.xcConfirm("该订单数据未完成审批不可变更！", window.wxc.xcConfirm.typeEnum.error);
                return;
            }

            if (1 == 1) { //开启答题系统
                ngDialog.open({
                    template: 'modules/resourceManagement/testSystem.html',
                    className: 'ngdialog-theme-default',
                    width: 600,
                    scope: $scope,
                    controller: function ($scope) {
                        $scope.isError = false;
                        //获取题库数据 by duweiwei
                        var queryTest = function () {
                            var params = {
                                method: "queryRandomExamination"
                            };
                            $.post('./cloudOssTestMethod', {"jsonStr": JSON.stringify(params)})
                                .then(function (result) {
                                    if (result.code == 200) {
                                        $timeout(function () {
                                            $scope.testList = result.retObj;
                                            console.log(result.retObj);
                                            $scope.$apply();
                                        },500);
                                    }
                                });

                        };
                        queryTest();

                        $scope.confirm = function () {
                            var testResult = [];
                            var itemValue = {};

                            var testTotal = document.getElementsByClassName("test-answer");
                            var nameTotal = document.getElementsByClassName("test-name");
                            for (var i = 0; i < testTotal.length; i++) {
                                var optionTotal = testTotal[i].getElementsByTagName("input");
                                for (var m = 0; m < optionTotal.length; m++) {
                                    if (optionTotal[m].checked) {
                                        itemValue.answer = optionTotal[m].value;
                                        $scope.testList.forEach(function (arr, index, val) {
                                            if (index == i) {
                                                itemValue.examinationId = $scope.testList[index].examinationId;
                                            }
                                        });
                                        testResult.push(angular.copy(itemValue));
                                        break;
                                    }
                                }

                            };
                            console.log(testResult);
                            if(testResult.length<3){
                                serviceRES.showMessage("请答完所有题目！","confirm");
                                return
                            }else{
                                var params = {
                                    baseInfo: {
                                        list: testResult
                                    },
                                    method: "checkExamination"
                                };
                                $.post('./cloudOssTestMethod', {"jsonStr": JSON.stringify(params)})
                                    .then(function (result) {
                                        if (result.code == 200) {
                                            $scope.closeThisDialog();
                                            tochange();

                                        } else if (result.code == -1) {
                                            $scope.isError = true;
                                            $scope.errorInfo = result.retObj;
                                            $scope.$apply();
                                            serviceRES.showMessage("回答错误请重新选择", "confirm");

                                        }

                                    });
                            }
                        };
                        $scope.cancel = function () {
                            $scope.closeThisDialog();
                        };
                    }
                });

            } else {
                tochange();
            }
        };

        var tochange = function () {
            $state.go("app.resourceChange",{params: JSON.stringify($scope.rowItem)});
        };

        /* 资源申请发布   by hanwj  2018-6-29 */
        $scope.release = function () {
            if (!$scope.rowItem) {
                window.wxc.xcConfirm("请选择一条数据！", window.wxc.xcConfirm.typeEnum.error);
                return;
            }
            if ($scope.rowItem.status != '1') {
                window.wxc.xcConfirm("该订单已发布，不可变更流程！", window.wxc.xcConfirm.typeEnum.error);
                return;
            }
            var releaseDialog= ngDialog.open({
                template:'modules/resourceManagement/resourceRelease.html',
                className:'ngdialog-theme-default',
                scope:$scope,
                controller: 'resourceReleaseCtrl',
                resolve: {
                    params: function() {
                        return  $scope.rowItem;
                    }
                }
            });
            releaseDialog.closePromise.then(function (result) {
                if(result.value.code == 200){
                    $scope.query(1,10);
                }
            });
        };

        /* 查看资源申请处理流程   by hanwj  2018-6-29 */
        $scope.checkFlow = function () {
            if (!$scope.rowItem) {
                window.wxc.xcConfirm("请选择一条数据！", window.wxc.xcConfirm.typeEnum.error);
                return;
            }
            if ($scope.rowItem.status == '1' ) {
                window.wxc.xcConfirm("该订单未发布，流程待绑定！", window.wxc.xcConfirm.typeEnum.error);
                return;
            }
            if($scope.rowItem.instanceId!=null &&$scope.rowItem.instanceId != undefined){
                var flowDialog = ngDialog.open({
                    template:'modules/resourceManagement/resourceCheckFlow.html',
                    className:'ngdialog-theme-default',
                    width: 650,
                    scope:$scope,
                    controller:function($scope){
                        var queryImg = function(){
                            var params ={
                                baseInfo:{
                                    modelId:$scope.rowItem.instanceId
                                }
                            };

                            //  var url="./showFlowImg?modelId="+"182529";
                            var url="./showFlowImg?modelId="+ $scope.rowItem.instanceId;
                            var xhr = new XMLHttpRequest();
                            xhr.open("get", url, true);
                            xhr.responseType = "blob";
                            xhr.onload = function() {
                                if (this.status == 201) {
                                    var blob = this.response;
                                    var img = document.createElement("img");
                                    img.onload = function(e) {
                                        window.URL.revokeObjectURL(img.src);
                                    };
                                    img.src = window.URL.createObjectURL(blob);
                                    $("#imgcontainer").html(img);
                                }
                            };
                            xhr.send();

                        };
                        queryImg();
                        $scope.cancel = function(){
                            $scope.closeThisDialog();
                        };
                    }
                });
            }
        };

        /*发送邮件和短信   by hanwj   2018/7/18 */
        $scope.messageAndEmail = function () {
            if (!$scope.rowItem) {
                window.wxc.xcConfirm("请选择一条数据！", window.wxc.xcConfirm.typeEnum.error);
                return;
            }
            if ($scope.rowItem.status == '1' ) {
                window.wxc.xcConfirm("该订单未发布！", window.wxc.xcConfirm.typeEnum.error);
                return;
            }else if($scope.rowItem.status == '3'){
                window.wxc.xcConfirm("该订单已完成！", window.wxc.xcConfirm.typeEnum.error);
                return;
            }else{
                var sendDialog = ngDialog.open({
                    template:'modules/resourceManagement/messageAndEmail.html ',
                    className:'ngdialog-theme-default',
                    scope:$scope,
                    controller: 'messageAndEmailCtrl',
                    resolve: {
                        params: function() {
                            return $scope.rowItem;
                        }
                    }
                });
            }
        };

        /* 查看审批详情   by hanwj  2018-7-18 */
        $scope.checkApproveDetail = function () {
            if (!$scope.rowItem) {
                window.wxc.xcConfirm("请选择一条数据！", window.wxc.xcConfirm.typeEnum.error);
                return;
            }
            if ($scope.rowItem.status == '1' ) {
                window.wxc.xcConfirm("该订单未发布！", window.wxc.xcConfirm.typeEnum.error);
                return;
            }else{
                var approveDetailDialog= ngDialog.open({
                    template:'modules/resourceManagement/checkApproveDetail.html',
                    className:'ngdialog-theme-default',
                    scope:$scope,
                    width:750,
                    controller: 'checkApproveDetailCtrl',
                    resolve: {
                        params: function() {
                            return  $scope.rowItem;
                        }
                    }
                });
            }
        };


        /* 查看资源详情   by hanwj  2018-7-18 */
        $scope.checkResourceDetail = function () {
            if (!$scope.rowItem) {
                window.wxc.xcConfirm("请选择一条数据！", window.wxc.xcConfirm.typeEnum.error);
                return;
            }
            $state.go("app.resourceCheckDetail", {id: $scope.rowItem.id});
        }


        /* 资源申请验收 */
        $scope.acceptance = function () {
            if (!$scope.rowItem) {
                window.wxc.xcConfirm("请选择一条数据！", window.wxc.xcConfirm.typeEnum.error);
                return;
            }
            if ($scope.rowItem.status == '3' ) {
                window.wxc.xcConfirm("该订单已完成处理！", window.wxc.xcConfirm.typeEnum.error);
                return;
            }
            if ($scope.rowItem.status == '1' ) {
                window.wxc.xcConfirm("该订单未发布！", window.wxc.xcConfirm.typeEnum.error);
                return;
            }

            var queryFlowData = {
                baseInfo: {
                    "pageNum": "0",
                    "pageSize": "0",
                    "busId":$scope.rowItem.id
                },
                method: "myUpcoming"
            };
            $.post('./cloud3aMethod', {"jsonStr": JSON.stringify(queryFlowData)})
                .then(function (result) {
                    //判断当前节点是否已完成处理
                    if (result.code == 200 ) {
                        if (0 == result.resultInfo.list.length) {
                            window.wxc.xcConfirm("该订单已处理！", window.wxc.xcConfirm.typeEnum.error);
                            return;
                        } else {
                            $scope.mylist = result.resultInfo.list[0];
                            var  approveParams = {
                                rowItem: $scope.rowItem,
                                mylist: $scope.mylist
                            };
                            $state.go("app.resourceAcceptance",{params: JSON.stringify(approveParams)});
                        }
                    }
                });
        };


    }
]);
