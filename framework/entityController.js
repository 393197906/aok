const path = require('path')
const util = require('./util')
const process = require('process')
const rootDir = process.cwd()
let controllerFiles = util.getFileList(path.resolve(rootDir, "./src/controller"));


module.exports = controllerFiles.filter(item => item.indexOf('Controller') > -1).map(item => {
    const exFileArray = item.split('controller')
    const exFile = exFileArray[exFileArray.length - 1];
    const baseFilesArray = exFile.split(path.sep);
    const baseFilesArrayFilter = baseFilesArray.filter(item => item);
    baseFilesArrayFilter[baseFilesArrayFilter.length - 1] = baseFilesArrayFilter[baseFilesArrayFilter.length - 1].replace("Controller.js", "");
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
