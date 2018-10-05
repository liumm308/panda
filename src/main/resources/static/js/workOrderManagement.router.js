/**
 * Created by duweiwei on 2018/6/13.
 */
angular.module('app')
    .config(
        ['$stateProvider', '$urlRouterProvider','fbInterceptor','$httpProvider','$resourceProvider',
            function ($stateProvider, $urlRouterProvider,fbInterceptor,$httpProvider,$resourceProvider) {
                $stateProvider
                //Created by duweiwei   工单管理
                //工单管理-我的工单
                .state('app.myWorkOrder',  {
                    url: '/myWorkOrder',
                    params:{"menuId":null},
                    templateUrl: 'modules/workOrderManagement/myWorkOrder/workOrder/workOrder.html',
                    controller: 'myWorkOrderCtrl',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load([
                                    'modules/workOrderManagement/myWorkOrder/workOrder/js/workOrderCtrl.js',
                                    'modules/workOrderManagement/myWorkOrder/workOrder/js/submitWorkOrderCtrl.js',
                                    'modules/workOrderManagement/myWorkOrder/workOrder/js/workOrderCreateCtrl.js',
                                    'modules/workOrderManagement/myWorkOrder/workOrder/js/modifyWorkOrderCtrl.js',
                                ]);
                            }]
                    }
                })
                //工单管理-我的已办
                .state('app.myDone',  {
                        url: '/myDone',
                        params:{"menuId":null},
                        templateUrl: 'modules/workOrderManagement/myDone/myDone.html',
                        controller: 'myDoneCtrl',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'modules/workOrderManagement/myDone/js/myDoneCtrl.js',
                                        'modules/workOrderManagement/myDone/js/myDoneInfoCtrl.js',
                                    ]);
                                }]
                        }
                    })
                //工单管理-我的代办
                .state('app.myUndo',  {
                    url: '/myUndo',
                    params:{"menuId":null},
                    templateUrl: 'modules/workOrderManagement/myUndo/myUndo.html',
                    controller: 'myUndoCtrl',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load([
                                    'modules/workOrderManagement/myUndo/js/myUndoCtrl.js'
                                    //'modules/workOrderManagement/myUndo/js/myUndoInfoCtrl.js',
                                ]);
                            }]
                    }
                })
                //工单管理-我的代办-办理页面
                .state('app.toHandle',  {
                    url: '/toHandle',
                    templateUrl: 'modules/workOrderManagement/myUndo/myUndoInfo.html',
                    controller: 'myUndoInfoCtrl',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load([
                                    'modules/workOrderManagement/myUndo/js/myUndoInfoCtrl.js'
                                ]);
                            }]
                    }
                })


            }
        ]);