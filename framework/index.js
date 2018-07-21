const base = require("./base.js")
module.exports = {
    controller: base.Controller,
    service: base.Service,
    start: () => {
        const Koa = require('koa');
        let app = new Koa();
        const config = require("./entityConfig")
        const util = require("./entityUtil")
        let service = require("./entityService")
        const controller = require("./entityController")
        const invockMount = require("./invockMount")
        const entityMiddleware = require("./entityMiddleware")
        const mounts = {
            config,
            util
        }
        const router = require("./entityRouter")(invockMount(controller, { ...mounts,
            service: invockMount(service, mounts)
        }))
        app = entityMiddleware(app)
        app.use(router.routes()).use(router.allowedMethods());
        app.listen(config.port || 4000);
        console.log(`serve run http://localhost:${config.port || 4000}`);
        app.on('error', err => {
            console.error('server error', err)
        });
    }
}