'use strict';

/* Controllers */

angular.module('app')
    .controller('AppCtrl', ['$rootScope', '$scope', '$translate', '$localStorage', '$window', '$http', '$timeout',
        function ($rootScope, $scope, $translate, $localStorage, $window, $http, $timeout) {

            /* $http.get('js/app/nav/nav.json').then(function(resp) {
             $scope.navs = resp.data.navs;
             $scope.nav = $scope.navs[0];
             });*/
            // add 'ie' classes to html
            var isIE = !!navigator.userAgent.match(/MSIE/i);
            isIE && angular.element($window.document.body).addClass('ie');
            isSmartDevice($window) && angular.element($window.document.body).addClass('smart');
            $scope.productNavbar = false;
            // config
            $scope.app = {
                name: 'WOCLOUD沃云',
                version: '1.0.0',
                // for chart colors
                color: {
                    primary: '#7266ba',
                    info: '#23b7e5',
                    success: '#27c24c',
                    warning: '#fad733',
                    danger: '#f05050',
                    light: '#e8eff0',
                    dark: '#3a3f51',
                    black: '#1c2b36'
                },
                settings: {
                    themeID: 1,
                    navbarHeaderColor: 'bg-black',
                    navbarCollapseColor: 'bg-black',
                    asideColor: 'bg-black',
                    headerFixed: true,
                    asideFixed: true,
                    asideFolded: false,
                    asideDock: false,
                    container: false
                }
            }
            $scope.apphaveArray = true;
            $scope.dianji = true;
            // save settings to local storage
            if (angular.isDefined($localStorage.settings)) {
                //$scope.app.settings = $localStorage.settings;
            } else {
                $localStorage.settings = $scope.app.settings;
            }
            $scope.$watch('app.settings', function () {
                if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
                    // aside dock and fixed must set the header fixed.
                    $scope.app.settings.headerFixed = true;
                }
                // save to local storage
                $localStorage.settings = $scope.app.settings;
            }, true);
            /*User.getUserInfo().then(function (userInfo) {
                $scope.userInfo = userInfo;
                var params = {
                    userName: userInfo.userName
                };
                /!*            User.getLoginUserInfo(params).then(function(loginUserInfo){
                 var par={
                 userName:loginUserInfo.userName
                 }*!/
                User.getUserMenu(params).then(function (userMenu) {
                    $scope.userMenu = [];
                    angular.forEach(userMenu.result, function (a, b, c) {
                        if (a.parentIds.split(',').length == 4) {
                            $scope.userMenu.push(a);
                        }
                    });
                    angular.forEach($scope.userMenu, function (d, e, f) {
                        d.node = [];
                        angular.forEach(userMenu.result, function (a, b, c) {
                            if (a.parentId == d.id) {
                                d.node.push(a);
                            }
                        });
                    });
                });
                /!*            });*!/

            });*/
            //获取所有资源池
            /*User.getAllPool().then(function (res) {
                if(res.data&&res.data.length>0){
                    $rootScope.poolNotLevelList = res.data;
                }
            });
            //获取所有可用域
            User.getAllAZ().then(function(res){
                if(res.data&&res.data.length>0) {
                    $rootScope.azAllList = res.data;
                }
            });*/
            // angular translate
            $scope.lang = {isopen: false};
//            $scope.langs = {zh: '中文', en: 'English'};
            $scope.langs = {zh: '中文'};
            $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "中文";
            $translate.use('zh');
            $scope.setLang = function (langKey, $event) {
                // set the current lang
                $scope.selectLang = $scope.langs[langKey];
                // You can change the language during runtime
                $translate.use(langKey);
                $scope.lang.isopen = !$scope.lang.isopen;
            };
            ///////////////////////////////////////////////
            //获取所有资源池
            /*User.getAllPool().then(function (res) {
                if(res.data&&res.data.length>0){
                    $rootScope.poolNotLevelList = res.data;
                }
            });
            //获取所有可用域
            User.getAllAZ().then(function(res){
                if(res.data&&res.data.length>0) {
                    $rootScope.azAllList = res.data;
                }
            });*/
            $scope.userMenu = [];
            $scope.subUserMenu = [];
            $scope.buttonList = [];
            /*User.getUserInfo().then(function (userInfo) {
                $scope.userInfo = userInfo;
                var params = {
                    userName: userInfo.userName
                };
                User.getUserMenu(params).then(function (userMenu) {

                    angular.forEach(userMenu.result, function (a, b, c) {
                        if (a.parentIds.split(',').length == 4) {
                            $scope.userMenu.push(a);
                        }
                        //遍历出三级菜单
                        if (a.permission == 'menu') {
                            a.title = a.name;
                            a.content = a.name;
                            a.active = false;
                            var tempArray = a.href.split('/');
                            angular.forEach(tempArray, function (data, index) {
                                if (data == "app") {
                                    a.name = data + '.' + tempArray[index + 1];
                                    a.url = '#/' + data + '/' + tempArray[index + 1];
                                }
                            });
                            $scope.app.settings.asideFolded = true;
                            $scope.subUserMenu.push(a);
                        } else if (a.permission == 'button') {
                            //遍历二级菜单的按钮
                            var tempArray1 = [];
                            angular.forEach(userMenu.result, function (d, b, c) {
                                if (a.parentId == d.id) {
                                    tempArray1 = d.href.split('/');
                                }
                            });
                            angular.forEach(tempArray1, function (data, index) {
                                if (data == "app") {
                                    a.topName = data + '.' + tempArray1[index + 1];
                                    a.topUrl = '#/' + data + '/' + tempArray1[index + 1];
                                }
                            });
                            $scope.buttonList.push(a);
                        }
                    });
                    angular.forEach($scope.userMenu, function (d, e, f) {
                        d.node = [];
                        angular.forEach(userMenu.result, function (a, b, c) {
                            if (a.parentId == d.id) {
                                d.node.push(a);
                            }
                        });
                    });
                    //获取当前路径，遍历按钮
                    var currentUrl = window.location.hash;
                    $rootScope.currentButton = [];
                    angular.forEach($scope.buttonList, function (data, index) {
                        if (currentUrl == data.topUrl) {
                            $rootScope.currentButton.push(data);
                        }
                    });
                    //if ($rootScope.currentButton.length != 0) {
                        localStorage.removeItem("currentButton");
                        localStorage.setItem("currentButton", JSON.stringify($rootScope.currentButton));
                    //}

                    ///end
                    $scope.hash = window.location.hash;
                    angular.forEach($scope.subUserMenu, function (a, b, c) {
                        var tempSubId = "";
                        var tempHref=a.href;
                        if (tempHref.indexOf($scope.hash)!=-1) {
                            tempSubId = a.parentId;
                            a.active = true;
                            $rootScope.asideFolded = true;
                            $rootScope.haveArray = true;
                            $rootScope.tabs = [];
                            angular.forEach($scope.subUserMenu, function (a1, b1, c1) {
                                if (a1.parentId == tempSubId) {
                                    $rootScope.tabs.push(a1);
                                }
                            });
                        }
                    });
                });
            });*/
            //三级菜单
            $rootScope.subUserMenu = $scope.subUserMenu;
            //按钮
            $rootScope.buttonList = $scope.buttonList;
            /////////////////////////////////////////////////
/*            $scope.hash = window.location.hash;
            $scope.logicalResourceTabs = [
                {index: 1, title: '资源池', content: '资源池', url: '#/app/datacenter', name: "app.ui-datacenter"},
                {index: 2, title: '可用域', content: '可用域', url: '#/app/def_pool_az', name: "app.def_pool_az"}
                 {index: 3, title: '集中存储容量', content: '集中存储容量', url: '#/app/centralized_storage_capacity', name: "app.centralized_storage_capacity"}
                 ];

            $scope.softResourceTabs = [
                {index: 1, title: '操作系统', content: '操作系统', url: '#/app/operate_system', name: "app.operate_system"},
                {index: 2, title: '系统镜像', content: '系统镜像', url: '#/app/system_mirror', name: "app.ui-system-mirror"},
                {index: 3, title: '驱动列表', content: '驱动列表', url: '#/app/drive', name: "app.drive"},
                {index: 4, title: '内核管理', content: '内核管理', url: '#/app/kernel', name: "app.kernel"}
            ];

            $scope.basicResourceTabs = [
                {index: 1, title: '机房', content: '机房', url: '#/app/room', name: "app.room"},
                {index: 2, title: '机架', content: '机架', url: '#/app/cabinet', name: "app.cabinet"},
                {index: 3, title: '物理机', content: '物理机', url: '#/app/phy_node', name: "app.ui-phy-node"},
                {index: 4, title: '网络设备', content: '网络设备', url: '#/app/network-eq-management', name: "app.ui-network-eq-management"},
                {index: 5, title: '网卡管理', content: '网卡管理', url: '#/app/network_card_management', name: "app.network_card_management"},
                {index: 6, title: '链路', content: '链路', url: '#/app/asset_manage', name: "app.ui-asset-manage"},
                {index: 7, title: '网络出口', content: '网络出口', url: '#/app/network_export', name: "app.network_export"},
                {index: 8, title: '公网IP', content: '公网IP', url: '#/app/public_ip', name: "app.ui-public-ip"},
               /!* {index: 9, title: 'vps网络', content: 'vps网络', url: '#/app/vps', name: "app.vps"},
                {index: 10, title: '桌面云网络', content: '桌面云网络', url: '#/app/deskTopCloudNet', name: "app.deskTopCloudNet"}*!/
            ];
            $scope.resourceMonitorTabs = [
                {
                    index: 1,
                    title: '物理机监控',
                    content: '物理机监控',
                    url: '#/app/physical_monitor',
                    name: "app.physical_monitor"
                },
                {index: 2, title: '存储监控', content: '存储监控', url: '#/app/storage_monitor', name: "app.storage_monitor"},
                {index: 3, title: '交换机监控', content: '交换机监控', url: '#/app/switch_board', name: "app.switch_board"}
            ];
            $scope.serviceMonitorTabs = [
                {index: 1, title: '支撑服务', content: '支撑服务', url: '#app/dubbo_monitor', name: "app.dubbo_monitor"},
                {index: 2, title: '能力服务', content: '能力服务', url: '#/app/serverNeutron', name: "app.serverNeutron"}
            ];
            $scope.vmTabs = [
                /!* {index: 1, title: '概览', content: '概览', url: '#/app/vmView',name:"app.vmView"},*!/
                {
                    index: 2, title: '实例', content: '实例', url: '#/app/vminstance', name: "app.ui-vminstance", node: [
                    {index: 1, title: '创建', content: '创建', url: '#/app/vmCreate', name: "app.vmCreate"},
                    {index: 2, title: '详情', content: '详情', url: '#/app/vminfo', name: "app.vminfo"}
                ]
                },
                {index: 3, title: '镜像', content: '镜像', url: '#/app/image', name: "app.image"},
                {
                    index: 4, title: '安全组', content: '安全组', url: '#/app/sg', name: "app.ui-sg", node: [
                    {index: 1, title: '创建', content: '创建', url: '#/app/sgCreate', name: "app.sgCreate"},
                    {index: 2, title: '详情', content: '详情', url: '#/app/sgInfo', name: "app.sgInfo"}
                ]
                },
                {index: 5, title: '快照', content: '快照', url: '#/app/snapshot', name: "app.snapshot"}
            ];
            $scope.ebsTabs = [
                /!*{index: 1, title: '概览', content: '概览', url: '#/app/ebsOverview',name:"app.ebsOverview"},*!/
                {
                    index: 2, title: '实例', content: '实例', url: '#/app/ebs', name: "app.ebs", node: [
                    {index: 1, title: '详情', content: '详情', url: '#/app/ebsDetail', name: "app.ebsDetail"},
                    {index: 2, title: '快照', content: '快照', url: '#/app/ebsSnapshot', name: "app.ebsSnapshot"}
                ]
                }
            ];
            $scope.vpcTabs = [
                /!*{index: 1, title: '概览', content: '概览', url: '#/app/vpcOverview',name:"app.vpcOverview"},*!/
                {
                    index: 2, title: '实例', content: '实例', url: '#/app/vpc', name: "app.vpc", node: [
                    {index: 1, title: '路由器', content: '路由器', url: '#/app/vpc/router', name: "app.vpc.router"},
                    {index: 2, title: '私有网络', content: '私有网络', url: '#/app/vpc/privateNet', name: "app.vpc.privateNet"},
                    {index: 3, title: '路由器详情', content: '路由器详情', url: '#/app/routerDetail', name: "app.routerDetail"},
                    {
                        index: 4,
                        title: '私有网络详情',
                        content: '私有网络详情',
                        url: '#/app/privateNetDetail',
                        name: "app.privateNetDetail"
                    },
                    {index: 4, title: '路由拓扑', content: '路由拓扑', url: '#/app/topoView', name: "app.topoView"}
                ]
                }
            ];
            $scope.networkTabs = [
                /!* {index: 1, title: '概览', content: '概览', url: '#/app/nicView',name:"app.nicView"},*!/
                {
                    index: 2,
                    title: '实例',
                    content: '实例',
                    url: '#/app/network_instance',
                    name: "app.network_instance",
                    node: [
                        {index: 1, title: '详情', content: '详情', url: '#/app/nicinfo', name: "app.nicinfo"},
                        {index: 2, title: '创建', content: '创建', url: '#/app/nicCreate', name: "app.nicCreate"}
                    ]
                }
            ];
            $scope.lbsTabs = [
                /!* {index: 1, title: '概览', content: '概览', url: '#/app/load_balance_view',name:"app.ui-load-balance-view"},*!/
                {
                    index: 2,
                    title: '实例',
                    content: '实例',
                    url: '#/app/load_balance',
                    name: "app.ui-load-balance",
                    node: [
                        {
                            index: 1,
                            title: '创建',
                            content: '创建',
                            url: '#/app/load_balance_info',
                            name: "app.ui-load-balance-info"
                        },
                        {
                            index: 2,
                            title: '详情',
                            content: '详情',
                            url: '#/app/load_balance_info',
                            name: "app.ui-load-balance-info"
                        }
                    ]
                }
            ];
            $scope.cacheTabs = [
                /!*{index: 1, title: '概览', content: '概览', url: '#/app/cache_view',name:"app.ui-cache-view"},*!/
                {
                    index: 2, title: '实例', content: '实例', url: '#/app/cache', name: "app.ui-cache", node: [
                    {index: 1, title: '详情', content: '详情', url: '#/app/cache_info', name: "app.ui-cache-info"},
                    {index: 2, title: '详情', content: '详情', url: '#/app/cachegroup_info', name: "app.ui-cachegroup-info"}
                ]
                }
            ];
            $scope.networkAccessTabs = [
                /!*{index: 1, title: '概览', content: '概览', url: '#/app/ui_network_access',name:"app.ui_network_access"},*!/
                {
                    index: 2,
                    title: '实例',
                    content: '实例',
                    url: '#/app/network_access',
                    name: "app.network_access",
                    node: [
                        {
                            index: 1,
                            title: '详情',
                            content: '详情',
                            url: '#/app/network_access_info',
                            name: "app.network_access_info"
                        }

                    ]
                }
            ];
            $scope.rdsTabs = [
                /!*{index: 1, title: '概览', content: '概览', url: '#/app/rds_view',name:"app.ui-rds-view"},*!/
                {
                    index: 2, title: '实例', content: '实例', url: '#/app/rds', name: "app.ui-rds", node: [
                    {index: 1, title: '创建', content: '创建', url: '#/app/rds_create', name: "app.ui-rds-create"},
                    {index: 2, title: '详情', content: '详情', url: '#/app/rds_info', name: "app.ui-rds-info"}

                ]
                }
            ];
            $scope.listReportTabs = [
                {index: 1, title: '性能清单', content: '性能清单', url: '#/app/perfList', name: "app.perfList"},
                {index: 2, title: '业务清单', content: '业务清单', url: '#/app/busList', name: "app.busList"}
            ];
            $scope.volumeReportTabs = [
                {index: 1, title: '容量统计', content: '容量统计', url: '#/app/volume_report', name: "app.volume_report"},
                {index: 2, title: '告警统计', content: '告警统计', url: '#/app/alarm_report', name: "app.alarm_report"},
                {index: 3, title: '工单统计', content: '工单统计', url: '#/app/order_report', name: "app.order_report"},
                {index: 4, title: '性能统计', content: '性能统计', url: '#/app/performanceStat', name: "app.performanceStat"},
                //{}
            ];
            angular.forEach($scope.logicalResourceTabs, function (tab, index, array) {
                if (tab.url == $scope.hash) {
                    tab.active = true;
                    $scope.app.settings.asideFolded = true;
                }
            });
            angular.forEach($scope.vmTabs, function (tab, index, array) {
                if (tab.url == $scope.hash) {
                    tab.active = true;
                    $scope.app.settings.asideFolded = true;
                }
            });
            angular.forEach($scope.networkTabs, function (tab, index, array) {
                if (tab.url == $scope.hash) {
                    tab.active = true;
                    $scope.app.settings.asideFolded = true;
                }
            });
            angular.forEach($scope.basicResourceTabs, function (tab, index, array) {
                if (tab.url == $scope.hash) {
                    tab.active = true;
                    $scope.app.settings.asideFolded = true;
                }
            });
            angular.forEach($scope.softResourceTabs, function (tab, index, array) {
                if (tab.url == $scope.hash) {
                    tab.active = true;
                    $scope.app.settings.asideFolded = true;
                }
            });
            angular.forEach($scope.resourceMonitorTabs, function (tab, index, array) {
                if (tab.url == $scope.hash) {
                    tab.active = true;
                    $scope.app.settings.asideFolded = true;
                }
            });
            angular.forEach($scope.serviceMonitorTabs, function (tab, index, array) {
                if (tab.url == $scope.hash) {
                    tab.active = true;
                    $scope.app.settings.asideFolded = true;
                }
            });
            angular.forEach($scope.ebsTabs, function (tab, index, array) {
                if (tab.url == $scope.hash) {
                    tab.active = true;
                    $scope.app.settings.asideFolded = true;
                }
            });
            angular.forEach($scope.vpcTabs, function (tab, index, array) {
                if (tab.url == $scope.hash) {
                    tab.active = true;
                    $scope.app.settings.asideFolded = true;
                }
            });
            angular.forEach($scope.lbsTabs, function (tab, index, array) {
                if (tab.url == $scope.hash) {
                    tab.active = true;
                    $scope.app.settings.asideFolded = true;
                }
            });
            angular.forEach($scope.cacheTabs, function (tab, index, array) {
                if (tab.url == $scope.hash) {
                    tab.active = true;
                    $scope.app.settings.asideFolded = true;
                }
            });
            angular.forEach($scope.networkAccessTabs, function (tab, index, array) {
                if (tab.url == $scope.hash) {
                    tab.active = true;
                    $scope.app.settings.asideFolded = true;
                }
            });
            angular.forEach($scope.rdsTabs, function (tab, index, array) {
                if (tab.url == $scope.hash) {
                    tab.active = true;
                    $scope.app.settings.asideFolded = true;
                }
            });
            angular.forEach($scope.listReportTabs,function(tab, index, array){
                if (tab.url == $scope.hash) {
                    tab.active = true;
                    $scope.app.settings.asideFolded = true;
                }
            });
            angular.forEach($scope.volumeReportTabs,function(tab, index, array){
                if (tab.url == $scope.hash) {
                    tab.active = true;
                    $scope.app.settings.asideFolded = true;
                }
            });
            $rootScope.logicalResourceTabs = $scope.logicalResourceTabs;
            $rootScope.vmTabs = $scope.vmTabs;
            $rootScope.softResourceTabs = $scope.softResourceTabs;
            $rootScope.basicResourceTabs = $scope.basicResourceTabs;
            $rootScope.resourceMonitorTabs = $scope.resourceMonitorTabs;
            $rootScope.serviceMonitorTabs = $scope.serviceMonitorTabs;
            $rootScope.networkTabs = $scope.networkTabs;
            $rootScope.ebsTabs = $scope.ebsTabs;
            $rootScope.vpcTabs = $scope.vpcTabs;
            $rootScope.lbsTabs = $scope.lbsTabs;
            $rootScope.cacheTabs = $scope.cacheTabs;
            $rootScope.networkAccessTabs = $scope.networkAccessTabs;
            $rootScope.rdsTabs = $scope.rdsTabs;
            $rootScope.listReportTabs=$scope.listReportTabs;
            $rootScope.volumeReportTabs=$scope.volumeReportTabs;*/
            $scope.app.treeNav = {};
            $scope.tabChange = function (tab) {
                window.location.href = tab.url;
                $scope.app.settings.asideFolded = true;
            };
            $rootScope.$watch("asideFolded", function (a, b, c) {
                if (a != undefined) {
                    $scope.app.settings.asideFolded = a;
                }
            });
            $scope.apparray = "viewFramework-product-navbar-collapse";
            $scope.apparray_node = "product-navbar-collapse-bg";
            $scope.apparray_in = "product-navbar-collapse-inner";
            $scope.app_content_body = "";
            $scope.$watch("app.settings.asideFolded", function (a, b, c) {//-----------------------
                //lb_fan controlStyles.indentShow()
                controlStyles.indentShow();
                //lb_fan --end
                //不隐藏
                if (a == false && $rootScope.haveArray) {
                    $scope.dianji = true;
                    $scope.app.treeNav.header = "three_nav_header1";
                    $scope.app.treeNav.header = "three_nav_header";
                    if ($scope.app.treeNav.app == "") {

                    } else {
                        $scope.app.treeNav.app = "three_nav_app1";
                    }
                    $scope.app.treeNav.nav = "three_nav_nav3";
                    $scope.app.treeNav.nav1 = "three_nav_nav2";
                    $scope.app.treeNav.nav2 = "three_nav_nav2";
                    if ($scope.apphaveArray == true) {
                        $scope.apparray = "viewFramework-product-navbar-collapse-four";
                    }
                    if ($scope.apphaveArray == false) {
                        $scope.apparray = "viewFramework-product-navbar-collapse-three";
                        $scope.app.treeNav.app = "";
                        $scope.app.treeNav.nav = "";
                    }
                    if ($scope.app_content_body == "") {
                        $scope.app_content_body = "little-panel-default";
                    } else {
                        $scope.app_content_body == "";
                    }
                }
                //隐藏有三级单
                if (a && $rootScope.haveArray) {
                    $scope.dianji = false;
                    $scope.app.treeNav.header = "three_nav_header";
                    $scope.app.treeNav.nav = "three_nav_nav";
                    $scope.app.treeNav.nav1 = "three_nav_nav1";
                    $scope.app.treeNav.nav2 = "three_nav_nav2";
                    if ($scope.app.treeNav.app == "") {

                    } else {
                        $scope.app.treeNav.app = "three_nav_app";
                    }
                    if ($scope.apphaveArray) {
                        $scope.apparray = "viewFramework-product-navbar-collapse";
                    }
                    if ($scope.apphaveArray == false) {
                        $scope.app.treeNav.nav = "";
                        $scope.apparray = "viewFramework-product-navbar-collapse-two";
                    }
                    //lb_fan
                    controlStyles.threeLevelMenu();
                    controlStyles.ReachHide();//隐藏菜单
                    //lb_fan --end
                    $scope.dianji = false;
                    if ($scope.app_content_body == "little-panel-default") {
                        $scope.app_content_body = "";
                    }
                }
                //隐藏
                if (a && $rootScope.haveArray == false) {
                    $scope.dianji = false;
                    $scope.app.treeNav.header = "";
                    $scope.app.treeNav.app = "";
                    $scope.app.treeNav.nav = "";
                    $scope.app.treeNav.nav1 = "";
                    $scope.app.treeNav.nav2 = "";
                    if ($scope.apphaveArray == false) {
                        $scope.apparray = "viewFramework-product-navbar-collapse-two";
                    }
                    //lb_fan  controlStyles.ReachHide()
                    controlStyles.ReachHide();
                    //lb_fan --end

                    if ($scope.app_content_body == "little-panel-default") {
                        $scope.app_content_body = "";
                    }
                }
                $rootScope.asideFolded = $scope.app.settings.asideFolded;
            })
            $scope.apphaveArray_i = false;
            $scope.collapseProductNavbar = function (item) {
                $scope.apphaveArray = !$scope.apphaveArray;
                $scope.apphaveArray_i = !$scope.apphaveArray_i;
                if ($scope.apphaveArray == true) {
                    $scope.apparray = "viewFramework-product-navbar-collapse";
                    $scope.apparray_node = "product-navbar-collapse-bg";
                    $scope.apparray_in = "product-navbar-collapse-inner";
                    if ($scope.app.settings.asideFolded == false) {
                        $scope.app.treeNav.app = "three_nav_app1";
                        $scope.apparray = "viewFramework-product-navbar-collapse-four";
                        $scope.app.treeNav.nav = "three_nav_nav3";
                    } else {
                        $scope.app.treeNav.app = "three_nav_app";
                        $scope.app.treeNav.nav = "three_nav_nav";
                    }
                } else {
                    $scope.apparray = "viewFramework-product-navbar-collapse-two";
                    $scope.apparray_node = "product-navbar-collapse-bg-two";
                    $scope.apparray_in = "product-navbar-collapse-inner";
                    if ($scope.app.settings.asideFolded == false) {
                        $scope.app.treeNav.app = "";
                        $scope.apparray = "viewFramework-product-navbar-collapse-three";
                        $scope.app.treeNav.nav = "";
                    } else {
                        $scope.app.treeNav.app = "three_nav_app_noarray";
                        $scope.app.treeNav.nav = "";
                    }
                }

            };
            $rootScope.$watch('haveArray', function (a, b, c) {
                if ($scope.app_content_body == "little-panel-default") {
                    $scope.app_content_body = "";
                }
                if ($rootScope.asideFolded && a) {

                    $scope.app.treeNav.header = "three_nav_header";
                    $scope.app.treeNav.app = "three_nav_app";
                    $scope.app.treeNav.nav = "three_nav_nav";
                    $scope.app.treeNav.nav1 = "three_nav_nav1";
                    $scope.app.treeNav.nav2 = "three_nav_nav2";
                    //$timeout(function(){
                    controlStyles.threeLevelMenu();
                    controlStyles.ReachHide();
                    // },2000);
                    $scope.dianji = false;

                }
                $scope.haveArray = a;
                if ($scope.apphaveArray == false) {
                    $scope.apparray = "viewFramework-product-navbar-collapse";
                }
                if (a == false) {
                    $scope.app.treeNav.header = "";
                    $scope.app.treeNav.app = "";
                    $scope.app.treeNav.nav = "";
                    $scope.app.treeNav.nav1 = "";
                    $scope.app.treeNav.nav2 = "";
                    $scope.apparray = "viewFramework-product-navbar-collapse";
                    $scope.apparray_node = "product-navbar-collapse-bg";
                    $scope.apparray_in = "product-navbar-collapse-inner";
                }
            });
            $rootScope.$watch('tabs', function (a, b, c) {
                $scope.tabs = a;
            });
            $scope.addbutton = function (index) {
                if ($scope.activeOne != index) {
                    $scope.activeOne = index;
                } else {
                    $scope.activeOne = 1000;
                }
            }
            function isSmartDevice($window) {
                // Adapted from http://www.detectmobilebrowsers.com
                var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
                // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
            }
        }]);
var controlStyles = {
    indentShow: function () {
        $(".swicthBtn").find("ul").attr("style", "position:static;");
        $(".swicthBtn").find("ul").attr("style", "position:static;width:100%;");
        $(".swicthBtn .dk").attr("style", "position:static;width:100%;");
        //  显示时箭头方向及文字隐藏
        controlStyles.showIconText();
        $(".swicthBtn a[class='auto']").unbind("mouseover");
        $(".swicthBtn li").not("li:first-child").unbind("mouseout");
        $(".swicthBtn .dk li").unbind("mouseover");
        $(".swicthBtn .dk li a").unbind("mouseout");
    },
    ReachHide: function () {
        $(".navi ul.nav li").attr("style", "position:static;");
        $(".swicthBtn").find("ul").attr("style", "position:static;width:100%;");
        $(".swicthBtn .dk").attr("style", "position:static;width:100%;");
        //  隐藏时箭头方向及文字隐藏
        controlStyles.hideIconText();
        //  鼠标移入移出事件 -- 一级菜单
        $(".swicthBtn a[class='auto']").unbind("mouseover").bind("mouseover", function () {
            controlStyles.mouseOver(this);
        });
        $(".swicthBtn li").not("li:first-child").unbind("mouseout").bind("mouseout", function () {
            controlStyles.mouseOut(this);
        });
        //  鼠标移入移出事件 -- 二级菜单
        $(".swicthBtn .dk li").unbind("mouseover").bind("mouseover", function () {
            controlStyles.mouseOver(this);
        });
        $(".swicthBtn .dk li a").unbind("mouseout").bind("mouseout", function () {
            controlStyles.mouseOut(this);
        });
    },
    //三级菜单
    threeLevelMenu: function () {
        $(".swicthBtn").find("ul").attr("style", "position:static;width:47px;");
        controlStyles.hideIconText();
        //  鼠标移入移出事件 -- 一级菜单
        $(".swicthBtn a[class='auto']").unbind("mouseover").bind("mouseover", function () {
            controlStyles.mouseOver(this);
        });
        $(".swicthBtn li").not("li:first-child").unbind("mouseout").bind("mouseout", function () {
            controlStyles.mouseOut(this);
        });
        //  鼠标移入移出事件 -- 二级菜单
        $(".swicthBtn .dk li").unbind("mouseover").bind("mouseover", function () {
            controlStyles.mouseOver(this);
        });
        $(".swicthBtn li a").unbind("mouseout").bind("mouseout", function () {
            controlStyles.mouseOut(this);
        });
        $(".swicthBtn .dk li a").unbind("mouseout").bind("mouseout", function () {
            controlStyles.mouseOut(this);
        });
        console.log("threeLevelMenu")
    },
    //  显示时箭头方向及文字隐藏
    showIconText: function () {
        var str = '<i class="fa fa-fw fa-angle-right text"></i>'
            + '<i class="fa fa-fw fa-angle-down text-active"></i>';
        $(".swicthBtn .pull-left").html(str);
        $(".swicthBtn .dk a span").removeClass("hidden").addClass("show");
    },
    //  隐藏时箭头方向及文字隐藏
    hideIconText: function () {
        var str = '<i class="fa fa-fw fa-angle-right"></i>';
        $(".swicthBtn .pull-left").html(str);
        $(".swicthBtn .dk a span").removeClass("show").addClass("hidden");
    },
    remove: function () {
        if ($("#divBox").length > 0) {
            $("#divBox").remove();
            controlStyles.remove();
        } else {
            return;
        }
    },
    //  鼠标移入移出事件
    mouseOver: function (thisBtn) {

        controlStyles.remove();
        var $btn = $(thisBtn);
        var thisTop = $btn.offset().top;
        var textCon = $btn.text();
        if (textCon.length == "14") {
            textCon = "&nbsp;&nbsp;&nbsp;" + textCon + "&nbsp;&nbsp;&nbsp;";
        }
        var divBox = '<div'
            + ' id="divBox" style="color:#fff;font-weight:bold;font-size:15px;background: rgba(34,85,144,.6);position:absolute;top:' + thisTop + 'px;left:70px;z-index:999999;padding:10px;">'
            + textCon + '</div>';
        $("body").append(divBox);
    },
    mouseOut: function () {
        controlStyles.remove();
    },
//  点击首页
    clickHomePage: function () {
        $(".swicthBtn .nav-first_").unbind("click").bind("click", function () {
            var naviWrap = $(".navi-wrap").width();
            console.log(naviWrap)
            //if(){}
        })
    }
}

