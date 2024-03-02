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
  displayName: string;
  phone: string;
  token: string;
}

export interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: {
    title: string;
    value: string;
  };
  user: {
    _id: string;
    displayName: string;
    phone: string;
  };
}

type IProductItem = Pick<IProduct, '_id', 'title', 'price', 'image'>;

export interface ICategory {
  _id: string;
  title: string;
  value: string;
}