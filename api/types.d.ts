import { Category } from './models/productsSchema';
import { Model, Schema } from 'mongoose';

export interface IUserFields {
	username: string;
	password: string;
	displayName: string;
	phone: string;
	token: string;
}

export interface IUserMethods {
	checkPassword(password: string): Promise<boolean>;
	generateToken(): void;
}

export type IUserModel = mongoose.Model<IUserFields, unknown, IUserMethods>;

export interface IProductFields {
	title: string;
	description: string;
	price: number;
	image: string;
	category: Schema.Types.ObjectId;
	user: Schema.Types.ObjectId;
}

export type IProductModel = Model<IProductFields, unknown, unknown>;

export interface ICategoryFields {
	title: string;
	value: string;
}

export type ICategoryModel = Model<ICategoryFields, unknown, unknown>;
