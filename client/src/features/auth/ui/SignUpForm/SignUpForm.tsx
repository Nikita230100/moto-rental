import { useState } from "react";
import { UserType } from "../../../../entities/user/model";
import { useNavigate } from "react-router";
import UserValidator from "../../../../entities/user/tools/User.validator";
import UserApi from "../../../../entities/user/api/UserApi";
import { setAccessToken } from "../../../../shared/lib/axiosInstance";
import './SignUpForm.css'


const INITIAL_INPUTS_DATA = {
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
  };

  type Props = {
    setUser: (user:UserType) => void
  }

  export default function SignUpForm({ setUser }:Props) {
    const [inputs, setInputs] = useState(INITIAL_INPUTS_DATA);
    const navigate = useNavigate();
  
    const onChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
      setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };
  
    const onSubmitHandler = async (event:React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      const { isValid, error } = UserValidator.validateSignUp(inputs);
  
      if (!isValid) return alert(error);
  
      try {
        const {
          statusCode,
          data,
          error: responseError,
        } = await UserApi.signUp(inputs);
  
        if (responseError) {
          alert(responseError);
          return;
        }
  
        if (statusCode === 201 && data) {
          setUser(data.user);
          setAccessToken(data.accessToken);
          setInputs(INITIAL_INPUTS_DATA);
          navigate('/');
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert('Произошла неизвестная ошибка');
        }
      }
    };
  
    const { username, email, password, repeatPassword } = inputs;
    return (
        <form onSubmit={onSubmitHandler}>
        <input
          type='text'
          name='username'
          required
          placeholder='Имя пользователя'
          autoFocus
          value={username}
          onChange={onChangeHandler}
        />
  
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
        <input
          type='password'
          name='repeatPassword'
          required
          placeholder='Пароль пользователя'
          value={repeatPassword}
          onChange={onChangeHandler}
        />
  
  
        <button type='submit'>Зарегистрироваться</button>
      </form>
    );
  }