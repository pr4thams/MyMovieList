import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

const uri = 'mongodb://127.0.0.1:27017/IMDb';
//const client = new MongoClient(uri, { useUnifiedTopology: true });
let imdbDb;

export async function connectToDB() {
  try {
    await mongoose.connect(uri, {useUnifiedTopology: true});
    //imdbDb = client.db('IMDb');
    console.log('Connected successfully to MongoDB');
  } catch (err) {
    console.error(err);
  }
}

export async function getIMDbDb() {
  return imdbDb;
}

export async function collection(name) {
  let collection = mongoose.connection.db.collection(name);
  let data = await collection.find({}).toArray()
  return data;
}

export async function closeDBConnection() {
  await client.close();
  console.log('Connection closed');
}

export default { connectToDB, getIMDbDb, closeDBConnection };
