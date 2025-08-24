const Recipes = require("../models/recipe");

// GET all recipes
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch recipes" });
  }
};

// GET single recipe by ID
const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recipe" });
  }
};

// ADD recipe
const addRecipe = async (req, res) => {
  try {
    const newRecipe = await Recipes.create(req.body);
    res.status(201).json(newRecipe);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to create recipe", error: err.message });
  }
};

// UPDATE recipe
const editRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipes.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRecipe)
      return res.status(404).json({ message: "Recipe not found" });
    res.json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ message: "Failed to update recipe" });
  }
};

// DELETE recipe
const deleteRecipe = async (req, res) => {
  try {
    const deleted = await Recipes.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Recipe not found" });
    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete recipe" });
  }
};

module.exports = {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
};
