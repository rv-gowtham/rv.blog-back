const Recipes = require("../models/recipe");

// GET all recipes
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find();
    return res.json(recipes);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch recipes" });
  }
};

// GET single recipe by ID
const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    return res.json(recipe);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching recipe" });
  }
};

const addRecipe = async (req, res) => {
  const {
    title,
    description,
    category,
    ingredients,
    instructions,
    time,
    image,
  } = req.body;

  if (!title || !description || !category || !ingredients || !instructions) {
    return res.status(400).json({ message: "Required field can't be empty" });
  }

  try {
    const newRecipe = await Recipes.create({
      title,
      description,
      category,
      ingredients,
      instructions,
      time,
      image,
    });
    return res.status(201).json(newRecipe);
  } catch (err) {
    return res.status(500).json({ message: "Failed to create recipe" });
  }
};

const editRecipe = async (req, res) => {
  const {
    title,
    description,
    category,
    ingredients,
    instructions,
    time,
    image,
  } = req.body;

  try {
    const updatedRecipe = await Recipes.findByIdAndUpdate(
      req.params.id,
      { title, description, category, ingredients, instructions, time, image },
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    return res.json(updatedRecipe);
  } catch (err) {
    return res.status(500).json({ message: "Failed to update recipe" });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const deleted = await Recipes.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    return res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to delete recipe" });
  }
};

module.exports = {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
};
