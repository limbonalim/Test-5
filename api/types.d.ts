export interface IUserFields {
  username: string;
  password: string;
  displayName: string;
  phone: string;
  token: string;
}

export interface IUserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type IUserModel = Model<IUserFields, unknown, IUserMethods>;