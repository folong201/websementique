import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddfoodComponent } from './components/addfood/addfood.component';

const routes: Routes = [
  {
    path:"/",component: AddfoodComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
