export interface Truck {
  id: string;
  status: TruckStatus;
  position: {
    x: number;
    y: number;
  };
  speed: number;
}

export type TruckStatus = 'loading' | 'hauling' | 'dumping' | 'idle';

export const TruckStatusColours : Record<TruckStatus, string> = {
  loading: 'orange',
  hauling: 'green',
  dumping: 'blue',
  idle: 'gray',
};
