import { useEffect, useState } from 'react';
import { CardType } from '../../entities/card/model';
import { CardApi } from '../../entities/card/api/CardApi';
import { AxiosError } from 'axios';
import Card from '../../widgets/Card/Card';
import './CardPage.css';
import { UserType } from '../../entities/user/model';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router';
type Props = {
  user: UserType | null;
  cards: CardType[] | null;
  setCards: Dispatch<SetStateAction<CardType[]>> | null;
};
export default function CardPage({ user, cards, setCards }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const loadData = async () => {
      try {
        if (!setCards) return;
        const response = await CardApi.getAll();
        if (response.statusCode === 200) {
          setCards(response.data as CardType[]);
        } else {
          alert('Ошибка при загрузке данных');
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [setCards]);

  const deleteCardHandler = async (id: string) => {
    if (!setCards) return;
    try {
      const response = await CardApi.delete(Number(id));
      if (response.statusCode === 200) {
        setCards((prev) => prev.filter((el) => el.id !== id));
      } else {
        alert('Ошибка при удалении карточки');
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && 'response' in error && error.response?.status === 400) {
        alert('Вы не можете удалить эту карточку, так как вы не являетесь её автором');
      } else {
        console.error('Ошибка при удалении карточки:', error);
        alert('Ошибка при удалении карточки');
      }
    }
  };

  const updateHandler = (cardId: string) => {
    navigate(`/update/${cardId}`);
  };

  return (
    <div className="card-page">
      {isLoading ? (
        <div className="loading">Загрузка...</div>
      ) : (
        <div className="card-list">
          {cards &&
            cards.map((card) => (
              <Card key={card.id} card={card} user={user ? { id: Number(user.id) } : null}>
                {user && Number(user.id) === 1 && (
                  <>
                    <div className="buttons">
                      <button
                        className="buttonsDel"
                        type="button"
                        onClick={() => deleteCardHandler(card.id)}>
                        Удалить
                      </button>
                      <button
                        className="buttonsEdit"
                        type="button"
                        onClick={() => updateHandler(card.id)}>
                        Редактировать
                      </button>
                    </div>
                  </>
                )}
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}
