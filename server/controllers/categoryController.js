import categoryModel from "../models/categoryModels.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Name is require",
      });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(404).json({
        message: "Category already Existis",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    if (category) {
      return res.status(200).json({
        success: true,
        message: "Category created successfully",
        category,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      error,
      message: "Error in category",
    });
  }
};
