const path = require('path')
const process = require('process')
const util = require('./util')
const rootDir = process.cwd()
let serviceFiles = util.getFileList(path.resolve(rootDir, "./src/service"));

module.exports = serviceFiles.filter(item => item.indexOf('Service') > -1).map(item => {
    const exFileArray = item.split('service')
    const exFile = exFileArray[exFileArray.length - 1];
    const baseFilesArray = exFile.split(path.sep);
    const baseFilesArrayFilter = baseFilesArray.filter(item => item);
    baseFilesArrayFilter[baseFilesArrayFilter.length - 1] = baseFilesArrayFilter[baseFilesArrayFilter.length - 1].replace("Service.js", "");
    const key = baseFilesArrayFilter.join(':');
    return {
        key,
        value: require(item)
    }
}).filter(item => item.value && typeof item.value === "function").map(item => {
    return {
        [item.key]: item.value
    }
})
