import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
    resetPasswordToken: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: null },
});

const User = mongoose.model("User", userSchema);

export default User;
