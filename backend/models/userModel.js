const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add the name'],
    },
    email: {
      type: String,
      required: [true, 'Please add the email'],
      unique: true,
    },
    password: String,
    googleId: String,
    favourites: {
      type: Array,
      default: []
    },
    cart: {
      type: Array,
      default: []
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
