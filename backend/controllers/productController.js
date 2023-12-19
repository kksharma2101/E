import mongoose from "mongoose";
import products from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";

// create product
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    if (!(name, price, description, category, quantity)) {
      return res.status(400).json({
        message: "All field is required",
      });
    }
    if (!photo && photo.size > 100000) {
      return res.status(400).send({
        message: "Photo is required and should be less then 1mb",
      });
    }
    const product = new products({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Error in create product",
      error,
    });
  }
};

// update product
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;

    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const product = await products.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update product",
    });
  }
};

// get all product
export const getAllProduct = async (req, res) => {
  try {
    const product = await products
      .find({})
      .populate("category")
      .select("-photo")
      .limit(10)
      .sort({ createdAt: -1 });
    if (!product) {
      return res.status(400).send({
        message: "Product is not get try again",
      });
    }

    res.status(200).json({
      success: true,
      TotalCount: product.length,
      message: "Get all products list",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Error in getting product",
      error,
    });
  }
};

// get single product
export const getSingleProduct = async (req, res) => {
  try {
    const product = await products
      .findOne({ slug: req.params.slug })
      .populate("category")
      .select("-photo");

    res.status(200).send({
      success: true,
      message: "Product list get successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Error in getting single product",
      error,
    });
  }
};

// product photo
export const getProductPhoto = async (req, res) => {
  try {
    const product = await products.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Error while getting in product photo",
      error,
    });
  }
};

// delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await products
      .findByIdAndDelete({ _id: req.params.id })
      .select("-photo");

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Error in delete product",
      error,
    });
  }
};
