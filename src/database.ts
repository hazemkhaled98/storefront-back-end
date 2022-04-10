import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
	POSTGRES_HOST,
	POSTGRES_DB,
	POSTGRES_DB_TEST,
	POSTGRES_USER,
	POSTGRES_PASS,
	POSTGRES_PORT,
	NODE_ENV
} = process.env;

const postgres = new Pool({
	host: POSTGRES_HOST,
	database: NODE_ENV === 'test' ? POSTGRES_DB_TEST : POSTGRES_DB,
	user: POSTGRES_USER,
	password: POSTGRES_PASS,
	port: parseInt(POSTGRES_PORT as string, 10),
	max: 2
});

export default postgres;
