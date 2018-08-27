const path = require('path')
const fs = require('fs')
const process = require('process')
const koaRouter = require('koa-router')();
const rootDir = process.cwd()
module.exports = (controllers, routerMiddleware = {}) => {
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
            controller,
            middleware
        } = item;
        const actions = controller.split(":");
        const eclass = actions.filter((item, index) => index <= actions.length - 2).join(":") || "";
        const eaction = actions[actions.length - 1] || "";
        if (!controllers[eclass]) return;
        //处理中间件
        const middlewareArray = (() => {
            let middlewareArray = [];
            if (middleware) {
                let middlewareStringArray = [];
                if (typeof middleware === 'string') {
                    middlewareStringArray = middleware.split(',');
                } else if (Array.isArray(middleware)) {
                    middlewareStringArray = middleware;
                }
                middlewareArray = middlewareStringArray.reduce((container, item) => {
                    if (typeof item === 'function') {
                        container.push(item)
                    } else if (routerMiddleware[item.toString()]) {
                        container.push(
                            routerMiddleware[item.toString()]
                        )
                    }
                    return container;
                }, [])
            }
            return middlewareArray;
        })();
        const routerParmsArr = [url, ...middlewareArray, async (ctx, next) => {
            let controller = controllers[eclass](ctx);
            if (controller[eaction]) {
                await controller[eaction]()
            }
        }]
        koaRouter[method.toLowerCase().trim()].apply(koaRouter, routerParmsArr)
    })
    return koaRouter
}
