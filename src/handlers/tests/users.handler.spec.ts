import supertest from 'supertest';
import postgres from '../../database';
import app from '../..';

const request = supertest(app);
let token = '';

describe('Testing CRUD endpoints of the usersHandler', () => {
	it('Returns 200 OK when creating user via post request', async () => {
		const response = await request.post('/users').set('content-type', 'application/json').send({
			firstName: 'Mikasa',
			lastName: 'Ackerman',
			password: '445566'
		});
		token = response.body.token;
		expect(response.status).toBe(200);
		expect(response.body.first_name).toBe('Mikasa');
		expect(response.body.last_name).toBe('Ackerman');
	});
	it('Returns 200 OK when requesting users list via get request', async () => {
		const response = await request.get('/users').set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
		expect(response.body.length).toBe(1);
	});
	it('Returns 200 OK when requesting a user via get request', async () => {
		const response = await request.get('/users/1').set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
		expect(response.body.first_name).toBe('Mikasa');
		expect(response.body.last_name).toBe('Ackerman');
	});
	it('Returns 200 OK when updating a user via patch request', async () => {
		const response = await request
			.patch('/users')
			.set('content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.send({
				id: 1,
				firstName: 'Levi',
				lastName: 'Ackerman',
				password: '448877'
			});
		expect(response.status).toBe(200);
		expect(response.body.id).toBe(1);
		expect(response.body.first_name).toBe('Levi');
		expect(response.body.last_name).toBe('Ackerman');
	});
	it('Returns 200 OK when deleting a user via delete request', async () => {
		const response = await request
			.delete('/users/1')
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
