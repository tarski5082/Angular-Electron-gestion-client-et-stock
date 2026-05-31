import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductChoose } from './product-choose';

describe('ProductChoose', () => {
  let component: ProductChoose;
  let fixture: ComponentFixture<ProductChoose>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductChoose],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductChoose);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
