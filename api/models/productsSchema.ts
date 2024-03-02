import { Schema, model, Types } from 'mongoose';
import User from './usersSchema';
import type { IProductFields, IProductModel } from '../types';
import Category from './categorySchema';

const productsSchema = new Schema<IProductFields, IProductModel, unknown>({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	category: {
		type: Types.ObjectId,
		required: true,
		ref: 'categories',
		validate: {
			validator: async (categoryId: Types.ObjectId) => {
				const category = await Category.findById(categoryId);
				return Boolean(category);
			},
			message: 'Category is not found',
		},
	},
	user: {
		type: Types.ObjectId,
		required: true,
		ref: 'users',
		validate: {
			validator: async (userId: Types.ObjectId) => {
				const user = await User.findById(userId);
				return Boolean(user);
			},
			message: 'User is not found',
		},
	},
});

const Product = model<IProductFields, IProductModel>(
	'products',
	productsSchema,
);

export default Product;
