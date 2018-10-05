angular.module('app')
    .config(
        ['$stateProvider', '$urlRouterProvider','fbInterceptor','$httpProvider','$resourceProvider',
            function ($stateProvider, $urlRouterProvider ,fbInterceptor,$httpProvider,$resourceProvider) {

                $stateProvider
                //我的工程
                    .state('app.myProject', {
                    url: '/myProject',
                    params:{"menuId":null},
                    templateUrl: 'modules/myProject/myProject.html',
                    controller: 'myProjectCtrl',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(
                                    [
                                        'modules/myProject/js/myProject.js',
                                        'modules/myProject/css/project.css'
                                    ]);
                            }]
                    }
                });

                $httpProvider.interceptors.push(fbInterceptor);
                $resourceProvider.defaults.stripTrailingSlashes = true;
            }
        ]
    );