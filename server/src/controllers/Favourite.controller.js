
const FavouriteService = require('../services/Favourite.service')
const formatResponse = require('../utils/formatResponse')
class FavouriteController  {
    static async toggleFavourite (req, res) {
        const {cardId} = req.params;
        const { user } = res.locals;
        try {
            const result = await FavouriteService.findorcreate(cardId, user.id)
            if (result.removed) {
                return res.status(200).json(formatResponse(200, 'removed', result))
            }
            res.status(201).json(formatResponse(201, 'created', result))
        } catch (error) {
            res.status(500).json(formatResponse(500, error.message));
          }
        }
    

       static async getUserFavorites(req, res)  {
            try {
                const { user } = res.locals;
              const favorites = await FavouriteService.getUserFavorites(user.id);
              res.status(200).json(formatResponse(200, 'success', favorites));
            } catch (error) {
                res.status(500).json(formatResponse(500, error.message));
              }
          }
        };

module.exports = FavouriteController