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

    /*
    describe('POST /api/enveloppes', () => {
      it('should add an enveloppe if all supplied information is correct', async () => {
        let newEnveloppe = {
          title: 'test',
          budget: 500
        };

        await request(app)
        .post('/api/enveloppes')
        .send(newEnveloppe)
        .expect(201)
        .then((response) => {
          const createdEnveloppe = response.body;
          newEnveloppe.id = createdEnveloppe.id;
          expect(newEnveloppe).to.be.deep.equal(createdEnveloppe)
        });
      });
    });
*/
    describe('GET /api/enveloppes/:enveloppeId', () => {
      it('returns a specific enveloppe', async () => {
        await request(app)
        .get('/api/enveloppes/1')
        .expect(200);
      });

      it('returns an error if the enveloppe does\'t exist', async () => {
        await request(app)
        .get('/api/enveloppes/52845')
        .expect(404);
      });
    })  



});

