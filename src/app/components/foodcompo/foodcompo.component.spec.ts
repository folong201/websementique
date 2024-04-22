import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodcompoComponent } from './foodcompo.component';

describe('FoodcompoComponent', () => {
  let component: FoodcompoComponent;
  let fixture: ComponentFixture<FoodcompoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodcompoComponent]
    });
    fixture = TestBed.createComponent(FoodcompoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
