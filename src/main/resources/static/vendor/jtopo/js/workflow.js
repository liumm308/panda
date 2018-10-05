var dropData;//拖拽对象数据
var nodeNum = 0;//画布上的节点数
var baseNode;//主节点
var nodeData  = {};
nodeData["base"] = {mark:'base',config:{名称:"基础网络",描述:"基础网络描述"},error:"",allowNode:['instance','router','loadbalancer']};
nodeData["instance"] = {mark:'instance',config:{名称:"主机",描述:"主机描述"},error:"请将主机添加到基础网络或私有网络中！",allowNode:['eip']};
nodeData["vxnet"] = {mark:'vxnet',config:{名称:"私有网络",描述:"私有网络描述"},error:"请将受管私有网络添加到路由器中！",allowNode:['vxnet','eip']};
nodeData["router"] = {mark:'router',config:{名称:"路由器",描述:"路由器描述"},error:"请将路由器添加到基础网络中！",allowNode:['eip']};
nodeData["loadbalancer"] = {mark:'loadbalancer',config:{名称:"负载均衡器",描述:"负载均衡器描述"},error:"请将负载均衡器添加到基础网络或私有网络中！",allowNode:['listener','eip']};
nodeData["listener"] = {mark:'listener',config:{名称:"负载均衡器监听器",描述:"负载均衡器监听器描述"},error:"请将负载均衡器监听器添加到负载均衡器中！",allowNode:[]};
nodeData["eip"] = {mark:'eip',config:{名称:"公网IP",描述:"公网IP描述"},error:"请将公网IP添加到路由器或基础网络的主机、公网负载均衡器中！",allowNode:[]};

var error = $('#error');
var canvas = document.getElementById('canvas');

var stage = new JTopo.Stage(canvas); // 一个抽象的舞台对象,对应一个Canvas和多个场景对象(Scene)
showJTopoToobar(stage);// 显示工具栏

var scene = new JTopo.Scene(); // 场景对象，概念上同很多图形系统中的Layer
scene.background = 'vendor/jtopo/img/bg.png';

function node(x, y, img, mark, config) {
	nodeNum++;
	var node = new JTopo.Node(config.名称);
	node.setImage('vendor/jtopo/img/me/' + img, true); // 设置节点图片
	node.setLocation(x, y); // 设置节点在场景中的位置坐标(左上角）
	node.fontColor = "0.0.0";
	node.mark = mark;
	node.config = config;
	scene.add(node);
	node.childNodeNum = 0;
	node.addEventListener("mouseover",function() {
		this.fontColor = "31,144,200";
		dropToAddnode(this);
	},false);
	node.addEventListener("mouseout",function() {
		this.fontColor = "0.0.0";
	});
	node.addEventListener("click",configParams(node));
	return node;
}
function linkNode(nodeA, nodeZ) {
	var link = new JTopo.Link(nodeA, nodeZ);
	link.lineWidth = 3;
	link.strokeColor = '191,191,191';
	scene.add(link);
	return link;
}

//二次折线
function newFlexionalLink(nodeA, nodeZ, text, direction, dashedPattern){
    var link = new JTopo.FlexionalLink(nodeA, nodeZ, text);
    link.direction = direction || 'horizontal';
   // link.arrowsRadius = 10;
   // link.lineWidth = 1; // 线宽
    link.offsetGap = 20;
    //link.bundleGap = 15; // 线条之间的间隔
   // link.textOffsetY = 10; // 文本偏移量（向下15个像素）
    link.strokeColor = '191,191,191';
    link.dashedPattern = dashedPattern; 
    scene.add(link);
    return link;
}

//点击节点时配置参数
function configParams(configNode) {
	return function() {
		var dl = $("#config-params");
		dl.html("");
		for (var key in configNode.config) {
			dl.append('<dt>'+key+'</dt><dd>'+configNode.config[key]+'</dd>');
	    }
	}
}

//拖拽后，鼠标松开创建节点 dropNode：被拖放的节点
function dropToAddnode(dropNode) {
	if (dropData == "" || dropData == undefined) {
		if(dropNode == baseNode) 
			clearBaseNode();
		return;	
	}
	
	var allowNodeArr  = nodeData[dropNode.mark].allowNode;
	if(allowNodeArr.length == 0 || allowNodeArr.indexOf(dropData) == -1) {
		setError(nodeData[dropData].error);
		clearBaseNode();
		return;
	} 
		createNode(dropNode, nodeData[dropData]);
}

function createNode(curNode, data) {
	var config = data.config;
	var newNode = node(curNode.x + 80, curNode.y + 50*curNode.childNodeNum, dropData+'.png', data.mark,config);
	newFlexionalLink(curNode, newNode);
	curNode.childNodeNum++;
	dropData = "";
}

//清除基节点
function clearBaseNode() {
	if(baseNode.childNodeNum == 0) {
		scene.remove(baseNode);
		baseNode = "";
		nodeNum--;
	};
	dropData = "";
}

//画布初始化，创建节点
var init =  function() {
	if(baseNode == "" || baseNode == undefined) {
		var baseData = nodeData["base"];
		baseNode = node(30, 30, baseData.mark + '.png', baseData.mark, baseData.config);
	}
	
	dropToAddnode(baseNode);
	
	if(nodeNum == 0){
		$("#tip").show();
	} else {
		$("#tip").hide();
		stage.removeEventListener("mouseover",init,false);
	}

}

stage.addEventListener("mouseover",init);

stage.add(scene);

function setError(message) {
	error.css({'display': 'block'}).html(message);
	setTimeout(function() {
		error.css({'display': 'none'});
	},3000);
}

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
	ev.preventDefault();
	dropData = ev.dataTransfer.getData("text");
}