/**
 * Created by liumm308 on 2018/10/05.
 */
angular.module('app')
    .config(
        ['$stateProvider', '$urlRouterProvider','fbInterceptor','$httpProvider','$resourceProvider',
            function ($stateProvider, $urlRouterProvider,fbInterceptor,$httpProvider,$resourceProvider) {
                $stateProvider
                //Created by liumm308   用户管理
                //用户管理-用户信息
                    .state('app.userInfoManagement',  {
                        url: '/userInfoManagement',
                        templateUrl: 'modules/userManagement/userInfo/userInfoManagement.html',
                        controller: 'userInfoManagementCtrl',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'modules/userManagement/userInfo//js/userInfoManagement.js'
                                    ]);
                                }]
                        }
                    })
            }
        ]);