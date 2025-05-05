import { CardType } from "../../entities/card/model";
import { UserType } from "../../entities/user/model";
import CardPage from "../CardPage/CardPage";
import './MainPage.css'

type Props ={
    user: UserType | null,
    cards:CardType[] | null,
    setCards:React.Dispatch<React.SetStateAction<CardType[]>> | null,
}

export default function MainPage({user, cards, setCards}: Props) {

  
  return (
    <>
    <div className="header">
      <h1>ПРОКАТ ПИТБАЙКОВ И ЭНДУРО В ПЕРМИ</h1>
    </div>
    <div>
      <CardPage user={user} cards = {cards} setCards={setCards}></CardPage>
    </div>
    </>
  )
}
