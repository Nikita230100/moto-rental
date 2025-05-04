const CardService = require('../services/Card.service');
const isValidId = require('../utils/isValidId');
const CardValidator = require('../utils/Card.validator');
const formatResponse = require('../utils/formatResponse');
const fs = require('fs');
const path = require('path');

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
    try {
      const { title, description, price,  authorId} = req.body;
      const imagePath = req.file ? req.file.path : null;
       // Исправляем путь, заменяя обратные слеши и добавляем полный URL
       const imageUrl = req.file 
       ? `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/${req.file.filename}`
       : null;
  
       const cardData = {
        title,
        price: parseInt(price),
        description,
        authorId: parseInt(authorId),
          url: imageUrl // Используем полный URL
      };
      const card = await CardService.create(cardData);
      res.status(201).json(formatResponse(201, 'Карточка создана', card));
    

  } catch (error) {
    res.status(500).json(formatResponse(500, error.message));
  }
}
    
  

static async updateCard(req, res) {
  const { id } = req.params;
  const { user } = res.locals;
  const { title, description, price } = req.body;
  const url = req.body.url || null;

  if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, 'Invalid card ID'));
  }

  try {
      // Валидация данных
      const { isValid, error } = CardValidator.validate({
          title,
          description,
          price: Number(price),
          ...(url && { url }),
          authorId: user.id
      });

      if (!isValid) {
          return res.status(400).json(formatResponse(400, 'Validation error', null, error));
      }

      // Получаем текущую карточку
      const existingCard = await CardService.getById(+id);
      if (!existingCard) {
          return res.status(404).json(formatResponse(404, `Card with id ${id} not found`));
      }

      // Проверка прав
      if (existingCard.authorId !== user.id) {
          return res.status(403).json(formatResponse(403, 'Forbidden: Only the author can update this card'));
      }

      // Подготовка данных для обновления
      const updateData = {
          title,
          description,
          price: Number(price),
          ...(url && { url }),
          authorId: user.id
      };

      // Обработка нового изображения
      if (req.file) {
          // Удаляем старое изображение (если есть и существует)
          if (existingCard.url) {
              try {
                  const oldFilename = existingCard.url.split('/').pop();
                  const filePath = path.join(__dirname, '../../uploads', oldFilename);
                  
                  if (fs.existsSync(filePath)) {
                      fs.unlinkSync(filePath);
                  }
              } catch (err) {
                  console.error('Error deleting old image:', err);
                  // Не прерываем выполнение если не удалось удалить старый файл
              }
          }
          updateData.url = `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/${req.file.filename}`;
      }

      // Обновление карточки
      const updatedCard = await CardService.update(+id, updateData);
      return res.status(200).json(formatResponse(200, 'success', updatedCard));

  } catch (error) {
      console.error('Update card error:', error);
      return res.status(500).json(formatResponse(500, 'Internal server error', null, error.message));
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