import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CardType } from "../../entities/card/model";
import CardForm from "../../widgets/CardForm/CardForm";
import { FavouriteApi } from "../../entities/favourite/api/FavouriteApi";
import './LkPage.css'

import Card from "../../widgets/Card/Card";



type Props = {
    user: { id: number } | null;
    cards: CardType[]
    setCards: Dispatch<SetStateAction<CardType[]>>;
}
export default function LkPage({ setCards, cards, user}: Props) {

  const [favouriteCard, setFavouriteCard] = useState<CardType[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user && user.id === 1) {
      setIsAdmin(true)
    }
  }, [user])

  const fetchFavourites = async () => {
    try {
      const response = await FavouriteApi.getAll();
      if (response.statusCode === 200 && response.data) {
        setFavouriteCard(response.data as CardType[])
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };




const removeFromFavorites = async (cardId: number) => {
  try {
  await FavouriteApi.createOrDel(cardId);
  setFavouriteCard(prev => prev.filter(card => Number(card.id) !== cardId))
 
  } catch (error) {
    console.error('Error toggling favorite:', error);
  }
};

useEffect(() => {
  if (user && !isAdmin) { 
      fetchFavourites();
  }
}, [user, isAdmin]);

  return (

    <div className="lk-container">
      
      {isAdmin ? (
        <div className="admin-section">
           <h2 className="lk-subtitle">Панель администратора</h2>
           <CardForm  setCards={setCards} cards={cards} user={user}></CardForm>
          </div>
      ) : (
        <>
        <h2 className="lk-subtitle">Ваши избранные товары</h2>
        {favouriteCard.length > 0 ? (
            <div className="favorites-grid">
              {favouriteCard.map(card => (
                <Card
                key={card.id} 
                card={card}
                user={user}
                isFavorite={true}
                onToggleFavorite={removeFromFavorites}
            >
                <button className="delBtn" onClick={() => removeFromFavorites(Number(card.id))}>
                    Удалить из избранного
                </button>
            </Card>
              ))}
            </div>
          ) : (
            <p className="no-favorites">У вас пока нет избранных поездок</p>
          )}
        </>
      )}
     
    </div>
  )
}
