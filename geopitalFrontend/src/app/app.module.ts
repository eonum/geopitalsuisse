import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from './app.component';
import { MapsComponent } from './components/maps/maps.component';
import { CharacteristicsComponent } from './components/characteristics/characteristics.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { CategorialAttributesComponent } from './components/categorial-attributes/categorial-attributes.component';

import {CharacteristicsService} from './services/characteristics.service';
import {HospitalService} from "./services/hospital.service";


@NgModule({
  declarations: [
    AppComponent,
    MapsComponent,
    CharacteristicsComponent,
    NavbarComponent,
    DropdownComponent,
    CategorialAttributesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,

  ],
  providers: [
    CharacteristicsService,
    HospitalService
  ],
  exports: [
    AppComponent,
    MapsComponent,
    CharacteristicsComponent,
    NavbarComponent,
    DropdownComponent,
    CategorialAttributesComponent,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
