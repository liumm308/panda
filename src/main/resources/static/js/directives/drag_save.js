(function (angular) {
  angular.module('app.drag_save', [])
    .directive('dragSave', function () {
      return {
        restrict: 'A',
        link: function ($scope, element, attr) {
          var aLi = $(element).children();
          var disX = 0;
          var disY = 0;
          var minZindex = 1;
          var aPos = [];
          for (var i = 0; i < aLi.length; i++) {
            var t = aLi[i].offsetTop;
            var l = aLi[i].offsetLeft;
            aPos[i] = {left: l, top: t};
          }
          var str = localStorage.gvb;
          if (str) {
            var obj = JSON.parse(str);
            var arr = obj.name;
            var vPos = obj.value;

            for (var i = 0; i < aLi.length; i++) {
              aLi[i].index = arr[i];
              var t = vPos[aLi[i].index].top;
              var l = vPos[aLi[i].index].left;
              aLi[i].style.top = t + "px";
              aLi[i].style.left = l + "px";
            }
            for (var i = 0; i < aLi.length; i++) {
              aLi[i].style.position = "absolute";
              aLi[i].style.margin = 0;
              setDrag(aLi[i]);
            }
          } else {
            for (var i = 0; i < aLi.length; i++) {
              aLi[i].style.top = aLi[i].offsetTop + "px";
              aLi[i].style.left = aLi[i].offsetLeft + "px";
              aLi[i].index = i;
            }
            for (var i = 0; i < aLi.length; i++) {
              aLi[i].style.position = "absolute";
              aLi[i].style.margin = 0;
              setDrag(aLi[i]);
            }
          }

          //拖拽
          function setDrag(obj) {
            obj.onmouseover = function () {
              obj.style.cursor = "move";
            }
            obj.onmousedown = function (event) {
              var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
              var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
              obj.style.zIndex = minZindex++;
              //当鼠标按下时计算鼠标与拖拽对象的距离
              disX = event.clientX + scrollLeft - obj.offsetLeft;
              disY = event.clientY + scrollTop - obj.offsetTop;
              document.onmousemove = function (event) {
                //当鼠标拖动时计算div的位置
                var l = event.clientX - disX + scrollLeft;
                var t = event.clientY - disY + scrollTop;
                obj.style.left = l + "px";
                obj.style.top = t + "px";
                for (var i = 0; i < aLi.length; i++) {
                  aLi[i].className = "";
                }
                var oNear = findMin(obj);
                if (oNear) {
                  oNear.className = "active";
                }
              }

              document.onmouseup = function () {
                document.onmousemove = null;//当鼠标弹起时移出移动事件
                document.onmouseup = null;//移出up事件，清空内存
                //检测是否普碰上，在交换位置
                var oNear = findMin(obj);
                if (oNear) {
                  oNear.className = "";
                  oNear.style.zIndex = minZindex++;
                  obj.style.zIndex = minZindex++;
                  startMove(oNear, aPos[obj.index]);
                  startMove(obj, aPos[oNear.index]);
                  //交换index
                  oNear.index += obj.index;
                  obj.index = oNear.index - obj.index;
                  oNear.index = oNear.index - obj.index;

                  var tempArr = [];
                  for (var i = 0; i < aLi.length; i++) {
                    tempArr.push(aLi[i].index);
                  }
                  var tObj = {name: tempArr, value: aPos};
                  var str = JSON.stringify(tObj);
                  localStorage.gvb = str;
                } else {
                  startMove(obj, aPos[obj.index]);
                }
              }
              clearInterval(obj.timer);
              return false;//低版本出现禁止符号
            }
          }

          //碰撞检测
          function colTest(obj1, obj2) {
            var t1 = obj1.offsetTop;
            var r1 = obj1.offsetWidth + obj1.offsetLeft;
            var b1 = obj1.offsetHeight + obj1.offsetTop;
            var l1 = obj1.offsetLeft;

            var t2 = obj2.offsetTop;
            var r2 = obj2.offsetWidth + obj2.offsetLeft;
            var b2 = obj2.offsetHeight + obj2.offsetTop;
            var l2 = obj2.offsetLeft;

            if (t1 > b2 || r1 < l2 || b1 < t2 || l1 > r2) {
              return false;
            } else {
              return true;
            }
          }

          //勾股定理求距离
          function getDis(obj1, obj2) {
            var a = obj1.offsetLeft - obj2.offsetLeft;
            var b = obj1.offsetTop - obj2.offsetTop;
            return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
          }

          //找到距离最近的
          function findMin(obj) {
            var minDis = 999999999;
            var minIndex = -1;
            for (var i = 0; i < aLi.length; i++) {
              if (obj == aLi[i])continue;
              if (colTest(obj, aLi[i])) {
                var dis = getDis(obj, aLi[i]);
                if (dis < minDis) {
                  minDis = dis;
                  minIndex = i;
                }
              }
            }
            if (minIndex == -1) {
              return null;
            } else {
              return aLi[minIndex];
            }
          }

          function getStyle(obj,attr){//解决JS兼容问题获取正确的属性值
            return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
          }

          function startMove(obj,json,fun){
            clearInterval(obj.timer);
            obj.timer = setInterval(function(){
              var isStop = true;
              for(var attr in json){
                var iCur = 0;
                //判断运动的是不是透明度值
                if(attr=="opacity"){
                  iCur = parseInt(parseFloat(getStyle(obj,attr))*100);
                }else{
                  iCur = parseInt(getStyle(obj,attr));
                }
                var ispeed = (json[attr]-iCur)/8;
                //运动速度如果大于0则向下取整，如果小于0想上取整；
                ispeed = ispeed>0?Math.ceil(ispeed):Math.floor(ispeed);
                //判断所有运动是否全部完成
                if(iCur!=json[attr]){
                  isStop = false;
                }
                //运动开始
                if(attr=="opacity"){
                  obj.style.filter = "alpha:(opacity:"+(json[attr]+ispeed)+")";
                  obj.style.opacity = (json[attr]+ispeed)/100;
                }else{
                  obj.style[attr] = iCur+ispeed+"px";
                }
              }
              //判断是否全部完成
              if(isStop){
                clearInterval(obj.timer);
                if(fun){
                  fun();
                }
              }
            },30);
          }

        }
      };
    });
})(angular);
