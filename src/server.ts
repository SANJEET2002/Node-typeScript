import express from "express";
import { Request, Response } from "express";
import morgan from "morgan";
import { connect } from "./db/connectDB";
import body_parser from "body-parser";
import userRoutes from "./routes/users.routes";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config({ path: "./config/.env" });

const PORT = process.env.PORT;
const app = express();

if (process.env.NODE_ENV === "PRODUCTION") {
  connect(process.env.PRODUCTION_DB as string);
  console.log("connected to production db");
} else {
  connect(process.env.DEVLOPMENT_DB as string);
  console.log("connected to devlopment db");
}

app.use(cors());
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
