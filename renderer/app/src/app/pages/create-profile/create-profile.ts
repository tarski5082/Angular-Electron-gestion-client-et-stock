import { Component,inject, signal } from '@angular/core';
import { ProfileForm } from '../../component/profile/profile-form/profile-form';
import { CustomerProfile } from '../../../types/customer-profil';
import { CustomerService } from '../../services/customer-service';
@Component({
  selector: 'app-create-profile',
  imports: [ProfileForm],
  templateUrl: './create-profile.html',
  styleUrl: './create-profile.css',
})
export class CreateProfile {
  private customerService = inject(CustomerService);
  customer = signal<CustomerProfile|undefined>(undefined);

  create(customer:CustomerProfile){
    this.customerService.addCustomer(customer);
  }

}
