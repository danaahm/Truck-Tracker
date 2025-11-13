import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { Truck, TruckStatus } from 'src/model/truck.model';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  truckSubscription: Subscription | null = null;


  constructor(private _snackBar: MatSnackBar) {
    this.truckSubscription = interval(2000).subscribe(() => {
      this.updateTruck();
    });
  }

  public startTruckSubs() {
    this.truckSubscription?.unsubscribe();
    this.truckSubscription = null;
    // set truck to start position
    this.truck = {
      id: 'T-001',
      status: 'idle',
      position: { x: 60, y: 60 },
      speed: 0,
    };
    this.truckSubject.next(this.truck);
    this.truckSubscription = interval(2000).subscribe(() => {
      this.updateTruck();
    });
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

    if (newPosition.x >= 700 && newPosition.y >= 900) {
      this.truckSubscription?.unsubscribe();
      this.truckSubscription = null;
      this.truck = {
        ...this.truck,
        status: 'idle',
        speed: 0,
      };
      this.truckSubject.next(this.truck);
      this._snackBar.open('The truck has reached to destination and is now idle.', 'Close', { duration: 8000 } );
    }
  }

  private generateRandomTruckPosition(): { x: number; y: number } {
    const currentPosition = this.truck.position;
    const x = Math.min(
      700,
      currentPosition.x + Math.floor(Math.random() * 100),
    );
    const y = Math.min(
      900,
      currentPosition.y + Math.floor(Math.random() * 100),
    );
    return { x, y };
  }

  getStatusByPosition(position: { x: number; y: number }): TruckStatus {
    const nearLoadingZone = position.x <= 140 && position.y <= 140;
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
