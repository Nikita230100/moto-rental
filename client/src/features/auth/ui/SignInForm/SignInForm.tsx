import { useState } from "react";
import { UserDataType, UserType } from "../../../../entities/user/model";
import { useNavigate } from "react-router";
import UserValidator from "../../../../entities/user/tools/User.validator";
import UserApi from "../../../../entities/user/api/UserApi";
import { setAccessToken } from "../../../../shared/lib/axiosInstance";
import { CLIENT_ROUTES } from "../../../../shared/enums/clientRoutes";

const INITIAL_INPUTS_DATA = {
    email: '',
    password: '',
  };
  
  type Props = {
    setUser: (user: UserType) => void;
  }
  export default function SignInForm({ setUser }: Props) {
    const [inputs, setInputs] = useState(INITIAL_INPUTS_DATA);
    const navigate = useNavigate();
  
    const onChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
      setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };
  
    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      const { isValid, error } = UserValidator.validateSignIn(inputs);
  
      if (!isValid) return alert(error);
  
      try {
        const {
          statusCode,
          data,
          error: responseError,
        } = await UserApi.signIn(inputs as UserDataType);
  
        if (responseError) return alert(responseError);
  
        if (statusCode === 200 && data) {
          setUser(data.user);
          setAccessToken(data.accessToken);
          setInputs(INITIAL_INPUTS_DATA);
          navigate(CLIENT_ROUTES.HOME);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          // Обработка сетевых ошибок
          if (error.message.includes('400')) {
            alert('Неверный email или пароль');
          } else {
            alert(error.message);
          }
        } else {
          alert('Произошла неизвестная ошибка');
        }
      }
    };
  
const {email, password} = inputs
    return (
      <form onSubmit={onSubmitHandler}>
        <input
          type='email'
          name='email'
          required
          placeholder='Email пользователя'
          value={email}
          onChange={onChangeHandler}
        />
  
        <input
          type='password'
          name='password'
          required
          placeholder='Пароль пользователя'
          value={password}
          onChange={onChangeHandler}
        />
        <button type='submit'>Войти</button>
      </form>
    );
  }
  