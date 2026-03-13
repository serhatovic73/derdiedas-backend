const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ⭐ MongoDB bağlantısı Render env variable'dan
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ⭐ Model
const Topic = mongoose.model(
  "topics",
  new mongoose.Schema({}, { strict: false }),
  "topics",
);

// ⭐ Endpoint
app.get("/topic", async (req, res) => {
  const topic = req.query.topic;
  const data = await Topic.findOne({ topic });
  res.json(data);
});

app.get("/topics", async (req, res) => {
  const data = await Topic.find();
  res.json(data);
});

// ⭐ Render port ayarı
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on " + PORT);
});
