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
            //模板
            this.render = this.ctx.render ? async (...arv) => {
                await this.ctx.render.apply(this, arv)
            } : () => {
                throw new Error("not set view ");
            }
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