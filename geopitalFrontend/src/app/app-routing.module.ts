import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapsComponent } from './components/maps/maps.component';
import { ScatterplotComponent } from './components/scatterplot/scatterplot.component';
import { LanguageGuardService } from './services/language-guard.service';

const routes: Routes = [
  { path: '', canActivate: [LanguageGuardService], component: MapsComponent},
  { path: 'map', component: MapsComponent },
  { path: 'statistics', component: ScatterplotComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
