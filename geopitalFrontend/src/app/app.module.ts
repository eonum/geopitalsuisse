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
import { HospitalComponent } from './components/hospital/hospital.component';
import { AddressComponent } from './components/address/address.component';
import { AttributesComponent } from './components/attributes/attributes.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { CategorialAttributesComponent } from './components/categorial-attributes/categorial-attributes.component';

import {CharacteristicsService} from './services/characteristics.service';
import {HospitalService} from "./services/hospital.service";
import {AddressService} from "./services/address.service";
import {MapService} from './services/map.service';


@NgModule({
  declarations: [
    AppComponent,
    MapsComponent,
    CharacteristicsComponent,
    NavbarComponent,
    HospitalComponent,
    AddressComponent,
    AttributesComponent,
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
    MapService,
    CharacteristicsService,
    HospitalService,
    AddressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
