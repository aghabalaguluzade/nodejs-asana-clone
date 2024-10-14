import mongoose from "mongoose";

const db = mongoose.connection;

db.on('error', error => {
   console.error('MongoDB connection error:', error);
});

db.once("open", (error, db) => {
   console.log('Connected to MongoDB');
});

db.on('disconnected', () => {
   console.log('Disconnected from MongoDB');
});

const connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGODB_URI, {
         autoIndex: false,
         serverSelectionTimeoutMS: 5000,
         connectTimeoutMS: 1000,
         socketTimeoutMS: 0,
      });
   } catch (error) {
      console.log('Error connecting to MongoDB server - ' + error.message);
   }
};

process.on('SIGINT', () => {
   db.close(() => {
      console.log('Mongoose connection is disconnected due to application termination');
      process.exit(0);
   });
});

export {
   connectDB
};