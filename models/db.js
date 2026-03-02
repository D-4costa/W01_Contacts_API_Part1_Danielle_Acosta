
import { MongoClient } from 'mongodb';

let database; 
let client;

export const connectDB = async () => {
  try {

    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    database = client.db('contactsDB');

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

export const getDB = () => database;
