import mongoose from 'mongoose';
import config from './config';
import User from './models/usersSchema';
import Product, { Category } from './models/productsSchema';

const dropCollection = async (
	db: mongoose.Connection,
	collectionName: string,
) => {
	try {
		await db.dropCollection(collectionName);
	} catch (e) {
		console.log(`Collection ${collectionName} was missing, skipping drop`);
	}
};

const run = async () => {
	await mongoose.connect(config.mongoose);
	const db = mongoose.connection;

	const models = [User, Product];

	for (const model of models) {
		await dropCollection(db, model.collection.collectionName);
	}

	const [userOne, userTwo, userThree] = await User.create(
		{
			username: 'admin',
			password: '123321',
			displayName: 'AdminOne',
			phone: '+996704444444',
			token: crypto.randomUUID(),
		},
		{
			username: 'adminTwo',
			password: '123321',
			displayName: 'Super Admin',
			phone: '+996704321444',
			token: crypto.randomUUID(),
		},
		{
			username: 'user',
			password: '123321',
			displayName: 'User',
			phone: '+996704333333',
			token: crypto.randomUUID(),
		},
	);

	await Product.create(
		{
			title: 'Honda Accord',
			description: 'Honda Accord - 2004 год, машина живая и т д',
			price: 3000,
			user: userOne,
			category: Category.cars,
			image: '/fixtures/accord.jpeg',
		},
		{
			title: 'Продам ноутбук',
			description: 'Продам ноутбук',
			price: 220,
			user: userTwo,
			category: Category.computers,
			image: '/fixtures/computer.webp',
		},
		{
			title: 'Продам стол недорого',
			description: 'Продам офисный стол недорого',
			price: 320,
			user: userThree,
			category: Category.tables,
			image: '/fixtures/table.jpeg',
		},
		{
			title: 'Iphone 12',
			description: 'Продам IPhone 12 pro',
			price: 400,
			user: userOne,
			category: Category.other,
			image: '/fixtures/Iphone.jpeg',
		},
	);
	await db.close();
};

void run();
