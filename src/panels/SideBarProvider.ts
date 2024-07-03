import {
  CancellationToken,
  Uri,
  Webview,
  WebviewView,
  WebviewViewProvider,
  WebviewViewResolveContext,
  Disposable
} from 'vscode';

export class SideBarProvider implements WebviewViewProvider {
  public static readonly viewType = "sidebar.showSideBar";
  private _view?: WebviewView;
  private _disposables: Disposable[] = [];

  constructor(private readonly _extensionUri: Uri) {}

  public resolveWebviewView(
    webviewView: WebviewView,
    context: WebviewViewResolveContext,
    _token: CancellationToken
  ) {
    this._view = webviewView;

    // Allow scripts in the webview
    webviewView.webview.options = {
      enableScripts: true,
    };

    // Set the HTML content that will fill the webview view
    webviewView.webview.html = this._getSideBarContent(webviewView.webview);

    // Set up message listener
  }

    private _getSideBarContent(webview: Webview): string {
    // Load the webview content here, this is just a basic example
    return /* html */ `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Webview</title>
      </head>
      <body>
        <h1>Hello from the Webview!</h1>
        <p>This is a simple webview example.</p>
      </body>
      </html>`;
  }
}