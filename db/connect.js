import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let _db;

export const initDb = async (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    _db = client;
    console.log('Connected successfully to MongoDB');
    callback(null, _db);
  } catch (err) {
    console.log('Connection error:', err.message);
    callback(err);
  }
};

export const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};