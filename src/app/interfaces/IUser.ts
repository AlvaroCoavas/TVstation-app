export interface ICountry {
  id: string;
  
}

export interface IUser {
  id: string;
  uuid?: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  country: ICountry;
}

export interface IUserCreate extends Omit<IUser, 'id'> {}

export interface IUserLogin {
  email: string;
  password: string;
}