import * as vscode from 'vscode';
import { exec } from 'child_process';
import { readFileSync } from 'fs';
const outputChannel = vscode.window.createOutputChannel('VeraCode');
outputChannel.show();

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'extension.runVeraCodeFix',
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const filePath = editor.document.uri.fsPath;
        const bashScript = readFileSync(__dirname + '/default.sh')
          .toString()
          .replace(/\$FILE_PATH/g, filePath);

        const executionPromise = new Promise<string>((resolve, reject) => {
          exec(bashScript, (error, stdout, stderr) => {
            if (error) {
              vscode.window.showErrorMessage(
                `Error executing: ${error.message}`
              );
              reject(error);
            } else {
              resolve(stdout);
            }
          });
        });

        executionPromise
          .then((stdout) => {
            // Log stdout to the output channel
            outputChannel.appendLine('Command executed successfully:');
            outputChannel.appendLine(stdout);
          })
          .catch((error) => {
            // Handle any errors here
            outputChannel.appendLine('Command failed:');
            outputChannel.appendLine(error);
          });
      }
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(outputChannel); // Add the output channel to subscriptions
}
