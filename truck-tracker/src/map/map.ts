import { Component, OnInit } from '@angular/core';
import { Truck, TruckStatusColours } from 'src/model/truck.model';
import { TruckService } from 'src/services/truck.service';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.scss',
})
export class Map implements OnInit {

  truck: Truck | null = null;

  constructor(
    private truckService: TruckService,
  ) {}

  ngOnInit(): void {
    this.truckService.truck$.subscribe((truck) => {
      this.truck = truck;
      this.update();
    })
  }

  update() {
    const truckElement = document.getElementById('truck');
    if(this.truck && truckElement) {
      truckElement.style.transform = `translate(${this.truck.position.x}px, ${this.truck.position.y}px)`;
      truckElement.style.backgroundColor = TruckStatusColours[this.truck.status];
      truckElement.setAttribute('data-status', this.truck.status);
      truckElement.setAttribute('data-speed', `${this.truck.speed} km/h`);
    }

  }



}
