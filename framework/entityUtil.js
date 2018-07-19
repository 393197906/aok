const path = require('path')
const fs = require('fs')
const process = require('process')
const rootDir = process.cwd()
let utilFiles = []
try {
    utilFiles = fs.readdirSync(path.resolve(rootDir, "./src/util"))
} catch (e) {
    //TODO
}


module.exports = utilFiles.map(item => {
    const file = path.resolve(rootDir, `./src/util/${item}`)
    const key = item.replace(".js", "")
    return {
        key,
        value: require(file)
    }
}).filter(item => {
    return !!item.value
}).map(item => {
    return {
        [item.key]: item.value
    }
}).reduce((obj, item) => {
    return { ...obj,
        ...item
    }
}, {})