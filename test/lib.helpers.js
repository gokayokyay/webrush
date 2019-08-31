/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const supertest = require('supertest');
const should = require('should');
const webrush = require('../lib');
const { readJSON } = require('../lib/utils/helpers');

const app = webrush();
const api = supertest('localhost:3000');
const { expect } = chai;

app.get('/send', (req, res) => {
  res.send('TEST');
});
app.get('/json', (req, res) => {
  res.json({ text: 'TEST' });
});
app.get('/redirect', (req, res) => {
  res.redirect('https://www.google.com');
});
app.post('/json', (req, res) => {
  readJSON(
    res,
    json => {
      res.json(json);
    },
    err => {
      res.send(err);
    },
  );
});

app.listen('0.0.0.0', 3000, token => {
  if (token) {
    console.log('Started listening on port', 3000);
  } else {
    console.error('Failed');
  }
});

describe('Helpers - configureResponse', () => {
  describe('res.send', () => {
    it('it should return a response with a text', done => {
      api
        .get('/send')
        .expect(200)
        .end((err, res) => {
          expect(res.text).to.equal('TEST');
          done();
        });
    });
  });
  describe('res.json', () => {
    it('it should return a response with a json object', done => {
      api
        .get('/json')
        .expect(200)
        .end((err, res) => {
          const json = {
            text: 'TEST',
          };
          expect(res.text).to.equal(JSON.stringify(json));
          done();
        });
    });
  });
  describe('res.redirect', () => {
    it('it should redirect request', done => {
      api
        .get('/redirect')
        .expect(302)
        .end((err, res) => {
          expect(res.header.location).to.not.equal(null);
          done();
        });
    });
  });
});

describe('Helpers - readJSON', () => {
  it('it should parse json body', done => {
    api
      .post('/json')
      .send({
        test: 'isSuccessful',
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body.test).to.equal('isSuccessful');
        done();
      });
  });
});
