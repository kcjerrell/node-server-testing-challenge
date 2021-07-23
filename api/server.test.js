const request = require('supertest');
const server = require('./server');

const testData = [
	{
		name: 'strawberry waffles',
		colors: ['#6f2206', '#a53e53', '#cdae88'],
		id: 1
	},
	{ name: 'loam', colors: ['#7b493d', '#6d625f', '#8c9db4'], id: 2 }
]

const testScheme = {
	name: "test test",
	colors: ["red", "blue", "green"]
}

describe('GET /schemes', () => {
	test('gets all the schemes', async () => {
		const res = await request(server).get('/schemes');
		expect(res.body).toHaveLength(2);
		expect(res.body).toMatchObject(testData);
	});
	test('snapshot test', async () => {
		const res = await request(server).get('/schemes')
		expect(res.body).toMatchSnapshot()
	})
});

describe('GET /schemes/id', () => {
	test('returns the correct scheme by id', async () => {
		const res = await request(server).get('/schemes/2');
		expect(res.body).toMatchObject(testData[1]);
	})
	test('gives error for invalid id', async () => {
		const res = await request(server).get('/schemes/apple');
		expect(res.status).toBe(400);
		expect(res.body.message).toMatch(/invalid/);
	})
	test('gives error for id not found', async () => {
		const res = await request(server).get('/schemes/1500');
		expect(res.status).toBe(404);
		expect(res.body.message).toMatch(/not found/);
	})
})

describe('POST /schemes', () => {
	test('responds with code 201', async () => {
		const res = await request(server).post('/schemes').send(testScheme);
		expect(res.status).toBe(201);
	})
	test('responds with new scheme', async () => {
		const res = await request(server).post('/schemes').send(testScheme);
		expect(res.body).toMatchObject({ id: 4, ...testScheme });
	})
	test('gives error for missing name', async () => {
		const res = await request(server).post('/schemes').send({ colors: ['red', ' blue'] });
		expect(res.status).toBe(400);
		expect(res.body.message).toMatch(/name is required/);
	})
})
