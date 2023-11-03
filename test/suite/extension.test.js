const assert = require('assert');

const vscode = require('vscode');
const opener = require('../../extension');

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('getProvider', () => {
		assert.strictEqual('', opener.getProvider(''));
		assert.strictEqual('', opener.getProvider('foo'));
		assert.strictEqual('foo', opener.getProvider('foo_resource'));
	});

	test('generateUrl', () => {
		assert.strictEqual('', opener.generateUrl('foo_resource', 'foo'));
		assert.notStrictEqual('', opener.generateUrl('aws_resource', 'aws'));
	})
});
