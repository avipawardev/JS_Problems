const path = require('path');

function getFileInfo(filePath) {
    return {
        fileName: path.basename(filePath),
        fileExtension: path.extname(filePath),
        directoryName: path.dirname(filePath)
    };
}

module.exports = getFileInfo;