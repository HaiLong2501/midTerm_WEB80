import mongoose from "mongoose";

const userShema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileId: { type: String },
});

const userModel = mongoose.model("users", userShema);
export default userModel;
