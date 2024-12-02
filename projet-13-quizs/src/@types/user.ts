export interface IUser {
  id: number | null;
  email: string | null;
  pseudo: string | null;
  password: string | null;
  role: IRole | null;
}

export interface IRole {
  id: number;
  name: string;
}
