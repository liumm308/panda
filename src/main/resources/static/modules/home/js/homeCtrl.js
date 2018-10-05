'use strict';

app.controller('homeCtrl',homeCtrl);
homeCtrl.$inject = ['$scope','$modal','$log','$timeout','$state','i18nService','service.RES','CacheService','ngDialog','$stateParams'];
function homeCtrl($scope,$modal,$log,$timeout,$state,i18nService,serviceRES,CacheService,ngDialog,$stateParams){

    i18nService.setCurrentLang("zh-cn");

    /**
     * 获取用户信息
     * @author duweiwei
     * @method getUserInfo
     * @param  noParam
     * @return
     * @date   2018-4-28
     */
    $.post('./getUserInfo')
        .then(function (result) {
            CacheService.setObject('loginInfo',result);
            getMyUndo();
            getMyCreate();

        });

    /**
     * 获取所有云平台所有云厂商
     * @author duweiwei
     * @method queryCloudFactory
     * @param  noParam
     * @return
     * @date   2018-4-28
     */
    var cloudsName = [];
    var queryCloudFactory = function(){
        var params ={
            baseInfo:{
                pageNum:0,
                pageSize:0
            },
            method:"cloudEnvironmentQuery"
        };
        $.post('./cloudOssCmdbMethod',{"jsonStr":JSON.stringify(params)})
            .then(function(result){
                //var result = JSON.parse(result);
                if(result.code == 200){
                    $scope.cloudFactoryList = result.retObj.list;
                    $scope.cloudFactoryList.forEach(function (arr,index,val) {
                        cloudsName.push(angular.copy($scope.cloudFactoryList[index].cloudName));

                    })
                }
            });

    };
    queryCloudFactory();


    //我的待办
    $scope.toMyUndo = function (data) {
        var urlName = "";
        var router = "";
        console.log(data);
        if(data.serverType == "apply" || data.serverType == "change"){
            urlName = "资源审批";
            router = "app.resourceManagement";
        }else if(data.serverType == "net" || data.serverType == "maintain"){
            urlName = "我的待办";
            router = "app.myUndo";
        }else{
            urlName = "项目审批";
            router = "app.projectManagement";
        }
        var params ={
            baseInfo:{
                "menuName":urlName,
                "userId":CacheService.getObject("loginInfo").userId,
                "station":110001
            },
            method:"queryMenuByMenuName"
        };
        $.post('./cloud3aMethod',{"jsonStr":JSON.stringify(params)})
            .then(function(result){
                $state.go(router,{"menuId":result.menuId});

        });
    };

    $scope.toMyCreate = function (data) {
        var urlName = "";
        var router = "";
        console.log(data);
        if(data.type == "apply" || data.type == "change"){
            urlName = "我的资源";
            router = "app.myProject";
        }else if(data.type == "net" || data.type == "maintain"){
            urlName = "我的工单";
            router = "app.myWorkOrder";
        }else{
            urlName = "我的项目";
            router = "app.myItem";
        }
        var params ={
            baseInfo:{
                "menuName":urlName,
                "userId":CacheService.getObject("loginInfo").userId,
                "station":110001
            },
            method:"queryMenuByMenuName"
        };
        $.post('./cloud3aApiUserMethod',{"jsonStr":JSON.stringify(params)})
            .then(function(result){
                $state.go(router,{"menuId":result.menuId});

        });
    };


    /**
     * 获取我的待办前10条数据
     * @author duweiwei
     * @method getMyUndo
     * @param  noParam
     * @return
     * @date   2018-4-28
     */
    var getMyUndo = function () {
        var params ={
            baseInfo:{
                "pageNum":"1",
                "pageSize":"10",
                "userId":CacheService.getObject("loginInfo").userId
            },
            method:"myUpcoming"
        };
        $.post('./cloud3aApiUserMethod',{"jsonStr":JSON.stringify(params)})
            .then(function(result){
                if(result.code == 200){
                    if(result.resultInfo.list.length<1){
                        $scope.noneUndoData = true;
                    }else{
                        $scope.noneUndoData = false;
                        $scope.myUndoList = result.resultInfo.list;
                    }
                    $scope.$apply();

                }
            });
    };
    /**
     * 获取我的申请前10条数据
     * @author duweiwei
     * @method getMyUndo
     * @param  noParam
     * @return
     * @date   2018-4-28
     */
    var getMyCreate = function () {
        var params ={
            baseInfo:{
                "pageNum":0,
                "pageSize":0,
                "userId":CacheService.getObject("loginInfo").userId
            },
            method:"queryWorkOrderHomeList"
        };
        $.post('./cloudWorkOrderMethod',{"jsonStr":JSON.stringify(params)})
            .then(function(result){
                if(result.code == 200){
                    if(result.retObj.list.length <1){
                        $scope.noneCreateData = true;
                    }else{
                        $scope.noneCreateData = false;
                        $scope.myCreateList = result.retObj.list;
                    }
                    $scope.$apply();
                }
            });
    };


    //绘制资源统计柱状图
    var getResourceShow = function (cloudName,poolTotal,phyTotal,vmTotal) {
        var chart = Highcharts.chart('ResourceCharts',{
            chart: {
                type: 'column',
                backgroundColor: 'rgba(225, 225, 225, 0.1)',

            },
            title: {
                text: '资源统计',
                style: {
                    color: "#fff",
                    fontSize:'16px'  //字体
                }
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            xAxis: {
                categories: cloudName,
                crosshair: true,
                labels:{
                    style:{
                        color:'#fff'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '个数',
                    style: {
                        color: "#fff"
                    }
                },
                labels:{
                    style:{
                        color:'#fff'
                    }
                }
            },
            tooltip: {
                // head + 每个 point + footer 拼接成完整的 table
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y}个</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    borderWidth: 0
                }
            },
            series: [{
                name: '资源池个数',
                color: '#56db11',
                data: poolTotal
            }, {
                name: '物理机个数',
                color: '#7dc5eb',
                data: phyTotal
            }, {
                name: '云主机个数',
                color: '#1aaba8',
                data: vmTotal
            }]
        });

    };



    //绘制告警柱状图
    var getWarmShow= function (cloudName,attentionTimes,faultTimes,seriousTimes,warnTimes) {
        var chart = Highcharts.chart('WarmCharts',{
            chart: {
                type: 'column',
                backgroundColor: 'rgba(225, 225, 225, 0.1)'

            },
            title: {
                text: '告警统计',
                style: {
                    color: "#fff",
                    fontSize:'16px'  //字体
                }
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            xAxis: {
                categories: cloudName,
                crosshair: true,
                labels:{
                    style:{
                        color:'#fff'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '告警次数',
                    style: {
                        color: "#fff"
                    }
                },
                labels:{
                    style:{
                        color:'#fff'
                    }
                }
            },
            tooltip: {
                // head + 每个 point + footer 拼接成完整的 table
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y}次</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    borderWidth: 0
                }
            },
            series: [{
                name: '严重告警',
                color: '#d81e06',
                data: seriousTimes
            }, {
                name: '故障告警',
                color: '#d2555a',
                data: faultTimes
            }, {
                name: '警告告警',
                color: '#f48d8d',
                data: warnTimes
            }, {
                name: '注意告警',
                color: 'rgba(248,161,63,1)',
                data: attentionTimes
            }]
        });

    };



    /**
     * 获取资源统计信息数据
     * @author duweiwei
     * @method getAssessInfo
     * @param  pageNum，pageSize
     * @return
     * @date   2018-4-28
     */
    var getResourceInfo = function () {
        var cloudName = [];
        var phyTotal = [];
        var vmTotal = [];
        var poolTotal = [];
        var params ={
            baseInfo:{
                pageNum:0,
                pageSize:0,
                userId:CacheService.getObject("loginInfo").userId
            },
            method:"queryResourcePoolHome"
        };
        $.post('./cloudBssResourceMethod',{"jsonStr":JSON.stringify(params)})
            .then(function(result){
                if(result.code == 200){
                    console.log(result);
                    if(result.retObj.length <1){
                        $scope.noneResource = true;
                    }else{
                        $scope.noneResource = false;
                        var data = result.retObj;
                        data.forEach(function (arr,index,val) {
                            cloudName.push(angular.copy(data[index].cloudName));
                            poolTotal.push(angular.copy(data[index].size));
                            phyTotal.push(angular.copy(data[index].phyTotal));
                            vmTotal.push(angular.copy(data[index].vmTotal));
                        });

                        getResourceShow(cloudName,poolTotal,phyTotal,vmTotal);
                    }
                    $scope.$apply();
                }
        });
    };
    getResourceInfo();



    /**
     * 获取告警图表数据
     * @author duweiwei
     * @method queryWarmInfo
     * @param  noParam
     * @return
     * @date   2018-4-28
     */

    var queryWarmInfo = function () {
        var cloudName = [];
        var attentionTimes = [];
        var faultTimes = [];
        var seriousTimes = [];
        var warnTimes = [];
        var params ={
            baseInfo:{
                "pageNum":0,
                "pageSize":0,
                userId:CacheService.getObject("loginInfo").userId

            },
            method:"getResourceAlarmHome"
        };

        $.post('./cloudOssAlarmMethod',{"jsonStr":JSON.stringify(params)})
            .then(function(result){
                console.log(result);
                if(result.code == 200){
                    if(result.retObj.length < 1){
                        $scope.noneWarming = true;
                    }else{
                        $scope.noneWarming = false;
                        result.retObj.forEach(function (arr,index,val) {
                            cloudName.push(angular.copy(result.retObj[index].cloudName));
                            attentionTimes.push(angular.copy(result.retObj[index].attentionTimes));
                            faultTimes.push(angular.copy(result.retObj[index].faultTimes));
                            seriousTimes.push(angular.copy(result.retObj[index].seriousTimes));
                            warnTimes.push(angular.copy(result.retObj[index].warnTimes));
                        });
                        getWarmShow(cloudName,attentionTimes,faultTimes,seriousTimes,warnTimes);
                    }
                    $scope.$apply();

                }
            });
    };
    queryWarmInfo();




}
