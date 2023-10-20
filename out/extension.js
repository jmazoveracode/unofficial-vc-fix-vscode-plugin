"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const path = require("path");
function activate(context) {
    const disposable = vscode.commands.registerCommand('extension.runVeraCodeFix', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const scriptPath = path.join(__dirname, 'default.sh');
            const terminal = vscode.window.createTerminal('VeraCode Fix Terminal');
            terminal.show();
            terminal.sendText(`bash "${scriptPath}" --file-path "${editor.document.fileName}" --workspace-path "${__dirname}"`);
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map