const ServiceService = require("../../framework/base").Service
module.exports = class extends ServiceService {
    test() {
        return 'test'
        // return get("https://cnodejs.org/api/v1/topics");
    }
}
