import { optional } from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "user", optional: true },
    isActive: { type: Boolean, default: true, optional: true  }, // Check if user is active or not
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
