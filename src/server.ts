import express from "express";
import { Request, Response } from "express";
import morgan from "morgan";
import { connect } from "./db/connectDB";
import config from "config";
import body_parser from "body-parser";
import userRoutes from "./routes/users.routes";
import * as dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

const PORT = config.get("PORT") || 5000;
const app = express();

connect();
app.use(morgan("dev"));
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use("/api/v1", userRoutes);

app.use("api/v1", (req: Request, res: Response) => {
  res.send({ connected: true });
});

app.listen(PORT, () => {
  console.log(`api runnig on PORT ${PORT}`);
});
