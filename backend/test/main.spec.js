const supertest = require('supertest');
const app = require('../src/app');

const request = supertest(app);

describe('main test', () => {
    it('app request atabiliyor mu', async () => {
        const response = await request.get('/');
        expect(response.text).toBe('Hello World!');
    })
})