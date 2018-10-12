'use strict';
/*
* created by LiuMingming 2018/10/09
*
* */
//新增读者

app.controller('insertBookCtrl', ['$rootScope','$scope', '$log','$modal','$http','$modalInstance','service.RES',
    function ($rootScope,$scope, $log,$modal, $http,$modalInstance,serviceRES) {

        $scope.rpForm={};

        $scope.rpForm = {
            bookType: {
                bookTypeName: "",
                bookTypeId: ""
            },
            bookTypeD: {
                bookTypeDiscipline : "",
                bookTypeDisciplineId : ""
            }
        };

        /*查询可选的图书类型*/
        var getBookTypes = function () {
            var params = {
                baseInfo: {
                    "pageSize": "0",
                    "pageNum": "0"
                },
                method: "queryBookTypeByName"
            };
            $.post('./bookManagement', {"jsonStr": JSON.stringify(params)})
                .then(function (result) {
                    if (result.code == 200 && result.retObj.list != 0) {
                        $scope.bookTypes = result.retObj.list;
                    }

                });
        };

        getBookTypes();

        /*查询可选的图书类型*/
        $scope.getbookTypeDisciplines = function () {
            var params = {
                baseInfo: {
                    "pageSize": "0",
                    "pageNum": "0",
                     bookTypeId: $scope.rpForm.bookType.bookTypeId
                },
                method: "queryBookType"
            };
            $.post('./bookManagement', {"jsonStr": JSON.stringify(params)})
                .then(function (result) {
                    if (result.code == 200 && result.retObj.list != 0) {
                        $scope.bookTypeDisciplines = result.retObj.list;
                    }

                });
        };


        var start = {}, end = {};
        var newStartTime ={},newEndTime = {};
        $scope.Time={
            showPublishDate:function(){
                jeDate('#PublishDate',{
                    trigger:false,
                    format: 'YYYY-MM-DD',
                    isTime:true,
                    onClose:false,
                    isToday:true,
                    minDate: '1800-06-16', //设定最小日期为当前日期
                    maxDate: function (that) {
                        return (jeDate.valText(that.valCell) == "" || start.maxDate ==undefined) ? '2099-06-16' : start.maxDate;
                    }, //设定最大日期为当前日期
                    donefun: function(obj){
                        $scope.rpForm.publishDate = obj.val;
                    },
                    clearfun:function (elem, val) {
                        $scope.rpForm.publishDate = '';

                    }
                });

            },

            showUpDate:function(){
                jeDate('#UpDate',{
                    trigger:false,
                    format: 'YYYY-MM-DD',
                    isTime:true,
                    onClose:false,
                    isToday:true,
                    minDate: '2004-06-16', //设定最小日期为当前日期
                    maxDate: function (that) {
                        return (jeDate.valText(that.valCell) == "" || start.maxDate ==undefined) ? '2099-06-16' : start.maxDate;
                    }, //设定最大日期为当前日期
                    donefun: function(obj){

                        newStartTime = obj.val;
                        end.minDate = newStartTime; //开始日选好后，重置结束日的最小日期
                        $scope.rpForm.upTime = obj.val;
                        $scope.Time.showDownDate($scope.Time.LinkageEndDate(false));
                    },
                    clearfun:function (elem, val) {
                        $scope.rpForm.upTime = '';

                    }
                });

            },

            showDownDate:function(endConfig){
                if( $scope.rpForm.upTime == undefined ||$scope.rpForm.upTime == ''){
                    serviceRES.showMessage("请先选择开始日期！","confirm");
                }else{
                    jeDate('#DownDate',endConfig);
                }
            },
            LinkageEndDate:function(istg) {
                return {
                    trigger : istg || "click",
                    onClose:false,
                    isTime:true,
                    isToday:true,
                    format: 'YYYY-MM-DD',
                    minDate: function (that) {
                        //that 指向实例对象
                        var nowMinDate = jeDate.valText('#UpDate') == "" && jeDate.valText(that.valCell) == "";
                        return nowMinDate ? jeDate.nowDate({DD:0}) : end.minDate ;
                    }, //设定最小日期为当前日期
                    maxDate: '2099-06-16', //设定最大日期为当前日期
                    donefun: function(obj){

                        newEndTime = obj.val;
                        start.maxDate = newEndTime; //将结束日的初始值设定为开始日的最大日期
                        $scope.rpForm.downTime = obj.val;
                    },
                    clearfun:function (elem, val) {
                        $scope.rpForm.downTime = '';

                    }
                };
            }

        };


        //时间转化格式转换
        var timeTransformation = function(value){
            return new Date(value.substr(0,10)).getTime();
        };


        $scope.insertBook = function () {
            var params = {
                baseInfo:{
                    isbn                    :       $scope.rpForm.isbn,
                    bookName                :       $scope.rpForm.bookName,
                    typeId                  :       $scope.rpForm.bookType.bookTypeId,
                    bookTypeDisciplineId    :       $scope.rpForm.bookTypeD.bookTypeDisciplineId,
                    author                  :       $scope.rpForm.author,
                    publish                 :       $scope.rpForm.publish,
                    publishDate             :       timeTransformation($scope.rpForm.publishDate),
                    publishNum              :       $scope.rpForm.publishNum,
                    unitPrice               :       $scope.rpForm.unitPrice,
                    upTime                  :       timeTransformation($scope.rpForm.upTime),
                    downTime                :       timeTransformation($scope.rpForm.downTime)
                },
                method:"insertBook"
            };
            console.log(params);
            $.post('./bookManagement',{"jsonStr":JSON.stringify(params)})
                .then(function(response){
                    if(response.code == 200){
                        window.wxc.xcConfirm("录入图书成功！", window.wxc.xcConfirm.typeEnum.success);
                        $modalInstance.close();
                    }else{
                        window.wxc.xcConfirm("录入图书失败！", window.wxc.xcConfirm.typeEnum.error);
                        $modalInstance.close();
                    }
                })

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);