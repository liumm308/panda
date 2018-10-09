'use strict';

app.controller('homeCtrl',homeCtrl);
    homeCtrl.$inject = ['$scope','$modal','$log','$timeout','$state','i18nService','service.RES','CacheService','ngDialog','$stateParams'];
    function homeCtrl($scope,$modal,$log,$timeout,$state,i18nService,serviceRES,CacheService,ngDialog,$stateParams){

    i18nService.setCurrentLang("zh-cn");






}
