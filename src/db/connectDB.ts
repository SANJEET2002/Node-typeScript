import mongoose from "mongoose";
import config from "config";

const mongodbUrl: string = config.get("dbUrl");

export const connect = async () => {
  try {
    console.log("connecting to dbUrl ", mongodbUrl);
    await mongoose.connect(mongodbUrl);
    console.log("connected to mongodb");
  } catch (err) {
    console.log("Shutting down server : unable to connect mongodb database");
    console.log({ err });
    process.exit();
  }
};
