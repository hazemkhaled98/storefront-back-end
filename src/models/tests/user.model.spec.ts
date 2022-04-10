import { hash, UserModel } from '../user.model';
import postgres from '../../database';

const user = new UserModel();

describe('user Model methods', () => {
	it('should have a create method', () => {
		expect(user.create).toBeDefined();
	});

	it('should have an index method', () => {
		expect(user.index).toBeDefined();
	});

	it('should have a show method', () => {
		expect(user.show).toBeDefined();
	});

	it('should have an update method', () => {
		expect(user.update).toBeDefined();
	});

	it('should have a delete method', () => {
		expect(user.delete).toBeDefined();
	});
});

describe('user Model functionality', () => {
	//test create
	it('create method should add and return a user', async () => {
		const result = await user.create({
			first_name: 'Harry',
			last_name: 'Potter',
			password: '505050'
		});
		expect(result).toEqual({
			id: 1,
			first_name: 'Harry',
			last_name: 'Potter'
		});
	});
	// test authenticate
	it('authenticate method should verify user', async () => {
		const result = await user.authenticate({
			first_name: 'Harry',
			last_name: 'Potter',
			password: '505050'
		});
		expect(result).toEqual({
			id: 1,
			first_name: 'Harry',
			last_name: 'Potter'
		});
		const fakeUser = await user.authenticate({
			first_name: 'Harry',
			last_name: 'Maguire',
			password: '0000'
		});
		expect(fakeUser).toEqual(null);
	});
	//test index
	it('index method should return a list of users', async () => {
		const result = await user.index();
		expect(result).toEqual([
			{
				id: 1,
				first_name: 'Harry',
				last_name: 'Potter'
			}
		]);
	});
	//test show
	it('show method should return the correct user', async () => {
		const result = await user.show(1);
		expect(result).toEqual({
			id: 1,
			first_name: 'Harry',
			last_name: 'Potter'
		});
	});
	// test update
	it('update method should update a user', async () => {
		const result = await user.update({
			id: 1,
			first_name: 'Eren',
			last_name: 'Yeager',
			password: hash('141414')
		});
		expect(result).toEqual({
			id: 1,
			first_name: 'Eren',
			last_name: 'Yeager'
		});
	});
	// test delete
	it('delete method should remove and return the user', async () => {
		const result = await user.delete(1);
		expect(result).toEqual({
			id: 1,
			first_name: 'Eren',
			last_name: 'Yeager'
		});
		const users = await user.index();
		expect(users).toEqual([]);
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
