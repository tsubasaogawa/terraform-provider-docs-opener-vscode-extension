const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('terraform-provider-docs-opener-vscode-extension.helloWorld', async function () {
		const config = vscode.workspace.getConfiguration('tfpd_opener');

		const selection = vscode.window.activeTextEditor.selection;
		const range = new vscode.Range(selection.start, selection.end);
		let resource = vscode.window.activeTextEditor.document.getText(range);
		console.log(`resource: ${resource}`);
		if (!resource) {
			resource = await promptResource(vscode.window);
			console.log(`(prompt) resource: ${resource}`);
		}

		const provider = getProvider(resource);
		console.log(`provider: ${provider}`);
		if (!provider || provider in config.paths === false) {
			console.log('Cannot obtain provider or URL path');
			return;
		}

		// ex. aws_ssm_parameter -> ssm_parameter
		// TODO: considering resource or data source
		const urlSuffix = resource.replace(`${provider}_`, '');

		vscode.env.openExternal(
			vscode.Uri.parse(`https://${config.fqdn}/${config.paths[provider]}/${urlSuffix}`)
		);
	});
	context.subscriptions.push(disposable);
}

function deactivate() {}

async function promptResource(window) {
	const input = await window.showInputBox({
		prompt: 'Input resource name:',
		validateInput: p => {
			return /^[\w_]+$/.test(p) ? '' : 'alphabets and underscores are allowed'
		}
	});
	if (!input) {
		return '';
	}
	return input;
}

function getProvider(resource) {
	if (!resource) {
		return '';
	}
	const match = resource.match(/^(?<provider>[^_]+)/);
	if (!match) {
		return '';
	}
	return match.groups.provider;
}

module.exports = {
	activate,
	deactivate
}
