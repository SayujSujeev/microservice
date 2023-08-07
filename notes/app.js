const express = require("express");
const path = require("path"); // Add this line
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const notesRouter = require("./routes/notes");
const authenticate = require("./middleware/auth");

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
app.use("/notes", authenticate, notesRouter);

app.use(express.static(path.join(__dirname, ".")));

app.listen(3001, () => {
  console.log("on port 3001");
});
