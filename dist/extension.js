"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode = __toESM(require("vscode"));
function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand("vscode-test-2.openWebView", () => {
      const panel = vscode.window.createWebviewPanel(
        "testWebview",
        // Identifies the type of the webview. Used internally
        "Test Webview",
        // Title of the panel displayed to the user
        vscode.ViewColumn.One,
        // Editor column to show the new webview panel in
        {}
        // Webview options
      );
      panel.webview.html = getWebviewContent();
    })
  );
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "vscodeTest2View",
      new TestViewProvider(context)
    )
  );
}
function getWebviewContent() {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Test Webview</title>
    </head>
    <body>
      <h1>Hello from Webview</h1>
      <p>This is your webview content.</p>
    </body>
    </html>`;
}
var TestViewProvider = class {
  constructor(context) {
    this.context = context;
  }
  resolveWebviewView(webviewView) {
    webviewView.webview.options = {
      enableScripts: true
    };
    webviewView.webview.html = getWebviewContent();
  }
};
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
//# sourceMappingURL=extension.js.map
