const express = require("express");
const Question = require("../models/question");
const Result = require("../models/result");

const router = express.Router();

// get questions
router.get("/questions", async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});

// submit result
router.post("/submit", async (req, res) => {
  const { name, score } = req.body;
  await Result.create({ name, score });
  res.json({ message: "Result saved" });
});

// leaderboard
router.get("/leaderboard", async (req, res) => {
  const top = await Result.find().sort({ score: -1 }).limit(5);
  res.json(top);
});

module.exports = router;