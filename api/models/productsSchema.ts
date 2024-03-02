import { Schema, model, Types } from 'mongoose';
import User from './usersSchema';
import type { IProductFields, IProductModel } from '../types';

export enum Category {
	computers = 'computers',
	tables = 'tables',
	cars = 'cars',
	other = 'other',
}

const productsSchema = new Schema<IProductFields, IProductModel, unknown>({
	title: {
		type: String,
		required: true,
	},
	description: String,
	price: {
		type: Number,
		required: true,
	},
	image: String,
	category: {
		type: String,
		enum: Category,
		default: Category.other,
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
