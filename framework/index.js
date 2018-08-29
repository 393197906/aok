const base = require("./base.js")
module.exports = {
    controller: base.Controller,
    service: base.Service,
    app: () => {
        const Koa = require('koa');
        let app = new Koa();
        const config = require("./entityConfig")
        const util = require("./entityUtil")
        let service = require("./entityService")
        const controller = require("./entityController")
        const invockMount = require("./invockMount")
        const entityMiddleware = require("./entityMiddleware")

        app.config = config; //挂载app config
        const routerMiddleware = require("./entityRouterMiddleware")(app);
        const mounts = {
            config,
            util,
        }
        const router = require("./entityRouter")(invockMount(controller, {
            ...mounts,
            service: invockMount(service, mounts)
        }), routerMiddleware)
        app = entityMiddleware(app)
        app.use(router.routes()).use(router.allowedMethods());
        app.start = function () {
            this.listen(config.port || 4000);
            console.log(`serve run http://localhost:${config.port || 4000}`);
            this.on('error', err => {
                console.error('server error', err)
            });
        }
        return app;
    }
}
