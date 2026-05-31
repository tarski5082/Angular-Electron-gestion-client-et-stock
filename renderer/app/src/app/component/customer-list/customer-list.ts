import { Component, OnInit,signal,inject,output } from '@angular/core';
import { CustomerListItem } from '../../component/customer-list-item/customer-list-item';
import { CustomerProfile } from '../../../types/customer-profil'; 
import { CustomerService } from '../../services/customer-service';
import { ClientService } from '../../services/client-service';

@Component({
  selector: 'app-customer-list',
  imports: [CustomerListItem],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css',
})
export class CustomerList implements OnInit{
  customers= signal<CustomerProfile[]>([]);
  customerService=inject(CustomerService);
  client = inject(ClientService);
  id = output<number>();
  
  async load() :Promise<void>{
    this.customers.set(await this.customerService.loadCustomer());
  }

  send(id:number){
    this.id.emit(id);
  }

  ngOnInit(): void {
    this.load();
  }
}
