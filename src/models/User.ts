import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  address: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    enum: ["USER", "STAFF", "ADMIN", "TENANT"], // Tenant as cleint
    default: "STAFF",
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", UserSchema);
