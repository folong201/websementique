import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooddetailsComponent } from './fooddetails.component';

describe('FooddetailsComponent', () => {
  let component: FooddetailsComponent;
  let fixture: ComponentFixture<FooddetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooddetailsComponent]
    });
    fixture = TestBed.createComponent(FooddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
