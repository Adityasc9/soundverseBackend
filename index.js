const express = require("express");
const axios = require("axios");
const app = express();
const port = 8000;
const cors = require("cors");
require("dotenv").config();
app.use(cors());

app.listen(port, () => console.log("Server running on port ", port));
const mongoose = require("mongoose");
const dbURI = process.env.URI;
mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

const UserActivities = require("./models/UserActivities.js");
const Users = require("./models/Users.js");
const Audios = require("./models/Audios.js");
const Prompts = require("./models/Prompts.js");
const AudioTypes = require("./models/AudioTypes.js");

app.get("/api/users", async (req, res) => {
  try {
    const items = await Users.find({}, "name stripeCheckoutSession email desc");
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.get("/api/audioTypes", async (req, res) => {
  try {
    const items = await AudioTypes.find({}, "stemType audioType");
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.get("/api/prompts", async (req, res) => {
  try {
    const items = await Prompts.find({}, "prompt createdAt");
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


const DaysAgo = new Date();
DaysAgo.setDate(DaysAgo.getDate() - 20);

app.get("/api/userA", async (req, res) => {
  try {
    const items = await UserActivities.find(
      { createdAt: { $gte: DaysAgo } },
      "userId activity createdAt"
    ).sort({ createdAt: 1 });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.get("/api/total", async (req, res) => {
  try {
    const data = await axios.get(
      "https://soundverse.ai/api/scripts/analytics/totalDuration"
    );
    res.json(data.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/audios", async (req, res) => {
  try {
    const items = await Audios.find(
      {},
      "_id duration createdAt audioType"
    ).sort({ createdAt: 1 });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});