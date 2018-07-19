const path = require('path')
const fs = require('fs')
const process = require('process')
const koaRouter = require('koa-router')();
const rootDir = process.cwd()
module.exports = (controllers) => {
    let routersConstruct = () => []
    try {
        routersConstruct = require(path.resolve(rootDir, "./src/router"))
    } catch (e) {

    }
    const router = routersConstruct(controllers);
    router.filter(item => {
        const methodAllows = ["get", "delete", "post", "put"]
        return item.method && item.url && item.controller && methodAllows.find(ii => ii === item.method.toLowerCase().trim())
    }).forEach(item => {
        const {
            method,
            url,
            controller
        } = item;
        const actions = controller.split(":");
        const eclass = actions[0] || "index";
        const eaction = actions[1] || "index";
        if (!controllers[eclass]) return;
        koaRouter[method.toLowerCase().trim()](url, async (ctx, next) => {
            let controller = controllers[eclass](ctx);
            if (controller[eaction]) {
                await controller[eaction]()
            }
        })
    })
    return koaRouter
}