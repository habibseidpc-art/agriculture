const express = require("express");
const router = express.Router();
const Request = require("../models/Request");
const User = require("../models/User");
const auth = require("../middleware/auth");

// Submit a farming request (Farmer)
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "Farmer") {
      return res.status(403).json({ msg: "Only farmers can submit requests" });
    }

    const { cropType, problemDescription, farmSize } = req.body;

    const newRequest = new Request({
      farmer: req.user.id,
      cropType,
      problemDescription,
      farmSize
    });

    const request = await newRequest.save();
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get requests (Farmer sees own, Officer sees all or filters)
router.get("/", auth, async (req, res) => {
  try {
    let requests;
    if (req.user.role === "Farmer") {
      requests = await Request.find({ farmer: req.user.id }).populate("officer", ["fullName"]).sort({ requestDate: -1 });
    } else if (req.user.role === "Extension Officer") {
      requests = await Request.find().populate("farmer", ["fullName", "location", "phoneNumber"]).sort({ requestDate: -1 });
    }
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Provide advice (Extension Officer)
router.put("/:id/advise", auth, async (req, res) => {
  try {
    if (req.user.role !== "Extension Officer") {
      return res.status(403).json({ msg: "Only officers can provide advice" });
    }

    const { advice, fertilizerRecommendation, pestControlTips, alertDate, status } = req.body;

    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ msg: "Request not found" });

    request.advisory = { advice, fertilizerRecommendation, pestControlTips, alertDate };
    request.status = status || "In Progress";
    request.officer = req.user.id;

    await request.save();
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Dashboard Analytics
router.get("/dashboard", auth, async (req, res) => {
  try {
    const totalFarmers = await User.countDocuments({ role: "Farmer" });
    const activeRequests = await Request.countDocuments({ status: { $in: ["Pending", "In Progress"] } });
    const solvedRequests = await Request.countDocuments({ status: "Solved" });

    res.json({ totalFarmers, activeRequests, solvedRequests });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
