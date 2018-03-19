import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HospitalComponent} from './components/hospital/hospital.component';
import {MapsComponent} from './components/maps/maps.component';

const routes: Routes = [
  { path: 'hospital', component: HospitalComponent},
  { path: 'maps', component: MapsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
