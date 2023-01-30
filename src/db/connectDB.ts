import mongoose from "mongoose";

export const connect = async (mongodbUrl: string) => {
  try {
    console.log("connecting to dbUrl ", mongodbUrl);
    await mongoose.connect(mongodbUrl as string);
    console.log("connected to mongodb");
  } catch (err) {
    console.log("Shutting down server : unable to connect mongodb database");
    console.log({ err });
    process.exit();
  }
};
