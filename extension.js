const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand(
		'terraform-provider-docs-opener.run',
		run.bind(null)
	);
	context.subscriptions.push(disposable);
}

async function run() {
	const selection = vscode.window.activeTextEditor.selection;
	const range = new vscode.Range(selection.start, selection.end);
	const resource = await getResource(range);
	console.log(`resource: ${resource}`);

	const provider = getProvider(resource);
	const paths = vscode.workspace.getConfiguration('TFDocsOpener').get('paths');
	if (!provider || provider in paths === false) {
		vscode.window.showWarningMessage(`Opener: Cannot obtain provider or URL path. provider=${provider}`);
		return;
	}
	const url = generateUrl(resource, provider);
	console.log(`url: ${url}`);

	vscode.env.openExternal(vscode.Uri.parse(url));
}

async function getResource(range) {
	let resource = vscode.window.activeTextEditor.document.getText(range);
	if (!resource) {
		resource = await promptResource(vscode.window);
	}
	return resource;
}

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

function generateUrl(resource, provider) {
	const config = vscode.workspace.getConfiguration('TFDocsOpener');
	if (!(provider in config.paths)) {
		return '';
	}

	// ex. aws_ssm_parameter -> ssm_parameter
	// TODO: considering resource or data source
	const urlSuffix = resource.replace(`${provider}_`, '');
	return `https://${config.fqdn}/${config.paths[provider]}/${urlSuffix}`;
}

function deactivate() { }

module.exports = {
	activate,
	getProvider,
	generateUrl,
	deactivate
}
