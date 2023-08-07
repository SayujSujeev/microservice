const express = require("express");
const path = require("path"); // Add this line
const mongoose = require("mongoose");
const router = require("./routes/auth");
const app = express();
const cors = require("cors");

mongoose
  .connect("mongodb://0.0.0.0:27017/login", {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("successfully connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/auth", router);

app.use(express.static(path.join(__dirname, ".")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, () => {
  console.log("on port 3000");
});
