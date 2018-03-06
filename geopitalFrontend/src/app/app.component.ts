import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styles: [`
    agm-map {
      height: 700px;
      width: 1200px;
    }
  `],
  template: `
  <agm-map [latitude]="lat" [longitude]="lng"></agm-map>
  `
})
export class AppComponent {
  lat: number = 46.9480900;
  lng: number = 7.4474400;
}
