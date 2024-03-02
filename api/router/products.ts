import { Router } from 'express';
import mongoose, { Schema, Types } from 'mongoose';
import Product from '../models/productsSchema';
import auth, { RequestWithUser } from '../middleware/auth';
import { imagesUpload } from '../multer';

const productsRouter = Router();

productsRouter.get('/', async (req, res, next) => {
	try {
		let products;
		if (req.query.category) {
			products = await Product.find(
				{ category: req.query.category },
				'title price image',
			);
		} else {
			products = await Product.find({}, 'title price image');
		}

		if (!products[0]) {
			return res.status(404).send({ message: 'Not found' });
		}
		return res.send(products);
	} catch (e) {
		next(e);
	}
});

productsRouter.get('/:id', async (req, res, next) => {
	try {
		let productId: Types.ObjectId;
		try {
			productId = new Types.ObjectId(req.params.id);
		} catch {
			return res.status(404).send({ message: 'Wrong ObjectId!' });
		}

		const product = await Product.findById(productId).populate([
			{ path: 'user', select: 'displayName phone' },
			{ path: 'category', select: 'title value' },
		]);
		if (!product) {
			return res.status(404).send({ message: 'Not found' });
		}
		return res.send(product);
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
			const price = parseFloat(req.body.price);
			if (price < 0) {
				return res.status(400).send({ message: 'Price mast be upper than 0' });
			}

			const product = new Product({
				title: req.body.title,
				description: req.body.description,
				price: price,
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

productsRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
	try {
		const user = req.user;

		let productId: Types.ObjectId;
		try {
			productId = new Types.ObjectId(req.params.id);
		} catch {
			return res.status(404).send({ error: 'Wrong ObjectId!' });
		}

		const product = await Product.find({
			_id: productId,
			user: user,
		});

		if (!product) {
			return res.status(403).send({ message: 'some error' });
		}

		await Product.findByIdAndDelete(productId);

		return res.send({ message: 'successful' });
	} catch (e) {
		if (e instanceof mongoose.Error.ValidationError) {
			return res.status(422).send(e);
		}

		next(e);
	}
});

export default productsRouter;
