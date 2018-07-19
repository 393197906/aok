const path = require('path')
const fs = require('fs')
const process = require('process')
const rootDir = process.cwd()
let controllerFiles = []
try {
    controllerFiles = fs.readdirSync(path.resolve(rootDir, "./src/controller"))
} catch (e) {

}
module.exports = controllerFiles.map(item => {
    const file = path.resolve(rootDir, `./src/controller/${item}`)
    const key = item.replace(".js", "")
    return {
        key,
        value: require(file)
    }
}).filter(item => item.value && typeof item.value === "function").map(item => {
    return {
        [item.key]: item.value
    }
})