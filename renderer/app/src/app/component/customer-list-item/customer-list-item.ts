import { Component, input } from '@angular/core';
import { CustomerProfile } from '../../../types/customer-profil';

@Component({
  selector: 'app-customer-list-item',
  imports: [],
  templateUrl: './customer-list-item.html',
  styleUrl: './customer-list-item.css',
})
export class CustomerListItem {
 customer=input.required<CustomerProfile>();
 delete(){
    const clientId = this.customer().id_client;
    if(clientId!=undefined && clientId!=null){
      window.api.deleteClientById(clientId);
    }
 }
}
