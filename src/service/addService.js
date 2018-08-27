const AddService = require("../../framework/base").Service
module.exports = class extends AddService {
    test() {
        return 'test'
        // return get("https://cnodejs.org/api/v1/topics");
    }
}
