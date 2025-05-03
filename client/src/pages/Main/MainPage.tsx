import { UserType } from "../../entities/user/model";
import CardPage from "../CardPage/CardPage";
import './MainPage.css'

type Props ={
    user: UserType | null;
}

export default function MainPage({user}: Props) {
  return (
    <>
    <div className="header">
      <h1>ПРОКАТ ПИТБАЙКОВ И ЭНДУРО В ПЕРМИ</h1>
    </div>
    <div>
      <CardPage user={user}></CardPage>
    </div>
    </>
  )
}
