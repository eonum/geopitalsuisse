import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapsComponent} from "./components/maps/maps.component";

const routes: Routes = [
  { path: '', component: MapsComponent},
  { path: 'maps', component: MapsComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
