import path from 'path';

const rootPath = __dirname;

const config = {
	rootPath,
	publicPath: path.join(rootPath, 'public'),
	mongoose: 'mongodb://localhost/market',
};

export default config;
