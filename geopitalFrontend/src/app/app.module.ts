import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { MapsComponent } from './components/maps/maps.component';
import { CharacteristicsComponent } from './components/characteristics/characteristics.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {HttpClientModule} from '@angular/common/http';
import {MapService} from './services/map.service';
import {CharacteristicsService} from './services/characteristics.service';

@NgModule({
  declarations: [
    AppComponent,
    MapsComponent,
    CharacteristicsComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot ({
      apiKey: 'AIzaSyBRs9r5mVR66zxTv3Jf5lG05M5jRkWf-Ws'
    })
  ],
  providers: [
    MapService,
    CharacteristicsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
