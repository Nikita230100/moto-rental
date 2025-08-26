import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CardType } from '../../entities/card/model';
import { CardApi } from '../../entities/card/api/CardApi';
import './CardDetailedPage.css';
import Modal from '../../widgets/Modal/Modal';
export default function CardDetailedPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const [card, setCards] = useState<CardType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await CardApi.getById(Number(id));
        setCards(response.data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Произошла неизвестная ошибка');
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (isLoading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!card) {
    return <div className="not-found">Тур не найден</div>;
  }

  const handleBookingSubmit = (data: { phone: string; name: string }) => {
    console.log('Данные для бронирования:', data);
    alert('Ваша заявка принята! Мы скоро вам перезвоним.');
  };
  return (
    <div className="card-detailed">
      <div className="card-detailed-img">
        <img src={card.url} />
      </div>
      <div className="card-detailed-text">
        <h3 className="card-title-detailed">{card.title}</h3>
        <p className="card-description-detailed"> {card.description}</p>
        <p className="card-price-detailed">От {card.price} ₽</p>
      </div>
      <div>
        <button className="order" onClick={() => setIsModalOpen(true)}>
          Забронировать
        </button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleBookingSubmit}
        />
      </div>
    </div>
  );
}
