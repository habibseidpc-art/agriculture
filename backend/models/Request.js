const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cropType: { type: String, required: true },
  problemDescription: { type: String, required: true },
  farmSize: { type: String, required: true },
  requestDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Solved"],
    default: "Pending"
  },
  officer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  advisory: {
    advice: String,
    fertilizerRecommendation: String,
    pestControlTips: String,
    alertDate: Date
  }
}, { timestamps: true });

module.exports = mongoose.model("Request", RequestSchema);