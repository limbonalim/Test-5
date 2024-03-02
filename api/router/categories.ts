import { Router } from 'express';
import Category from '../models/categorySchema';

const categoriesRouter = Router();

categoriesRouter.get('/', async (req, res, next) => {
	try {
		const categories = await Category.find();

		res.send(categories);
	} catch (e) {
		next(e);
	}
});

export default categoriesRouter;
