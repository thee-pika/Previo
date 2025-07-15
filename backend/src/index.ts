import express from "express";
import { config } from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import serverless from 'serverless-http';
import { authRouter } from "./routes/auth";
import { paperRouter } from "./routes/paper";
config();

const app = express();
const PORT = process.env.PORT || 8000;
connectDB();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(cors());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/paper", paperRouter);

app.get("/", (req, res) => {
  res.send("backend is saying hii!!");
});

// app.listen(PORT, () => {
//   console.log("App is listening to", PORT);
// });

export const handler = serverless(app);

