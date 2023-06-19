const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      requred: true,
    },
    productPrice: {
      type: Number,
      requred: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', OrderSchema);
