const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

const makeOrder = asyncHandler(async (req, res) => {
  const { orderedItems, invoice } = req.body;

  if (!orderedItems) {
    res.status(400);
    throw new Error("Insufficent Data!");
  }

  const result = [];

  for (let i in orderedItems) {
    const product = await Product.findOne({
      name: orderedItems[i].name,
    });

    if (product) {
      if (product.countInStock >= orderedItems[i].quantity) {
        const updatedProduct = await Product.findByIdAndUpdate(
          product._id,
          {
            countInStock: product.countInStock - orderedItems[i].quantity,
          },
          { new: true }
        );
        result.push(updatedProduct);
      } else {
        res.status(400).json({
          message: `We have only ${product.countInStock} ${product.name} available now!`,
        });
      }
    } else {
      res.status(400).json({
        message: `no such item present`,
      });
    }
  }

  const newOrder = await Order.create({
    user: req.user._id,
    orderedItems,
    invoice,
  });

  if (newOrder) {
    res.status(201).json(newOrder);
  }

  // const product = await Product.findOne({ name: productName });

  // if (product.countInStock - quantity >= 0) {
  //   const newOrder = await Order.create({
  //     productId: product._id,
  //     user: req.user._id,
  //     productName,
  //     quantity,
  //     productPrice: product.productPrice,
  //   });

  //   if (newOrder) {
  //     const updatedProduct = await Product.findByIdAndUpdate(
  //       product._id,
  //       {
  //         countInStock: product.countInStock - quantity,
  //       },
  //       { new: true }
  //     );

  //     console.log(updatedProduct);
  //     res.status(200).json(newOrder);
  //   } else {
  //     res.status(500);
  //     throw new Error('Some thing Went Wrong');
  //   }
  // } else if (quantity > product.countInStock) {

  // }
});

const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(400);
    throw new Error("Item not found");
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (order.user.toString() !== user._id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const deletedItem = await Order.findByIdAndDelete(req.params.id, {
    new: true,
  });
  res.status(200).json(deletedItem);
});

module.exports = {
  getOrders,
  makeOrder,
  cancelOrder,
};
