import { useEffect, useState } from "react"
import { CardType } from "../../entities/card/model"
import { CardApi } from "../../entities/card/api/CardApi";
import { AxiosError } from "axios";
import Card from "../../widgets/Card/Card";


export default function CardPage() {
    const [cards, setCards] = useState<CardType[]>([])
    const [isLoading, setIsLoading] = useState(true);
   // const navigate = useNavigate()
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await CardApi.getAll()
                if (response.statusCode === 200) {
                    setCards(response.data as CardType[])
                } else {
                    alert('Ошибка при загрузке данных')
                }
            } catch (error) {
                console.error('Ошибка при загрузке данных', error)
            } finally {
                setIsLoading(false)
            }
        }
        loadData()
    },[])

    const deleteCardHandler = async (id: string) => {
        try {
          const response = await CardApi.delete(Number(id));
          if (response.statusCode === 200) {
            setCards((prev) => prev.filter((el) => el.id !== id));
          } else {
            alert('Ошибка при удалении карточки');
          }
        } catch (error: unknown) {
          if (
            error instanceof AxiosError &&
            'response' in error &&
            error.response?.status === 400
          ) {
            alert(
              'Вы не можете удалить эту карточку, так как вы не являетесь её автором'
            );
          } else {
            console.error('Ошибка при удалении карточки:', error);
            alert('Ошибка при удалении карточки');
          }
        }
      };

   

  

//   const updateHandler = () => {
//     navigate(`/update/${channel.id}`)
//   };
  return (
    <div className="card-page">
      {isLoading ? (
        <div className="loading">Загрузка...</div>
      ) : (
        <div className="card-list">
            {cards.map((card) => (
                <Card key={card.id} card={card}>
                    <button  type='button' onClick={() => deleteCardHandler(card.id)}>
                        Удалить
                    </button>
                </Card>
            ))}
        </div>
      )}
    </div>
  )
}
