import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Map } from "src/map/map";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, Map],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'truck-tracker';
}

