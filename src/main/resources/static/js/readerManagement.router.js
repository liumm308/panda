/**
 * Created by liumm308 on 2018/10/08.
 */
angular.module('app')
    .config(
        ['$stateProvider', '$urlRouterProvider','fbInterceptor','$httpProvider','$resourceProvider',
            function ($stateProvider, $urlRouterProvider,fbInterceptor,$httpProvider,$resourceProvider) {
                $stateProvider
                //Created by liumm308   读者管理
                //用户管理-用户信息
                    .state('app.readerInfoManagement',  {
                        url: '/readerInfoManagement',
                        templateUrl: 'modules/readerManagement/readerInfo/readerInfoManagement.html',
                        controller: 'readerInfoManagementCtrl',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'modules/readerManagement/readerInfo/js/readerInfoManagement.js',
                                        'modules/readerManagement/readerInfo/js/createReader.js',
                                        'modules/readerManagement/readerInfo/js/updateReader.js',
                                        'modules/readerManagement/readerInfo/js/deleteReader.js',
                                        'modules/readerManagement/readerInfo/css/readerInfoManagement.css'

                                    ]);
                                }]
                        }
                    })
            }
        ]);