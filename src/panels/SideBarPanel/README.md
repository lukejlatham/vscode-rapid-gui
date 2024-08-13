# Sidebar examples - NOT CURRENTLY USED

These were two early attempts at using a sidebar - we have left these as examples as its hard to find good resources!

SideBarProvider.ts was a basic webviewView (a mini webpage) intended to house the shelved copilot feature. RecentProjectsTreeviewProvider.ts was a treeview (list of items) for accessing recent projects that felt a bit redundant once the main webview opened into the editor.

A challenge with both is that any sidebar cannot communicate directly with the main editor webview. Instead, messages have to be sent to the backend and redirected.

## Helpful resources
- Basic sidebar setup: https://medium.com/@fabio.sabbion/create-a-vs-code-extension-as-fast-as-possible-a110539c91d7
- Simple sidebar webviewView example: https://github.com/microsoft/vscode-webview-ui-toolkit-samples/tree/main/default/weather-webview


