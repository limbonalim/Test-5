import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import usersRouter from './router/users';
import config from './config';
import productsRouter from './router/products';
import categoriesRouter from './router/categories';

const app = express();
const port = 8000;

app.use(json());
app.use(express.static('public'));
app.use(cors());

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

const run = async () => {
	await mongoose.connect(config.mongoose);

	app.listen(port, () => {
		console.log(`Server started on ${port} port!`);
	});

	process.on('exit', () => {
		mongoose.disconnect();
	});
};

void run();
