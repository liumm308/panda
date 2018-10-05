///CommonRES js
'use strict';
angular.module('CommonService',[])
    .service('service.RES', ServiceCommon);
ServiceCommon.$inject = ['$q', '$resource', 'fakeMapping','$filter'];
function ServiceCommon($q, $resource, fakeMapping,$filter) {

    /**
     * 查询各个模块的操作按钮
     * @author duweiwei
     * @method queryBtnList
     * @param  menuId  菜单id
     * @return  list
     * @date   2018-7-23
     */
    this.queryBtnList = function(id,callback){
        //查询userId
        $.post('./getUserInfo')
            .then(function (result) {
                var queryFlowData = {
                    baseInfo:{
                        id:id,
                        userId:result.userId
                    },
                    method: "userMenuByButton"
                };
                $.post('./cloud3aMethod', {"jsonStr": JSON.stringify(queryFlowData)})
                    .then(function (result) {
                        if (result.code == "200") {
                            //return result.menuList;
                            callback(result.menuList)
                        } else {
                            result.menuList = [];
                            callback(result.menuList)
                        }
                    });
            });
    };


    //自定义设置的ui-grid 的gridOptions的设置 by duweiwei  2018-05-09
    this.settingGridOptions = function (result) {
        var gridOptions = [];
        var itemOptions ={};
        result.forEach(function (arr,index,val) {
            itemOptions.field = result[index].key;
            itemOptions.displayName = result[index].value;
            if(result[index].key == "cloudStatus"){
                itemOptions.cellTemplate = '<ui-state state="row.entity.cloudStatus" type="vm"></ui-state>';
            } else if(result[index].key == "cloudType"){
                itemOptions.cellTemplate = '<ui-cloud-type state="row.entity.cloudType" type="cloudtype"></ui-cloud-type>';
            } else if(result[index].key == "createTime"){
                itemOptions.cellTemplate = '<div class="ui-grid-cell-contents ng-binding ng-scope">{{row.entity.createTime |date:"yyyy-MM-dd HH:mm:ss"}}</div>';
            }else if(result[index].key == "updateTime"){
                itemOptions.cellTemplate = '<div class="ui-grid-cell-contents ng-binding ng-scope">{{row.entity.updateTime |date:"yyyy-MM-dd HH:mm:ss"}}</div>';
            }
            gridOptions.push(angular.copy(itemOptions));
        });
        return gridOptions;
    };

    //common show message add by mabian
    this.showMessage = function(msg, flag) {
    	 if (flag=="success") {
             window.wxc.xcConfirm(msg, window.wxc.xcConfirm.typeEnum.success);
         } else if(flag=="error") {
             window.wxc.xcConfirm(msg, window.wxc.xcConfirm.typeEnum.error);
         }else if(flag=="confirm"){
         	window.wxc.xcConfirm(msg, window.wxc.xcConfirm.typeEnum.confirm);
         }
    };


};
