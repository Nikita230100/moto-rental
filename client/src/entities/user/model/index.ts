export type UserDataType = {
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
  };
  
  export type UserType = {
    id: string;
    username: string;
    email: string;
    password: string;
  };
  
  export type UserResponseType = {
    user: UserType;
    accessToken: string;
  };
  