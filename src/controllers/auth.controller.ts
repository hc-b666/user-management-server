import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/UserSchema";
import { createSecretToken } from "../utils/jwt";

export async function register(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ err: "All inputs are required" });
    }

    const exists = await User.findOne({ email });

    if (exists) {
      res.status(409).json({ err: "User already exists. Please login" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      lastSeen: Date.now(),
      isBlocked: false,
    });

    await newUser.save();

    res.status(200).json({ message: "Successfully registered!" });
  } catch (err) {
    console.log(`catch: ${err}`);
    res.status(500).json({ err: "Internal server error" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ err: "All inputs are required" });
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).json({ err: "Invalid credentials" });
    }

    const token = createSecretToken(user!._id.toString());

    res.status(200).json({ message: "Succesfully logged in!", token });
  } catch (err) {
    console.log(`catch ${err}`);
    res.status(500).json({ err: "Internal server error" });
  }
}
