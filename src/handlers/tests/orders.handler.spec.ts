import supertest from 'supertest';
import app from '../..';
import { UserModel } from '../../models/user.model';
import postgres from '../../database';

const request = supertest(app);
const user = new UserModel();
let token = '';

describe('Testing CRUD endpoints of the ordersHandler', () => {
	beforeAll(async () => {
		await user.create({
			first_name: 'Eren',
			last_name: 'Yeager',
			password: '112233'
		});
		const response = await request
			.get('/authenticate')
			.set('content-type', 'application/json')
			.send({
				firstName: 'Eren',
				lastName: 'Yeager',
				password: '112233'
			});
		token = response.body.data.token;
		const conn = await postgres.connect();
		const completedSql = "INSERT INTO orders (status, user_id) VALUES ('complete', 1)";
		const activeSql = "INSERT INTO orders (status, user_id) VALUES ('active', 1)";
		await conn.query(completedSql);
		await conn.query(activeSql);
		conn.release();
	});
	it('Returns 200 OK and Shows active orders of a user', async () => {
		const response = await request.get('/orders/active/1').set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
		expect(response.body.length).toBe(1);
	});
	it('Returns 200 OK and Shows completed orders of a user', async () => {
		const response = await request
			.get('/orders/complete/1')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
		expect(response.body.length).toBe(1);
	});
	afterAll(async () => {
		const conn = await postgres.connect();
		const usersSql = 'DELETE FROM users';
		const alterUsersID = 'ALTER SEQUENCE users_id_seq RESTART WITH 1';
		const ordersSql = 'DELETE FROM orders';
		const alterOrdersID = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1';
		await conn.query(ordersSql);
		await conn.query(alterOrdersID);
		await conn.query(usersSql);
		await conn.query(alterUsersID);
		conn.release();
	});
});
