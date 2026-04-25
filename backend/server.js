require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware — allow requests from Vercel frontend
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  process.env.FRONTEND_URL, // set this in Render environment variables
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // also allow any vercel.app domain
    if (origin.endsWith('.vercel.app')) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());

// Connect database
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/agriculture";
mongoose.connect(MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Define routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/requests", require("./routes/requests"));

// Test route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});