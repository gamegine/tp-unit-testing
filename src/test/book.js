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

describe('api', () => {
    it('get /', (done) => {
        chai.request('http://localhost:8080')
            .get('/')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
    })

    describe('books', () => {
        beforeEach(() => resetDatabase(path.join(__dirname, '../data/books.json'), { "books": [] }))
        afterEach(() => resetDatabase(path.join(__dirname, '../data/books.json'), { "books": [{ "id": "0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9", "title": "Coco raconte Channel 2", "years": 1990, "pages": 400 }, { "id": "014bdc90-56bf-40d5-bd64-7ab28f0532ec" }] }))
        it('get /book', (done) => {
            chai.request('http://localhost:8080')
                .get('/book')
                .end(function (err, res) {
                    expect(res.body, "res json books").to.be.an('object')
                    const obj = JSON.parse(res.text);
                    expect(res).to.have.status(200);
                    expect(obj.books, "res json books").to.be.an('array')
                    expect(obj.books, "res json books").to.have.lengthOf(0);
                    done();
                });
        })
        it('post /book', (done) => {
            chai.request('http://localhost:8080')
                .post('/book')
                .end(function (err, res) {
                    expect(res.body.message).to.equal('book successfully added');
                    expect(res).to.have.status(200);
                    done();
                });
        })
    })

    describe('book (id)', () => {
        afterEach(() => resetDatabase(path.join(__dirname, '../data/books.json'), { "books": [{ "id": "0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9", "title": "Coco raconte Channel 2", "years": 1990, "pages": 400 }, { "id": "014bdc90-56bf-40d5-bd64-7ab28f0532ec" }] }))
        beforeEach(() => resetDatabase(path.join(__dirname, '../data/books.json'), { "books": [{ "id": "0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9", "title": "Coco raconte Channel 2", "years": 1990, "pages": 400 }, { "id": "014bdc90-56bf-40d5-bd64-7ab28f0532ec" }] }))
        it('put /book/:id', (done) => {
            chai.request('http://localhost:8080')
                .put('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal("book successfully updated")
                    done();
                });
        })

        it('delete /book/:id', (done) => {
            chai.request('http://localhost:8080')
                .delete('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal("book successfully deleted")
                    done();
                });
        })

        it('get /book/:id', (done) => {
            chai.request('http://localhost:8080')
                .get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
                .end(function (err, res) {
                    const obj = JSON.parse(res.text);
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal("book fetched")
                    expect(res.body.book, "res json books").to.be.an('object')
                    expect(res.body.book.title, "res json books").to.be.a('string')
                    expect(res.body.book.title, "res json books").to.equal('Coco raconte Channel 2')
                    expect(res.body.book.years, "res json books").to.be.a('number')
                    expect(res.body.book.years, "res json books").to.equal(1990)
                    expect(res.body.book.pages, "res json books").to.be.a('number')
                    expect(res.body.book.pages, "res json books").to.equal(400)
                    done();
                });
        })
    })
})