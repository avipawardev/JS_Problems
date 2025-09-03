const os = require('os')


function getSystemInfo(){
console.log(os.cpus())
}


module.exports = getSystemInfo;