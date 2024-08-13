# Sidebar examples - NOT CURRENTLY USED

These were two early attempts at using a sidebar - we have left these as examples as its hard to find good resources! Re-enabling them would require registering them in `extension.ts` and vscode package.json.

SideBarProvider.ts was a basic webviewView (a mini webpage) intended to house the shelved copilot feature. RecentProjectsTreeviewProvider.ts was a treeview (list of items) for accessing recent projects that felt a bit redundant once the main webview opened into the editor. Both were originally activated by an activity bar icon.

A challenge with both is that any sidebar cannot communicate directly with the main editor webview. Instead, messages have to be sent to the backend and redirected. 


**Registering treeview in extension.ts:**
```Typescript
  const recentProjectsTreeViewProvider = new RecentProjectsTreeViewProvider(context);
  vscode.window.createTreeView("sideBarTree", { treeDataProvider: recentProjectsTreeViewProvider });
```

**Registering treeview in package.json:**
```JSON
    "views": {
      "UIStudio": [
        {
          "type": "tree",
          "id": "sideBarTree",
          "name": "Recent Projects"
        }
      ]
    }    
```

**Opening main webview:**
```Typescript
commands.executeCommand('mainWebviewPanel.showMainWebviewPanel');
```


## Helpful resources
- Basic sidebar setup: https://medium.com/@fabio.sabbion/create-a-vs-code-extension-as-fast-as-possible-a110539c91d7
- Simple sidebar webviewView example: https://github.com/microsoft/vscode-webview-ui-toolkit-samples/tree/main/default/weather-webview
- View containers: https://code.visualstudio.com/api/references/contribution-points#contributes.viewsContainers


