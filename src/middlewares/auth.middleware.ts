import { RequestHandler } from "express";
import dotenv from "../utils/validateEnv";
import jwt, { JwtPayload } from "jsonwebtoken";

interface JwtPayloadExtended extends JwtPayload {
  exp?: number;
}

export const authMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(403).json({ err: "Not allowed" });
  }

  try {
    const token = authHeader?.split(" ")[1];

    if (!token) {
      throw new Error("Invalid Token");
    }

    const decoded = jwt.verify(token, dotenv.TOKEN_KEY) as JwtPayloadExtended;

    if (!decoded.exp || Date.now() >= decoded.exp * 1000) {
      throw new Error("Token expired");
    }

    next();
  } catch (err) {
    res.status(403).json({ err: err instanceof Error ? err.message : "Unauthorized" });
  }
};
