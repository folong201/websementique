import { Component, OnInit } from '@angular/core';
import { JenefusekyService } from 'src/app/services/jenefuseky.service';

@Component({
  selector: 'app-foodcompo',
  templateUrl: './foodcompo.component.html',
  styleUrls: ['./foodcompo.component.css']
})
export class FoodcompoComponent implements OnInit {
  compositions!: any
  foods: any[] = [];
  constructor(private http: JenefusekyService) { }

  ngOnInit(): void {
    this.getComposition()
  }

  getComposition() {
    this.http.getComposition().subscribe((data: any) => {
      this.foods = this.parseSPARQLResponse(data);
      console.log(this.foods);

    })
  }

  parseSPARQLResponse(data: any): any[] {
    const results = data.results.bindings;
    const foodsMap = new Map();

    results.forEach((result: any) => {
      const foodUri = result.food.value;
      const componentUri = result.component.value;
      const ingredientUri = result.ingradient.value;

      let food = foodsMap.get(foodUri);
      if (!food) {
        food = { uri: foodUri, components: new Set(), ingredients: new Set() };
        foodsMap.set(foodUri, food);
      }

      if (componentUri) {
        food.components.add(componentUri);
      }

      if (ingredientUri) {
        food.ingredients.add(ingredientUri);
      }
    });

    return Array.from(foodsMap.values());
  }
  getVal(input:string){
    return input.split('#')[1]
  }
}
