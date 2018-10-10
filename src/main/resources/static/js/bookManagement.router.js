/**
 * Created by liumm308 on 2018/10/09.
 */
angular.module('app')
    .config(
        ['$stateProvider', '$urlRouterProvider','fbInterceptor','$httpProvider','$resourceProvider',
            function ($stateProvider, $urlRouterProvider,fbInterceptor,$httpProvider,$resourceProvider) {
                $stateProvider
                // Created by liumm308   图书管理
                // 图书管理-图书信息
                    .state('app.bookInfoManagement',  {
                        url: '/bookInfoManagement',
                        templateUrl: 'modules/bookManagement/bookInfo/bookInfoManagement.html',
                        controller: 'bookInfoManagementCtrl',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'modules/bookManagement/bookInfo/js/bookInfoManagement.js',
                                        'modules/bookManagement/bookInfo/js/insertBook.js',
                                        'modules/bookManagement/bookInfo/js/deleteBook.js',
                                        'modules/bookManagement/bookInfo/css/bookInfoManagement.css'
                                    ]);
                                }]
                        }
                    })

                    // 图书管理-图书类型
                    .state('app.bookTypeManagement',  {
                        url: '/bookTypeManagement',
                        templateUrl: 'modules/bookManagement/bookType/bookTypeManagement.html',
                        controller: 'bookTypeManagementCtrl',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'modules/bookManagement/bookType/js/bookTypeManagement.js',
                                        'modules/bookManagement/bookType/js/createBookType.js',
                                        'modules/bookManagement/bookType/js/updateBookType.js',
                                        'modules/bookManagement/bookType/js/deleteBookType.js',
                                        'modules/bookManagement/bookType/css/bookTypeManagement.css'
                                    ]);
                                }]
                        }
                    })
            }
        ]);