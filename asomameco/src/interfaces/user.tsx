interface IUser {
  id: number;
  nombre: string;
  cedula: string;
  estado: boolean;
  email: string;
  telefono: string;
  password: string;
  rolId: number;
  eventsId: null;
  rol: {
    id: number;
    nombre: string;
  };
}

interface IUserCreate {
  nombre: string;
  cedula: string;
  email: string;
  telefono: string;
  password: string;
  rolId: number;
}

export type { IUser, IUserCreate };
