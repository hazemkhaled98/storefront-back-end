import { OrderModel } from '../order.model';
import postgres from '../../database';

const order = new OrderModel();

describe('Order Model methods', () => {
	it('Should have show current method', () => {
		expect(order.showCurrent).toBeDefined();
	});
	it('Should have show completed method', () => {
		expect(order.showCompleted).toBeDefined();
	});
});

describe('Order Model functionality', () => {
	// We need to create orders and user before we test the methods as the table contain a foreign key of user
	beforeAll(async () => {
		const conn = await postgres.connect();
		const createUser =
			"INSERT INTO users (first_name, last_name, password) VALUES ('mikasa', 'ackerman', '123')";
		const completedSql = "INSERT INTO orders (status, user_id) VALUES ('complete', 1)";
		const activeSql = "INSERT INTO orders (status, user_id) VALUES ('active', 1)";
		await conn.query(createUser);
		await conn.query(completedSql);
		await conn.query(activeSql);
		conn.release();
	});
	it('Show completed method should return all the completed orders of the user', async () => {
		const result = await order.showCompleted(1);
		expect(result).toEqual([
			{
				id: 1,
				status: 'complete',
				user_id: '1' as unknown as number
			}
		]);
	});
	it('Show current method should return all the active orders of the user', async () => {
		const result = await order.showCurrent(1);
		expect(result).toEqual([
			{
				id: 2,
				status: 'active',
				user_id: '1' as unknown as number
			}
		]);
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
