import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { FormsModule} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot ({
      apiKey: 'AIzaSyBRs9r5mVR66zxTv3Jf5lG05M5jRkWf-Ws'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
