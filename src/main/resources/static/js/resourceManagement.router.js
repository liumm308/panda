angular.module('app')
    .config(
        ['$stateProvider', '$urlRouterProvider','fbInterceptor','$httpProvider','$resourceProvider',
            function ($stateProvider, $urlRouterProvider,fbInterceptor,$httpProvider,$resourceProvider) {

                //资源管理 by hanwj 2018/6/26
                $stateProvider
                .state('app.resourceManagement', {
                    url: '/resourceManagement',
                    params:{"menuId":null,"id": null},
                    templateUrl: 'modules/resourceManagement/resourceManagement.html',
                    controller: 'resourceManagementCtrl',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load([
                                    'modules/resourceManagement/js/resourceManagementCtrl.js',
                                    'modules/resourceManagement/css/resource.css',
                                    'modules/resourceManagement/js/resourceApplyCtrl.js',
                                    'modules/resourceManagement/js/resourceCheckDetailCtrl.js',
                                    'modules/resourceManagement/js/chooseApproverCtrl.js',
                                    'modules/resourceManagement/js/resourceReleaseCtrl.js',
                                    'modules/resourceManagement/js/resourceChangeCtrl.js',
                                    'modules/resourceManagement/js/checkApproveDetailCtrl.js',
                                    'modules/resourceManagement/js/messageAndEmailCtrl.js',
                                    'modules/resourceManagement/js/resourceModifyCtrl.js'
                                    ])
                            }]
                    }
                })

                //资源管理—资源申请   by hanwj  2018/6/26
                    .state('app.resourceApply', {
                        url: '/resourceApply',
                        params:{"id":null},
                        templateUrl: 'modules/resourceManagement/resourceApply.html',
                        controller:'resourceApplyCtrl',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'modules/resourceManagement/js/resourceApplyCtrl.js',
                                        'modules/resourceManagement/js/vmOrPhyAppplyCtrl.js',
                                        'modules/resourceManagement/css/resource.css'
                                    ]);
                                }]
                        }
                    })

                    //资源管理—资源订单修改   by hanwj  2018/6/26
                    .state('app.resourceModify', {
                        url: '/resourceModify',
                        params:{"params":null},
                        templateUrl: 'modules/resourceManagement/resourceModify.html',
                        controller:'resourceModifyCtrl',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'modules/resourceManagement/js/resourceModifyCtrl.js',
                                        'modules/resourceManagement/js/vmOrPhyAppplyCtrl.js',
                                        'modules/resourceManagement/js/vmOrPhyModifyCtrl.js',
                                        'modules/resourceManagement/css/resource.css'
                                    ]);
                                }]
                        }
                    })
                        
                    //资源管理—资源订单变更   by hanwj  2018/6/26
                    .state('app.resourceChange', {
                        url: '/resourceChange',
                        params:{"params":null},
                        templateUrl: 'modules/resourceManagement/resourceChange.html',
                        controller:'resourceChangeCtrl',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'modules/resourceManagement/js/resourceChangeCtrl.js',
                                        'modules/resourceManagement/js/vmOrPhyModifyCtrl.js',
                                        'modules/resourceManagement/css/resource.css'
                                    ]);
                                }]
                        }
                    })
                    //资源管理—资源订单验收  by hanwj  2018/9/9
                    .state('app.resourceAcceptance', {
                        url: '/resourceAcceptance',
                        params:{"params":null},
                        templateUrl: 'modules/resourceManagement/resourceAcceptance.html',
                        controller:'resourceAcceptanceCtrl',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'modules/resourceManagement/js/resourceAcceptanceCtrl.js'
                                    //    'modules/resourceManagement/js/vmOrPhyModifyCtrl.js',
                                      //  'modules/resourceManagement/css/resource.css'
                                    ]);
                                }]
                        }
                    })
                        

                    //资源管理—查看实例详情  by hanwj  2018/6/26
                    .state('app.resourceCheckDetail', {
                        url: '/checkDetail',
                        params:{"id":null},
                        templateUrl: 'modules/resourceManagement/resourceCheckDetail.html',
                        controller:'resourceCheckDetailCtrl',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'modules/resourceManagement/js/resourceCheckDetailCtrl.js',
                                        'modules/resourceManagement/css/resource.css'
                                    ]);
                                }]
                        }
                    });

                $httpProvider.interceptors.push(fbInterceptor);
                $resourceProvider.defaults.stripTrailingSlashes = true;
            }
        ]
    );