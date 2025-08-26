const router = require('express').Router();
const CardController = require('../controllers/Card.controller');
const verifyAccessToken = require('../middleware/verifyAccessToken');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router

  .get('/', CardController.getAllCards)

  .get('/:id', CardController.getCardById)

  .post('/', upload.single('image'), verifyAccessToken, CardController.createCard)

  .put('/:id', upload.single('image'), verifyAccessToken, CardController.updateCard)

  .delete('/:id', verifyAccessToken, CardController.deleteCard);

module.exports = router;
