export interface IUserRequest {
  fullname: string;
  password: string;
  email: string;
  phone: string;
  isAdm: boolean;
}

export interface IUser {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  fullname?: string;
  password?: string;
  email?: string;
  phone?: string;
}

export interface ISessionRequest {
  email: string;
  password: string;
}
