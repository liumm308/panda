angular.module('app.grid-directive', [])
    .directive('grid', function(i18nService){
        return {
            restrict: 'E',
            scope:{
                arr:'=',
                colArr:'=',
                callFn:'=',
                loadData: '=',
                pageFn:'=',
                gridStyle:'=',
                paginationCurrentPage: '=',
                paginationPageSize: '=',
                totalElements: '='
            },
            template: '<div ui-grid="gridOptions" style="width: 100%; height: 100%; text-align: center;"  ' +
            'ui-grid-edit ui-grid-pagination ui-grid-selection ui-grid-exporter ui-grid-resize-columns ui-grid-auto-resize></div>',
            link:function(scope, elem, attrs){

                i18nService.setCurrentLang("zh-cn");

                var index = 0;

                scope.gridOptions = {
                    columnDefs: scope.colArr,
                    enableCellEdit: false, // 是否可编辑
                    enableSorting: false, //是否排序
                    useExternalSorting: false, //是否使用自定义排序规则
                    enableGridMenu: true, //是否显示grid 菜单
                    showGridFooter: false, //是否显示grid footer
                    enableHorizontalScrollbar: 0, //grid水平滚动条是否显示, 0-不显示  1-显示
                    enableVerticalScrollbar: 0, //grid垂直滚动条是否显示, 0-不显示  1-显示
                    //-------- 分页属性 ----------------
                    enablePagination: true, //是否分页，默认为true
                    enablePaginationControls: true, //使用默认的底部分页
                    paginationPageSizes: [10], //每页显示个数可选项
                    paginationCurrentPage: 1, //当前页码
                    paginationPageSize: scope.paginationPageSize ? scope.paginationPageSize : 10, //每页显示个数
                    totalItems: 0, // 总数量
                    useExternalPagination: true,//是否使用分页按钮
                    //----------- 选中 ----------------------
                    enableFooterTotalSelected: true, // 是否显示选中的总数，默认为true, 如果显示，showGridFooter 必须为true
                    enableFullRowSelection: false, //是否点击行任意位置后选中,默认为false,当为true时，checkbox可以显示但是不可选中
                    //enableRowSelection : true, // 行选择是否可用，默认为true;
                    //enableSelectAll : true, // 选择所有checkbox是否可用，默认为true;
                    enableSelectionBatchEvent : true, //默认true
                    modifierKeysToMultiSelect: true ,//默认false,为true时只能 按ctrl或shift键进行多选, multiSelect 必须为true;
                    multiSelect: false  ,// 是否可以选择多个,默认为true;
                    noUnselect: true,//默认false,选中后是否可以取消选中
                    selectionRowHeaderWidth:30 ,//默认30 ，设置选择列的宽度；
                    isRowSelectable: function(row){ //GridRow
                        if(index == 0){
                            row.grid.api.selection.selectRow(row.entity);
                            index++;
                        }else if(index > scope.arr.list.length-1){
                            return;
                        }else{
                            index++;
                        }

                        //index = parseInt(scope.index);
                        /*index += 1;
                        if (index == 1) {   //默认选中第一行
                            row.grid.api.selection.selectRow(row.entity);
                        }
                        if(index == scope.arr.list.length){
                            index =0;
                        }*/
                    },
                    //---------------api---------------------
                    onRegisterApi: function(gridApi) {
                        scope.gridApi = gridApi;
                        //分页按钮事件
                        gridApi.pagination.on.paginationChanged(scope,function(newPage, pageSize) {
                            if(getPage) {
                                //进行分页调取查询方法
                                index = 0; //分页操作重置index == 0；
                                scope.newPage = newPage;
                                scope.pageFn(newPage,pageSize);
                            }
                        });
                        //行选中事件
                        scope.gridApi.selection.on.rowSelectionChanged(scope,function(row, event){
                            if(row && row.isSelected){
                                scope.selectedItem = row.entity;
                            } else {
                                scope.selectedItem = undefined;
                            }
                            scope.callFn(scope.selectedItem,false,event);
                        });
                    }
                };

                var getPage = function(arr,currentPage,pageSize,total) {
                    currentPage = currentPage || 1;
                    pageSize = pageSize || 10;
                    total = total || 0;
                    if(currentPage===0)currentPage=1;
                    scope.gridOptions.paginationCurrentPage = currentPage;
                    scope.gridOptions.paginationPageSize = pageSize;
                    scope.gridOptions.totalItems = total;
                    scope.gridOptions.data = arr;
                };

                scope.$watch('arr',function(newValue, oldValue){
                    index = 0;
                    if(newValue['list']&&oldValue){
                        newValue['list'] = newValue['list'] || [];
                        getPage(newValue['list'],newValue['pageNum'],newValue['pageSize'],newValue['total']);
                    }
                },true);
            }
        }
    });