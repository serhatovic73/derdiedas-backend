const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());

mongoose.connect(
  "mongodb+srv://derdiedas_admin:BTlMtNhCeu1HzRuC@derdiedas.0svheys.mongodb.net/derdiedas",
);

const Topic = mongoose.model(
  "topics",
  new mongoose.Schema({}, { strict: false }),
  "topics", // collection adı
);

// tüm konuları getir
app.get("/topics", async (req, res) => {
  const data = await Topic.find();
  res.json(data);
});

// tek konu getir
app.get("/topic", async (req, res) => {
  const name = req.query.topic;
  const data = await Topic.findOne({ topic: name });
  res.json(data);
});

app.listen(5000, () => console.log("server çalıştı"));
