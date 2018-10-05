(function(angular){
	angular.module('app.gridDirective',[]).
	  directive('gridDirective',gridDirective)
	  gridDirective.$inject=['$log','i18nService']
	  function gridDirective($log,i18nService){
		    return {
		        restrict: 'AE',
		        scope:{
		        	columnDefs:'=',//表头
		            colData:'=',//数据
		            testRow:'=',//返回选中行的数据
		            colJudge:'=',//是否为查询状态 默认为true 设置 
		            manyRow:'=',//是否选中多行默认为true单行显示
		            pageSize:"=",//每页页数
		            pageNum:'=',//页码 默认1
		            listDataFn:'=',//调用方法
		            valueData:'=',//多选时 匹配 筛选
		            totalItems:"="
		        },
		        template: '<div ui-grid="gridOptions"  style="width: 100%; height: 412px; text-align: center;margin-top: 4px;"  ' +
		        'ui-grid-edit ui-grid-pagination ui-grid-selection ui-grid-exporter ui-grid-resize-columns ui-grid-auto-resize></div>',
		        link: function(scope, elem, attrs){
		        	i18nService.setCurrentLang("zh-cn");
		        	$log.info(scope)
		        	scope._index=0;
		        	scope.selectedData=[];//存储多选数据
		            scope.gridOptions = {
		                columnDefs: scope.columnDefs,
		                enableSorting: true, //是否排序
		                useExternalSorting: false, //是否使用自定义排序规则
		                enableGridMenu: false, //是否显示grid 菜单
		                showGridFooter: false, //是否显示grid footer
		                enableHorizontalScrollbar: 1, //grid水平滚动条是否显示, 0-不显示  1-显示
		                enableVerticalScrollbar: 0, //grid垂直滚动条是否显示, 0-不显示  1-显示
		                //-------- 分页属性 ----------------
		                enablePagination: true, //是否分页，默认为true
		                enablePaginationControls: true, //使用默认的底部分页
		                paginationPageSizes: [5,10], //每页显示个数可选项
		                paginationCurrentPage:scope.pageSize, //当前页码
		                paginationPageSize:scope.pageNum, //每页显示个数
		                totalItems:scope.totalItems, // 总数量
		                useExternalPagination: true,//是否使用分页按钮
		                //----------- 选中 ----------------------
		                enableFooterTotalSelected: false, // 是否显示选中的总数，默认为true, 如果显示，showGridFooter 必须为true
		                enableFullRowSelection: true, //是否点击行任意位置后选中,默认为false,当为true时，checkbox可以显示但是不可选中
		                enableRowHeaderSelection: true, //是否显示选中checkbox框 ,默认为true
		                enableRowSelection: true, // 行选择是否可用，默认为true;
		                enableSelectAll: false, // 选择所有checkbox是否可用，默认为true;
		                enableSelectionBatchEvent: true, //默认true
		                isRowSelectable: function (row) { //GridRow
		                	scope._index += 1;
		                	if(scope.manyRow){
		                		if (scope._index == 1) {
				                      row.grid.api.selection.selectRow(row.entity); // 选中行
				                  }
		                	}
		                },
		                modifierKeysToMultiSelect: true,//默认false,为true时只能 按ctrl或shift键进行多选, multiSelect 必须为true;
		                multiSelect: true,// 是否可以选择多个,默认为true;
		                noUnselect: true,//默认false,选中后是否可以取消选中
		                selectionRowHeaderWidth: 30,//默认30 ，设置选择列的宽度；
		                //---------------api---------------------
		                onRegisterApi: function(gridApi) {
		                    scope.gridApi = gridApi;
		                    //分页按钮事件
		                    gridApi.pagination.on.paginationChanged(scope,function(newPage, pageSize) {
		                    	scope.pageSize=newPage
		                    	scope.pageNum=pageSize
		                    	scope.listDataFn()
		                    });
		                    //行选中事件
		                    scope.gridApi.selection.on.rowSelectionChanged(scope,function(row,event){
		                        if(row){
		                        	//处理  单选 多选 情况
		                            if(scope.manyRow){
		                            	scope.testRow(row.entity);
		                            }else{
		                            	if(row.isSelected){
		                            		scope.selectedData.push(row.entity)
			    	                	}else{
			    	                		for(var i=0,len=scope.selectedData.length;i<len;i++){
			    	                			if(row.entity[scope.valueData]===scope.selectedData[i][scope.valueData]){
			    	                				scope.selectedData.splice([i],1)
			    	                			}
			    	                		}
			    	                	}
		                            	scope.testRow(scope.selectedData);
		                            }
		                        }
		                    });
		                }
		            };
		        	if(scope.manyRow){//单选 或者多选
		        		scope.gridOptions.modifierKeysToMultiSelect=true;//默认false,为true时只能 按ctrl或shift键进行多选, multiSelect 必须为true;
		        		scope.gridOptions.noUnselect=true//默认false,选中后是否可以取消选中
		        		scope.gridOptions.enableFooterTotalSelected=false // 是否显示选 中的总数，默认为true, 如果显示，showGridFooter 必须为true
                    }else{
                    	scope.gridOptions.modifierKeysToMultiSelect=false;//默认false,为true时只能 按ctrl或shift键进行多选, multiSelect 必须为true;
		        		scope.gridOptions.noUnselect=false//默认false,选中后是否可以取消选中
		        		scope.gridOptions.enableFooterTotalSelected=true // 是否显示选 中的总数，默认为true, 如果显示，showGridFooter 必须为true
                    }
		        	scope.$watch('colData',function(newValue, oldValue){
		            	if(newValue){
		            		 scope.gridOptions.data=newValue
		            	}
		            },true);
		        }
		    }
		}
})(angular)