import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Map } from 'src/map/map';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TruckInfo } from 'src/truck-info/truck-info';
@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, Map, MatSidenavModule, TruckInfo],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'truck-tracker';
}
