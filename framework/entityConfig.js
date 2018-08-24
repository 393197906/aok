const path = require('path')
const fs = require('fs')
const process = require('process')
const baseConfig = require("./config/config.base.js") //框架默认配置文件
const rootDir = process.cwd()
let configFiles = []
try {
    configFiles = fs.readdirSync(path.resolve(rootDir, "./src/config"))
} catch (e) {
    //TODO
}

const config = configFiles.map(item => {
    const file = path.resolve(rootDir, `./src/config/${item}`)
    const key = item.replace(".js", "")
    return {
        key,
        value: require(file)
    }
}).filter(item => {
    return !!item.value && item.key.indexOf("config") > -1
}).map(item => {
    return {
        [item.key]: item.value
    }
}).reduce((obj, item) => {
    return {
        ...obj,
        ...item
    }
}, {})

module.exports = ((config) => {
    const env = process.env.NODE_ENV || 'dev'
    const defaultConfig = config.config || {};
    const envConfig = config[`config.${env}`] || {};
    return {
        ...baseConfig,
        ...defaultConfig,
        ...envConfig
    }
})(config)
