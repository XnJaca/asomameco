interface IEvent {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: string;
  hora: string;
  lugar: string;
  estado: boolean;
}

interface IEventCreate {
  nombre: string;
  descripcion: string;
  fecha: string;
  hora: string;
  lugar: string;
  estado: boolean;
}

export type { IEvent, IEventCreate };
