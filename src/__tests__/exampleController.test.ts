
// import { ExampleController } from '../controllers/exampleController';
// import * as server from '../server';
var server = require('../server');
import * as request from 'supertest';

describe("GET /exampleGet", () => {
    it('exampleController exampleGet in TScript', async done=> {
        const result = await request(server.server()).get('/v1/Example/Route/test');
        expect(result.status).toBe(200);
        expect(result.text).toBe('\"test Modified!\"');
        done();
    });
});

describe("POST /examplePost", () => {
    it('exampleController examplePost in TScript', async done=> {
        const result = await request(server.server()).post('/v1/Example/Route/examplePost')
        .send({ex1string: 'this is a', ex2string: 'great test!'})
        .set('Accept', 'application/json');
        expect(result.status).toBe(200);
        expect(result.text).toBe('\"this is a great test!\"');
        // server.closeServer(() => console.log("YAY"));
        done();
    });
});

describe("POST /exampleBadPost", () => {
    it('exampleController with failing test in TScript', async done=> {
        const result = await request(server.server()).post('/v1/Example/Route/exampleBadPost')
        .send({number1: 1, number2: 6})
        .set('Accept', 'application/json');
        expect(result.text).toBe('7');
        server.close(() => {
            console.log("YAY")
        });
        done();
    });
});

