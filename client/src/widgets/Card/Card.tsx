
import { Link } from 'react-router';
import { CardType } from '../../entities/card/model';
import { CLIENT_ROUTES } from '../../shared/enums/clientRoutes';
import './Card.css'
import { useEffect, useState } from 'react';
import { FavouriteApi } from '../../entities/favourite/api/FavouriteApi';

type Props ={
    card: CardType;
    children: React.ReactNode;
    isFavorite?: boolean;
    user: { id: number } | null;
    onToggleFavorite?: (cardId: number) => void;
}
export default function Card(props: Props) {
  const { card, children, user, onToggleFavorite, isFavorite } = props;
  const [isAdmin, setIsAdmin] = useState(false);
  const [localIsFavorite, setLocalIsFavorite] = useState(isFavorite || false);
  useEffect(() => {
    if (user && user.id === 1) {
      setIsAdmin(true);
    }
  }, [user]);

  const handleFavoriteClick = async () => {
    try {
      if (onToggleFavorite) {
        onToggleFavorite(Number(card.id));
      } else {
        await FavouriteApi.createOrDel(Number(card.id));
        setLocalIsFavorite(!localIsFavorite);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='card-card'>
      <div className='card-image'>         
        <Link to={`${CLIENT_ROUTES.CARDS}/${card.id}`}>
          <img src={card.url} alt={card.title} />
        </Link>
        {!isAdmin && (
          <button 
          onClick={handleFavoriteClick}
          className={`favorite-btn ${localIsFavorite ? 'active' : ''}`}
          >
            {localIsFavorite ? '❤️' : '❤️'}
          </button>
        )}
      </div>
      
      <div className='card-content'>
        <h3 className='card-title'>{card.title}</h3>
        <p className='card-description'>{card.description}</p>
        <p className='card-price'>От {card.price} ₽</p>
        
        <div className='card-actions'>
          {children}
        </div>
      </div>
    </div>
  );
}