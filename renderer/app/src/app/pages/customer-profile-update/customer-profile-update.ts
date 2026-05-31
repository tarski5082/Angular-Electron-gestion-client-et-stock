import { Component,inject,input,OnInit, signal } from '@angular/core';
import { ProfileForm } from '../../component/profile/profile-form/profile-form';
import { CustomerProfile } from '../../../types/customer-profil';
import { CustomerService } from '../../services/customer-service';
@Component({
  selector: 'app-customer-profile-update',
  imports: [ProfileForm],
  templateUrl: './customer-profile-update.html',
  styleUrl: './customer-profile-update.css',
})
export class CustomerProfileUpdate implements OnInit{
  private customerService = inject(CustomerService);
  id=input<string>();
  customer = signal<CustomerProfile|undefined>(undefined);

  async ngOnInit(): Promise<void> {
    const id = Number(this.id());
    const customer = await this.customerService.getCustomer(id);
    console.log(await customer.nom);
    this.customer.set(customer);
  }

  update(customer:CustomerProfile){
      const id = Number(this.id());
      if(id){
        this.customerService.updateCustomer(id,customer);
      }
  }
}
