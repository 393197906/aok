const path = require('path')
const fs = require('fs')
const process = require('process')
const rootDir = process.cwd()
module.exports = app => {
    let config = (app) => app
    try {
        const entityMiddlewares = require(path.resolve(rootDir, "./src/config/middleware"))
        if (typeof entityMiddlewares !== "function") {
            throw "middleware err"
        }
        config = app => {
            const middlewares = entityMiddlewares(app.config);
            if (middlewares) {
                Object.keys(middlewares).map(item => {
                    if (typeof middlewares[item] === 'function') {
                        app.use(middlewares[item])
                    }
                })
            }
            return app;
        }
    } catch (e) {
        // console.log(e);
    }
    return config(app);
}