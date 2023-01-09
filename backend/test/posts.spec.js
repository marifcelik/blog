const supertest = require('supertest');
const app = require('../src/app');

const request = supertest(app);
let id = undefined;

describe('GET /', () => {
    it('get all posts - /', async () => {
        const response = await request.get('/posts')

        expect.assertions(2);   
        expect(response.body['msg']).toBe('success');
        expect(response.body['result'].length).toBeTruthy()
    })

    it('get single post by id - /id', async () => {
        const id = 2;
        const response = await request.get(`/posts/${id}`)
        expect(response.body).toEqual({ id: 2, body: 'post 2' });
    })
})

describe('POST', () => {
    it('add post - /add', async () => {
        const data = { title: 'başlık 1', cover: 'cover 1', body: 'ilk post  test deneme' }
        const response = await request.post('/posts/add').set('Content-Type', 'application/json').send(JSON.stringify(data))

        expect.assertions(3);
        expect(response.statusCode).toBe(201);
        expect(response.body['msg']).toBe('success');
        expect(response.body['id']).toBeTruthy();
        id = response.body['id'];
    })
})

describe('UPDATE', () => {
    it('update post by id - /update', async () => {
        const data = { id, title: 'güncelleme 1', cover: 'sub title', body: 'güncelleme test' }
        const response = await request.patch('/posts/update').set('Content-Type', 'application/json').send(JSON.stringify(data))

        expect.assertions(2);
        expect(response.statusCode).toBe(200);
        expect(response.body['msg']).toBe('updated');
    })
})

describe('DELETE', () => {
    it('delete post by id - /rm', async () => {
        const data = { id }
        const response = await request.del('/posts/rm').set('Content-Type', 'application/json').send(JSON.stringify(data))

        expect.assertions(2);
        expect(response.statusCode).toBe(200);
        expect(response.body['msg']).toBe('deleted');
    })
})