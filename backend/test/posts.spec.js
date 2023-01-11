const supertest = require('supertest');
const app = require('../src/app');

const request = supertest(app);

let id;

let expectedPost = {
    id: expect.any(Number),
    title: expect.any(String),
    cover: expect.any(String),
    body: expect.any(String),
}

describe('POST', () => {
    it.todo('should cant add without auth');

    it('add post - /add', async () => {
        const data = { title: 'title test', cover: 'cover test', body: 'post body test' }
        const response = await request.post('/posts/add').set('Content-Type', 'application/json').send(JSON.stringify(data))

        expect.assertions();
        expect(response.statusCode).toBe(201);
        expect(response.body['msg']).toBe('success');
        expect(response.body['result']).toMatchObject(expect.objectContaining(expectedPost));
        expect(new Date(response.body['result']['created_at']).getTime()).not.toBeNaN()
        id = response.body['result']['id'];
    })

    it('add post with missing parameters should give error', async () => {
        const data = { title: 'incorrect post', body: 'cover missing' }
        const response = await request.post('/posts/add').set('Content-Type', 'application/json').send(JSON.stringify(data))

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
            msg: 'error',
            error: 'invalid arguments'
        })
    })
})

describe('UPDATE', () => {
    it.todo('should cant update without auth');

    it('update post by id - /update', async () => {
        const data = { id, title: 'güncelleme 1', cover: 'sub title', body: 'güncelleme test' }
        const response = await request.patch('/posts/update').set('Content-Type', 'application/json').send(JSON.stringify(data))

        expect.assertions(5);
        expect(response.statusCode).toBe(200);
        expect(response.body['msg']).toBe('success');
        expect(response.body['result']).toMatchObject(expect.objectContaining(expectedPost));
        expect(new Date(response.body['result']['created_at']).getTime()).not.toBeNaN()
        expect(new Date(response.body['result']['updated_at']).getTime()).not.toBeNaN()
    })
})

describe('GET', () => {
    it('get all posts - /', async () => {
        const response = await request.get('/posts')

        expect.assertions(2);
        expect(response.body['msg']).toBe('success');
        expect(response.body['result']).toMatchObject(expect.arrayContaining([expect.objectContaining(expectedPost)]))
    })

    it('get single post by id - /id', async () => {
        const response = await request.get(`/posts/${id}`)
        expect(response.body['msg']).toBe('success');
        expect(response.body['result']).toMatchObject(expect.objectContaining(expectedPost))
    })
})

describe('DELETE', () => {
    it.todo('should cant delete without auth');

    it('delete post by id - /rm', async () => {
        const data = { id }
        const response = await request.del('/posts/rm').set('Content-Type', 'application/json').send(JSON.stringify(data))

        expect.assertions(2);
        expect(response.statusCode).toBe(200);
        expect(response.body['msg']).toBe('deleted');
    })
})