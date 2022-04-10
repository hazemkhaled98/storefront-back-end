import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { TOKEN_SECRET } = process.env;

const authorize = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try {
		const authHeader = req.get('Authorization');
		if (authHeader) {
			const bearer = authHeader.split(' ')[0];
			const token = authHeader.split(' ')[1];
			if (token && bearer === 'Bearer') {
				const verified = jwt.verify(token, TOKEN_SECRET as unknown as string);
				if (verified) {
					next();
				} else {
					res.status(401).json('Invalid token');
				}
			} else {
				res.status(401).json('Invalid token type');
			}
		} else {
			res.status(401).json('No token has been sent');
		}
	} catch (err) {
		res.status(401).json('User is not authorized');
	}
};

export default authorize;
