"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.TextDefaultProps = exports.Text = void 0;
const core_1 = require("@craftjs/core");
const core_2 = require("@material-ui/core");
const react_1 = __importStar(require("react"));
const react_contenteditable_1 = __importDefault(require("react-contenteditable"));
const Text = (_a) => {
    var { text, fontSize, textAlign } = _a, props = __rest(_a, ["text", "fontSize", "textAlign"]);
    const { connectors: { connect, drag }, selected, actions: { setProp }, } = (0, core_1.useNode)((state) => ({
        selected: state.events.selected,
        dragged: state.events.dragged,
    }));
    const [editable, setEditable] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (selected) {
            return;
        }
        setEditable(false);
    }, [selected]);
    return (react_1.default.createElement("div", Object.assign({}, props, { ref: (ref) => connect(drag(ref)), onClick: () => selected && setEditable(true) }),
        react_1.default.createElement(react_contenteditable_1.default, { html: text, disabled: !editable, onChange: (e) => setProp((props) => (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, '')), 500), tagName: "p", style: { fontSize: `${fontSize}px`, textAlign } })));
};
exports.Text = Text;
const TextSettings = () => {
    const { actions: { setProp }, fontSize, } = (0, core_1.useNode)((node) => ({
        text: node.data.props.text,
        fontSize: node.data.props.fontSize,
    }));
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_2.FormControl, { size: "small", component: "fieldset" },
            react_1.default.createElement(core_2.FormLabel, { component: "legend" }, "Font size"),
            react_1.default.createElement(core_2.Slider, { value: fontSize || 7, step: 7, min: 1, max: 50, onChange: (_, value) => {
                    setProp((props) => (props.fontSize = value), 1000);
                } }))));
};
exports.TextDefaultProps = {
    text: 'Hi',
    fontSize: 20,
};
exports.Text.craft = {
    props: exports.TextDefaultProps,
    related: {
        settings: TextSettings,
    },
};
//# sourceMappingURL=Text.js.map