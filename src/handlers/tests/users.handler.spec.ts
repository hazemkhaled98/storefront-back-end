import supertest from 'supertest';
import { UserModel } from '../../models/user.model';
import postgres from '../../database';
import app from '../..';

const request = supertest(app);
const user = new UserModel();
let token = '';

describe('Testing CRUD endpoints of the usersHandler', () => {
	beforeAll(async () => {
		await user.create({
			first_name: 'Eren',
			last_name: 'Yeager',
			password: '112233'
		});
	});
	it('Returns 200 OK if the user info is valid', async () => {
		const response = await request
			.get('/authenticate')
			.set('content-type', 'application/json')
			.send({
				firstName: 'Eren',
				lastName: 'Yeager',
				password: '112233'
			});
		expect(response.status).toBe(200);
		token = response.body.data.token;
	});
	it('Returns 401 OK if the user info is invalid', async () => {
		const response = await request
			.get('/authenticate')
			.set('content-type', 'application/json')
			.send({
				firstName: 'Eren',
				lastName: 'Yeager',
				password: '11111'
			});
		expect(response.status).toBe(401);
	});
	it('Returns 200 OK when creating user via post request', async () => {
		const response = await request
			.post('/users')
			.set('content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.send({
				firstName: 'Mikasa',
				lastName: 'Ackerman',
				password: '445566'
			});
		expect(response.status).toBe(200);
		expect(response.body.first_name).toBe('Mikasa');
		expect(response.body.last_name).toBe('Ackerman');
	});
	it('Returns 200 OK when requesting users list via get request', async () => {
		const response = await request.get('/users').set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
		expect(response.body.length).toBe(2);
	});
	it('Returns 200 OK when requesting a user via get request', async () => {
		const response = await request.get('/users/1').set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
		expect(response.body.first_name).toBe('Eren');
		expect(response.body.last_name).toBe('Yeager');
	});
	it('Returns 200 OK when updating a user via patch request', async () => {
		const response = await request
			.patch('/users')
			.set('content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.send({
				id: 2,
				firstName: 'Levi',
				lastName: 'Ackerman',
				password: '448877'
			});
		expect(response.status).toBe(200);
		expect(response.body.id).toBe(2);
		expect(response.body.first_name).toBe('Levi');
		expect(response.body.last_name).toBe('Ackerman');
	});
	it('Returns 200 OK when deleting a user via delete request', async () => {
		const response = await request
			.delete('/users/2')
			.set('content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
		expect(response.body.first_name).toBe('Levi');
		expect(response.body.last_name).toBe('Ackerman');
	});
	afterAll(async () => {
		const conn = await postgres.connect();
		const sql = 'DELETE FROM users';
		const alterID = 'ALTER SEQUENCE users_id_seq RESTART WITH 1';
		await conn.query(sql);
		await conn.query(alterID);
		conn.release();
	});
});
