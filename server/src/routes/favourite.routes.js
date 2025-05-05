const FavouriteController = require('../controllers/Favourite.controller')
const router = require('express').Router()
const verifyAccessToken = require('../middleware/verifyAccessToken');

router.post('/card/:cardId/likes', verifyAccessToken, FavouriteController.toggleFavourite)
router.get('/my', verifyAccessToken, FavouriteController.getUserFavorites);
module.exports = router