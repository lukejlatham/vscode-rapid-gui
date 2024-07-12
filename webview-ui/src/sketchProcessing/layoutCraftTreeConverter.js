var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var convertToFullVersion = function (simplifiedNodes) {
    var fullNodes = {};
    var createFullNode = function (node, parentId) {
        var isCanvas = ["Container", "Columns", "Column", "Rows", "Row"].includes(node.type.resolvedName);
        var props = node.type.resolvedName === "Columns" ? { numberOfCols: 2, gap: 0 } : {};
        var fullNode = __assign({ type: node.type, isCanvas: isCanvas, props: props, displayName: node.type.resolvedName, custom: {}, hidden: false, nodes: node.children, linkedNodes: {} }, (parentId && { parent: parentId }));
        return fullNode;
    };
    simplifiedNodes.forEach(function (node) {
        fullNodes[node.id] = createFullNode(node);
    });
    simplifiedNodes.forEach(function (node) {
        node.children.forEach(function (childId) {
            if (fullNodes[childId]) {
                fullNodes[childId].parent = node.id;
            }
        });
    });
    return fullNodes;
};
// Example usage:
var simplifiedNodes = [
    {
        id: "container1",
        type: {
            resolvedName: "Container",
        },
        children: ["columns1"],
    },
    {
        id: "columns1",
        type: {
            resolvedName: "Columns",
        },
        children: ["column1", "column2"],
    },
    {
        id: "column1",
        type: {
            resolvedName: "Column",
        },
        children: ["label1", "label2"],
    },
    {
        id: "column2",
        type: {
            resolvedName: "Column",
        },
        children: ["button1", "button2"],
    },
    {
        id: "label1",
        type: {
            resolvedName: "Label",
        },
        children: [],
    },
    {
        id: "label2",
        type: {
            resolvedName: "Label",
        },
        children: [],
    },
    {
        id: "button1",
        type: {
            resolvedName: "Button",
        },
        children: [],
    },
    {
        id: "button2",
        type: {
            resolvedName: "Button",
        },
        children: [],
    },
];
var fullNodes = convertToFullVersion(simplifiedNodes);
console.log(fullNodes);
