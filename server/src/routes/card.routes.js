const router = require('express').Router();
const CardController = require('../controllers/Card.controller');
const verifyAccessToken = require('../middleware/verifyAccessToken');

router

  .get('/', CardController.getAllCards)


  .get('/:id', CardController.getCardById)


  .post('/', verifyAccessToken, CardController.createCard)

  .put('/:id', verifyAccessToken, CardController.updateCard)

  
  .delete('/:id', verifyAccessToken, CardController.deleteCard);

module.exports = router;
