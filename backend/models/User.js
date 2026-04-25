const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  farmerId: { type: String, unique: true, sparse: true }, // Optional for officers
  location: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  farmType: { type: String }, // Optional for officers
  password: { type: String, required: true },
  role: { type: String, enum: ["Farmer", "Extension Officer"], required: true }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
