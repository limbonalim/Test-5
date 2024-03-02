export interface IMyError {
  message: string;
}

export interface IValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface IRegisterForm {
  username: string;
  password: string;
  displayName: string;
  phone: string;
}

export interface ILoginForm {
  username: string;
  password: string;
}

export interface IUser {
  _id: string;
  username: string;
  token: string;
}