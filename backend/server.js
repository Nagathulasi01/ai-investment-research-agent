const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const analyzeRouter = require("./routes/analyze");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", analyzeRouter);

app.get("/", (req, res) => {
  res.send("AI Investment Research backend is healthy.");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
