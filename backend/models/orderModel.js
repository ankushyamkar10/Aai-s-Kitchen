const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderedItems: {
      type: Array,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', OrderSchema);
