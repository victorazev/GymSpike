// // Conexão com banco de dados
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

// export const connectionDataBase = async () => {
// 	const mongoURI = process.env.DATA_BASE_CONNECTION || '';
// 	console.log('env do mongo', mongoURI);
// 	try {
// 		await mongoose.connect(mongoURI);
// 		console.log('MongoDB connection successfully');
// 	} catch (error) {
// 		console.error('Deu ruim:', error);
// 	}
// };

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri =
// 	'mongodb+srv://victorazevdev:LBOQhipuHGVMNaBd@cluster0.mnbdz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// console.log(uri);
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
// 	serverApi: {
// 		version: ServerApiVersion.v1,
// 		strict: true,
// 		deprecationErrors: true,
// 	},
// });
// async function run() {
// 	try {
// 		// Connect the client to the server    (optional starting in v4.7)
// 		await client.connect();
// 		// Send a ping to confirm a successful connection
// 		await client.db('admin').command({ ping: 1 });
// 		console.log(
// 			'Pinged your deployment. You successfully connected to MongoDB!',
// 		);
// 	} finally {
// 		// Ensures that the client will close when you finish/error
// 		await client.close();
// 	}
// }
// run().catch(console.dir);

import mongoose from 'mongoose';

type TInput = {
	db: string;
};
export default ({ db }: TInput) => {
	const connect = () => {
		mongoose
			.connect(db)
			.set('useNewUrlParser', true)
			.then(() => {
				return console.info(`Successfully connected to ${db}`);
			})
			.catch((error) => {
				console.error('Error connecting to database: ', error);
				return process.exit(1);
			});
	};
	connect();

	mongoose.connection.on('disconnected', connect);
};
