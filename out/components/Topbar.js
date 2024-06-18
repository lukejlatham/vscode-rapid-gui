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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Topbar = void 0;
const core_1 = require("@craftjs/core");
const core_2 = require("@material-ui/core");
const copy_to_clipboard_1 = __importDefault(require("copy-to-clipboard"));
const lzutf8_1 = __importDefault(require("lzutf8"));
const react_1 = __importStar(require("react"));
const Topbar = () => {
    const { actions, query, enabled, canUndo, canRedo } = (0, core_1.useEditor)((state, query) => ({
        enabled: state.options.enabled,
        canUndo: state.options.enabled && query.history.canUndo(),
        canRedo: state.options.enabled && query.history.canRedo(),
    }));
    const [dialogOpen, setDialogOpen] = (0, react_1.useState)(false);
    const [snackbarMessage, setSnackbarMessage] = (0, react_1.useState)();
    const [stateToLoad, setStateToLoad] = (0, react_1.useState)(null);
    return (react_1.default.createElement(core_2.Box, { px: 1, py: 1, mt: 3, mb: 1, bgcolor: "#cbe8e7" },
        react_1.default.createElement(core_2.Grid, { container: true, alignItems: "center" },
            react_1.default.createElement(core_2.Grid, { item: true, xs: true },
                react_1.default.createElement(core_2.FormControlLabel, { className: "enable-disable-toggle", control: react_1.default.createElement(core_2.Switch, { checked: enabled, onChange: (_, value) => actions.setOptions((options) => (options.enabled = value)) }), label: "Enable" }),
                react_1.default.createElement(core_2.Button, { className: "copy-state-btn", size: "small", variant: "outlined", color: "secondary", disabled: !canUndo, onClick: () => actions.history.undo(), style: { marginRight: '10px' } }, "Undo"),
                react_1.default.createElement(core_2.Button, { className: "copy-state-btn", size: "small", variant: "outlined", color: "secondary", disabled: !canRedo, onClick: () => actions.history.redo(), style: { marginRight: '10px' } }, "Redo")),
            react_1.default.createElement(core_2.Grid, { item: true },
                react_1.default.createElement(core_2.Button, { className: "copy-state-btn", size: "small", variant: "outlined", color: "secondary", onClick: () => {
                        const json = query.serialize();
                        (0, copy_to_clipboard_1.default)(lzutf8_1.default.encodeBase64(lzutf8_1.default.compress(json)));
                        setSnackbarMessage('State copied to clipboard');
                    }, style: { marginRight: '10px' } }, "Copy current state"),
                react_1.default.createElement(core_2.Button, { className: "load-state-btn", size: "small", variant: "outlined", color: "secondary", onClick: () => setDialogOpen(true) }, "Load"),
                react_1.default.createElement(core_2.Dialog, { open: dialogOpen, onClose: () => setDialogOpen(false), fullWidth: true, maxWidth: "md" },
                    react_1.default.createElement(core_2.DialogTitle, { id: "alert-dialog-title" }, "Load state"),
                    react_1.default.createElement(core_2.DialogContent, null,
                        react_1.default.createElement(core_2.TextField, { multiline: true, fullWidth: true, placeholder: 'Paste the contents that was copied from the "Copy Current State" button', size: "small", value: stateToLoad || '', onChange: (e) => setStateToLoad(e.target.value) })),
                    react_1.default.createElement(core_2.DialogActions, null,
                        react_1.default.createElement(core_2.Button, { onClick: () => setDialogOpen(false), color: "primary" }, "Cancel"),
                        react_1.default.createElement(core_2.Button, { onClick: () => {
                                setDialogOpen(false);
                                const json = lzutf8_1.default.decompress(lzutf8_1.default.decodeBase64(stateToLoad));
                                actions.deserialize(json);
                                setSnackbarMessage('State loaded');
                            }, color: "primary", autoFocus: true }, "Load"))),
                react_1.default.createElement(core_2.Snackbar, { autoHideDuration: 1000, anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center',
                    }, open: !!snackbarMessage, onClose: () => setSnackbarMessage(null), message: react_1.default.createElement("span", null, snackbarMessage) })))));
};
exports.Topbar = Topbar;
//# sourceMappingURL=Topbar.js.map