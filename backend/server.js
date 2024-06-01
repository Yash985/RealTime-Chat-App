//Package imports
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
//File imports
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToDb from "./db/connectToDb.js";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(cookieParser());//Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);



app.get("/", (req, res) => {
  res.send("API is running....");
});

app.listen(port, () => {
  connectToDb();
  console.log(`Server started on port ${port}`);
});