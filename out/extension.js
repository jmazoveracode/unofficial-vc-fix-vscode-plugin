"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const outputChannel = vscode.window.createOutputChannel('VeraCode');
outputChannel.show();
function activate(context) {
    const disposable = vscode.commands.registerCommand('extension.runVeraCodeFix', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const filePath = editor.document.uri.fsPath;
            const bashScript = (0, fs_1.readFileSync)(__dirname + '/default.sh')
                .toString()
                .replace(/\$FILE_PATH/g, filePath);
            const executionPromise = new Promise((resolve, reject) => {
                (0, child_process_1.exec)(bashScript, (error, stdout, stderr) => {
                    if (error) {
                        vscode.window.showErrorMessage(`Error executing: ${error.message}`);
                        reject(error);
                    }
                    else {
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
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(outputChannel); // Add the output channel to subscriptions
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map