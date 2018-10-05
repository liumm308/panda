/**
 * Created by Zhiying Wang on 2018/5/14.
 */
angular.module('app')
    .config(
        ['$stateProvider', '$urlRouterProvider','fbInterceptor','$httpProvider','$resourceProvider',
            function ($stateProvider, $urlRouterProvider,fbInterceptor,$httpProvider,$resourceProvider) {
                $stateProvider
                //Created by wangzhiying   日志管理路由配置
                    .state('app.logsManagement',  {
                        url: '/logsManagement',
                        templateUrl: 'modules/logsManagement/operateLog.html',
                        controller: 'logsManagementCtrl',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(
                                        [
                                            'modules/logsManagement/js/operateLogCtrl.js'
                                        ]);
                                }]
                        }
                    })
            }
        ]);