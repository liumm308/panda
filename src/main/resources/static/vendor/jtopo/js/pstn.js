var dropData;
var error = document.getElementById('error');
var canvas = document.getElementById('canvas');
var stage = new JTopo.Stage(canvas); // 一个抽象的舞台对象,对应一个Canvas和多个场景对象(Scene)
// 显示工具栏
showJTopoToobar(stage);

var scene = new JTopo.Scene(); // 场景对象，概念上同很多图形系统中的Layer
scene.background = './img/bg.png';

function node(x, y, img, name) {
	var node = new JTopo.Node(name);
	node.setImage('./img/pstn/' + img, true); // 设置节点图片
	node.setLocation(x, y); // 设置节点在场景中的位置坐标(左上角）
	node.data = [ {
		name : '小明'
	}, {
		name : '栗色'
	} ];
	scene.add(node);
	return node;
}

function linkNode(nodeA, nodeZ) {
	var link = new JTopo.FoldLink(nodeA, nodeZ);
	link.lineWidth = 3;
	link.strokeColor = '255,255,0';
	scene.add(link);
	return link;
}

var s1 = node(49, 41, 'satellite_antenna.png', 'Satellitte Feed');
var s2 = node(57, 136, 'antenna.png', 'Off air');
var s3 = node(57, 251, 'msc.png', 'Programing');

var r1 = node(143, 13, 'router.png', 'r1');
var r2 = node(143, 43, 'router.png', 'r2');
r2.alarm = '2 W';
var r3 = node(143, 73, 'router.png', 'r3');
var r4 = node(143, 103, 'router.png', 'r4');
var r5 = node(143, 133, 'router.png', 'r5');

var r6 = node(243, 103, 'router.png', 'r6');
r6.mouseover(function(even) {
	console.log(even);
	console.log(dropData);
	if (dropData == "" || dropData == undefined)
		return;
	if (dropData == "host.png") {
		error.innerHTML = "禁止拖放！";
		return;
	} else {
		var newNode = node(even.x - 100, 253, dropData, 'test');
		linkNode(newNode, this);
		dropData = "";
	}
});
linkNode(r1, r6);
linkNode(r2, r6);
linkNode(r3, r6);
linkNode(r4, r6);
linkNode(r5, r6);

var r7 = node(143, 163, 'router.png', 'r7');
var r8 = node(143, 223, 'router.png', 'r8');
linkNode(r7, r6);
linkNode(r8, r6);

var dataCloud = node(316, 113, 'cloud.png');
scene.add(new JTopo.Link(dataCloud, r6));

var tw130 = node(436, 107, 'tw130.png');
scene.add(new JTopo.Link(tw130, dataCloud));

var pstn = node(316, 176, 'cloud.png');
linkNode(pstn, tw130);

var wdm = node(525, 114, 'wdm.png', 'WDM');
scene.add(new JTopo.Link(wdm, tw130));

var testing = node(568, 128, 'testing.png');
testing.alarm = '1 M';
scene.add(new JTopo.Link(testing, wdm));

var wdm2 = node(607, 114, 'wdm.png', 'WDM');
scene.add(new JTopo.Link(wdm2, testing));

var mainframe = node(654, 152, 'mainframe.png');
linkNode(mainframe, wdm2);

var phone = node(738, 173, 'phone.png', 'Phone');
linkNode(phone, mainframe);

var host = node(730, 225, 'host.png', 'Pc');
linkNode(host, mainframe);

var router2 = node(706, 282, 'router2.png', 'STB');
router2.alarm = "1 W";
router2.alarmColor = '0,255,0';
linkNode(router2, mainframe);

var terminal = node(669, 326, 'terminal.png', 'IPTV/SDV');
linkNode(terminal, router2);

var modem = node(623, 49, 'modem.png', 'Modem');
var pc = node(742, 7, 'host.png');
var router3 = node(671, 73, 'router2.png');
var terminal3 = node(736, 100, 'terminal.png');

linkNode(pc, modem);
linkNode(router3, modem);
linkNode(terminal3, router3);

stage.add(scene);

scene.dbclick(function(event) {
	if (event.target == null)
		return;
	var e = event.target;
	console.log(e);
});

scene.addEventListener("mouseover", function(event) {
	// console.log(event);
});

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("id", ev.target.id);
}

function drop(ev) {
	ev.preventDefault();
	dropData = ev.dataTransfer.getData("id");
	console.log(dropData);
}