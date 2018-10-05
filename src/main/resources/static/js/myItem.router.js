angular.module('app')
    .config(
        ['$stateProvider', '$urlRouterProvider','fbInterceptor','$httpProvider','$resourceProvider',
            function ($stateProvider, $urlRouterProvider ,fbInterceptor,$httpProvider,$resourceProvider) {

                $stateProvider
                //我的工程
                    .state('app.myItem', {
                    url: '/myItem',
                    params:{"menuId":null},
                    templateUrl: 'modules/myItem/myItem.html',
                    controller: 'myItemCtrl',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(
                                    [
                                        'modules/myItem/js/myItem.js'
                                    ]);
                            }]
                    }
                });

                $httpProvider.interceptors.push(fbInterceptor);
                $resourceProvider.defaults.stripTrailingSlashes = true;
            }
        ]
    );