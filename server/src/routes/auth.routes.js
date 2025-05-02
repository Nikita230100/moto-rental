const router = require('express').Router();
const AuthController = require('../controllers/Auth.controller');
const verifyRefreshToken = require('../middleware/verifyRefreshToken');

router
  .get('/refreshTokens', verifyRefreshToken, AuthController.refreshTokens)
  .post('/signUp', AuthController.signUp)
  .post('/signIn', AuthController.signIn)
  .get('/signOut', AuthController.signOut);

module.exports = router;
