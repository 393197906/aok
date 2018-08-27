const Controller = require("../../framework/base").Controller
module.exports = class extends Controller {

    async index() {
        this.ctx.body = this.service("tttt:minus").test();
    }

    test() {
        this.ctx.body = "test22252555"
    }
};
