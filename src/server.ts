import express from "express";
import { Request, Response } from "express";
import morgan from "morgan";
import { connect } from "./db/connectDB";
import config from "config";

const PORT = config.get("PORT") || 5000;
const app = express();

connect();

app.use(morgan("dev"));

app.use((req: Request, res: Response) => {
  res.send({ connected: true });
});

app.listen(PORT, () => {
  console.log(`api runnig on PORT ${PORT}`);
});
