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
var path = __toESM(require("path"));
function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand("vscode-test-2.openWebView", () => {
      const panel = vscode.window.createWebviewPanel(
        "reactWebview",
        // Identifies the type of the webview. Used internally
        "React Webview",
        // Title of the panel displayed to the user
        vscode.ViewColumn.One,
        // Editor column to show the new webview panel in
        {
          enableScripts: true
        }
      );
      const appPath = path.join(context.extensionPath, "dist");
      const bundleUri = panel.webview.asWebviewUri(
        vscode.Uri.file(path.join(appPath, "bundle.js"))
      );
      const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>React Webview</title>
        </head>
        <body>
          <div id="root"></div>
          <script src="${bundleUri}"></script>
        </body>
        </html>`;
      panel.webview.html = html;
    })
  );
  const treeDataProvider = new TestViewProvider();
  vscode.window.registerTreeDataProvider("vscodeTest2View", treeDataProvider);
  context.subscriptions.push(
    vscode.commands.registerCommand("vscode-test-2.refreshTree", () => treeDataProvider.refresh())
  );
}
var TestViewProvider = class {
  constructor() {
    this._onDidChangeTreeData = new vscode.EventEmitter();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
  }
  getTreeItem(element) {
    return element;
  }
  getChildren(element) {
    if (element) {
      return Promise.resolve(this.getMockData(element.label));
    } else {
      return Promise.resolve([
        new TreeItem2("Create New Project", vscode.TreeItemCollapsibleState.Collapsed),
        new TreeItem2("Recent Projects", vscode.TreeItemCollapsibleState.Collapsed),
        new TreeItem2("Settings", vscode.TreeItemCollapsibleState.Collapsed)
      ]);
    }
  }
  getMockData(section) {
    switch (section) {
      case "Create New Project":
        return [
          new TreeItem2("Create from Scratch", vscode.TreeItemCollapsibleState.None, {
            command: "vscode-test-2.openWebView",
            title: "Create from Scratch",
            arguments: []
          }),
          new TreeItem2("Create from Sketch", vscode.TreeItemCollapsibleState.None, {
            command: "vscode-test-2.openWebView",
            title: "Create from Sketch",
            arguments: []
          }),
          new TreeItem2("Create from Prompt", vscode.TreeItemCollapsibleState.None, {
            command: "vscode-test-2.openWebView",
            title: "Create from Prompt",
            arguments: []
          }),
          new TreeItem2("Create from Template", vscode.TreeItemCollapsibleState.None, {
            command: "vscode-test-2.openWebView",
            title: "Create from Template",
            arguments: []
          })
        ];
      case "Recent Projects":
        return [
          new TreeItem2("my-issues.github-issues", vscode.TreeItemCollapsibleState.None, {
            command: "vscode-test-2.openWebView",
            title: "my-issues.github-issues",
            arguments: []
          }),
          new TreeItem2("fortune500.ipynb", vscode.TreeItemCollapsibleState.None, {
            command: "vscode-test-2.openWebView",
            title: "fortune500.ipynb",
            arguments: []
          }),
          new TreeItem2("sample.ipynb", vscode.TreeItemCollapsibleState.None, {
            command: "vscode-test-2.openWebView",
            title: "sample.ipynb",
            arguments: []
          }),
          new TreeItem2("playground.ipynb", vscode.TreeItemCollapsibleState.None, {
            command: "vscode-test-2.openWebView",
            title: "playground.ipynb",
            arguments: []
          })
        ];
      case "Settings":
        return [
          new TreeItem2("What's New", vscode.TreeItemCollapsibleState.None, {
            command: "vscode-test-2.openWebView",
            title: "What's New",
            arguments: []
          }),
          new TreeItem2("Extension Documentation", vscode.TreeItemCollapsibleState.None, {
            command: "vscode-test-2.openWebView",
            title: "Extension Documentation",
            arguments: []
          })
        ];
      default:
        return [];
    }
  }
  refresh() {
    this._onDidChangeTreeData.fire(void 0);
  }
};
var TreeItem2 = class extends vscode.TreeItem {
  constructor(label, collapsibleState, command) {
    super(label, collapsibleState);
    this.label = label;
    this.collapsibleState = collapsibleState;
    this.command = command;
    this.command = command;
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
