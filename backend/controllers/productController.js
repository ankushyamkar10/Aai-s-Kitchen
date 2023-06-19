const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  if (products) {
    if (products.length === 0) {
      res.status(404).json({ message: "No products found" });
    } else {
      res.status(200);
      res.json(products);
    }
  } else {
    res.status(500);
    throw new Error("Something went Wrong");
  }
});

const addProduct = asyncHandler(async (req, res) => {
  const { name, category, type, price, rating, description, countInStock } =
    req.body;
  const product = await Product.findOne({ name });

  if (!name || !category || !price || !description || !countInStock)
    if (product) {
      res.status(400);
      res.json({ message: "Product already exists" });
    }

  const newProduct = await Product.create({
    name,
    category,
    type,
    price,
    rating,
    description,
    countInStock,
  });

  if (!newProduct) {
    res.status(500);
    res.json({ message: "Product creation failed" });
  } else {
    res.status(201);
    res.json(newProduct);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    res.json({ message: "Product not found" });
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  if (updatedProduct) {
    res.status(201).json(updatedProduct);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    res.json({ message: "Product not found" });
  }

  const deletedProduct = await Product.findByIdAndDelete(req.params.id, {
    new: true,
  });
  if (deletedProduct) {
    res.status(200).json(deletedProduct);
  }
});

module.exports = {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
