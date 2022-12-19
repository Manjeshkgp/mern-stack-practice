import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstname: { type: String, required: ["First Name is Required"] },
    lastname: { type: String, required: ["Last Name is Required"] },
    email: { type: String, required: ["Email is Required"] },
    password: { type: String, required: ["Password is Required"] },
    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

export default new mongoose.model("User", userSchema);
