import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MapsComponent } from './components/maps/maps.component';
import { CharacteristicsComponent } from './components/characteristics/characteristics.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { CategorialAttributesComponent } from './components/categorial-attributes/categorial-attributes.component';

import { CharacteristicsService } from './services/characteristics.service';
import { HospitalService } from './services/hospital.service';
import { D3Service } from './services/d3.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ScatterplotComponent } from './components/scatterplot/scatterplot.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MenuPopoverComponent } from './components/menu-popover/menu-popover.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    MenuPopoverComponent,
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [
    CharacteristicsService,
    HospitalService,
    D3Service,
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
