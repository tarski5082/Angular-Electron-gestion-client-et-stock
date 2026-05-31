import { inject, Injectable } from '@angular/core';
import { ElectronService } from './electron-service';
@Injectable({
  providedIn: 'root',
})
export class FactureService {
  electron = inject(ElectronService)

  createFacture(id_client:number):Promise<void>{
    return  this.electron.getApi().createFacture(id_client);
  }

  finishFacture(id_facture:number):Promise<void>{
    return this.electron.getApi().finishFacture(id_facture);
  }

  factureClientId(id_facture:number):Promise<number>{
    return this.electron.getApi().factureClientId(id_facture);
  }
}
