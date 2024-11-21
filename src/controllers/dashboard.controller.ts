import { Request, Response, RequestHandler } from "express";
import { User } from "../models/UserSchema";
import { ObjectId } from "mongoose";

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await User.find().select("-password -__v");

    res.status(200).json(users);
  } catch (err) {
    console.log(`catch ${err}`);
    res.status(500).json({ err: "Internal server error" });
  }
};

interface UsersActionBody {
  userIds: ObjectId[];
}

export const blockUsers: RequestHandler<unknown, unknown, UsersActionBody, unknown> = async (req, res) => {
  try {
    const { userIds } = req.body;

    await Promise.all(userIds.map(async (id) => {
      const u = await User.findById(id);

      if (!u) {
        throw new Error(`${id} this kind of user is not defined.`);
      }

      u.isBlocked = true;

      await u.save();
    }));

    res.status(200).json({ message: "Blocked successfully" });
  } catch (err) {
    console.log(`catch ${err}`);
    res.status(500).json({ err: "Internal server error" });
  }
};

export const unblockUsers: RequestHandler<unknown, unknown, UsersActionBody, unknown> = async (req, res) => {
  try {
    const { userIds } = req.body;

    await Promise.all(userIds.map(async (id) => {
      const u = await User.findById(id);

      if (!u) {
        throw new Error(`${id} this kind of user is not defined.`);
      }

      u.isBlocked = false;

      await u.save();
    }));

    res.status(200).json({ message: "Unblocked successfully" });
  } catch (err) {
    console.log(`catch ${err}`);
    res.status(500).json({ err: "Internal server error" });
  }
};

export const deleteUsers: RequestHandler<unknown, unknown, UsersActionBody, unknown> = async (req, res) => {
  try {
    const { userIds } = req.body;

    await Promise.all(userIds.map((id) => User.deleteOne({ _id: id })));

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.log(`catch ${err}`);
    res.status(500).json({ err: "Internal server error" });    
  }  
};
