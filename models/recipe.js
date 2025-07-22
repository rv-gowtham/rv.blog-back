const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: String,
  description: String, // Added description
  category: String, // Added category (e.g., veg, non veg, cake)
  ingredients: [String],
  instructions: [String],
  time: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);
