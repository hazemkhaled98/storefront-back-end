import express from 'express';
import { User, UserModel } from '../models/user.model';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import authorize from '../middleware/authorization.middleware';

dotenv.config();

const user = new UserModel();

const { TOKEN_SECRET } = process.env;

const authenticate = async (req: express.Request, res: express.Response) => {
	try {
		const authenticateduser = await user.authenticate({
			first_name: req.body.firstName,
			last_name: req.body.lastName,
			password: req.body.password
		});
		if (authenticateduser) {
			const token = jwt.sign(authenticateduser, TOKEN_SECRET as unknown as string);
			res.json({
				status: 'Success',
				data: { ...authenticateduser, token }
			});
		} else {
			res.status(401).json({
				status: 'Your info is invalid. Check and try again'
			});
		}
	} catch (err) {
		res.status(400).json({
			status: 'failed to authenticate'
		});
	}
};

const create = async (req: express.Request, res: express.Response) => {
	try {
		const createdUser: User = await user.create({
			first_name: req.body.firstName,
			last_name: req.body.lastName,
			password: req.body.password
		});
		res.json(createdUser);
	} catch (err) {
		res.status(400).json(`Cannot create user ${req.body.name}`);
	}
};

const index = async (_req: express.Request, res: express.Response) => {
	try {
		const users = await user.index();
		res.json(users);
	} catch (err) {
		res.status(400).json(`Cannot fetch users.`);
	}
};

const show = async (req: express.Request, res: express.Response) => {
	try {
		const requiredUser = await user.show(Number(req.params.id));
		res.json(requiredUser);
	} catch (err) {
		res.status(404).json(`Cannot fetch user ${req.params.id}`);
	}
};

const update = async (req: express.Request, res: express.Response) => {
	try {
		const updatedUser: User = await user.update({
			id: req.body.id,
			first_name: req.body.firstName,
			last_name: req.body.lastName,
			password: req.body.password
		});
		res.json(updatedUser);
	} catch (err) {
		res.status(400).json(`Cannot update user ${req.body.name}`);
	}
};

const deleteUser = async (req: express.Request, res: express.Response) => {
	try {
		const deletedUser = await user.delete(Number(req.params.id));
		res.json(deletedUser);
	} catch (err) {
		res.status(404).json(`Cannot delete user ${req.params.id}`);
	}
};

const usersHandler = (app: express.Application) => {
	app.get('/authenticate', authenticate);
	app.post('/users', authorize, create);
	app.get('/users', authorize, index);
	app.get('/users/:id', authorize, show);
	app.patch('/users', authorize, update);
	app.delete('/users/:id', authorize, deleteUser);
};

export default usersHandler;
