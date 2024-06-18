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
exports.ButtonDefaultProps = exports.ButtonSettings = exports.Button = void 0;
const core_1 = require("@craftjs/core");
const core_2 = require("@material-ui/core");
const react_1 = __importDefault(require("react"));
const Button = (_a) => {
    var { size, variant, color, text } = _a, props = __rest(_a, ["size", "variant", "color", "text"]);
    const { connectors: { connect, drag }, } = (0, core_1.useNode)();
    return (react_1.default.createElement(core_2.Button, Object.assign({ ref: (ref) => connect(drag(ref)), style: { margin: '5px' }, size: size, variant: variant, color: color }, props), text));
};
exports.Button = Button;
const ButtonSettings = () => {
    const { actions: { setProp }, props, } = (0, core_1.useNode)((node) => ({
        props: node.data.props,
    }));
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(core_2.FormControl, { size: "small", component: "fieldset" },
            react_1.default.createElement(core_2.FormLabel, { component: "legend" }, "Size"),
            react_1.default.createElement(core_2.RadioGroup, { defaultValue: props.size, onChange: (e) => setProp((props) => (props.size = e.target.value)) },
                react_1.default.createElement(core_2.FormControlLabel, { label: "Small", value: "small", control: react_1.default.createElement(core_2.Radio, { size: "small", color: "primary" }) }),
                react_1.default.createElement(core_2.FormControlLabel, { label: "Medium", value: "medium", control: react_1.default.createElement(core_2.Radio, { size: "small", color: "primary" }) }),
                react_1.default.createElement(core_2.FormControlLabel, { label: "Large", value: "large", control: react_1.default.createElement(core_2.Radio, { size: "small", color: "primary" }) }))),
        react_1.default.createElement(core_2.FormControl, { component: "fieldset" },
            react_1.default.createElement(core_2.FormLabel, { component: "legend" }, "Variant"),
            react_1.default.createElement(core_2.RadioGroup, { defaultValue: props.variant, onChange: (e) => setProp((props) => (props.variant = e.target.value)) },
                react_1.default.createElement(core_2.FormControlLabel, { label: "Text", value: "text", control: react_1.default.createElement(core_2.Radio, { size: "small", color: "primary" }) }),
                react_1.default.createElement(core_2.FormControlLabel, { label: "Outlined", value: "outlined", control: react_1.default.createElement(core_2.Radio, { size: "small", color: "primary" }) }),
                react_1.default.createElement(core_2.FormControlLabel, { label: "Contained", value: "contained", control: react_1.default.createElement(core_2.Radio, { size: "small", color: "primary" }) }))),
        react_1.default.createElement(core_2.FormControl, { component: "fieldset" },
            react_1.default.createElement(core_2.FormLabel, { component: "legend" }, "Color"),
            react_1.default.createElement(core_2.RadioGroup, { defaultValue: props.color, onChange: (e) => setProp((props) => (props.color = e.target.value)) },
                react_1.default.createElement(core_2.FormControlLabel, { label: "Default", value: "default", control: react_1.default.createElement(core_2.Radio, { size: "small", color: "default" }) }),
                react_1.default.createElement(core_2.FormControlLabel, { label: "Primary", value: "primary", control: react_1.default.createElement(core_2.Radio, { size: "small", color: "primary" }) }),
                react_1.default.createElement(core_2.FormControlLabel, { label: "Secondary", value: "secondary", control: react_1.default.createElement(core_2.Radio, { size: "small", color: "primary" }) })))));
};
exports.ButtonSettings = ButtonSettings;
exports.ButtonDefaultProps = {
    size: 'small',
    variant: 'contained',
    color: 'primary',
    text: 'Click me',
};
exports.Button.craft = {
    props: exports.ButtonDefaultProps,
    related: {
        settings: exports.ButtonSettings,
    },
};
//# sourceMappingURL=Button.js.map