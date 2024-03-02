import mongoose from 'mongoose';
import config from './config';
import Artist from './models/artistsSchema';
import Album from './models/albumsSchema';
import Track from './models/tracksSchema';

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

	const collections = [];

	for (const collectionName of collections) {
		await dropCollection(db, collectionName);
	}

	await db.close();
};

void run();
