const express = require('express');
const protect = require('../middlewares/authMiddleware')
const router = express.Router();
const {
  getReviews,
  postReview
} = require('../controllers/reviewController');

router.get('/', getReviews);
router.post('/', protect, postReview);

module.exports = router;
