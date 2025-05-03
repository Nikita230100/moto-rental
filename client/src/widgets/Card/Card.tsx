
import { Link } from 'react-router';
import { CardType } from '../../entities/card/model';
import { CLIENT_ROUTES } from '../../shared/enums/clientRoutes';
import './Card.css'
type Props ={
    card: CardType;
    children: React.ReactNode;
}
export default function Card(props: Props) {
const {card, children} = props


  return (
    <div className='card-card'>
        <div className='card-image'>         
        <Link to={`${CLIENT_ROUTES.CARDS}/${card.id}`}>
        <img src={card.url}/>
        </Link>
        </div>
        <h3 className='card-title'>{card.title}</h3>
        <p className='card-description'> {card.description}</p>
        <p className='card-price'>От {card.price} ₽</p>
        {children}
    </div>
  )
}
