export interface IContactRequest {
    fullname: string;
    email: string;
    phone: string;
  }
  
  export interface IContact {
    id: string;
    fullname: string;
    email: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface IContactUpdate {
    fullname?: string;
    password?: string;
    email?: string;
    phone?: string;
  }