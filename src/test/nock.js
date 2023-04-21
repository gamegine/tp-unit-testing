import chai, { expect } from 'chai';
import '../nock'
describe('nock', () => {
    const req = chai.request('http://localhost:3000')
    it('get /', (done) => {
        req.get('/book')
            .end(function (err, res) {
                expect(res.body, "res").to.be.an('object')
                expect(res.body.books, "books").to.be.an('array')
                expect(res).to.have.status(200);
                done();
            });
    })
    it('post /', (done) => {
        req.post('/book')
            .end(function (err, res) {
                expect(res.body.message).to.equal('book successfully added')
                expect(res).to.have.status(200);
                done();
            });
    })
    it('put /', (done) => {
        req.put('/book/:id')
            .end(function (err, res) {
                expect(res.body.message).to.equal('book successfully updated')
                expect(res).to.have.status(200);
                done();
            });
    })
    it('delete /', (done) => {
        req.delete('/book/:id')
            .end(function (err, res) {
                expect(res.body.message).to.equal('book successfully deleted')
                expect(res).to.have.status(200);
                done();
            });
    })

    it('get 400 /', (done) => {
        req.get('/book')
            .end(function (err, res) {
                expect(res.body.message).to.equal('error fetching books')
                expect(res).to.have.status(400);
                done();
            });
    })

    it('post 400 /', (done) => {
        req.post('/book')
            .end(function (err, res) {
                expect(res.body.message).to.equal('error adding books')
                expect(res).to.have.status(400);
                done();
            });
    })

    it('put 400 /', (done) => {
        req.put('/book/:id')
            .end(function (err, res) {
                expect(res.body.message).to.equal('error updating books')
                expect(res).to.have.status(400);
                done();
            });
    })

    it('delete 400 /', (done) => {
        req.delete('/book/:id')
            .end(function (err, res) {
                expect(res.body.message).to.equal('error deleting books')
                expect(res).to.have.status(400);
                done();
            });
    })
}) 