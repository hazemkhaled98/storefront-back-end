import { ProductModel } from '../product.model';
import postgres from '../../database';

const product = new ProductModel();

describe('Product Model methods', () => {
	it('should have a create method', () => {
		expect(product.create).toBeDefined();
	});

	it('should have an index method', () => {
		expect(product.index).toBeDefined();
	});

	it('should have a show method', () => {
		expect(product.show).toBeDefined();
	});

	it('should have an update method', () => {
		expect(product.update).toBeDefined();
	});

	it('should have a delete method', () => {
		expect(product.delete).toBeDefined();
	});
});

describe('Product Model functionality', () => {
	//test create
	it('create method should add and return a product', async () => {
		const result = await product.create({
			name: 'Harry Potter',
			price: 50
		});
		expect(result).toEqual({
			id: 1,
			name: 'Harry Potter',
			price: 50
		});
	});
	//test index
	it('index method should return a list of products', async () => {
		const result = await product.index();
		expect(result).toEqual([
			{
				id: 1,
				name: 'Harry Potter',
				price: 50
			}
		]);
	});
	//test show
	it('show method should return the correct product', async () => {
		const result = await product.show(1);
		expect(result).toEqual({
			id: 1,
			name: 'Harry Potter',
			price: 50
		});
	});
	// test update
	it('update method should update a product', async () => {
		const result = await product.update({
			id: 1,
			name: 'Attack on Titan',
			price: 100
		});
		expect(result).toEqual({
			id: 1,
			name: 'Attack on Titan',
			price: 100
		});
	});
	// test delete
	it('delete method should remove and return the product', async () => {
		const result = await product.delete(1);
		expect(result).toEqual({
			id: 1,
			name: 'Attack on Titan',
			price: 100
		});
		const products = await product.index();
		expect(products).toEqual([]);
	});
	afterAll(async () => {
		const conn = await postgres.connect();
		const sql = 'DELETE FROM products';
		const alterID = 'ALTER SEQUENCE products_id_seq RESTART WITH 1';
		await conn.query(sql);
		await conn.query(alterID);
		conn.release();
	});
});
