const koa = require('koa');
var superagent = require('supertest');
const aoko = require("../framework/index")

function request() {
    return superagent.agent(aoko.app().listen());
}

describe('platform-router', function () {
    describe('GET /', function () {
        it('should return 200', function (done) {
            request()
                .get('/')
                .expect(200, done);
        });
    });
});
