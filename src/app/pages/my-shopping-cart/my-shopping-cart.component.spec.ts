import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShoppingCartComponent } from './my-shopping-cart.component';

describe('MyShoppingCartComponent', () => {
  let component: MyShoppingCartComponent;
  let fixture: ComponentFixture<MyShoppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyShoppingCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
