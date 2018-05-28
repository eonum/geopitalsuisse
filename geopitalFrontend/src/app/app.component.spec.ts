import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import {MapsComponent} from "./components/maps/maps.component";
import {AppModule} from "./app.module";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        AppRoutingModule,
        AppModule

      ]}).compileComponents();
  }));

});
