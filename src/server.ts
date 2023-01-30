import express from "express";
import { Request, Response } from "express";
import morgan from "morgan";
import { connect } from "./db/connectDB";
import body_parser from "body-parser";
import userRoutes from "./routes/users.routes";
import * as dotenv from "dotenv";
import session from "express-session";
dotenv.config({ path: "./config/.env" });

const PORT = process.env.PORT;
const app = express();

connect(process.env.dbUrl as string);
app.use(
  session({
    secret: process.env.SESSION_SECERT as string,
    cookie: { httpOnly: true , maxAge : 60000 },
    resave: false,
    saveUninitialized: false,
    
  })
);
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
