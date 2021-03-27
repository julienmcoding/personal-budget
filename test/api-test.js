const request = require('supertest');
const {assert} = require('chai');

const app = require('../app');

//Create an endpoint that sends a POST request in order to generate individual budget envelopes.
describe('POST', () => {
    it('create an endpoint that sends a POST request in order to generate individual budget envelopes', () => {
        request(app)
            .post()

    });
});

