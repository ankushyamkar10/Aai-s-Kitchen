const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {
  registerUser,
  loginUser,
  getMe,
  getAllUsers, getUserOtherData, updateCart, updateFavourites,
  getGoogleOAuthUrl, getGoogleAuthCode, updatePassword
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/', getAllUsers);
router.patch('/favourites', updateFavourites)
router.patch('/cart', updateCart)
router.post('/favourites', getUserOtherData)
router.post('/cart', getUserOtherData)
router.get('/purchased', getUserOtherData)
router.get('/getGoogleOAuthUrl', getGoogleOAuthUrl)
router.post('/getGoogleAuthCode', getGoogleAuthCode)
router.patch('/updatePassword', updatePassword)

module.exports = router;
