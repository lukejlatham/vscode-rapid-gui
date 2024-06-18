"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = exports.CardBottom = exports.CardTop = void 0;
const core_1 = require("@craftjs/core");
const react_1 = __importDefault(require("react"));
const Button_1 = require("./Button");
const Container_1 = require("./Container");
const Text_1 = require("./Text");
const CardTop = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    const { connectors: { connect }, } = (0, core_1.useNode)();
    return (react_1.default.createElement("div", Object.assign({}, props, { ref: connect, className: "text-only", style: {
            padding: '10px',
            marginBottom: '10px',
            borderBottom: '1px solid #eee',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
        } }), children));
};
exports.CardTop = CardTop;
exports.CardTop.craft = {
    rules: {
        canMoveIn: (incomingNodes) => incomingNodes.every((incomingNode) => incomingNode.data.type === Text_1.Text),
    },
};
const CardBottom = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    const { connectors: { connect }, } = (0, core_1.useNode)();
    return (react_1.default.createElement("div", Object.assign({}, props, { style: { padding: '10px 0' }, ref: connect }), children));
};
exports.CardBottom = CardBottom;
exports.CardBottom.craft = {
    rules: {
        canMoveIn: (incomingNodes) => incomingNodes.every((incomingNode) => incomingNode.data.type === Button_1.Button),
    },
};
const Card = (_a) => {
    var { background, padding = 20 } = _a, props = __rest(_a, ["background", "padding"]);
    return (react_1.default.createElement(Container_1.Container, Object.assign({}, props, { background: background, padding: padding }),
        react_1.default.createElement(core_1.Element, { canvas: true, id: "text", is: exports.CardTop, "data-cy": "card-top" },
            react_1.default.createElement(Text_1.Text, { text: "Only texts", fontSize: 20, "data-cy": "card-top-text-1" }),
            react_1.default.createElement(Text_1.Text, { text: "are allowed up here", fontSize: 15, "data-cy": "card-top-text-2" })),
        react_1.default.createElement(core_1.Element, { canvas: true, id: "buttons", is: exports.CardBottom, "data-cy": "card-bottom" },
            react_1.default.createElement(Button_1.Button, { size: "small", text: "Only buttons down here", "data-cy": "card-bottom-button" }))));
};
exports.Card = Card;
exports.Card.craft = {
    props: Container_1.ContainerDefaultProps,
    related: {
        settings: Container_1.ContainerSettings,
    },
};
//# sourceMappingURL=Card.js.map