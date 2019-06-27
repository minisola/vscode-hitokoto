const vscode = require('vscode');
const request = require('request');
const exec = require('child_process').exec;


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const hitokoto = {

	}

	console.log('Congratulations, your extension "hitokoto" is now active!');
	const disposable = vscode.commands.registerCommand('extension.hitokoto', function () {
		createHitokoto(hitokoto)
	});
	const getText = vscode.commands.registerCommand('extension.openHitokoto', function () {
		// vscode.workspace.openTextDocument('http://baidu.com')
	exec(`start https://hitokoto.cn?id=${hitokoto.id}`)
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(getText);
	//start
	createHitokoto(hitokoto)
}


function createHitokoto(hitokoto) {
	const hitokotoBarItem = vscode.window.createStatusBarItem(2, 5)
	request('https://v1.hitokoto.cn', function (err, res, body) {
		if (!err && res.statusCode == 200) {
			const data = JSON.parse(body)
			hitokoto['id'] = data.id
			hitokotoBarItem.color = '#fff'
			hitokotoBarItem.text = `$(comment) ${data.hitokoto} ----- ${data.from}`
			hitokotoBarItem.command = `extension.openHitokoto`
			hitokotoBarItem.tooltip = "去hitokoto查看此条目";
			hitokotoBarItem.show()
			setTimeout(() => {
				hitokotoBarItem.dispose()
			}, 15000);
			// vscode.window.setStatusBarMessage(`${data.hitokoto} ----- ${data.from}`,10000);
		} else {
			vscode.window.showInformationMessage('API服务器连接失败')
		}
	})

}



exports.activate = activate;
exports.createHitokoto = createHitokoto;

// this method is called when your extension is deactivated
function deactivate() {}
module.exports = {
	activate,
	deactivate
}