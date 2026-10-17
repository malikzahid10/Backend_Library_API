const { Category } = require("../models");

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check whether category already exists
    const existingCategory = await Category.findOne({
      where: { name: name },
    });

    if (existingCategory) {
      return res.status(409).json({
        message: "This category already exists!",
      });
    }

    // Create new category
    const category = await Category.create({
      name: name,
      description: description,
    });

    return res.status(201).json({
      message: "Category created successfully!",
      category: category,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.findAll();

    return res.status(200).json({
      message: "Categories Fetch Successfully!",
      totalCategories: categories.length,
      categories: categories,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Invalid Server Error",
    });
  }
};

const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findOne({ where: { id: id } });

    if (!category) {
      return res.status(404).json({
        message: "Category not found!",
      });
    }

    return res.status(200).json({
      message: "Fetch Single Category Successfully!",
      category: category,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await Category.findOne({ where: { id: id } });

    if (!category) {
      return res.status(404).json({
        message: "Category Not Found!",
      });
    }

    if (name) {
      const existCategory = await Category.findOne({
        where: { name: name },
      });

      if (existCategory && existCategory.id !== category.id) {
        return res.status(409).json({
          message: "This Category is already Created!",
        });
      }
    }

    await category.update({
      name: name === undefined ? category.name : name,
      description:
        description === undefined ? category.description : description,
    });

    return res.status(200).json({
      message: "Category Update Successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findOne({ where: { id: id } });

    if (!category) {
      return res.status(404).json({
        message: "Category not found!",
      });
    }

    await category.destroy();
    return res.status(200).json({
      message: "Category Delected!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
