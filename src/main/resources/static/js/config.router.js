'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
    ['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {

            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                //如果用户没有资源池权限，提示用户赋予资源池权限
                /*if ($rootScope.poolAllList.length==0) {
                    //window.wxc.xcConfirm("当前用户没有资源池权限，请联系管理员", window.wxc.xcConfirm.typeEnum.confirm);
                    toState.name="nolevel";
                    return;
                }*/
                //遍历当前路由的按钮
                $rootScope.currentButton = [];
                angular.forEach($rootScope.buttonList, function (data, index) {
                    var tempName=toState.name;
                    if (toState.name == data.topName) {
                        $rootScope.currentButton.push(data);
                    }
                    else if(tempName.indexOf('app.vpc')==0){
                        $rootScope.currentButton.push(data);
                    }
                });
               //if ($rootScope.currentButton.length != 0) {
                    localStorage.removeItem("currentButton");
                    localStorage.setItem("currentButton", JSON.stringify($rootScope.currentButton));
                /*}else{

                }*/
                var index = 1;
                $rootScope.pool = undefined;
                if (fromState.name == "app.business_resource" || fromState.name == "app.index") {
                    window.clearTimeout(window.timeId1);
                    window.clearTimeout(window.timeId2);
                    $rootScope.haveArray = false;
                }
                var tempSubMenu = [];
                if ($rootScope.subUserMenu.length != 0) {
                    tempSubMenu = $rootScope.subUserMenu;
                    var tempArray = [];
                    angular.forEach(tempSubMenu, function (a, b, c) {
                        tempArray.push(JSON.stringify(a));
                    });
                    localStorage.setItem('subUserMenu', JSON.stringify(tempArray));
                }
                if ($rootScope.subUserMenu.length == 0) {
                    var tempMenu = JSON.parse(localStorage.getItem('subUserMenu'));
                    angular.forEach(tempMenu, function (a, b, c) {
                        tempMenu[b] = JSON.parse(tempMenu[b]);
                    });
                    tempSubMenu = tempMenu;
                }

                angular.forEach(tempSubMenu, function (a, b, c) {
                    var tempSubId = "";
                    if (a.name == toState.name) {
                        tempSubId = a.parentId;
                        a.active = true;
                        $rootScope.asideFolded = true;
                        $rootScope.haveArray = true;
                        index = 0;
                        $rootScope.tabs = [];
                        angular.forEach(tempSubMenu, function (a1, b1, c1) {
                            if (a1.parentId == tempSubId) {
                                $rootScope.tabs.push(a1);
                            }
                        });
                    }
                });
                if (index == 1) {
                    $rootScope.haveArray = false;
                    $rootScope.tabs = [];
                }
                /*var index = 1;
                $rootScope.pool = undefined;
                if (fromState.name == "app.business_resource" || fromState.name == "app.index") {
                    window.clearTimeout(window.timeId1);
                    window.clearTimeout(window.timeId2);
                    $rootScope.haveArray = false;
                }
                angular.forEach($rootScope.logicalResourceTabs, function (a, b, c) {
                    if (a.name == toState.name) {
                        a.active = true;
                        $rootScope.tabs = $rootScope.logicalResourceTabs;
                        $rootScope.asideFolded = true;
                        $rootScope.haveArray = true;
                        index = 0;
                    }
                });
                angular.forEach($rootScope.basicResourceTabs, function (a, b, c) {
                    if (a.name == toState.name) {
                        a.active = true;
                        $rootScope.tabs = $rootScope.basicResourceTabs;
                        $rootScope.asideFolded = true;
                        $rootScope.haveArray = true;
                        index = 0;
                    }
                });
                angular.forEach($rootScope.resourceMonitorTabs, function (a, b, c) {
                    if (a.name == toState.name) {
                        a.active = true;
                        $rootScope.tabs = $rootScope.resourceMonitorTabs;
                        $rootScope.asideFolded = true;
                        $rootScope.haveArray = true;
                        index = 0;
                    }
                });
                angular.forEach($rootScope.softResourceTabs, function (a, b, c) {
                    if (a.name == toState.name) {
                        a.active = true;
                        $rootScope.tabs = $rootScope.softResourceTabs;
                        $rootScope.asideFolded = true;
                        $rootScope.haveArray = true;
                        index = 0;
                    }
                });
                angular.forEach($rootScope.serviceMonitorTabs, function (a, b, c) {
                    if (a.name == toState.name) {
                        a.active = true;
                        $rootScope.tabs = $rootScope.serviceMonitorTabs;
                        $rootScope.asideFolded = true;
                        $rootScope.haveArray = true;
                        index = 0;
                    }
                });
                angular.forEach($rootScope.networkTabs, function (a, b, c) {
                    if (a.name == toState.name) {
                        a.active = true;
                        $rootScope.tabs = $rootScope.networkTabs;
                        $rootScope.asideFolded = true;
                        $rootScope.haveArray = true;
                        index = 0;
                    }
                    angular.forEach(a.node,function(d,e,f){
                        if (d.name == toState.name) {
                            a.active = true;
                            $rootScope.tabs = $rootScope.networkTabs;
                            $rootScope.asideFolded = true;
                            $rootScope.haveArray = true;
                            index = 0;
                        }
                    })
                });
                angular.forEach($rootScope.vmTabs, function (a, b, c) {
                    if (a.name == toState.name) {
                        a.active = true;
                        $rootScope.tabs = $rootScope.vmTabs;
                        $rootScope.asideFolded = true;
                        $rootScope.haveArray = true;
                        index = 0;
                    }
                    angular.forEach(a.node,function(d,e,f){
                        if (d.name == toState.name) {
                            a.active = true;
                            $rootScope.tabs = $rootScope.vmTabs;
                            $rootScope.asideFolded = true;
                            $rootScope.haveArray = true;
                            index = 0;
                        }
                    })
                });
                angular.forEach($rootScope.ebsTabs, function (a, b, c) {
                    if (a.name == toState.name) {
                        a.active = true;
                        $rootScope.tabs = $rootScope.ebsTabs;
                        $rootScope.asideFolded = true;
                        $rootScope.haveArray = true;
                        index = 0;
                    }
                    angular.forEach(a.node,function(d,e,f){
                        if (d.name == toState.name) {
                            a.active = true;
                            $rootScope.tabs = $rootScope.ebsTabs;
                            $rootScope.asideFolded = true;
                            $rootScope.haveArray = true;
                            index = 0;
                        }
                    })
                });
                angular.forEach($rootScope.vpcTabs, function (a, b, c) {
                    if (a.name == toState.name) {
                        a.active = true;
                        $rootScope.tabs = $rootScope.vpcTabs;
                        $rootScope.asideFolded = true;
                        $rootScope.haveArray = true;
                        index = 0;
                    }
                    angular.forEach(a.node,function(d,e,f){
                        if (d.name == toState.name) {
                            a.active = true;
                            $rootScope.tabs = $rootScope.vpcTabs;
                            $rootScope.asideFolded = true;
                            $rootScope.haveArray = true;
                            index = 0;
                        }
                    })
                });
                angular.forEach($rootScope.lbsTabs, function (a, b, c) {
                    if (a.name == toState.name) {
                        a.active = true;
                        $rootScope.tabs = $rootScope.lbsTabs;
                        $rootScope.asideFolded = true;
                        $rootScope.haveArray = true;
                        index = 0;
                    }
                    angular.forEach(a.node,function(d,e,f){
                        if (d.name == toState.name) {
                            a.active = true;
                            $rootScope.tabs = $rootScope.lbsTabs;
                            $rootScope.asideFolded = true;
                            $rootScope.haveArray = true;
                            index = 0;
                        }
                    })
                });
                angular.forEach($rootScope.cacheTabs, function (a, b, c) {
                    if (a.name == toState.name) {
                        a.active = true;
                        $rootScope.tabs = $rootScope.cacheTabs;
                        $rootScope.asideFolded = true;
                        $rootScope.haveArray = true;
                        index = 0;
                    }
                    angular.forEach(a.node,function(d,e,f){
                        if (d.name == toState.name) {
                            a.active = true;
                            $rootScope.tabs = $rootScope.cacheTabs;
                            $rootScope.asideFolded = true;
                            $rootScope.haveArray = true;
                            index = 0;
                        }
                    })
                });
                angular.forEach($rootScope.networkAccessTabs, function (a, b, c) {
                    if (a.name == toState.name) {
                        a.active = true;
                        $rootScope.tabs = $rootScope.networkAccessTabs;
                        $rootScope.asideFolded = true;
                        $rootScope.haveArray = true;
                        index = 0;
                    }
                    angular.forEach(a.node,function(d,e,f){
                        if (d.name == toState.name) {
                            a.active = true;
                            $rootScope.tabs = $rootScope.networkAccessTabs;
                            $rootScope.asideFolded = true;
                            $rootScope.haveArray = true;
                            index = 0;
                        }
                    })
                });
                angular.forEach($rootScope.rdsTabs, function (a, b, c) {
                    if (a.name == toState.name) {
                        a.active = true;
                        $rootScope.tabs = $rootScope.rdsTabs;
                        $rootScope.asideFolded = true;
                        $rootScope.haveArray = true;
                        index = 0;
                    }
                    angular.forEach(a.node,function(d,e,f){
                        if (d.name == toState.name) {
                            a.active = true;
                            $rootScope.tabs = $rootScope.rdsTabs;
                            $rootScope.asideFolded = true;
                            $rootScope.haveArray = true;
                            index = 0;
                        }
                    })
                });
                angular.forEach($rootScope.listReportTabs, function (a, b, c) {
                    if (a.name == toState.name) {
                        a.active = true;
                        $rootScope.tabs = $rootScope.listReportTabs;
                        $rootScope.asideFolded = true;
                        $rootScope.haveArray = true;
                        index = 0;
                    }
                    angular.forEach(a.node,function(d,e,f){
                        if (d.name == toState.name) {
                            a.active = true;
                            $rootScope.tabs = $rootScope.listReportTabs;
                            $rootScope.asideFolded = true;
                            $rootScope.haveArray = true;
                            index = 0;
                        }
                    })
                });
                angular.forEach($rootScope.volumeReportTabs, function (a, b, c) {
                    if (a.name == toState.name) {
                        a.active = true;
                        $rootScope.tabs = $rootScope.volumeReportTabs;
                        $rootScope.asideFolded = true;
                        $rootScope.haveArray = true;
                        index = 0;
                    }
                    angular.forEach(a.node,function(d,e,f){
                        if (d.name == toState.name) {
                            a.active = true;
                            $rootScope.tabs = $rootScope.volumeReportTabs;
                            $rootScope.asideFolded = true;
                            $rootScope.haveArray = true;
                            index = 0;
                        }
                    })
                });
                if (index == 1) {
                    $rootScope.haveArray = false;
                    $rootScope.tabs = [];
                }*/
            });
        }
    ]
)
    .config(
    ['$stateProvider', '$urlRouterProvider', 'fbInterceptor', '$httpProvider', '$resourceProvider',
        function ($stateProvider, $urlRouterProvider, fbInterceptor, $httpProvider, $resourceProvider) {

            $urlRouterProvider
                .otherwise('/app/index');
            $stateProvider
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: 'tpl/app.html',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load([
                                    'css/common.css',
                                    'js/app/nav/nav.js']);
                            }]
                    }
                })
                .state('app.dashboard-v1', {
                    url: '/dashboard-v1',
                    templateUrl: 'tpl/app_dashboard_v1.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/controllers/chart.js']);
                            }]
                    }
                })
                .state('app.dashboard-v2', {
                    url: '/dashboard-v2',
                    templateUrl: 'tpl/app_dashboard_v2.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/controllers/chart.js']);
                            }]
                    }
                })
                .state('app.chart_test', {
                    url: '/chart_test',
                    templateUrl: 'modules/chart_test/chart_test.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['modules/chart_test/js/chart_test.js']);
                            }]
                    }
                })
                .state('app.chart_edit', {
                    url: '/chart_edit',
                    templateUrl: 'modules/chart_edit/chart_edit.html',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load([
                                    'modules/chart_edit/css/chart_edit.css',
                                    'modules/chart_edit/js/chart_edit.js']);
                            }]
                    }
                })
                .state('app.workflow', {
                    url: '/workflow',
                    templateUrl: 'modules/workflow/workflow.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'modules/workflow/css/workflow.css',
                                    'modules/workflow/css/jquery.snippet.min.css',
                                    'modules/workflow/js/jtopo-min.js',
                                    'modules/workflow/js/snippet/jquery.snippet.min.js',
                                    'modules/workflow/js/site.js',
                                    'modules/workflow/js/demo.js',
                                    'modules/workflow/js/toolbar.js'
                                ]);
                            }]
                    }
                })
                .state('app.fullscreen', {
                    url: '/fullscreen',
                    templateUrl: 'modules/full_screen/fullscreen-test.html',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(
                                    [
                                        'modules/full_screen/css/default.css',
                                        'modules/full_screen/css/component.css',
                                        'modules/full_screen/js/fullscreen.js'
                                    ]);
                            }]
                    }
                })
                .state('app.hChart-fullscreen', {
                    url: '/hChart-fullscreen',
                    templateUrl: 'modules/highcharts_fullscreen/highcharts_fullscreen.html',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(
                                    [
                                        'modules/highcharts_fullscreen/css/default.css',
                                        'modules/highcharts_fullscreen/css/component.css',
                                        'modules/highcharts_fullscreen/js/hChart-fullscreen.js'
                                    ]);
                            }]
                    }
                })
                .state('app.position-swap', {
                    url: '/position-swap',
                    templateUrl: 'modules/position_swap/position-swap-test.html',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(
                                    [
                                        'modules/position_swap/css/position-swap.css'
                                    ]);
                            }]
                    }
                })
                .state('app.topology', {
                    url: '/topology',
                    templateUrl: 'modules/topology/topology.html',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(
                                    [
                                        'modules/topology/css/topology.css',
                                        'modules/topology/css/jquery.snippet.min.css',
                                        'modules/topology/js/topology.js'
                                    ]);
                            }]
                    }
                })
                .state('app.ui', {
                    url: '/ui',
                    template: '<div ui-view class="fade-in-up"></div>'
                })
                .state('app.ui.buttons', {
                    url: '/buttons',
                    templateUrl: 'tpl/ui_buttons.html'
                })
                .state('app.ui.icons', {
                    url: '/icons',
                    templateUrl: 'tpl/ui_icons.html'
                })

                .state('app.ui.widgets', {
                    url: '/widgets',
                    templateUrl: 'tpl/ui_widgets.html'
                })
                .state('app.ui.bootstrap', {
                    url: '/bootstrap',
                    templateUrl: 'tpl/ui_bootstrap.html'
                })
                .state('app.ui.sortable', {
                    url: '/sortable',
                    templateUrl: 'tpl/ui_sortable.html'
                })
                .state('app.ui.portlet', {
                    url: '/portlet',
                    templateUrl: 'tpl/ui_portlet.html'
                })
                .state('app.ui.timeline', {
                    url: '/timeline',
                    templateUrl: 'tpl/ui_timeline.html'
                })
                .state('app.ui.tree', {
                    url: '/tree',
                    templateUrl: 'tpl/ui_tree.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('angularBootstrapNavTree').then(
                                    function () {
                                        return $ocLazyLoad.load('js/controllers/tree.js');
                                    }
                                );
                            }
                        ]
                    }
                })
                .state('app.ui.toaster', {
                    url: '/toaster',
                    templateUrl: 'tpl/ui_toaster.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('toaster').then(
                                    function () {
                                        return $ocLazyLoad.load('js/controllers/toaster.js');
                                    }
                                );
                            }]
                    }
                })
                .state('app.ui.jvectormap', {
                    url: '/jvectormap',
                    templateUrl: 'tpl/ui_jvectormap.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('js/controllers/vectormap.js');
                            }]
                    }
                })
                .state('app.ui.googlemap', {
                    url: '/googlemap',
                    templateUrl: 'tpl/ui_googlemap.html',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load([
                                    'js/app/map/load-google-maps.js',
                                    'js/app/map/ui-map.js',
                                    'js/app/map/map.js']).then(
                                    function () {
                                        return loadGoogleMaps();
                                    }
                                );
                            }]
                    }
                })
                .state('app.chart', {
                    url: '/chart',
                    templateUrl: 'tpl/ui_chart.html',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load('js/controllers/chart.js');
                            }]
                    }
                })
                // table
                .state('app.table', {
                    url: '/table',
                    template: '<div ui-view class="fade-in-up"></div>'
                })
                .state('app.table.static', {
                    url: '/static',
                    templateUrl: 'tpl/table_static.html'
                })
                .state('app.table.datatable', {
                    url: '/datatable',
                    templateUrl: 'tpl/table_datatable.html'
                })
                .state('app.table.footable', {
                    url: '/footable',
                    templateUrl: 'tpl/table_footable.html'
                })
                .state('app.table.grid', {
                    url: '/grid',
                    templateUrl: 'tpl/table_grid.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('ngGrid').then(
                                    function () {
                                        return $ocLazyLoad.load('js/controllers/grid.js');
                                    }
                                );
                            }]
                    }
                })
                // form
                .state('app.form', {
                    url: '/form',
                    template: '<div ui-view class="fade-in"></div>',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load('js/controllers/form.js');
                            }]
                    }
                })
                .state('app.form.elements', {
                    url: '/elements',
                    templateUrl: 'tpl/form_elements.html'
                })
                .state('app.form.validation', {
                    url: '/validation',
                    templateUrl: 'tpl/form_validation.html'
                })
                .state('app.form.wizard', {
                    url: '/wizard',
                    templateUrl: 'tpl/form_wizard.html'
                })
                .state('app.form.fileupload', {
                    url: '/fileupload',
                    templateUrl: 'tpl/form_fileupload.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('angularFileUpload').then(
                                    function () {
                                        return $ocLazyLoad.load('js/controllers/file-upload.js');
                                    }
                                );
                            }]
                    }
                })
                .state('app.form.imagecrop', {
                    url: '/imagecrop',
                    templateUrl: 'tpl/form_imagecrop.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('ngImgCrop').then(
                                    function () {
                                        return $ocLazyLoad.load('js/controllers/imgcrop.js');
                                    }
                                );
                            }]
                    }
                })
                .state('app.form.select', {
                    url: '/select',
                    templateUrl: 'tpl/form_select.html',
                    controller: 'SelectCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('ui.select').then(
                                    function () {
                                        return $ocLazyLoad.load('js/controllers/select.js');
                                    }
                                );
                            }]
                    }
                })
                .state('app.form.slider', {
                    url: '/slider',
                    templateUrl: 'tpl/form_slider.html',
                    controller: 'SliderCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('vr.directives.slider').then(
                                    function () {
                                        return $ocLazyLoad.load('js/controllers/slider.js');
                                    }
                                );
                            }]
                    }
                })
                .state('app.form.editor', {
                    url: '/editor',
                    templateUrl: 'tpl/form_editor.html',
                    controller: 'EditorCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('textAngular').then(
                                    function () {
                                        return $ocLazyLoad.load('js/controllers/editor.js');
                                    }
                                );
                            }]
                    }
                })
                // pages
                .state('app.page', {
                    url: '/page',
                    template: '<div ui-view class="fade-in-down"></div>'
                })
                .state('app.page.profile', {
                    url: '/profile',
                    templateUrl: 'tpl/page_profile.html'
                })
                .state('app.page.post', {
                    url: '/post',
                    templateUrl: 'tpl/page_post.html'
                })
                .state('app.page.search', {
                    url: '/search',
                    templateUrl: 'tpl/page_search.html'
                })
                .state('app.page.invoice', {
                    url: '/invoice',
                    templateUrl: 'tpl/page_invoice.html'
                })
                .state('app.page.price', {
                    url: '/price',
                    templateUrl: 'tpl/page_price.html'
                })
                .state('app.docs', {
                    url: '/docs',
                    templateUrl: 'tpl/docs.html'
                })
                // others
                .state('lockme', {
                    url: '/lockme',
                    templateUrl: 'tpl/page_lockme.html'
                })
                .state('access', {
                    url: '/access',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('access.signin', {
                    url: '/signin',
                    templateUrl: 'tpl/page_signin.html',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/signin.js']);
                            }]
                    }
                })
                .state('access.logout', {
                    url: '/logout',
                    templateUrl: 'tpl/page_signin.html',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/logout.js']);
                            }]
                    }
                })
                .state('access.signup', {
                    url: '/signup',
                    templateUrl: 'tpl/page_signup.html',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/signup.js']);
                            }]
                    }
                })
                .state('access.forgotpwd', {
                    url: '/forgotpwd',
                    templateUrl: 'tpl/page_forgotpwd.html'
                })
                .state('access.404', {
                    url: '/404',
                    templateUrl: 'tpl/page_404.html'
                })
                // fullCalendar
                .state('app.calendar', {
                    url: '/calendar',
                    templateUrl: 'tpl/app_calendar.html',
                    // use resolve to load other dependences
                    resolve: {
                        deps: ['$ocLazyLoad', 'uiLoad',
                            function ($ocLazyLoad, uiLoad) {
                                return uiLoad.load(
                                    ['vendor/jquery/fullcalendar/fullcalendar.css',
                                        'vendor/jquery/fullcalendar/theme.css',
                                        'vendor/jquery/jquery-ui-1.10.3.custom.min.js',
                                        'vendor/libs/moment.min.js',
                                        'vendor/jquery/fullcalendar/fullcalendar.min.js',
                                        'js/app/calendar/calendar.js']
                                ).then(
                                    function () {
                                        return $ocLazyLoad.load('ui.calendar');
                                    }
                                )
                            }]
                    }
                })

                // mail
                .state('app.mail', {
                    abstract: true,
                    url: '/mail',
                    templateUrl: 'tpl/mail.html',
                    // use resolve to load other dependences
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/app/mail/mail.js',
                                    'js/app/mail/mail-service.js',
                                    'vendor/libs/moment.min.js']);
                            }]
                    }
                })
                .state('app.mail.list', {
                    url: '/inbox/{fold}',
                    templateUrl: 'tpl/mail.list.html'
                })
                .state('app.mail.detail', {
                    url: '/{mailId:[0-9]{1,4}}',
                    templateUrl: 'tpl/mail.detail.html'
                })
                .state('app.mail.compose', {
                    url: '/compose',
                    templateUrl: 'tpl/mail.new.html'
                })

                .state('layout', {
                    abstract: true,
                    url: '/layout',
                    templateUrl: 'tpl/layout.html'
                })
                .state('layout.fullwidth', {
                    url: '/fullwidth',
                    views: {
                        '': {
                            templateUrl: 'tpl/layout_fullwidth.html'
                        },
                        'footer': {
                            templateUrl: 'tpl/layout_footer_fullwidth.html'
                        }
                    },
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/vectormap.js']);
                            }]
                    }
                })
                .state('layout.mobile', {
                    url: '/mobile',
                    views: {
                        '': {
                            templateUrl: 'tpl/layout_mobile.html'
                        },
                        'footer': {
                            templateUrl: 'tpl/layout_footer_mobile.html'
                        }
                    }
                })
                .state('layout.app', {
                    url: '/app',
                    views: {
                        '': {
                            templateUrl: 'tpl/layout_app.html'
                        },
                        'footer': {
                            templateUrl: 'tpl/layout_footer_fullwidth.html'
                        }
                    },
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/tab.js']);
                            }]
                    }
                })
                .state('apps', {
                    abstract: true,
                    url: '/apps',
                    templateUrl: 'tpl/layout.html'
                })
                .state('apps.note', {
                    url: '/note',
                    templateUrl: 'tpl/apps_note.html',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/app/note/note.js',
                                    'vendor/libs/moment.min.js']);
                            }]
                    }
                })
                .state('apps.contact', {
                    url: '/contact',
                    templateUrl: 'tpl/apps_contact.html',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/app/contact/contact.js']);
                            }]
                    }
                })
                .state('app.weather', {
                    url: '/weather',
                    templateUrl: 'tpl/apps_weather.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(
                                    {
                                        name: 'angular-skycons',
                                        files: ['js/app/weather/skycons.js',
                                            'vendor/libs/moment.min.js',
                                            'js/app/weather/angular-skycons.js',
                                            'js/app/weather/ctrl.js']
                                    }
                                );
                            }]
                    }
                })
                .state('music', {
                    url: '/music',
                    templateUrl: 'tpl/music.html',
                    controller: 'MusicCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'com.2fdevs.videogular',
                                    'com.2fdevs.videogular.plugins.controls',
                                    'com.2fdevs.videogular.plugins.overlayplay',
                                    'com.2fdevs.videogular.plugins.poster',
                                    'com.2fdevs.videogular.plugins.buffering',
                                    'js/app/music/ctrl.js',
                                    'js/app/music/theme.css'
                                ]);
                            }]
                    }
                })

            $httpProvider.interceptors.push(fbInterceptor);
            $resourceProvider.defaults.stripTrailingSlashes = true;
        }
    ]
);