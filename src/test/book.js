import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiNock from 'chai-nock';
import chaiAsPromised from 'chai-as-promised';
import path from 'path';
import nock from 'nock';

import server from '../server';
import resetDatabase from '../utils/resetDatabase';

chai.use(chaiHttp);
chai.use(chaiNock);
chai.use(chaiAsPromised);

describe('router', () => {
    it('get /', (done) => {
        chai.request('http://localhost:8080')
            .get('/')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
    })


    it('get /book', () => {
        chai.request('http://localhost:8080/book')
            .get('/')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
    })
    it('post /book', () => {
        chai.request('http://localhost:8080/book')
            .post('/')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
    })

    it('get /book/:id', () => { })
    it('put /book/:id', () => { })
    it('delete /book/:id', () => { })
})

// tout les packages et fonction nescessaire au test sont importé ici, bon courage

// fait les Tests d'integration en premier
