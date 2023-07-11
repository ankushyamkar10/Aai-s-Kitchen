const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const {
  getOrders,
  makeOrder,
  cancelOrder,
} = require("../controllers/orderController");

router.get("/", protect, getOrders);
router.post("/", protect, makeOrder);
router.delete("/:id", protect, cancelOrder);

module.exports = router;
