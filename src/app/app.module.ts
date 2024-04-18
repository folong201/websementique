import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importez HttpClientModule correctement

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddfoodComponent } from './components/addfood/addfood.component';

@NgModule({
  declarations: [
    AppComponent,
    AddfoodComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule // Ajoutez HttpClientModule ici
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
