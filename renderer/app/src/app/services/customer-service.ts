import { Injectable } from '@angular/core';
import { CustomerProfile } from '../../types/customer-profil';
import { ElectronService } from './electron-service'; 
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
    constructor(private electron: ElectronService) {}
    addCustomer(customer:CustomerProfile):Promise<any>{
      return this.electron.getApi().addCustomer(customer);
    }
    loadCustomer():Promise<any>{
      return this.electron.getApi().loadCustomer();
    }

    getCustomer(id:number):Promise<CustomerProfile>{
      return this.electron.getApi().getCustomer(id);
    }
    updateCustomer(id:number,customer:CustomerProfile){
      return this.electron.getApi().updateCustomer(id,customer);
    }

}
