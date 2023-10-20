import * as vscode from 'vscode';
import path = require('path');

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'extension.runVeraCodeFix',
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const scriptPath = path.join(__dirname, 'default.sh');

        const terminal = vscode.window.createTerminal('VeraCode Fix Terminal');
        terminal.show();
        terminal.sendText(
          `bash "${scriptPath}" --file-path "${editor.document.fileName}" --workspace-path "${__dirname}"`
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}
