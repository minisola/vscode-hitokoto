const vscode = require('vscode');
const axios = require('axios');
const open = require('open');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const hitokoto = {
			id:null,
			intervalTimeFlag:null
	}

	const disposable = vscode.commands.registerCommand('extension.hitokoto', function () {
		createHitokoto(hitokoto)
	});
	const getText = vscode.commands.registerCommand('extension.openHitokoto', function () {
		open(`https://hitokoto.cn?id=${hitokoto.id}`)
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
		clearInterval(hitokoto.intervalTimeFlag)
		const interval = vscode.workspace.getConfiguration().get('hitokoto.intervalShow')
		if(interval) {
			const intervalTime = vscode.workspace.getConfiguration().get('hitokoto.intervalTime')
			hitokoto.intervalTimeFlag = setInterval(()=>{
				createHitokoto(hitokoto)
			},intervalTime*1000*60)
		}
}

/**
 * create a hitokoto barItem
 * @param {object} hitokoto 
 */
function createHitokoto(hitokoto) {
	const hitokotoBarItem = vscode.window.createStatusBarItem(2, 10)
	const api = vscode.workspace.getConfiguration().get('hitokoto.api')
	axios.get(api).then((res) => {
		const data = res.data
		hitokoto['id'] = data.id
		hitokotoBarItem.color = '#fff'
		hitokotoBarItem.text = `$(comment) ${data.hitokoto} ----- ${data.from}`
		hitokotoBarItem.command = `extension.openHitokoto`
		hitokotoBarItem.tooltip = "去hitokoto查看此条目";
		hitokotoBarItem.show()
		setTimeout(() => {
			hitokotoBarItem.dispose()
		}, 15000);
	  }).catch(() => {
		vscode.window.showInformationMessage('API服务器连接失败')
	  });
}



exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
module.exports = {
	activate,
	deactivate
}