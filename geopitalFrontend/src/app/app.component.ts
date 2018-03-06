import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  title: string = 'geopital suisse';
  lat: number = 46.9480900;
  lng: number = 7.4474400;
}
