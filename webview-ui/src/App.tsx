import { vscode } from "./utilities/vscode";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import "./App.css";

const VSCodeButtonAny = VSCodeButton as any;

function App() {
  function handleHowdyClick() {
    vscode.postMessage({
      command: "hello",
      text: "Hey there partner! 🤠",
    });
  }

  return (
    <main>
      <h1>Hello Georges! </h1>
      <VSCodeButtonAny onClick={handleHowdyClick}>Howdy!</VSCodeButtonAny>
    </main>
  );
}

export default App;
