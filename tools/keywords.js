exports.extractKeywords = function(text){
	var myPythonScript = __dirname+"/rake.py";
var pythonExecutable = "py"; //Env. Variable. set path if not available
var uint8arrayToString = function(data){
    return String.fromCharCode.apply(null, data);
};

const spawn = require('child_process').spawn;
const scriptExecution = spawn(pythonExecutable, [myPythonScript, text]);
scriptExecution.stdout.on('data', (data) => {
    console.log(uint8arrayToString(data));
});
scriptExecution.stderr.on('data', (data) => {
    console.log(uint8arrayToString(data));
});
scriptExecution.on('exit', (code) => {
    console.log("Process quit with code : " + code);
});	
}

