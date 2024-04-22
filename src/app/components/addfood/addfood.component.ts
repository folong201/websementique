import { Component, OnInit } from '@angular/core';
import { JenefusekyService } from 'src/app/services/jenefuseky.service';

@Component({
  selector: 'app-addfood',
  templateUrl: './addfood.component.html',
  styleUrls: ['./addfood.component.css']
})
export class AddfoodComponent implements OnInit {
  classes!: any;
  foodList!: any
  selectedType: string = 'class';
  foodName: string = '';
  foodImage: string = '';
  queryinput = 'name'
  queryval = ''
  queryresult!: any
  constructor(private foodservice: JenefusekyService) { }
  ngOnInit() {
    this.getClasses();
    this.getFood()
  }

  getClasses() {
    this.foodservice.getclass().subscribe
      ((data: any) => {
        this.classes = data.results.bindings
        // console.log(data.results.bindings);
      });

  }

  getsubclasses() {
    this.foodservice.getSubClass().subscribe
      ((data: any) => {
        this.classes = data.results.bindings
        // console.log(data.results.bindings);
      });
  }


  getFood() {
    this.foodservice.getFoodList().subscribe
      ((data: any) => {
        this.foodList = data.results.bindings
        console.log("foodrequest result", data);
      });
  }

  getVal(input: string) {
    return input.split('#')[1]
  }
  onRadioChange(event: any) {
    if (this.selectedType == "class") {
      this.getsubclasses()
    } else {
      this.getClasses()
    }
    this.selectedType = event.target.value;
  }



  createFood(): void {
    console.log("element a sousmetre", { "name": this.foodName, "image": this.foodImage, "type": this.selectedType })
    this.foodservice.createFood({ "name": this.foodName, "image": this.foodImage })
      .subscribe(response => {
        // Gérer la réponse de création du food
        console.log('New food created:', response);
        this.getClasses();

        // Fermer la modal une fois la réponse reçue
        this.closeCreateFoodModal();
      }, error => {
        // Gérer les erreurs
        console.error('Error creating new food:', error);
      });
  }
  closeCreateFoodModal(): void {
    // Cacher la modal en utilisant le data-modal-hide attribut
    const modal = document.getElementById('createFoodModal');
    if (modal) {
      modal.setAttribute('hidden', 'true');
    }
  }
  queryparamchange() {
    if (this.queryinput == 'name') {
      this.queryinput = 'complete'
    } else {
      this.queryinput = 'name'
    }
  }
  exeQuery() {
    if (this.queryval != '') {
      if (this.queryinput == 'name') {
        this.foodservice.queryByFoodName(this.queryval).subscribe((data: any) => {
          this.queryresult = data//.results.bindings
          console.log("foodrequest result", data);
        })
      } else {
        this.foodservice.completeQuery(this.queryval).subscribe((data: any) => {
          this.queryresult = data//.results.bindings
          console.log("foodrequest result", data);
        })
      }
    }
  }

}
