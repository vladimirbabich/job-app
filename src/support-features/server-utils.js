const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

function writeFile(uri, folder) {
    const regExMatches = uri.match('data:(.*);base64,(.*)');
    const imageData = {
        imageType: '.' + regExMatches[1].split('/')[1],
        dataBuffer: Buffer.from(regExMatches[2], 'base64')
    }
    const fileName = uuid.v4() + imageData.imageType;
    const filePath = path.resolve(__dirname, '../../src/server/static', folder, fileName);
    
    fs.writeFile(filePath, imageData.dataBuffer, {
        encoding: "base64",
    }, (err) => {
        if (err) {
            console.log(err)
            return false;
        }
        console.log("File written successfully");
    })
    return fileName;
}
module.exports = { writeFile }