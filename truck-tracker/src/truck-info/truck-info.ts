import { Component, OnInit } from '@angular/core';
import { TruckService } from 'src/services/truck.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Truck } from 'src/model/truck.model';
@Component({
  selector: 'app-truck-info',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './truck-info.html',
  styleUrl: './truck-info.scss',
})
export class TruckInfo implements OnInit{

  trucks: Truck | null = null;
  constructor(
    private truckService: TruckService,
  ) { }


  ngOnInit(): void {
    this.truckService.truck$.subscribe((truck) => {
      this.trucks = truck;
    })
  }

  restartTruck() {
    this.truckService.startTruckSubs();
  }
}
