/**
 * Created by Administrator on 2016-11-03.
 */
var val=angular.module('sky-validate', [])
val.directive('validatehttp',Validatehttp);
val.directive('validateip',Validateip);
val.directive('validateip2',Validateip2);
val.directive('validateport',Validateport);
val.directive('validatephone',Validatephone);
val.directive('validatepwd',Validatepwd);
val.directive('validatecfpwd',Validatecfpwd);
val.directive('validatecode',validatecode);
val.directive('validatemask',validatemask);
//验证编码
validatecode.$inject=['$timeout'];
function validatecode($timeout){
    return {
        restrict: "A",
        require:"ngModel",
        scope:{
            code:'@'
        },
        link: function($scope, el, attr,ngModelController) {
            ngModelController.$parsers.push(function(viewValue){
                var patternhttp = /^((https|http|ftp|rtsp|mms)?:\/\/)((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/;
                var pattern = /^([1-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
                var patternip = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
                if($scope.code=="url"){
                    if(patternhttp.test(viewValue)){
                        ngModelController.$setValidity('validatecode',true);
                    }else{
                        ngModelController.$setValidity('validatecode',false);
                    }
                }
                else if($scope.code=="ip"){
                    if(patternip.test(viewValue)){
                        ngModelController.$setValidity('validatecode',true);
                    }else{
                        ngModelController.$setValidity('validatecode',false);
                    }
                }else if($scope.code=="port"){
                    if(pattern.test(viewValue)){
                        ngModelController.$setValidity('validatecode',true);
                    }else{
                        ngModelController.$setValidity('validatecode',false);
                    }
                }else{
                    ngModelController.$setValidity('validatecode',true);
                }
                return viewValue;
            });
        }
    };
};
//验证密码
Validatepwd.$inject=['$timeout'];
function Validatepwd($timeout) {
    return {
        restrict: "A",
        require:"ngModel",
        link: function($scope, el, attr,ngModelController) {
            ngModelController.$parsers.push(function(viewValue){
                var pattern=/^(?![0-9a-z]+$)(?![0-9A-Z]+$)(?![a-zA-Z]+$)(?![@#$%&*0-9]+$)(?![@#$%&*a-z]+$)(?![@#$%&*A-Z]+$)[a-zA-Z0-9@#$%&*_]{8,32}$/;
                if(pattern.test(viewValue)){
                    ngModelController.$setValidity('validatepwd',true);
                }else{
                    ngModelController.$setValidity('validatepwd',false);
                }
                return viewValue;
            });
        }
    };
};
//验证密码
Validatecfpwd.$inject=['$timeout'];
function Validatecfpwd($timeout) {
    return {
        restrict: "A",
        require:"ngModel",
        scope:{
            pwd:'@'
        },
        link: function($scope, el, attr,ngModelController) {
            ngModelController.$parsers.push(function(viewValue){
                console.log($scope.pwd);
                if($scope.pwd==viewValue){
                    ngModelController.$setValidity('validatecfpwd',true);
                }else{
                    ngModelController.$setValidity('validatecfpwd',false);
                }
                return viewValue;
            });
        }
    };
};

//验证电话号
Validatephone.$inject=['$timeout'];
function Validatephone($timeout) {
    return {
        restrict: "A",
        require:"ngModel",
        link: function($scope, el, attr,ngModelController) {
            ngModelController.$parsers.push(function(viewValue){
                var pattern = /^0?1[3|4|5|8][0-9]\d{8}$/;
                if(pattern.test(viewValue)){
                    ngModelController.$setValidity('validatephone',true);
                }else{
                    ngModelController.$setValidity('validatephone',false);
                }
                return viewValue;
            });
        }
    };
};
//验证http://192.168.1.1
Validatehttp.$inject=['$timeout','service.RES'];
function Validatehttp($timeout,serviceRES) {
    return {
        restrict: "A",
        require:"ngModel",
        link: function($scope, el, attr,ngModelController) {
            ngModelController.$parsers.push(function(viewValue){
                var pattern = /^((https|http|ftp|rtsp|mms)?:\/\/)((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/;
                if(pattern.test(viewValue)){
                    ngModelController.$setValidity('validatehttp',true);
                }else{
                    ngModelController.$setValidity('validatehttp',false);
                }
                return viewValue;
            });
        }
    };
};
//验证IP
Validateip.$inject=['$timeout','service.RES'];
function Validateip($timeout,serviceRES) {
    return {
        restrict: "A",
        require:"ngModel",
        scope:{
            cidr:'='
        },
        link: function($scope, el, attr,ngModelController) {
            ngModelController.$parsers.push(function(viewValue){
                /*var pattern = /^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/;*/
            	var pattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
                if(pattern.test(viewValue)){
                    if($scope.cidr&&$scope.cidr.length>0){
                        if(Number(viewValue.split(".")[1])<=Number($scope.cidr[1].split(".")[1])&&Number(viewValue.split(".")[1])>=Number($scope.cidr[0].split(".")[1])) {
                            if (Number(viewValue.split(".")[2]) <= Number($scope.cidr[1].split(".")[2]) && Number(viewValue.split(".")[2]) >= Number($scope.cidr[0].split(".")[2])) {
                                if (Number($scope.cidr[0].split(".")[3]) <= Number(viewValue.split(".")[3]) && Number(viewValue.split(".")[3]) <= Number($scope.cidr[1].split(".")[3])) {
                                    ngModelController.$setValidity('validateip', true);
                                } else {
                                    ngModelController.$setValidity('validateip', false);
                                }
                            }
                            else {
                                ngModelController.$setValidity('validateip', false);
                            }
                        }
                        else{
                            ngModelController.$setValidity('validateip', false);
                        }
                    }else{
                        ngModelController.$setValidity('validateip',true);
                    }

                }
                else{
                    ngModelController.$setValidity('validateip',false);
                }
                return viewValue;
            });
        }
    };
};
function Validateip2($timeout) {
    return {
        restrict: "A",
        require:"ngModel",
        scope:{
            startip:'=',
            stopip:'='
        },
        link: function($scope, el, attr,ngModelController) {
            ngModelController.$parsers.push(function(viewValue){
                var pattern=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
                if(pattern.test(viewValue)){
                    if($scope.startip&&$scope.startip.length>0){
                        if(Number($scope.startip.split('.')[3])<Number(viewValue.split('.')[3])){
                            ngModelController.$setValidity('validateip22',true);
                        }else{
                            ngModelController.$setValidity('validateip22', false);
                        }
                    }else  if($scope.stopip&&$scope.stopip.length>0){
                        if(Number($scope.stopip.split('.')[3])>Number(viewValue.split('.')[3])){
                            ngModelController.$setValidity('validateip22',true);
                        }else{
                            ngModelController.$setValidity('validateip22', false);
                        }
                    }
                    ngModelController.$setValidity('validateip2',true);
                }
                else{
                    ngModelController.$setValidity('validateip2',false);
                }
                return viewValue;
            });
        }
    };
};
//验证端口
Validateport.$inject=['$timeout','service.RES'];
function Validateport($timeout,serviceRES) {
    return {
        restrict: "A",
        require:"ngModel",
        link: function($scope, el, attr,ngModelController) {
            ngModelController.$parsers.push(function(viewValue){
                var pattern = /^([1-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
                if(pattern.test(viewValue)){
                    ngModelController.$setValidity('validateport',true);
                }else{
                    ngModelController.$setValidity('validateport',false);
                }
                return viewValue;
            });
        }
    };
};
//校验网络掩码的合法性以及ip与掩码、网关与掩码的逻辑关系
function validatemask() {
    return {
        restrict: "A",
        require:"ngModel",
        scope:{
            startip:'=',
            gateway:'='
        },
        link: function($scope, el, attr,ngModelController) {
            ngModelController.$parsers.push(function(viewValue){
                var pattern = /^((254|252|248|240|224|192|128|0)\.0\.0\.0)|(255\.(254|252|248|240|224|192|128|0)\.0\.0)|(255\.255\.(254|252|248|240|224|192|128|0)\.0)|(255\.255\.255\.(254|252|248|240|224|192|128|0))$/;
                if(pattern.test(viewValue)){
                    if($scope.startip&&$scope.startip.length>0&&$scope.gateway&&$scope.gateway.length>0){
                        /*第一点：进行与运算1与1得1,1与0为0,0与0为0。首先把ip和子网掩码展开
                         10.70.64.223        00001010 .01000110.01000000.11011111
                         255.255.255.0   111111111.11111111.11111111.00000000
                         网段就是         00001010 .01000110.01000000.00000000
                         然后转换成十进制就是：10.70.64.0
                         第二点：IP地址与子网掩码做与运算和网关地址与子网掩码做与运算得到的结果应该是一致的就对了，也就是主机号一致。
                         我这里是先用js将ip，mask，gateway按照‘.'分隔后相与做判断的。
                         第三点：js的按位与运算
                         result = 【整数1】 & 【整数1】
                         & 对两个 32 位表达式的每一个位执行按位“与”运算。 如果两个位均为 1，则结果是 1。 否则，结果为 0。*/
                        var static_ip_arr = new Array;
                        var static_mask_arr = new Array;
                        var static_gw_arr = new Array;

                        static_ip_arr = $scope.startip.split(".");
                        static_mask_arr = viewValue.split(".");
                        static_gw_arr = $scope.gateway.split(".");
                        //ip与掩码做与预算
                        var res0 = parseInt(static_ip_arr[0]) & parseInt(static_mask_arr[0]);
                        var res1 = parseInt(static_ip_arr[1]) & parseInt(static_mask_arr[1]);
                        var res2 = parseInt(static_ip_arr[2]) & parseInt(static_mask_arr[2]);
                        var res3 = parseInt(static_ip_arr[3]) & parseInt(static_mask_arr[3]);
                        //网关与掩码做与运算
                        var res0_gw = parseInt(static_gw_arr[0]) & parseInt(static_mask_arr[0]);
                        var res1_gw = parseInt(static_gw_arr[1]) & parseInt(static_mask_arr[1]);
                        var res2_gw = parseInt(static_gw_arr[2]) & parseInt(static_mask_arr[2]);
                        var res3_gw = parseInt(static_gw_arr[3]) & parseInt(static_mask_arr[3]);
                        if(res0==res0_gw && res1==res1_gw && res2==res2_gw && res3==res3_gw){
                            ngModelController.$setValidity('validatemask1',true);
                        }else{
                            ngModelController.$setValidity('validatemask1',false);
                        }
                    }
                    ngModelController.$setValidity('validatemask',true);
                }else{
                    ngModelController.$setValidity('validatemask',false);
                }
                return viewValue;
            });
        }
    };
};