"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsPanel = void 0;
const core_1 = require("@craftjs/core");
const core_2 = require("@material-ui/core");
const react_1 = __importDefault(require("react"));
const SettingsPanel = () => {
    const { actions, selected, isEnabled } = (0, core_1.useEditor)((state, query) => {
        const currentNodeId = query.getEvent('selected').last();
        let selected;
        if (currentNodeId) {
            selected = {
                id: currentNodeId,
                name: state.nodes[currentNodeId].data.name,
                settings: state.nodes[currentNodeId].related &&
                    state.nodes[currentNodeId].related.settings,
                isDeletable: query.node(currentNodeId).isDeletable(),
            };
        }
        return {
            selected,
            isEnabled: state.options.enabled,
        };
    });
    return isEnabled && selected ? (react_1.default.createElement(core_2.Box, { bgcolor: "rgba(0, 0, 0, 0.06)", mt: 2, px: 2, py: 2 },
        react_1.default.createElement(core_2.Grid, { container: true, direction: "column", spacing: 0 },
            react_1.default.createElement(core_2.Grid, { item: true },
                react_1.default.createElement(core_2.Box, { pb: 2 },
                    react_1.default.createElement(core_2.Grid, { container: true, alignItems: "center" },
                        react_1.default.createElement(core_2.Grid, { item: true, xs: true },
                            react_1.default.createElement(core_2.Typography, { variant: "subtitle1" }, "Selected")),
                        react_1.default.createElement(core_2.Grid, { item: true },
                            react_1.default.createElement(core_2.Chip, { size: "small", color: "primary", label: selected.name, "data-cy": "chip-selected" }))))),
            react_1.default.createElement("div", { "data-cy": "settings-panel" }, selected.settings && react_1.default.createElement(selected.settings)),
            selected.isDeletable ? (react_1.default.createElement(core_2.Button, { variant: "contained", color: "default", onClick: () => {
                    actions.delete(selected.id);
                } }, "Delete")) : null))) : null;
};
exports.SettingsPanel = SettingsPanel;
//# sourceMappingURL=SettingsPanel.js.map