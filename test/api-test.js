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
        .expect(200);
      });
      it('returns an error if the enveloppe does\'nt exist', async () => {
        await request(app)
        .get('/api/enveloppes/52845')
        .expect(404)
        .then((response) => {
          const envelope = response.body;
          expect(envelope).to.be.an.instanceOf(Object);
          expect(envelope).to.not.be.an.instanceOf(Array);
        });
      });
    })  

/*    describe('POST /api/enveloppes/:enveloppeId', () => {
      it('update the budget of a particular enveloppe', async () => {
        let initialEnveloppe;
        let updatedEnveloppe;
        return request(app)
          .get('/api/enveloppe/1')
          .then((response) => {
            initialEnveloppe = response.body
          })
          .then(() => {
            updatedEnveloppe = Object.assign({}, initialEnveloppe, {amount: 850});
            return request(app)
              .post('/api/enveloppes/1')
              .send(updatedEnveloppe);
          })
          .then((response) => {
            expect(response.body).to.be.deep.equal(updatedEnveloppe);
          });
      })
    })

*/
});

