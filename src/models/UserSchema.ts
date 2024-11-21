import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastSeen: { type: Date, required: true },
  isBlocked: { type: Boolean, required: true },
  // deletedAt: { type: Date, required: false },
});

export const User = mongoose.model("User", userSchema);
