import dotenv from "./validateEnv";
import jwt from "jsonwebtoken";

export function createSecretToken(id: string) {
  return jwt.sign({ id }, dotenv.TOKEN_KEY, {
    expiresIn: 60 * 60,
  });
};
