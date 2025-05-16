const express = require("express");
const app = express();
const port = 8000;

const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data.json"));

app.get("/", (req, res) => {
  res.send("Nutrition API is running");
});

app.get("/foods", (req, res) => {
  res.json(data);
});

app.get("/foods/:name", (req, res) => {
  const food = data.find(
    (f) => f.name.toLowerCase() === req.params.name.toLowerCase()
  );
  if (food) {
    res.json(food);
  } else {
    res.status(404).json({ message: "Food not found" });
  }
});

app.listen(port, () => {
  console.log(`Nutrition API running at http://localhost:${port}`);
});
