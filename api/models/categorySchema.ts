import { Schema, model } from 'mongoose';
import type { ICategoryFields, ICategoryModel } from '../types';

const categorySchema = new Schema<ICategoryFields, ICategoryModel, unknown>({
	title: {
		type: String,
		required: true,
	},
	value: {
		type: String,
		required: true,
	},
});

const Category = model<ICategoryFields, ICategoryModel>(
	'categories',
	categorySchema,
);

export default Category;
