const path = require('path')
const fs = require('fs')
const process = require('process')
const rootDir = process.cwd()
let serviceFiles = []
try {
    serviceFiles = fs.readdirSync(path.resolve(rootDir, "./src/service"))
} catch (e) {

}
module.exports = serviceFiles.filter(item => item.indexOf('Service') > -1).map(item => {
    const file = path.resolve(rootDir, `./src/service/${item}`)
    const key = item.replace("Service.js", "")
    return {
        key,
        value: require(file)
    }
}).filter(item => item.value && typeof item.value === "function").map(item => {
    return {
        [item.key]: item.value
    }
})
