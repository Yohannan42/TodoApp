import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true } // ✅ Automatically adds createdAt & updatedAt fields
);

const User = mongoose.model("User", UserSchema);

export default User;
