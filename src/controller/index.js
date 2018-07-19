const Controller = require("../../framework/base").Controller
module.exports = class extends Controller {
    async index() {
        this.service
        await this.render("index", {})
    }
    test() {
        this.ctx.body = "test22252555"
    }
}