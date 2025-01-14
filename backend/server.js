import express from "express";
import dotenv from "dotenv";
import path from "path"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectToMongoDB from "./db/connectMongoDB.js";
import  {app,server} from "./socket/socket.js"

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve()

dotenv.config();

app.use(express.json()); //to parse the incomeing request with Json Payloads(from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


// app.get("/", (req, res) => {
//   res.send("hello world");
// });

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Runing on port ${PORT}`);
});
