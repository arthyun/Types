import { MongoClient } from 'mongodb';

let connectDB: Promise<MongoClient>;
const url = 'mongodb+srv://admin:3316@nextjs.jtyjplx.mongodb.net/?retryWrites=true&w=majority';
const options: any = { useNewUrlParser: true };

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options).connect();
}
export { connectDB };
