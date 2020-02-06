import nock from 'nock'


nock('http://localhost:3000')//root url
    .get('/book')
    .reply(200, { books: [] })//retru n/
    .post('/book')
    .reply(200, { message: 'book successfully added' })//return /toto
    .put('/book/:id')
    .reply(200, { message: 'book successfully updated' })
    .delete('/book/:id')
    .reply(200, { message: 'book successfully deleted' })
    .get('/book')
    .reply(400, { message: 'error fetching books' })
    .post('/book')
    .reply(400, { message: 'error adding books' })
    .put('/book/:id')
    .reply(400, { message: 'error updating books' })
    .delete('/book/:id')
    .reply(400, { message: 'error deleting books' })
