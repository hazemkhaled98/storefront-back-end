import express from 'express';
import authorize from '../middleware/authorization.middleware';
import { Order, OrderModel } from '../models/order.model';

const order = new OrderModel();

const showCurrent = async (req: express.Request, res: express.Response) => {
	try {
		const activeOrders: Order[] = await order.showCurrent(Number(req.params.id));
		res.json(activeOrders);
	} catch (error) {
		res.status(404).json(`No active orders for user ${req.params.id}`);
	}
};

const showCompleted = async (req: express.Request, res: express.Response) => {
	try {
		const completedOrders: Order[] = await order.showCompleted(Number(req.params.id));
		res.json(completedOrders);
	} catch (error) {
		res.status(404).json(`No completed orders for user ${req.params.id}`);
	}
};

const ordersHandler = (app: express.Application) => {
	app.get('/orders/active/:id', authorize, showCurrent);
	app.get('/orders/complete/:id', authorize, showCompleted);
};

export default ordersHandler;
