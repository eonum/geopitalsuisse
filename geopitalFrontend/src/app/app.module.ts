import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MapsComponent } from './components/maps/maps.component';
import { CharacteristicsComponent } from './components/characteristics/characteristics.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { CategorialAttributesComponent } from './components/categorial-attributes/categorial-attributes.component';

import {CharacteristicsService} from './services/characteristics.service';
import {HospitalService} from './services/hospital.service';
import { D3Service } from './services/d3.service';
import { D3MapsService } from './services/d3-maps.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ScatterplotComponent } from './components/scatterplot/scatterplot.component';


@NgModule({
  declarations: [
    AppComponent,
    MapsComponent,
    CharacteristicsComponent,
    NavbarComponent,
    DropdownComponent,
    CategorialAttributesComponent,
    SidebarComponent,
    ScatterplotComponent,
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
    HospitalService,
    D3Service,
    D3MapsService
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
