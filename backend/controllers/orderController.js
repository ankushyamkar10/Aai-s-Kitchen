const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.status(200).json(orders);
});

const makeOrder = asyncHandler(async (req, res) => {
  const { productName, quantity } = req.body;
  if (!productName || !quantity) {
    res.status(400);
    throw new Error('Please choose All the Fields');
  }

  const product = await Product.findOne({ name: productName });

  if (product.countInStock - quantity >= 0) {
    const newOrder = await Order.create({
      productId: product._id,
      user: req.user.id,
      productName,
      quantity,
      productPrice: product.productPrice,
    });

    if (newOrder) {
      const updatedProduct = await Product.findByIdAndUpdate(
        product._id,
        {
          countInStock: product.countInStock - quantity,
        },
        { new: true }
      );

      console.log(updatedProduct);
      res.status(200).json(newOrder);
    } else {
      res.status(500);
      throw new Error('Some thing Went Wrong');
    }
  } else if (quantity > product.countInStock) {
    res.status(400);
    res.json({
      message: `We have only ${product.countInStock} ${productName} available now!`,
    });
  }
});

const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(400);
    throw new Error('Item not found');
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (order.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
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
