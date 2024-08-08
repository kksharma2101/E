import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL);
    if (connect) {
      console.log("DB connected...");
    } else {
      console.warn("DB is not connected");
    }
  } catch (e) {
    console.log(`${e.message}`.red);
    console.log("error in connect db");
  }
};
export default connectDb;
