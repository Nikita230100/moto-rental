import { Dispatch, SetStateAction } from "react";
import { CardType } from "../../entities/card/model";
import CardForm from "../../widgets/CardForm/CardForm";

type Props = {
    user: { id: number } | null;
    cards: CardType[]
    setCards: Dispatch<SetStateAction<CardType[]>>;
}
export default function LkPage({ setCards, cards, user}: Props) {
  return (
    <div>
      <CardForm  setCards={setCards} cards={cards} user={user}></CardForm>
    </div>
  )
}
