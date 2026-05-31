import { Component, OnInit,signal,inject } from '@angular/core';
import { CustomerListItem } from '../../component/customer-list-item/customer-list-item';
import { CustomerProfile } from '../../../types/customer-profil'; 
import { CustomerService } from '../../services/customer-service';
import { ClientService } from '../../services/client-service';
@Component({
  selector: 'app-customer-list-page',
  imports: [CustomerListItem],
  templateUrl: './customer-list-page.html',
  styleUrl: './customer-list-page.css',
})
export class CustomerListPage implements OnInit{
  customers= signal<CustomerProfile[]>([]);
  customerService=inject(CustomerService);
  client = inject(ClientService);
  async load() :Promise<void>{
    this.customers.set(await this.customerService.loadCustomer());
  }

  ngOnInit(): void {
    this.load();
  }
  
  async deleteId(id:number){
    await this.client.deleteClient(id);
    await this.load();
  }

}
