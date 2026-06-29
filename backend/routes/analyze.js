const express = require("express");
const { runInvestmentAgent } = require("../langgraphAgent");

const router = express.Router();

router.post("/analyze", async (req, res) => {
  try {
    const { company } = req.body;
    const analysis = await runInvestmentAgent(company);

    res.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to generate analysis.",
    });
  }
});

module.exports = router;
