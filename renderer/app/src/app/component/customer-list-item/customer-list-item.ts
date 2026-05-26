import { Component, input } from '@angular/core';
import { CustomerProfile } from '../../../types/electron';
import { Client } from '../../../types/client';
@Component({
  selector: 'app-customer-list-item',
  imports: [],
  templateUrl: './customer-list-item.html',
  styleUrl: './customer-list-item.css',
})
export class CustomerListItem {
 customer=input.required<CustomerProfile>();
  
 delete(){
    window.api.deleteClientById(this.customer().id_client);   
 }
}
