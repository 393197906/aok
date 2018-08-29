const Controller = require("../../framework/base").Controller
module.exports = class extends Controller {
    async index() {
        this.ctx.body =  123
    }

    test() {
        this.ctx.body = "test22252555"
    }
};
