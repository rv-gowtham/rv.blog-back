const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/connectiondb");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

connectDB();

app.use("/", require("./routes/user"));
app.use("/recipes", require("./routes/recipe"));

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
