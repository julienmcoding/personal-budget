const request = require('supertest');
const assert = require('chai').assert;
const expect = require('chai').expect;
const app = require('../server');

describe('/api/enveloppes', () => {

    describe('GET /api/enveloppes', () => {    
        it('returns an array', () => {
            return request(app)
                .get('/api/enveloppes')
                .expect(200)
                .then((response) => {
                    expect(response.body).to.be.an.instanceOf(Array);
                });
        });
    });


    describe('POST /api/enveloppes', () => {
        it('should add a new enveloppe if all supplied information is correct', () => {
            let initialEnveloppesArray;
            let newEnveloppeObject = {
              title: 'Test',
              budget: 100,
            }
            return request(app)
              .get('/api/enveloppes')
              .then((response) => {
                initialEnveloppesArray = response.body;
              })
              .then(() => {
                return request(app)
                  .post('/api/enveloppes')
                  .send(newEnveloppeObject)
                  .expect(201);
              })
              .then((response) => response.body)
              .then((createdEnveloppe) => {
                newEnveloppeObject.id = createdEnveloppe.id;
                expect(newEnveloppeObject).to.be.deep.equal(createdEnveloppe);
              });
          });
    });

});

