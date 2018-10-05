(function (f) {
    f.module("angularTreeview", []).directive("treeModel", function ($compile) {
        return {
            restrict: "A",
            link: function (b, h, c) {
                var a = c.treeId, g = c.treeModel, e = c.nodeLabel || "label", d = c.nodeChildren || "children",v= c.nodeTitle;
                e = '<ul on-finish-render ><li  data-ng-repeat="node in ' + g + '"><i  data-ng-show="node.' + d + '.length && node.collapsed" data-ng-click="' + a + '.selectNodeHead(node)"><img class="img " id="u11791_img" src="img/u11761.png"></i><i  data-ng-show="node.' + d + '.length && !node.collapsed" data-ng-click="' + a + '.selectNodeHead(node)"><img class="img " id="u11791_img" src="img/u11761_selected.png"></i><i  data-ng-hide="node.' +
                    d + '.length"></i> <span  data-ng-class="node.selected"  data-ng-click="' + a + '.selectNodeLabel(node)">{{node.' + v + '||node.' + e + '}}</span><div data-ng-hide="node.collapsed" data-tree-id="' + a + '" data-tree-model="node.' + d + '" data-node-id=' + (c.nodeId || "id") + " data-node-label=" + e + " data-node-children=" + d + " ></div></li></ul>";
                a && g && (c.angularTreeview && (b[a] = b[a] || {},
                    b[a].selectNodeHead = b[a].selectNodeHead || function (a) {
                    a.collapsed = !a.collapsed
                }, b[a].selectNodeLabel = b[a].selectNodeLabel || function (c) {
                    b[a].currentNode && b[a].currentNode.selected &&
                    (b[a].currentNode.selected = void 0);
                    if(c.children!=undefined&&c.children.length>0){
                        /*if(c.children.children.length>0) {
                            c.children[0].children[0].selected = "selected"
                            b[a].currentNode = c.children[0].children[0];
                            return;
                        }*/
                        c.children[0].selected="selected"
                        b[a].currentNode = c.children[0];
                        return;
                    }
                    c.selected = "selected";
                    b[a].currentNode = c
                }), h.html('').append($compile(e)(b)))
                b.$emit('ngRepeatFinished');
                b.$on('ngRepeatFinished', function( ngRepeatFinishedEvent ) {
                    if(c.treeFirst){
                        var q=b[c.treeModel][0];
                        b[a].selectNodeLabel(q);
                    }
                });
            }
        }
    })
})(angular);