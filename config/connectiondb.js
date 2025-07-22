const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(process.env.CONNECT_DB_URL)
    .then(() => console.log("connected..."));
};

module.exports = connectDB;
