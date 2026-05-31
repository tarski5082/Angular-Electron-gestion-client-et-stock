import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFolder } from './product-folder';

describe('ProductFolder', () => {
  let component: ProductFolder;
  let fixture: ComponentFixture<ProductFolder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFolder],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFolder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
