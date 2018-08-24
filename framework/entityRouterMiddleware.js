const path = require('path')
const fs = require('fs')
const process = require('process')
const rootDir = process.cwd()
module.exports = app => {
    let entityMiddlewares = () => ({}); //默认值
    try {
        entityMiddlewares = require(path.resolve(rootDir, "./src/config/middleware.router"))
        if (typeof entityMiddlewares !== "function") {
            throw "router middleware err"
        }
    } catch (e) {
        // console.log(e);
        entityMiddlewares = () => ({});
    }
    return entityMiddlewares(app);
};
