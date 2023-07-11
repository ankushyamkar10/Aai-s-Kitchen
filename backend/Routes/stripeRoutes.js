const express = require('express');
const router = express.Router();
const { makeOrder, getOrderDetails } = require('../controllers/stripeController')

router.post('/pay', makeOrder);
router.post('/success', getOrderDetails)

module.exports = router;
