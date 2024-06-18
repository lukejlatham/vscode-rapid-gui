"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toolbox = void 0;
const core_1 = require("@craftjs/core");
const core_2 = require("@material-ui/core");
const react_1 = __importDefault(require("react"));
const Button_1 = require("./user/Button");
const Card_1 = require("./user/Card");
const Text_1 = require("./user/Text");
const Toolbox = () => {
    const { connectors } = (0, core_1.useEditor)();
    return (react_1.default.createElement(core_2.Box, { px: 2, py: 2 },
        react_1.default.createElement(core_2.Grid, { container: true, direction: "column", alignItems: "center", justify: "center", spacing: 1 },
            react_1.default.createElement(core_2.Box, { pb: 2 },
                react_1.default.createElement(core_2.Typography, null, "Drag to add")),
            react_1.default.createElement(core_2.Grid, { container: true, direction: "column", item: true },
                react_1.default.createElement(core_2.Button, { ref: (ref) => connectors.create(ref, react_1.default.createElement(Button_1.Button, { text: "Click me", size: "small" })), variant: "contained" }, "Button")),
            react_1.default.createElement(core_2.Grid, { container: true, direction: "column", item: true },
                react_1.default.createElement(core_2.Button, { ref: (ref) => connectors.create(ref, react_1.default.createElement(Text_1.Text, { text: "Hi world" })), variant: "contained" }, "Text")),
            react_1.default.createElement(core_2.Grid, { container: true, direction: "column", item: true },
                react_1.default.createElement(core_2.Button, { ref: (ref) => connectors.create(ref, react_1.default.createElement(Card_1.Card, null)), variant: "contained" }, "Card")))));
};
exports.Toolbox = Toolbox;
//# sourceMappingURL=Header.js.map