import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to Database");
  } catch (error) {
    console.log(`Error connecting to Database: ${error.message}`);
  }
};

export default connectToDb;
