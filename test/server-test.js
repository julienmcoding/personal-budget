const request = require('supertest');
const {assert} = require('chai');

const app = require('../app');

//Create an endpoint that sends a POST request in order to generate individual budget envelopes.
describe('POST', () => {
    it('create an endpoint that sends a POST request in order to generate individual budget envelopes', () => {
        request(app)
            .post()

    })
})

describe('GET /users', function () {
    it('respond with json containing a list of all users', function (done) {
        request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});