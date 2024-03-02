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
	category: Category;
	user: Schema.Types.ObjectId;
}

export type IProductModel = Model<IProductFields, unknown, unknown>;
