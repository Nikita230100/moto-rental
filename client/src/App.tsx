import { useEffect, useState } from 'react'
import './App.css'
import UserApi from './entities/user/api/UserApi';
import { setAccessToken } from './shared/lib/axiosInstance';
import { UserType } from './entities/user/model';
import { BrowserRouter, Route, Routes } from 'react-router';
import { CLIENT_ROUTES } from './shared/enums/clientRoutes';
import Root from './app/Root';
import SignUpForm from './features/auth/ui/SignUpForm/SignUpForm';
import SignInForm from './features/auth/ui/SignInForm/SignInForm';
import MainPage from './pages/Main/MainPage';
import CardDetailedPage from './pages/CardDetailedPage/CardDetailedPage';
import LkPage from './pages/LkPage/LkPage';
import { CardType } from './entities/card/model';
import AIChat from './features/ai/ui/AiChat/AiChat';


function App() {
  const [user, setUser] = useState<UserType | null>(null);
  const [cards, setCards] = useState<CardType[]>([]);
  useEffect(() => {
    UserApi.refreshTokens()
      .then(({ error, data, statusCode }) => {
        if (error) {
          setUser(null);
          return;
        }
        if (statusCode === 200 && data) {
          setUser(data.user);
          setAccessToken(data.accessToken);
        }
      })
      .catch(({ message }) => {
        console.log(message);
      });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={CLIENT_ROUTES.HOME}
          element={<Root user={user} setUser={setUser} />}
        >
          <Route index element={<MainPage user={user} cards={cards} setCards={setCards}/>} />
          <Route
            path={`${CLIENT_ROUTES.CARDS}/:id`}
            element={< CardDetailedPage/>}
          />
          <Route
            path={CLIENT_ROUTES.SIGNUP}
            element={<SignUpForm setUser={setUser} />}
          />
          <Route
            path={CLIENT_ROUTES.LK}
            element={<LkPage user={user ? { id: Number(user.id) } : null}  cards={cards} setCards={setCards} />}
          />
          <Route
            path={CLIENT_ROUTES.SIGNIN}
            element={<SignInForm setUser={setUser} />}
          />
          <Route
            path={CLIENT_ROUTES.AI}
            element={<AIChat />}
          />
          <Route
            path={`/update/:cardId`}
            element={<LkPage user={user ? { id: Number(user.id) } : null}  cards={cards} setCards={setCards} />}
          />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App
