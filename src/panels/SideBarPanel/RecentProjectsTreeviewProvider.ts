import * as vscode from 'vscode';

export class RecentProjectsTreeViewProvider implements vscode.TreeDataProvider<ProjectItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<ProjectItem | undefined | void> = new vscode.EventEmitter<ProjectItem | undefined | void>();
  readonly onDidChangeTreeData: vscode.Event<ProjectItem | undefined | void> = this._onDidChangeTreeData.event;

  constructor(private readonly context: vscode.ExtensionContext) {}

  getTreeItem(element: ProjectItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: ProjectItem): Thenable<ProjectItem[]> {
    if (element) {
      return Promise.resolve(element.children);
    } else {
      // Return the root elements, for example, recent projects
      const projects = [
        new ProjectItem('Project 1'),
        new ProjectItem('Project 2'),
        new ProjectItem('Project 3')
      ];
      return Promise.resolve(projects);
    }
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
}

class ProjectItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.None,
    public readonly children: ProjectItem[] = []
  ) {
    super(label, collapsibleState);
  }
}
