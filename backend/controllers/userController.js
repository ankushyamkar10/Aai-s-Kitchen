const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already exists!");
  }

  //Ashing of password
  const salt = await bcrypt.genSalt(10);
  const hashePassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashePassword,
  });

  if (newUser) {
    res.status(201).json({
      //201 status : OK
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
      favourites: [],
      cart: [],
      purchased: [],
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const user = await User.findOne({ email: email });

  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
        favourites: user.favourites,
        cart: user.cart,
        purchased: user.purchased,
      });
      console.log(`logged in as ${user.name}`);
    } else {
      res.status(400);
      throw new Error("Password does not matches...");
    }
  } else {
    res.status(400);
    throw new Error("User not found!");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (users) {
    res.status(200);
    res.send(users);
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email, favourites, cart, purchased } = await User.findOne({
    _id: req.user._id,
  });
  const token = req.token;
  res
    .status(200)
    .json({ id: _id, name, email, favourites, cart, purchased, token });
});

const updateFavourites = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;
  const user = await User.findById(userId);
  const action = req.query.action;

  if (!user) {
    res.status(400);
    throw new Error("User not found!");
  }

  const obj = {
    id: productId,
  };

  let response;
  if (action === "add") {
    response = await User.findByIdAndUpdate(
      userId,
      { $push: { favourites: obj } },
      { new: true }
    );
  } else if (action === "remove") {
    response = await User.findByIdAndUpdate(
      userId,
      { $pull: { favourites: { $in: [obj] } } },
      { new: true }
    );
  }

  res.status(200).json(response.favourites);
});

const updateCart = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;
  const user = await User.findById(userId);

  const action = req.query.action;
  if (!user) {
    res.status(400);
    throw new Error("User not found!");
  }

  let response;

  const obj = {
    id: productId,
  };


  if (action === "add") {
    response = await User.findByIdAndUpdate(
      userId,
      { $push: { cart: obj } },
      { new: true }
    );
  } else if (action === "remove") {
    response = await User.findByIdAndUpdate(
      userId,
      { $pull: { cart: { $in: [obj] } } },
      { new: true }
    );
  }
  else {
    response = await User.findByIdAndUpdate(userId, {
      $set: { cart: [] }
    }, { new: true });
  }

  res.status(200).json(response.cart);
});

const getUserOtherData = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    res.status(400);
    throw new Error("User not found!");
  }

  if (req.url === '/cart')
    res.status(200).json(user.cart);
  else if (req.url === '/favourites')
    res.status(200).json(user.favourites);
  else if (req.url === '/purchased')
    res.status(200).json(user.purchased);
});


const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getMe,
  getUserOtherData,
  updateCart,
  updateFavourites,

};
