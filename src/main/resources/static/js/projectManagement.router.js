angular.module('app')
    .config(
        ['$stateProvider', '$urlRouterProvider','fbInterceptor','$httpProvider','$resourceProvider',
            function ($stateProvider, $urlRouterProvider ,fbInterceptor,$httpProvider,$resourceProvider) {

                $stateProvider
                //资源管理 by hanwj  2018/6/30
                    .state('app.projectManagement', {
                    url: '/projectManagement',
                    params:{"menuId":null},
                    templateUrl: 'modules/projectManagement/projectManagement.html',
                    controller: 'projectManagementCtrl',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(
                                    [
                                        'modules/projectManagement/js/projectManagementCtrl.js',
                                        'modules/projectManagement/js/projectApplyCtrl.js',
                                        'modules/projectManagement/js/projectModifyCtrl.js',
                                        'modules/resourceManagement/css/resource.css',
                                        'modules/projectManagement/js/chooseApproverCtrl.js',
                                        'modules/projectManagement/js/projectReleaseCtrl.js',
                                        'modules/projectManagement/js/checkApproveDetailCtrl.js',
                                        'modules/projectManagement/js/projectMessageAndEmailCtrl.js',
                                        'modules/projectManagement/js/projectCheckDetailCtrl.js'

                                    ]);
                            }]
                    }
                })

                    //项目管理—项目申请   by hanwj  2018/6/26
                    .state('app.projectApply', {
                        url: '/projectApply',
                        templateUrl: 'modules/projectManagement/projectApply.html',
                        controller:'projectApplyCtrl',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'modules/projectManagement/js/projectApplyCtrl.js',
                                        'modules/resourceManagement/css/resource.css'
                                    ]);
                                }]
                        }
                    })

                    //项目管理—项目申请   by hanwj  2018/6/26
                    .state('app.projectModify', {
                        url: '/projectModify',
                        params:{"params":null},
                        templateUrl: 'modules/projectManagement/projectModify.html',
                        controller:'projectModifyCtrl',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'modules/projectManagement/js/projectModifyCtrl.js',
                                        'modules/resourceManagement/css/resource.css'
                                    ]);
                                }]
                        }
                    })

                $httpProvider.interceptors.push(fbInterceptor);
                $resourceProvider.defaults.stripTrailingSlashes = true;
            }
        ]
    );