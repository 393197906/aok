const views = require('koa-views')
const path = require("path")
const process = require("process");
const koastatic = require('koa-static');
const logger = require('koa-logger')

console.log();

module.exports = config => ({
    error: async (ctx, next) => {
        try {
            await next();
            if (ctx.body === undefined && ctx.request.method !== 'OPTIONS') {
                const err = new Error("not found");
                err.status = 404
                throw err;
            }
        } catch (e) {
            ctx.status = e.status || 500
            ctx.body = {
                status: e.status || 500,
                message: e.message
            }
            // console.log("ka zhu le ?")
        }
    },
    // 视图
    view: views(path.resolve(process.cwd(), "./src/view"), {
        extension: 'ejs'
    }),
    // 静态资源
    static: koastatic(path.resolve(process.cwd(), "./src/static")),
    //打印日志
    logger: logger()
})