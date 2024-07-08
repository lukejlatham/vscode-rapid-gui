"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var simpleJson = require('./simple_sketch_layout.json');
// Example initial JSON structure
var uiJson = simpleJson;
// Helper function to generate unique IDs
var generateUniqueId = function () { return '_' + Math.random().toString(36).substr(2, 9); };
// Recursive function to convert JSON to Craft.js node tree
var convertToCraftJsNodes = function (node, parentId) {
    var _a;
    if (parentId === void 0) { parentId = null; }
    var type = Object.keys(node)[0];
    var nodeId = generateUniqueId();
    var children = node[type].children || [];
    var childNodes = children.map(function (child) { return convertToCraftJsNodes(child, nodeId); });
    var craftNode = {
        type: { resolvedName: type },
        isCanvas: ['Container', 'Canvas'].includes(type),
        props: { id: node[type].id },
        displayName: type,
        custom: {},
        parent: parentId,
        hidden: false,
        nodes: childNodes.map(function (child) { return Object.keys(child)[0]; }),
        linkedNodes: {}
    };
    return __assign((_a = {}, _a[nodeId] = craftNode, _a), Object.assign.apply(Object, __spreadArray([{}], childNodes, false)));
};
// Generate Craft.js node tree
var craftJsNodeTree = {
    ROOT: {
        type: { resolvedName: "Container" },
        parent: null,
        isCanvas: true,
        props: { id: "root" },
        displayName: "Container",
        custom: {},
        hidden: false,
        nodes: [],
        linkedNodes: {}
    }
};
var rootNodeId = Object.keys(uiJson)[0];
var rootNode = convertToCraftJsNodes((_a = {}, _a[rootNodeId] = uiJson[rootNodeId], _a));
var rootFirstChildId = Object.keys(rootNode)[0];
craftJsNodeTree.ROOT.nodes.push(rootFirstChildId);
Object.assign(craftJsNodeTree, rootNode);
// Fix the parent field for the first-level node
if (craftJsNodeTree[rootFirstChildId]) {
    craftJsNodeTree[rootFirstChildId].parent = 'ROOT';
}
console.log(JSON.stringify(craftJsNodeTree, null, 2));
