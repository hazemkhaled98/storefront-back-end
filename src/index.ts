import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import productsHandler from './handlers/products.handler';
import usersHandler from './handlers/users.handler';
import ordersHandler from './handlers/orders.handler';

dotenv.config();

const PORT = process.env.PORT || 3000;
// create an instance server
const app: Application = express();
// HTTP request logger middleware
app.use(morgan('short'));

// parse json
app.use(express.json());

// products handler
productsHandler(app);

// users handler
usersHandler(app);

//orders handler
ordersHandler(app);

// add routing for / path
app.get('/', (req: Request, res: Response) => {
	res.json({
		message: 'Hello, World 🌍'
	});
});

// error handling for not specified routes
app.use((_req, res) => {
	res.status(404).json({
		status: 'Not found',
		message: 'Seems like you are lost'
	});
});

// start express server
app.listen(PORT, () => {
	/* eslint-disable-next-line no-console */
	console.log(`Server is starting at port:${PORT}`);
});

export default app;
