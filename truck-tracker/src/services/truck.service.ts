import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { Truck, TruckStatus } from 'src/model/truck.model';

@Injectable({
  providedIn: 'root',
})
export class TruckService {
  truck: Truck = {
    id: 'T-001',
    status: 'idle',
    position: { x: 60, y: 60 },
    speed: 0, // this is km/h
  };

  private truckSubject = new BehaviorSubject<Truck>(this.truck);
  truck$ = this.truckSubject.asObservable();

  constructor() {
    interval(2000).subscribe(() => {
      this.updateTruck();
    })
  }

  private updateTruck() {
    const newPosition = this.generateRandomTruckPosition();
    const status = this.getStatusByPosition(newPosition);

    this.truck = {
      ...this.truck,
      position: newPosition,
      status,
      speed: Math.floor(Math.random() * 40) + 10, // setting minimum speed to 10 km/h
    };

    this.truckSubject.next(this.truck);
  }

  private generateRandomTruckPosition(): { x: number; y: number } {
    const currentPosition = this.truck.position;
    const x = Math.min(700, currentPosition.x + Math.floor(Math.random() * 100));
    const y = Math.min(900, currentPosition.y + Math.floor(Math.random() * 100));
    return { x, y };
  }

  getStatusByPosition(position: { x: number; y: number }): TruckStatus {
    const nearLoadingZone = position.x <= 180 && position.y <= 180;
    const nearDumpZone = position.x >= 650 && position.y >= 800;
    if (nearLoadingZone) {
      return 'loading';
    } else if (nearDumpZone) {
      return 'dumping';
    } else {
      return 'hauling';
    }
  }
}
