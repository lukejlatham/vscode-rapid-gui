"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const core_1 = require("@material-ui/core");
const core_2 = require("@craftjs/core");
const SettingsPanel_1 = require("./components/SettingsPanel");
const Toolbox_1 = require("./components/Toolbox");
const Topbar_1 = require("./components/Topbar");
const Button_1 = require("./components/user/Button");
const Card_1 = require("./components/user/Card");
const Container_1 = require("./components/user/Container");
const Text_1 = require("./components/user/Text");
const useStyles = (0, core_1.makeStyles)(() => ({
    root: {
        padding: 0,
        background: "rgb(252, 253, 253)",
    },
    fullHeight: {
        height: "100%",
    },
    gridItem: {
        display: "flex",
        flexDirection: "column",
    },
}));
const App = () => {
    const classes = useStyles();
    return (react_1.default.createElement(core_2.Editor, { resolver: {
            Card: Card_1.Card,
            Button: Button_1.Button,
            Text: Text_1.Text,
            Container: Container_1.Container,
            CardTop: Card_1.CardTop,
            CardBottom: Card_1.CardBottom,
        } },
        react_1.default.createElement(core_1.Grid, { container: true, spacing: 5, style: { paddingTop: "10px", height: "100vh" }, alignItems: "flex-start", className: classes.fullHeight },
            react_1.default.createElement(core_1.Grid, { item: true, xs: 8, className: classes.gridItem },
                react_1.default.createElement(core_1.Paper, { className: classes.root, style: { flex: 1 } },
                    react_1.default.createElement(SettingsPanel_1.SettingsPanel, null),
                    react_1.default.createElement(Topbar_1.Topbar, null),
                    react_1.default.createElement(core_2.Frame, null,
                        react_1.default.createElement(core_2.Element, { canvas: true, is: Container_1.Container, padding: 5, background: "#eeeeee", "data-cy": "root-container" },
                            react_1.default.createElement(Card_1.Card, { "data-cy": "frame-card" }),
                            react_1.default.createElement(Text_1.Text, { fontSize: 20, text: "Hi world!", "data-cy": "frame-text" }),
                            react_1.default.createElement(core_2.Element, { canvas: true, is: Container_1.Container, padding: 6, background: "#999999", "data-cy": "frame-container" },
                                react_1.default.createElement(Text_1.Text, { size: "small", text: "It's me again!", "data-cy": "frame-container-text" })))))),
            react_1.default.createElement(core_1.Grid, { item: true, xs: 4, className: classes.gridItem },
                react_1.default.createElement(core_1.Paper, { className: classes.root, style: { flex: 1 } },
                    react_1.default.createElement(Toolbox_1.Toolbox, null))))));
};
react_dom_1.default.render(react_1.default.createElement(App, null), document.getElementById("editor"));
//# sourceMappingURL=webview.js.map