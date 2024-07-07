const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://mosha:mosha123@mosha.p875u40.mongodb.net/?retryWrites=true&w=majority&appName=Mosha"
  )
  .then(() => {
    console.log("Data is Connected Successfully");

    app.listen("8000", () => {
      console.log("Server is Running on Port 8000");
    });
  })
  .catch(() => {
    console.log("Data is Connected Failurefully");
  });

const listSchema = new Schema({
  title: String,
});

const listModel = mongoose.model("lists", listSchema);

app.get("/api", async (req, res) => {
  try {
    const listData = await listModel.find();
    res.json(listData);
  } catch (err) {
    console.log(err);
  }
});

app.post("/api", async (req, res) => {
  try {
    const newList = new listModel();
    newList.title = req.body?.title;
    await newList.save();
    res.json(newList);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/api/:id", async (req, res) => {
  const id = req.params.id;
  await listModel.findByIdAndDelete(id);
  const allList = await listModel.find();
  res.json(allList);
});

app.get("/api/:id", async (req, res) => {
  const id = req.params.id;
  const listData = await listModel.findById(id);
  res.json(listData);
});

app.put("/api/:id", async (req, res) => {
  const listData = await listModel.findByIdAndUpdate(req.params.id, {
    title: req.body?.title,
  });
  res.json(listData);
});
