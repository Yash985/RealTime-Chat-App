//Package imports
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
//File imports
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { app, server } from "./socket/socket.js";
//Database connection
import connectToDb from "./db/connectToDb.js";

const port = process.env.PORT || 3000;

const __dirname = path.resolve();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(cookieParser()); //Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
// app.get("/", (req, res) => {
//   res.send("API is running....");
// });

server.listen(port, () => {
  connectToDb();
  console.log(`Server started on port ${port}`);
});
