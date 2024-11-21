import { Request, Response } from "express";
import { User } from "../models/UserSchema";

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (err) {
    console.log(`catch ${err}`);
    res.status(500).json({ err: "Internal server error" });
  }
};
