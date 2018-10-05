angular.module('app')
    .config(
        ['$stateProvider', '$urlRouterProvider','fbInterceptor','$httpProvider','$resourceProvider',
            function ($stateProvider, $urlRouterProvider,fbInterceptor,$httpProvider,$resourceProvider) {

                $stateProvider
                //数据中心start
                    .state('app.customConfig', {
                        url: '/customConfig',
                        templateUrl: 'modules/customConfig/customConfig.html',
                        controller: 'customConfigCtrl',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(
                                        [
                                            'modules/customConfig/js/customConfigCtrl.js',
                                            'modules/customConfig/js/customCreateCtrl.js',
                                            'modules/customConfig/js/customModifyCtrl.js',
                                        ]);
                                }]
                        }
                    });
                //数据中心end



                $httpProvider.interceptors.push(fbInterceptor);
                $resourceProvider.defaults.stripTrailingSlashes = true;
            }
        ]
    );