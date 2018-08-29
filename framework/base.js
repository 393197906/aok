const _ = require("underscore")
module.exports.Service = class {
    constructor(mount) {
        Object.keys(mount).map(key => {
            this[key] = mount[key]
        });
    }

}

module.exports.Controller = class {
    constructor(mount) {
        Object.keys(mount).map(key => {
            this[key] = mount[key]
        });
        
        const service = this.service;
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
