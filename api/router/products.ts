import { Router } from 'express';
import mongoose from 'mongoose';
import Product from '../models/productsSchema';
import auth, { RequestWithUser } from '../middleware/auth';
import { imagesUpload } from '../multer';

const productsRouter = Router();

productsRouter.get('/', async (req, res, next) => {
	try {
		let products;
		if (req.query.category) {
			products = await Product.find({ category: req.query.category });
		} else {
			products = await Product.find();
		}

		if (!products[0]) {
			return res.status(404).send({ message: 'Not found' });
		}
		return res.send(products);
	} catch (e) {
		next(e);
	}
});

productsRouter.post(
	'/',
	auth,
	imagesUpload.single('image'),
	async (req: RequestWithUser, res, next) => {
		try {
			const user = req.user;

			const product = new Product({
				title: req.body.title,
				description: req.body.description,
				price: req.body.price,
				image: req.file ? `images/${req.file.filename}` : '',
				category: req.body.category,
				user: user?._id,
			});

			await product.save();
			return res.status(201).send(product);
		} catch (e) {
			if (e instanceof mongoose.Error.ValidationError) {
				return res.status(422).send(e);
			}

			next(e);
		}
	},
);

export default productsRouter;
