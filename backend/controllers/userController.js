const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { default: axios } = require('axios');


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
  const { email, password, googleId } = req.body;

  if (password) {
    const user = await User.findOne({ email });

    if (user && user.password && await bcrypt.compare(password, user.password)) {

      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    }

  }
  else {
    const user = await User.findOne({ googleId });
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    }
  }

  res.status(400).json({ message: "Invalid Credentials" })

})

// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     res.status(400);
//     throw new Error("Please fill all the fields");
//   }

//   const user = await User.findOne({ email: email });

//   if (user) {
//     if (await bcrypt.compare(password, user.password)) {
//       res.status(200).json({
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         token: generateToken(user.id),
//         favourites: user.favourites,
//         cart: user.cart,
//         purchased: user.purchased,
//       });
//       console.log(`logged in as ${user.name}`);
//     } else {
//       res.status(400);
//       throw new Error("Password does not matches...");
//     }
//   } else {
//     res.status(400);
//     throw new Error("User not found!");
//   }
// });

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


const getGoogleOAuthUrl = asyncHandler(async (req, res) => {
  const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth'
  const { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } = process.env
  const url = oauth2Endpoint + "?client_id=" + GOOGLE_CLIENT_ID + '&redirect_uri=' + GOOGLE_REDIRECT_URI + "&response_type=code&include_granted_scopes=true&state=pass-through-value&access_type=offline&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
  res.status(200).json(url)
})

const getGoogleAuthCode = asyncHandler(async (req, res) => {
  const { code } = req.body

  const url = `https://oauth2.googleapis.com/token?client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&code=${code}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=authorization_code`;

  try {
    const response = await axios.post(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const { access_token } = response?.data
    
    const googleUserInfo = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`
    );
    
    const { id, name, email } = googleUserInfo.data

    if (!name) {
      res.status(400).json({ message: "Please complete your Google first or Login via email" })
    }

    const user = await User.findOne({ googleId: id })
    if (user) {
      res.status(201).json({
        //201 status : OK
        _id: user.id,
        name: user.name,
        email: user.email,
        googleId: user.googleId,
      })
    }
    else if (await User.findOne({ email })) {
      const userByEmail = await User.findOne({ email })
      res.status(400).json({ message: "Your email is registered, please login via email instead of Google" })
    }
    else {
      const newUser = await User.create({
        name,
        email,
        googleId: id
      });
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        googleId: newUser.googleId,
      })
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

const updatePassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body


  const user = await User.findOne({ email })

  if (user && user.password) {
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const updatedUser = await User.findByIdAndUpdate(user._id, { password: hashedPassword }, { new: true })

    if (updatedUser) {
      console.log(updatedUser);
      res.status(201).json({
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        token: generateToken(user.id),
      });
    }
    else {
      res.status(500).json({ message: "Something Went Wrong!" })
    }
  }
  else if (user && user.googleId) {
    res.status(403).json({ message: "You can't change the password for a logged in with Google account" })
  }
  else {
    res.status(404).json({ message: "User Not found!" })
  }
})

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getMe,
  getUserOtherData,
  updateCart,
  updateFavourites,
  getGoogleOAuthUrl,
  getGoogleAuthCode,
  updatePassword
};
