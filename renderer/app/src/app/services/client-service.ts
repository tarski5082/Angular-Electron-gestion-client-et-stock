import { Injectable } from '@angular/core';
import { ElectronService } from './electron-service'; 

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private electron:ElectronService){}

  deleteClient(id:number):Promise<void>{
    return this.electron.getApi().deleteClientById(id);
  }

}
