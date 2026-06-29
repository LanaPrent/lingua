const fs = require("fs");
const path = require("path");

//const logFile = path.join(__dirname, "../logs/app.log");

const logsDir = path.join(__dirname, "../logs");
const logFile = path.join(logsDir, "app.log");

//Limit the size of logs folder
const MAX_SIZE = 5 * 1024 * 1024; //5MB
const MAX_FILES =3;

// Ensure logs directory exists
if (!fs.existsSync(logsDir)){
    fs.mkdirSync(logsDir, {recursive:true});
}

//Rotate logs if needed
function rotateLogs(){
    if (!fs.existsSync(logFile)) return;
    //const stats = fs.statSync(logFile);
    let stats;
    try{
    stats = fs.statSync(logFile);
}catch(err){
    return;
}
    if(stats.size < MAX_SIZE) return;

    //Delete oldest file if exists
    const oldest = path.join(logsDir, `app.log.${MAX_FILES}`);
    if (fs.existsSync(oldest)) {
        fs.unlinkSync(oldest);
    }
    //Shift older logs up
    for(let i = MAX_FILES -1; i >=1; i--) {
        const src=path.join(logsDir, `app.log.${i}`);
        const dest = path.join(logsDir, `app.log.${i + 1}`);

        if (fs.existsSync(src)) {
            fs.renameSync(src,dest);
        }
    }
    //Move current log to .1
    fs.renameSync(logFile, path.join(logsDir, "app.log.1"));
}
    //Write log safely
function writeLog(type, message) {
    try{
        rotateLogs();
    const time = new Date().toISOString();
    const line = `[${time}] [${type}] ${message}\n`;

    fs.appendFileSync(logFile, line);
}catch(err){
    // Never crash the app because of logging
    console.error("Logging failed:", err.message);
}
}
module.exports = {
    info: (msg) => writeLog("INFO", msg),
    error: (msg) => writeLog("ERROR", msg),
};
