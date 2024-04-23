import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importez HttpClientModule correctement

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddfoodComponent } from './components/addfood/addfood.component';
import { FormsModule } from '@angular/forms';
import { FoodcompoComponent } from './components/foodcompo/foodcompo.component';
import { FooddetailsComponent } from './components/fooddetails/fooddetails.component';

@NgModule({
  declarations: [
    AppComponent,
    AddfoodComponent,
    FoodcompoComponent,
    FooddetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule ,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
