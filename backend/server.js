import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js"

import connectToMongoDB from "./db/connectMongoDB.js";


const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); //to parse the incomeing request with Json Payloads(from req.body)
app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

// app.get("/", (req, res) => {
//   res.send("hello world");
// });

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Runing on port ${PORT}`);
});
