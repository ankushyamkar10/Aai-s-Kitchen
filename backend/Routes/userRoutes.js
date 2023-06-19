const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {
  registerUser,
  loginUser,
  getMe,
  getAllUsers,getUserOtherData,updateCart,updateFavourites,updatePurchased
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/', getAllUsers);
router.patch('/favourites',updateFavourites)
router.post('/purchased',updatePurchased)
router.patch('/cart',updateCart)
router.post('/favourites',getUserOtherData)
router.post('/cart',getUserOtherData)
router.get('/purchased',getUserOtherData)

module.exports = router;
