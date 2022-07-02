import { MongoClient, MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import { ObjectID } from 'bson';

dotenv.config();

const MongoClient = new MongoClient(process.env.Mongo_URI);
let db;
MongoClient.connect(() => {
    db = MongoClient.db(process.env.MONGO_DATABASE);
});

const ObjectId = ObjectID;

export { db, ObjectId };