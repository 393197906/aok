const _ = require("underscore")
module.exports.Service = class {
    constructor(mount) {
        Object.keys(mount).map(key => {
            this[key] = mount[key]
        });
        //session
        this.session = this.ctx.session;
    }

}

module.exports.Controller = class {
    constructor(mount) {
        Object.keys(mount).map(key => {
            this[key] = mount[key]
        });
        if (this.ctx) {
            this.request = this.ctx.request;
            this.response = this.ctx.response;
            let assets = {}; //渲染资源
            (() => {
                //模板
                this.render = this.ctx.render ? async (template) => {
                    await this.ctx.render(template, assets)
                } : () => {
                    throw new Error("not set view ");
                };
                //赋值
                this.assets = this.ctx.render ? (obj) => {
                    if (!_.isObject(obj)) {
                        throw new Error("assets params must be object");
                    }
                    assets = {
                        ...assets,
                        ...obj
                    };
                } : () => {
                    throw new Error("not set view,cant't use assets");
                };
                //params
                this.params = this.ctx.params
                this.query = this.ctx.query
                this.queryBody = this.ctx.request.body
                //return
                this.success = (result = {}) => {
                    this.ctx.body = {
                        status: 200,
                        message: "成功",
                        result
                    }
                };
                //session
                this.session = this.ctx.session;
                //redirect
                this.redirect = this.ctx.redirect
            })()

        }
        //实例化service
        // this.service = Object.keys(this.service).map(key => {
        //     return {
        //         [key]: this.service[key](this.ctx)
        //     }
        // }).reduce((obj, item) => ({
        //     ...obj,
        //     ...item
        // }))
        const service = this.service;
        // this.service = Object.keys(this.service).reduce((container, key) => {
        //     const obj = {
        //         [key]: this.service[key](this.ctx)
        //     };
        //     return {...container, ...obj}
        // }, {})
        const cache = {}; //缓存服务
        this.service = (serviceName) => {
            if (typeof service[serviceName] !== 'function') {
                this.ctx.throw(501, `not fount service ${serviceName}`)
            }
            //缓存服务
            if (cache[serviceName]) {
                return cache[serviceName]
            }
            return cache[serviceName] = service[serviceName](this.ctx)
        }
    }
}
