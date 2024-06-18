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
exports.ContainerDefaultProps = exports.ContainerSettings = exports.Container = void 0;
const core_1 = require("@craftjs/core");
const core_2 = require("@material-ui/core");
const core_3 = require("@material-ui/core");
const material_ui_color_picker_1 = __importDefault(require("material-ui-color-picker"));
const react_1 = __importDefault(require("react"));
const Container = (_a) => {
    var { background, padding, children } = _a, props = __rest(_a, ["background", "padding", "children"]);
    const { connectors: { connect, drag }, } = (0, core_1.useNode)();
    return (react_1.default.createElement(core_3.Paper, Object.assign({}, props, { ref: (ref) => connect(drag(ref)), style: { margin: '5px 0', background, padding: `${padding}px` } }), children));
};
exports.Container = Container;
const ContainerSettings = () => {
    const { background, padding, actions: { setProp }, } = (0, core_1.useNode)((node) => ({
        background: node.data.props.background,
        padding: node.data.props.padding,
    }));
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(core_3.FormControl, { fullWidth: true, margin: "normal", component: "fieldset" },
            react_1.default.createElement(core_3.FormLabel, { component: "legend" }, "Background"),
            react_1.default.createElement(material_ui_color_picker_1.default, { name: "background-color", value: background, onChange: (color) => {
                    setProp((props) => (props.background = color), 500);
                } })),
        react_1.default.createElement(core_3.FormControl, { fullWidth: true, margin: "normal", component: "fieldset" },
            react_1.default.createElement(core_3.FormLabel, { component: "legend" }, "Padding"),
            react_1.default.createElement(core_2.Slider, { defaultValue: padding, onChange: (_, value) => setProp((props) => (props.padding = value), 500) }))));
};
exports.ContainerSettings = ContainerSettings;
exports.ContainerDefaultProps = {
    background: '#ffffff',
    padding: 3,
};
exports.Container.craft = {
    props: exports.ContainerDefaultProps,
    related: {
        settings: exports.ContainerSettings,
    },
};
//# sourceMappingURL=Container.js.map