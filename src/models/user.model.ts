import postgres from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const { BCRYPT_PEPPER, BCRYPT_SALT } = process.env;

export const hash = (password: string) => {
	const salt = parseInt(BCRYPT_SALT as string, 10);
	return bcrypt.hashSync(`${password}${BCRYPT_PEPPER}`, salt);
};

export type User = {
	id?: number;
	first_name: string;
	last_name: string;
	password?: string;
};

export class UserModel {
	// create user
	async create(user: User): Promise<User> {
		try {
			const conn = await postgres.connect();
			const sql =
				'INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING id, first_name, last_name';
			const res = await conn.query(sql, [
				user.first_name,
				user.last_name,
				hash(user.password as string)
			]);
			conn.release();
			return res.rows[0] as User;
		} catch (err) {
			throw new Error(`Cannot create user ${user}. ${err}`);
		}
	}
	// show all users
	async index(): Promise<User[]> {
		try {
			const conn = await postgres.connect();
			const sql = 'SELECT id, first_name, last_name FROM users';
			const res = await conn.query(sql);
			conn.release();
			return res.rows as User[];
		} catch (err) {
			throw new Error(`Cannot connect to database. ${err}`);
		}
	}
	// show specific user
	async show(id: number): Promise<User> {
		try {
			const conn = await postgres.connect();
			const sql = 'SELECT id, first_name, last_name FROM users WHERE id = ($1)';
			const res = await conn.query(sql, [id]);
			conn.release();
			return res.rows[0] as User;
		} catch (err) {
			throw new Error(`Cannot not find user ${id}. ${err}`);
		}
	}
	// update user
	async update(user: User): Promise<User> {
		try {
			const conn = await postgres.connect();
			const sql =
				'UPDATE users SET first_name=($1), last_name=($2), password=($3) WHERE id=($4) RETURNING id, first_name, last_name';
			const res = await conn.query(sql, [
				user.first_name,
				user.last_name,
				hash(user.password as string),
				user.id
			]);
			conn.release();
			return res.rows[0] as User;
		} catch (err) {
			throw new Error(`Cannot not update user ${user.id}. ${err}`);
		}
	}
	// delete user
	async delete(id: number): Promise<User> {
		try {
			const conn = await postgres.connect();
			const sql = 'DELETE FROM users WHERE id = ($1) RETURNING id, first_name, last_name';
			const res = await conn.query(sql, [id]);
			conn.release();
			return res.rows[0] as User;
		} catch (err) {
			throw new Error(`Cannot not delete user ${id}. ${err}`);
		}
	}
}
