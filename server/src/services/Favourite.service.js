const {Favourite, Card} = require('../db/models')

class FavouriteService {
    // добавить или удалить из избранного 
static async findorcreate (cardId, userId) {
  const [favourite, created] =  await Favourite.findOrCreate({
        where: {userId, cardId},
        defaults: {userId, cardId}
    });
    if (!created) {
        await favourite.destroy();
        return {removed: true};
    }
    return favourite
}

    // получить избранное пользователя
    static async getUserFavorites(userId) {
        const favourites = await Favourite.findAll({
          where: { userId },
          include: [{
            model: Card,
            attributes: ['id', 'title', 'description', 'price', 'url']
          }]
        });
    
        return favourites.map(f => f.Card); 
      }
    }
module.exports = FavouriteService