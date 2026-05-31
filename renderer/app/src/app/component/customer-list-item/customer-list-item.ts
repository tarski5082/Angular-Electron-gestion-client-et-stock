import { Component, inject, input, output } from '@angular/core';
import { CustomerProfile } from '../../../types/customer-profil';
import { ClientService } from '../../services/client-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customer-list-item',
  imports: [],
  templateUrl: './customer-list-item.html',
  styleUrl: './customer-list-item.css',
})
export class CustomerListItem {
 route:Router = inject(Router);
 customer=input.required<CustomerProfile>();
 id=output<number>();
 delete(){
    const clientId = this.customer().id_client;
    if(clientId!=undefined && clientId!=null){
      this.id.emit(clientId);
    }
 }

 submit(){
    this.id.emit(this.customer().id_client??0);
 }
 modify(){
    if(this.customer().id_client){
    const id = 'client/' + this.customer().id_client?.toString();
    
    this.route.navigate([id]);
    console.log(id);
  }
 }
}
