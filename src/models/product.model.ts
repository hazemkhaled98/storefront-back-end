import postgres from '../database';

export type Product = {
	id?: number;
	name: string;
	price: number;
};

export class ProductModel {
	// create a product
	async create(product: Product): Promise<Product> {
		try {
			const conn = await postgres.connect();
			const sql = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *';
			const res = await conn.query(sql, [product.name, product.price]);
			conn.release();
			return res.rows[0] as Product;
		} catch (err) {
			throw new Error(`Cannot create product ${product}. Error: ${err}`);
		}
	}
	// show all products
	async index(): Promise<Product[]> {
		try {
			const conn = await postgres.connect();
			const sql = 'SELECT * FROM products';
			const res = await conn.query(sql);
			conn.release();
			return res.rows as Product[];
		} catch (err) {
			throw new Error(`Cannnot connect to database ${err}`);
		}
	}
	// show specific product
	async show(id: number): Promise<Product> {
		try {
			const conn = await postgres.connect();
			const sql = 'SELECT * FROM products WHERE id = ($1)';
			const res = await conn.query(sql, [id]);
			conn.release();
			return res.rows[0] as Product;
		} catch (err) {
			throw new Error(`Could not find product ${id}. Error: ${err}`);
		}
	}
	// update product
	async update(product: Product): Promise<Product> {
		try {
			const conn = await postgres.connect();
			const sql = 'UPDATE products SET name=($1), price=($2) WHERE id=($3) RETURNING *';
			const res = await conn.query(sql, [product.name, product.price, product.id]);
			conn.release();
			return res.rows[0] as Product;
		} catch (err) {
			throw new Error(`Cannot create product ${product}. Error: ${err}`);
		}
	}
	// delete product
	async delete(id: number): Promise<Product> {
		try {
			const conn = await postgres.connect();
			const sql = 'DELETE FROM products WHERE id = ($1) RETURNING *';
			const res = await conn.query(sql, [id]);
			conn.release();
			return res.rows[0] as Product;
		} catch (err) {
			throw new Error(`Could not delete product ${id}. Error: ${err}`);
		}
	}
}
