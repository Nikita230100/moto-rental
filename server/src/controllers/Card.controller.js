const CardService = require('../services/Card.service');
const isValidId = require('../utils/isValidId');
const CardValidator = require('../utils/Card.validator');
const formatResponse = require('../utils/formatResponse');

class CardController {
  static async getAllCards(req, res) {
    try {
      const cards = await CardService.getAll();
      
      if (cards.length === 0) {
        return res.status(200).json(formatResponse(200, 'No cards found', []));
      }

      res.status(200).json(formatResponse(200, 'success', cards));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async getCardById(req, res) {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, 'Invalid card ID'));
    }

    try {
      const card = await CardService.getById(+id);

      if (!card) {
        return res
          .status(404)
          .json(formatResponse(404, `Card with id ${id} not found`));
      }

      res.status(200).json(formatResponse(200, 'success', card));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async createCard(req, res) {
    const { title, description, price, url } = req.body;
    const { user } = res.locals;
    if (user.id !== 1) {
      return res.status(403).json(formatResponse(403, 'Forbidden: Only admin can create cards'));
    }
    const { isValid, error } = CardValidator.validate({ 
      title, 
      description, 
      price, 
      url,
      authorId: user.id
    });

    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, 'Validation error', null, error));
    }

    try {
      const newCard = await CardService.create({ 
        title, 
        description, 
        price, 
        url, 
        authorId: user.id 
      });

      if (!newCard) {
        return res
          .status(400)
          .json(formatResponse(400, 'Failed to create new card'));
      }

      res.status(201).json(formatResponse(201, 'success', newCard));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async updateCard(req, res) {
    const { id } = req.params;
    const { title, description, price, url } = req.body;
    const { user } = res.locals;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, 'Invalid card ID'));
    }

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, 'Invalid card ID'));
    }

    const { isValid, error } = CardValidator.validate({ 
      title, 
      description, 
      price, 
      url,
      authorId: user.id
    });

    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, 'Validation error', null, error));
    }

    try {
      // Проверяем, существует ли карточка и принадлежит ли пользователю
      const existingCard = await CardService.getById(+id);
      if (!existingCard) {
        return res
          .status(404)
          .json(formatResponse(404, `Card with id ${id} not found`));
      }
      
      if (existingCard.authorId !== user.id) {
        return res
          .status(403)
          .json(formatResponse(403, 'Forbidden: Only the author can update this card'));
      }

      const updatedCard = await CardService.update(+id, { 
        title, 
        description, 
        price, 
        url 
      });

      res.status(200).json(formatResponse(200, 'success', updatedCard));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async deleteCard(req, res) {
    const { id } = req.params;
    const { user } = res.locals;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, 'Invalid card ID'));
    }

    if (user.id !== 1) {
      return res.status(403).json(formatResponse(403, 'Forbidden: Only admin can delete cards'));
    }

    try {
      const deletedCard = await CardService.delete(+id, user.id);

      if (!deletedCard) {
        return res
          .status(404)
          .json(formatResponse(404, `Card with id ${id} not found`));
      }

      res
        .status(200)
        .json(formatResponse(200, `Card with id ${id} successfully deleted`));
    } catch ({ message }) {
      console.error(message);
      if (message.includes('Unauthorized')) {
        res.status(403).json(formatResponse(403, message, null, message));
      } else {
        res
          .status(500)
          .json(formatResponse(500, 'Internal server error', null, message));
      }
    }
  }
}

module.exports = CardController;