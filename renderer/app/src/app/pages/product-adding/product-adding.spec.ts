import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdding } from './product-adding';

describe('ProductAdding', () => {
  let component: ProductAdding;
  let fixture: ComponentFixture<ProductAdding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAdding],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductAdding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
