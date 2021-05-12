const request = require('supertest');
const assert = require('chai').assert;
const expect = require('chai').expect;
const app = require('../server');

describe('/api', () => {

    describe('GET /api/enveloppes', () => {    
        it('returns an array', async () => {
          await request(app)
          .get('/api/enveloppes')
          .expect(200)
          .then((response) => {
            expect(response.body).to.be.an.instanceOf(Array);
                });
        });
        it('returns an array of all enveloppes', () => {
          return request(app)
            .get('/api/enveloppes')
            .expect(200)
            .then((response) => {
              response.body.forEach((enveloppe) => {
                expect(enveloppe).to.have.ownProperty('id');
                expect(enveloppe).to.have.ownProperty('title');
                expect(enveloppe).to.have.ownProperty('budget');
              });
            });
        });
    });



    describe('POST /api/enveloppes', () => {
      it('should add an enveloppe if all supplied information is correct', async () => {
        let initialEnveloppeArray;
        let newEnveloppe = {
          title: 'Test',
          budget: 520
        }
        return request(app)
          .get('/api/enveloppes')
          .then((response) => {
            initialEnveloppeArray = response.body;
          })
          .then(() => {
            return request(app)
              .post('/api/enveloppes')
              .send(newEnveloppe)
              .expect(201);
          })
          .then((response) => response.body)
          .then((createdEnveloppe) => {
            newEnveloppe.id = createdEnveloppe.id;
            expect(newEnveloppe).to.be.deep.equal(createdEnveloppe);
          });
      });
    });



    describe('GET /api/enveloppes/:enveloppeId', () => {
      it('returns a specific enveloppe', async () => {
        await request(app)
        .get('/api/enveloppes/1')
        .expect(200)
        .then((response) => {
          const envelope = response.body;
          expect(envelope).to.be.an.instanceOf(Object);
          expect(envelope).to.not.be.an.instanceOf(Array);
        });
      });
      it('returns a full enveloppe object', () => {
        return request(app)
        .get(`/api/enveloppes/1`)
        .expect(200)
        .then((response) => {
          let enveloppe = response.body;
          expect(enveloppe).to.have.ownProperty('id');
          expect(enveloppe).to.have.ownProperty('title');
          expect(enveloppe).to.have.ownProperty('budget');
        });
      });
      it('returns the correct envelope', async () => {
        await request(app)
            .get('/api/envelopes/1')
            .expect(200)
            .then((response) => {
                let envelope = response.body;
                expect(envelope.id).to.be.an.equal('1');
            });
        });    
      it('returns an error if the enveloppe doesn\'t exist', async () => {
        await request(app)
        .get('/api/enveloppes/52845')
        .expect(404)
      });
    })  

    /*describe('POST /api/enveloppes/:enveloppeId', () => {
      it('add 100 to the budget of the enveloppe n°1', async () => {
        let initialEnveloppe;
        let updatedEnveloppe = [{
          id: 1,
          title: 'rent',
          budget: 500
        }];
        return request(app)
          .get('/api/enveloppe/1')
          .then((response) => {
            initialEnveloppe = response.body
          })
          .then(() => {
            initialEnveloppe.budget += 100; 
            return request(app)
              .post('/api/enveloppes/1')
              .send(initialEnveloppe);
          })
          .then((response) => {
            expect(response.body).to.be.deep.equal(updatedEnveloppe);
          });
      })
    })*/


});

