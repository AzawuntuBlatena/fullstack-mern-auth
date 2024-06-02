import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  console.log("Hashed password:", hashedPassword);
  const newUser = new User({ username, email, password: hashedPassword });
  console.log("New user object:", newUser);
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error saving new user:", error);
    res.status(500).json({ error: error.message });
  }
};
