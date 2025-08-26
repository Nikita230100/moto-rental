import { NavLink, useNavigate } from 'react-router';
import UserApi from '../../entities/user/api/UserApi';
import './Header.css';
import { setAccessToken } from '../../shared/lib/axiosInstance';
import { UserType } from '../../entities/user/model';
import { CLIENT_ROUTES } from '../../shared/enums/clientRoutes';
type Props = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
};

export default function Header({ user, setUser }: Props) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const response = await UserApi.signOut();
      if (response.statusCode === 200) {
        setUser(null);
        setAccessToken('');
        navigate(CLIENT_ROUTES.HOME);
      } else {
        alert(response.error || 'Ошибка при выходе');
      }
    } catch (error) {
      console.error(error);
      alert('Ошибка при выходе');
    }
  };

  return (
    <header className="header">
      <NavLink to={CLIENT_ROUTES.HOME}>motoclub</NavLink>

      <div>
        {!user && (
          <>
            <NavLink to={CLIENT_ROUTES.SIGNUP}>Регистрация</NavLink>
            <NavLink to={CLIENT_ROUTES.SIGNIN}>Войти</NavLink>
          </>
        )}

        {user && (
          <>
            <NavLink to={Number(user.id) !== 1 ? CLIENT_ROUTES.LK : CLIENT_ROUTES.LK}>
              {user.username}
            </NavLink>
            <NavLink to={CLIENT_ROUTES.AI}>AI Ассистент</NavLink>
            <button onClick={handleSignOut}>Выход</button>
          </>
        )}
      </div>
    </header>
  );
}
