/**
 * Created by liumm308 on 2018/10/08.
 */
angular.module('app')
    .config(
        ['$stateProvider', '$urlRouterProvider','fbInterceptor','$httpProvider','$resourceProvider',
            function ($stateProvider, $urlRouterProvider,fbInterceptor,$httpProvider,$resourceProvider) {
                $stateProvider
                // Created by liumm308   读者管理
                // 读者管理-读者信息
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

                    // 读者管理-读者类型
                    .state('app.readerTypeManagement',  {
                        url: '/readerTypeManagement',
                        templateUrl: 'modules/readerManagement/readerType/readerTypeManagement.html',
                        controller: 'readerTypeManagementCtrl',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'modules/readerManagement/readerType/js/readerTypeManagement.js',
                                        'modules/readerManagement/readerType/js/createReaderType.js',
                                        'modules/readerManagement/readerType/js/updateReaderType.js',
                                        'modules/readerManagement/readerType/js/deleteReaderType.js',
                                        'modules/readerManagement/readerType/css/readerTypeManagement.css'

                                    ]);
                                }]
                        }
                    })
            }
        ]);