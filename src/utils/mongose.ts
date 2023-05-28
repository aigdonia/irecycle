import mongoose from 'mongoose';

const connectMongo = async () => mongoose.connect(process.env.MONGODB_CONNECTION || "");

export default connectMongo;