/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const supertest = require('supertest');
const should = require('should');
const webrush = require('../lib');

const app = webrush();
const api = supertest('localhost:5000');
const { expect } = chai;

const testRouter = webrush.Router('/test', app);
const secondTestRouter = webrush.Router('/alternative', app);

testRouter.get('/', (req, res) => {
  res.send('GET /test/');
});
testRouter.get('/send', (req, res) => {
  res.send('Even if it works, it needs a refactor');
});
testRouter.del('/:user', (req, res) => {
  res.send(`Deleted user ${req.getParameter(0)}`);
});
secondTestRouter.get('/', (req, res) => {
  res.send('Second');
});

app.listen(5000, success => (success ? console.log('Port is 5000') : console.log('Error')));

describe('Router - routes properly', () => {
  describe('get /test/', () => {
    it('it should return a response as a text', done => {
      api
        .get('/test')
        .expect(200)
        .end((err, res) => {
          expect(res.text).to.includes('GET');
          done();
        });
    });
  });
  describe("req and res should work like those in App's", () => {
    it('it should be able to parse parameters', done => {
      api
        .del('/test/testuser')
        .expect(200)
        .end((err, res) => {
          expect(res.text).to.include('testuser');
          done();
        });
    });
  });
});

describe('Router - class divergency', () => {
  describe('constructor', () => {
    it('it should be able to create multiple router object', done => {
      api
        .get('/alternative')
        .expect(200)
        .end((err, res) => {
          expect(res.text).to.be.equal('Second');
          done();
        });
    });
  });
});
