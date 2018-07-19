const Service = require("../../framework/base").Service
module.exports = class extends Service {
    test() {
        console.log(this.util);
        // return get("https://cnodejs.org/api/v1/topics");
    }
}