import supertest from 'supertest';
import postgres from '../../database';
import app from '../..';

const request = supertest(app);
let token = '';

describe('Testing CRUD endpoints of the productsHandler', () => {
	beforeAll(async () => {
		const response = await request.post('/users').set('content-type', 'application/json').send({
			firstName: 'Eren',
			lastName: 'Yeager',
			password: '112233'
		});
		token = response.body.token;
	});
	it('Returns 200 OK when creating product via post request', async () => {
		const response = await request
			.post('/products')
			.set('content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'T-shirt',
				price: 20
			});
		expect(response.status).toBe(200);
		expect(response.body.name).toBe('T-shirt');
		expect(response.body.price).toBe(20);
	});
	it('Returns 200 OK when requesting products list via get request', async () => {
		const response = await request.get('/products');
		expect(response.status).toBe(200);
		expect(response.body.length).toBe(1);
	});
	it('Returns 200 OK when requesting a product via get request', async () => {
		const response = await request.get('/products/1');
		expect(response.status).toBe(200);
		expect(response.body.name).toBe('T-shirt');
		expect(response.body.price).toBe(20);
	});
	it('Returns 200 OK when updating a product via patch request', async () => {
		const response = await request
			.patch('/products')
			.set('content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.send({
				id: 1,
				name: 'Jacket',
				price: 50
			});
		expect(response.status).toBe(200);
		expect(response.body.id).toBe(1);
		expect(response.body.name).toBe('Jacket');
		expect(response.body.price).toBe(50);
	});
	it('Returns 200 OK when deleting a user via delete request', async () => {
		const response = await request
			.delete('/products/1')
			.set('content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
		expect(response.body.name).toBe('Jacket');
		expect(response.body.price).toBe(50);
	});
	afterAll(async () => {
		const conn = await postgres.connect();
		const usersSql = 'DELETE FROM users';
		const alterUsersID = 'ALTER SEQUENCE users_id_seq RESTART WITH 1';
		const productssSql = 'DELETE FROM products';
		const alterProductsID = 'ALTER SEQUENCE products_id_seq RESTART WITH 1';
		await conn.query(usersSql);
		await conn.query(alterUsersID);
		await conn.query(productssSql);
		await conn.query(alterProductsID);
		conn.release();
	});
});
