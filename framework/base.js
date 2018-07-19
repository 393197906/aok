const _ = require("underscore")
module.exports.Service = class {
    constructor(mount) {
        Object.keys(mount).map(key => {
            this[key] = mount[key]
        })
    }
}

module.exports.Controller = class {
    constructor(mount) {
        Object.keys(mount).map(key => {
            this[key] = mount[key]
        })
        if (this.ctx) {
            this.request = this.ctx.request;
            this.response = this.ctx.response;
            let assets = {}; //渲染资源
            (() => {
                //模板
                this.render = this.ctx.render ? async (template) => {
                    await this.ctx.render.apply(this, [template, assets])
                } : () => {
                    throw new Error("not set view ");
                }
                //赋值
                this.assets = this.ctx.render ? (obj) => {
                    if (!_.isObject(obj)) {
                        throw new Error("assets params must be object");
                    }
                    assets = { ...assets,
                        ...obj
                    };
                } : () => {
                    throw new Error("not set view,cant't use assets");
                }
            })()

        }
        //实例化service
        this.service = Object.keys(this.service).map(key => {
            return {
                [key]: this.service[key](this.ctx)
            }
        }).reduce((obj, item) => ({ ...obj,
            ...item
        }))
    }
}