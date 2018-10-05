(function (f) {
	var particulars = angular.module("particulars",[]);
	particulars.directive("particularsDirective", 
	function  (){
		return {
			restrite:"AE",
		template:'<div id="footer_list_box" class="footer_list_box">'+				    	
				    	'<button class="footer_list_collect" ng-click="list.handleClicka()">'+
				    		'<span id="btn-name" class="btn-name">{{list.text}}</span>'+
				    		'<i style="padding-left:7px;" ng-class={true:"glyphicon-chevron-up",false:"glyphicon-chevron-down"}[list.showHidden] class="glyphicon "></i>'+
				    	'</button>'+
						'<div ng-show="list.showHidden" class="footer_list_content">'+
								'<div ng-transclude></div>'+
							'</div>'+
							'<div class="clear"></div>'+
					'</div>',
		scope:{
		},
		transclude:true,
		link:function(scope,element,attr){
			scope.list={
					text:'收起',//定义按钮
					showHidden:true,//定义显示隐藏列表
					handleClicka:function(){//定义点击事件
						if(this.text=='展开'){
							this.text='收起';
							this.showHidden=true;
						}else{
							this.text='展开';
								this.showHidden=false;
							}
						},
						
				};
				
				
			}
		}
	});
})(angular)