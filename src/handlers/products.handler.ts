import express from 'express';
import authorize from '../middleware/authorization.middleware';
import { Product, ProductModel } from '../models/product.model';

const product = new ProductModel();

const create = async (req: express.Request, res: express.Response) => {
	try {
		const createdProduct: Product = await product.create({
			name: req.body.name,
			price: req.body.price
		});
		res.json(createdProduct);
	} catch (err) {
		res.status(400).json(`Cannot create product ${req.body.name}`);
	}
};

const index = async (_req: express.Request, res: express.Response) => {
	try {
		const products = await product.index();
		res.json(products);
	} catch (err) {
		res.status(400).json(`Cannot fetch products`);
	}
};

const show = async (req: express.Request, res: express.Response) => {
	try {
		const requiredProduct = await product.show(Number(req.params.id));
		res.json(requiredProduct);
	} catch (err) {
		res.status(400).json(`Cannot fetch product ${req.params.id}`);
	}
};

const update = async (req: express.Request, res: express.Response) => {
	try {
		const updatedProduct = await product.update({
			id: req.body.id,
			name: req.body.name,
			price: req.body.price
		});
		res.json(updatedProduct);
	} catch (err) {
		res.status(400).json(`Cannot update product ${req.body.id}`);
	}
};

const deleteProduct = async (req: express.Request, res: express.Response) => {
	try {
		const deletedProduct = await product.delete(Number(req.params.id));
		res.json(deletedProduct);
	} catch (err) {
		res.status(400).json(`Cannot delete product ${req.params.id}`);
	}
};

const productsHandler = (app: express.Application) => {
	app.post('/products', authorize, create);
	app.get('/products', index);
	app.get('/products/:id', show);
	app.patch('/products', authorize, update);
	app.delete('/products/:id', authorize, deleteProduct);
};

export default productsHandler;
