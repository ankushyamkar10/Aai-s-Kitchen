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
    password: {
      type: String,
      required: [true, 'Please add the password'],
    },
    favourites: {
      type: Array,
      default: []
    },
    cart: {
      type: Array,
      default: []
    },
    purchased: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
