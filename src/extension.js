const vscode = require('vscode');
const request = require('request');
const exec = require('child_process').exec;


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const hitokoto = {

	}

	console.log('Welcome, "hitokoto" is now active!');
	const disposable = vscode.commands.registerCommand('hitokoto', function () {
		createHitokoto(hitokoto)
	});
	const getText = vscode.commands.registerCommand('openHitokoto', function () {
		exec(`start https://hitokoto.cn?id=${hitokoto.id}`)
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(getText);
	//start
	const autoStart = vscode.workspace.getConfiguration().get('hitokoto.autoStart')
	if(autoStart) createHitokoto(hitokoto)

	//interval
	createIntervalHitokoto(hitokoto)
	//configuration changed
	vscode.workspace.onDidChangeConfiguration(()=>{
		createIntervalHitokoto(hitokoto)
	})

}

/**
 *  create a intervallic hitokoto
 *  @param {object} hitokoto 
 */
function createIntervalHitokoto(hitokoto){
	let intervalTimeFlag = null
	return (function(){
		clearInterval(intervalTimeFlag)
		const interval = vscode.workspace.getConfiguration().get('hitokoto.intervalShow')
		if(interval) {
			const intervalTime = vscode.workspace.getConfiguration().get('hitokoto.intervalTime')
			intervalTimeFlag = setInterval(()=>{
				createHitokoto(hitokoto)
			},intervalTime*1000*60)
		}
	})()
}

/**
 * create a hitokoto barItem
 * @param {object} hitokoto 
 */
function createHitokoto(hitokoto) {
	const hitokotoBarItem = vscode.window.createStatusBarItem(2, 5)
	const api = vscode.workspace.getConfiguration().get('hitokoto.api')
	request(api, function (err, res, body) {
		if (!err && res.statusCode == 200) {
			const data = JSON.parse(body)
			hitokoto['id'] = data.id
			hitokotoBarItem.color = '#fff'
			hitokotoBarItem.text = `$(comment) ${data.hitokoto} ----- ${data.from}`
			hitokotoBarItem.command = `openHitokoto`
			hitokotoBarItem.tooltip = "去hitokoto查看此条目";
			hitokotoBarItem.show()
			setTimeout(() => {
				hitokotoBarItem.dispose()
			}, 15000);
		} else {
			vscode.window.showInformationMessage('API服务器连接失败')
		}
	})

}



exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
module.exports = {
	activate,
	deactivate
}