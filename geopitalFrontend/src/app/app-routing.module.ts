import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapsComponent } from './components/maps/maps.component';
import { ScatterplotComponent } from './components/scatterplot/scatterplot.component';
import { LanguageGuard } from './services/language-guard.service';

const routes: Routes = [
  {
    path: ':language',
    redirectTo: ':language/map'
  }, {
    path: ':language/map',
    canActivate: [LanguageGuard],
    component: MapsComponent
  }, {
    path: ':language/statistics',
    canActivate: [LanguageGuard],
    component: ScatterplotComponent
  }, {
    path: '',
    pathMatch: 'full',
    canActivate: [LanguageGuard],
    redirectTo: '',
  },
  { path: '**', redirectTo: ''  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
