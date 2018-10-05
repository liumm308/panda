window.onload = function () {
    var oUl = document.getElementById("ul1");
    var aLi = oUl.getElementsByTagName("li");
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

    //��ק
    function setDrag(obj) {
        obj.onmouseover = function () {
            obj.style.cursor = "move";
        }
        obj.onmousedown = function (event) {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
            obj.style.zIndex = minZindex++;
            //����갴��ʱ�����������ק����ľ���
            disX = event.clientX + scrollLeft - obj.offsetLeft;
            disY = event.clientY + scrollTop - obj.offsetTop;
            document.onmousemove = function (event) {
                //������϶�ʱ����div��λ��
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
                document.onmousemove = null;//����굯��ʱ�Ƴ��ƶ��¼�
                document.onmouseup = null;//�Ƴ�up�¼�������ڴ�
                //����Ƿ������ϣ��ڽ���λ��
                var oNear = findMin(obj);
                if (oNear) {
                    oNear.className = "";
                    oNear.style.zIndex = minZindex++;
                    obj.style.zIndex = minZindex++;
                    startMove(oNear, aPos[obj.index]);
                    startMove(obj, aPos[oNear.index]);
                    //����index
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
            return false;//�Ͱ汾���ֽ�ֹ���
        }
    }

    //��ײ���
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

    //���ɶ��������
    function getDis(obj1, obj2) {
        var a = obj1.offsetLeft - obj2.offsetLeft;
        var b = obj1.offsetTop - obj2.offsetTop;
        return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    }

    //�ҵ���������
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
}
