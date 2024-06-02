import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();

const app = express();
app.use(express.json());

//* connecting in to the mongodb

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.get("/", (req, res) => {
  res.json({
    message: "Hello",
  });
});

app.use("/api/user/", userRoutes);
app.use("/api/auth/", authRoutes);

app.listen(3000, () => {
  console.log("server runs on port 3000");
});
