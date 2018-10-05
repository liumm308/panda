    angular.module('sky-marquee', [])
        .directive('skyMarquee', function () {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    item:"=",
                    gtResult:"&"
                },
                templateUrl:'modules/mocks/sky-marquee.html',
                link: function ($scope, element, attr) {
                    var   speed=30;
                    $scope.pageSize=10;
                    $scope.CurrentPage=1;
                    var sp1=element.children().eq(2).children().eq(0);
                    var sp2=element.children().eq(2).children().eq(1);
                    var demo=element.children().eq(2).children().eq(2);
                    var demo2=element.children().eq(2).children().eq(2).children().children().children().children().eq(1);
                    var demo1=element.children().eq(2).children().eq(2).children().children().children().children().eq(0);
                    $scope.countL=Math.floor(demo.width()/97)
                    $scope.$watch("item",function(a,b,c){
                        if(a&&a.content.length<$scope.countL){
                            demo2.addClass("hide");
                        }
                    })
                    var Marquee=null;
                    function   MarqueeLeft() {
                        if (demo2[0].offsetWidth-demo[0].scrollLeft<=0) {
                            demo[0].scrollLeft-=demo1[0].offsetWidth
                        }
                        else{
                            demo[0].scrollLeft+=1;
                        }
                        window.timeId1 = window.setTimeout(MarqueeLeft,speed);
                    };
                    function lastPage(){
                        if($scope.CurrentPage>1){
                            $scope.CurrentPage-=1;
                            $scope.gtResult({resourcePool:null,pageNumber:$scope.CurrentPage,pageSize:$scope.pageSize});
                        }else{
                            return;
                        }
                    }
                    function nextPage(){
                        if($scope.CurrentPage<$scope.item.totalPages){
                            $scope.CurrentPage+=1;
                            $scope.gtResult({resourcePool:null,pageNumber:$scope.CurrentPage,pageSize:$scope.pageSize});
                        }
                        else{
                            return;
                        }

                    }
                    function   MarqueeRight() {
                        if (demo[0].scrollLeft <= 0) {
                            demo[0].scrollLeft += demo1[0].offsetWidth;
                        }
                        else{
                            demo[0].scrollLeft--
                        }
                        window.timeId2 = window.setTimeout(MarqueeRight,speed);
                    };
                    demo.bind('mouseover', demoMouseover);
                    function demoMouseover()   {
                        window.clearTimeout(window.timeId1);
                        window.clearTimeout(window.timeId2);}
                    demo.bind('mouseout', demoMouseout);
                    function demoMouseout()   {
                        window.clearTimeout(window.timeId1);
                        window.clearTimeout(window.timeId2);
                        if(Marquee==null){
                            Marquee=MarqueeRight;
                        }
                        if(Marquee==MarqueeRight){
                            window.timeId2 = window.setTimeout(MarqueeRight,speed);
                        }
                        if(Marquee==MarqueeLeft){
                            window.timeId1 = window.setTimeout(MarqueeLeft,speed);
                        }
                       }
                    sp1.bind('mouseover', sp1_onmouseover);
                    sp1.bind('click', lastPage);
                    sp2.bind('click', nextPage);
                    function sp1_onmouseover()   {
                        window.clearTimeout(window.timeId1);
                        window.clearTimeout(window.timeId2);
                        Marquee=MarqueeLeft;
                        demoMouseout();
                    }
                    sp2.bind('mouseover', sp2_onmouseover);
                    function sp2_onmouseover()   {
                        window.clearTimeout(window.timeId1);
                        window.clearTimeout(window.timeId2);
                        Marquee=MarqueeRight;
                        demoMouseout();
                    }
                    window.timeId2 = window.setTimeout(MarqueeRight,speed);

                    /*window.MyMar=setInterval(Marquee,speed)
                    demo.onmouseover=function()   {clearInterval(MyMar)}
                    demo.onmouseout=function()   {
                        window.MyMar=setInterval(Marquee,speed)}*/
                }
            }
        })
        .directive('skyMarqueeSub', function () {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    item:"=",
                    gtResult:"&"
                },
                templateUrl:'modules/mocks/sky-marquee-sub.html',
                link: function ($scope, element, attr) {
                    var   speed=30;
                    $scope.pageSize=10;
                    $scope.CurrentPage=1;
                    var sp1=element.children().eq(2).children().eq(0);
                    var sp2=element.children().eq(2).children().eq(1);
                    var demo=element.children().eq(2).children().eq(2);
                    var demo2=element.children().eq(2).children().eq(2).children().children().children().children().eq(1);
                    var demo1=element.children().eq(2).children().eq(2).children().children().children().children().eq(0);
                    var Marquee=null;
                    $scope.countL=Math.floor(demo.width()/97)
                    $scope.$watch("item",function(a,b,c){
                        if(a&&a.content.length<$scope.countL){
                            demo2.addClass("hide");
                        }
                    })
                    function   MarqueeLeft() {
                        if (demo2[0].offsetWidth-demo[0].scrollLeft<=0) {
                            demo[0].scrollLeft-=demo1[0].offsetWidth
                        }
                        else{
                            demo[0].scrollLeft+=1;
                        }
                        window.timeId1 = window.setTimeout(MarqueeLeft,speed);
                    };
                    function lastPage(){
                        if($scope.CurrentPage>1){
                            $scope.CurrentPage-=1;
                            $scope.gtResult({resourcePool:null,pageNumber:$scope.CurrentPage,pageSize:$scope.pageSize});
                        }else{
                            return;
                        }
                    }
                    function nextPage(){
                        if($scope.CurrentPage<$scope.item.totalPages){
                            $scope.CurrentPage+=1;
                            $scope.gtResult({resourcePool:null,pageNumber:$scope.CurrentPage,pageSize:$scope.pageSize});
                        }
                        else{
                            return;
                        }

                    }
                    function   MarqueeRight() {
                        if (demo[0].scrollLeft <= 0) {
                            demo[0].scrollLeft += demo1[0].offsetWidth;
                        }
                        else{
                            demo[0].scrollLeft--
                        }
                        window.timeId2 = window.setTimeout(MarqueeRight,speed);
                    };
                    demo.bind('mouseover', demoMouseover);
                    function demoMouseover()   {
                        window.clearTimeout(window.timeId1);
                        window.clearTimeout(window.timeId2);}
                    demo.bind('mouseout', demoMouseout);
                    function demoMouseout()   {
                        window.clearTimeout(window.timeId1);
                        window.clearTimeout(window.timeId2);
                        if(Marquee==null){
                            Marquee=MarqueeRight;
                        }
                        if(Marquee==MarqueeRight){
                            window.timeId2 = window.setTimeout(MarqueeRight,speed);
                        }
                        if(Marquee==MarqueeLeft){
                            window.timeId1 = window.setTimeout(MarqueeLeft,speed);
                        }
                       }
                    sp1.bind('mouseover', sp1_onmouseover);
                    sp1.bind('click', lastPage);
                    sp2.bind('click', nextPage);
                    function sp1_onmouseover()   {
                        window.clearTimeout(window.timeId1);
                        window.clearTimeout(window.timeId2);
                        Marquee=MarqueeLeft;
                        demoMouseout();
                    }
                    sp2.bind('mouseover', sp2_onmouseover);
                    function sp2_onmouseover()   {
                        window.clearTimeout(window.timeId1);
                        window.clearTimeout(window.timeId2);
                        Marquee=MarqueeRight;
                        demoMouseout();
                    }
                    window.timeId2 = window.setTimeout(MarqueeRight,speed);

                    /*window.MyMar=setInterval(Marquee,speed)
                    demo.onmouseover=function()   {clearInterval(MyMar)}
                    demo.onmouseout=function()   {
                        window.MyMar=setInterval(Marquee,speed)}*/
                }
            }
        });
