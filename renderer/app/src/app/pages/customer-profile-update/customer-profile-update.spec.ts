import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProfileUpdate } from './customer-profile-update';

describe('CustomerProfileUpdate', () => {
  let component: CustomerProfileUpdate;
  let fixture: ComponentFixture<CustomerProfileUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerProfileUpdate],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerProfileUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
