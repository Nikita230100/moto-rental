const { Card } = require('../db/models');

class CardService {
  static async getAll() {
    return await Card.findAll();
  }

  static async getById(id) {
    return await Card.findByPk(id);
  }

  static async create(data) {
    if (data.authorId !== 1) {
      throw new Error('Forbidden: Only admin can create cards');
    }
    return await Card.create({
      title: data.title,
      description: data.description,
      price: data.price,
      url: data.url,
      authorId: data.authorId,
    });
  }

  static async update(id, data) {
    const card = await this.getById(id);
    if (!card) {
      throw new Error('Card not found');
    }

    if (card.authorId !== data.authorId) {
      const error = new Error('Forbidden: Only the author can update this card');
      error.statusCode = 403;
      throw error;
    }

    if (data.title) card.title = data.title;
    if (data.description) card.description = data.description;
    if (data.price) card.price = data.price;
    if (data.url) card.url = data.url;

    await card.save();
    return card;
  }

  static async delete(id, userId) {
    const card = await this.getById(id);
    if (card) {
      if (userId !== 1) {
        throw new Error('Unauthorized: Only the author can delete this card');
      }
      await card.destroy();
    }
    return card;
  }
}

module.exports = CardService;
