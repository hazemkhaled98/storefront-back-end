import postgres from '../database';

export type Order = {
	id?: number;
	status: string;
	user_id: number;
};

export class OrderModel {
	// show active orders
	async showCurrent(userID: number): Promise<Order[]> {
		try {
			const conn = await postgres.connect();
			const sql = "SELECT * FROM orders WHERE status='active' AND user_id= ($1)";
			const res = await conn.query(sql, [userID]);
			conn.release();
			return res.rows as Order[];
		} catch (err) {
			throw new Error(`Cannot find active orders of user ${userID}. ${err}`);
		}
	}
	// show completed orders
	async showCompleted(userID: number): Promise<Order[]> {
		try {
			const conn = await postgres.connect();
			const sql = "SELECT * FROM orders WHERE status='complete' AND user_id= ($1)";
			const res = await conn.query(sql, [userID]);
			conn.release();
			return res.rows as Order[];
		} catch (err) {
			throw new Error(`Cannot find completed orders of user ${userID}. ${err}`);
		}
	}
}
