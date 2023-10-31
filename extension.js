// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "terraform-provider-docs-jumper-vscode-extension" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('terraform-provider-docs-jumper-vscode-extension.helloWorld', function () {
		const config = vscode.workspace.getConfiguration('tfpdjumper');

		const selection = vscode.window.activeTextEditor.selection;
		const range = new vscode.Range(selection.start, selection.end);
		const selText = vscode.window.activeTextEditor.document.getText(range).replace("aws_", "");

		vscode.env.openExternal(
			vscode.Uri.parse(`https://${config.fqdn}/${config.paths["aws"]}/${selText}`)
		);
	});
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
