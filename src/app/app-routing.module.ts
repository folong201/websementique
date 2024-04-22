import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddfoodComponent } from './components/addfood/addfood.component';
import { FoodcompoComponent } from './components/foodcompo/foodcompo.component';

const routes: Routes = [
  {
    path: "", component: AddfoodComponent
  },
  {
    path:"components",component:FoodcompoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
