angular.module('app')
    .config(
        ['$stateProvider', '$urlRouterProvider','fbInterceptor','$httpProvider','$resourceProvider',
            function ($stateProvider, $urlRouterProvider,fbInterceptor,$httpProvider,$resourceProvider) {

                $stateProvider
                //Created by liumm308
                    .state('app.index', {
                        url: '/index',
                        templateUrl: 'modules/home/home.html',
                        controller: 'homeCtrl',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(
                                        [
                                            'modules/home/css/home.css',
                                            'modules/home/js/homeCtrl.js'
                                        ]);
                                }]
                        }
                    });
                $httpProvider.interceptors.push(fbInterceptor);
                $resourceProvider.defaults.stripTrailingSlashes = true;
            }
        ]
    );