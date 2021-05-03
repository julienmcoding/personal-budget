const request = require('supertest');
const assert = require('chai').assert;
const expect = require('chai').expect;
const app = require('../server');

describe('/api/enveloppes', () => {

    describe('GET /enveloppes', () => {
        
        it('returns an array', () => {
            return request(app)
                .get('/api/enveloppes')
                .expect(200)
                .then((response) => {
                    expect(response.body).to.be.an.instanceOf(Array);
                });
        });
    });
});

