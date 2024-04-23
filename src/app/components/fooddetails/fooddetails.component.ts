import { Component, Input, OnInit } from '@angular/core';
import { JenefusekyService } from 'src/app/services/jenefuseky.service';

@Component({
  selector: 'app-fooddetails',
  templateUrl: './fooddetails.component.html',
  styleUrls: ['./fooddetails.component.css']
})
export class FooddetailsComponent implements OnInit {
  @Input() foodName!: string;
  ingredients!:any
  components!:any
  constructor(private http: JenefusekyService) { }
  ngOnInit(): void {
    this.getFoodDetails()
  }

  getFoodDetails() {
    this.http.getFoodComponentByName(this.foodName || '').subscribe((res: any) => {
      this.ingredients = res.results.bindings.map((item: any) => this.getVal(item.ingredient.value));
      this.components = res.results.bindings.map((item: any) => this.getVal(item.component.value));
    });
  }
  getVal(input: string) {
    return input.split('#')[1]
  }

}
